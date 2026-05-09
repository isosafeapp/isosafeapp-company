import Report from "@/models/report";
import Hazard from "@/models/hazard";
import Employee from "@/models/employee";
import {
  CompanyAnalyticsData,
  ReportMetrics,
  SeverityStats,
  HazardCategoryStat,
  EmployeeLeaderboardEntry,
  MonthlyReportTrend,
  IAppUsageStats,
} from "@/definitions/analytics";
import { connectDB } from "@/lib/db";
import { Types } from "mongoose";

export async function getCompanyAnalyticsService(
  companyId: string,
): Promise<CompanyAnalyticsData> {
  await connectDB();

  const companyObjectId = new Types.ObjectId(companyId);

  // Get all finalized reports for this company
  const reports = await Report.find({
    companyId: companyObjectId,
    isFinalized: true,
  }).lean();

  const reportIds = reports.map((r) => r._id);

  // Get all hazards from these reports
  const hazards = await Hazard.find({ reportId: { $in: reportIds } }).lean();

  // Get all employees for this company
  const employees = await Employee.find({ companyId: companyObjectId }).lean();
  const activeEmployees = employees.filter((e) => e.status === "active").length;

  // Calculate metrics
  const totalReports = reports.length;
  const totalHazards = hazards.length;
  const pendingReviews = reports.filter(
    (r) => r.status === "submitted" && !r.isReviewed,
  ).length;
  const resolvedHazards = hazards.filter((h) => h.status === "resolved").length;
  const averageHazardsPerReport =
    totalReports > 0 ? +(totalHazards / totalReports).toFixed(1) : 0;

  const metrics: ReportMetrics = {
    totalReports,
    totalHazards,
    activeEmployees,
    pendingReviews,
    resolvedHazards,
    averageHazardsPerReport,
  };

  // Severity stats
  const severityStats: SeverityStats = {
    low: hazards.filter((h) => h.severity === "low").length,
    medium: hazards.filter((h) => h.severity === "medium").length,
    high: hazards.filter((h) => h.severity === "high").length,
    critical: hazards.filter((h) => h.severity === "critical").length,
  };

  // Top hazard categories
  const categoryMap = new Map<string, number>();
  hazards.forEach((hazard) => {
    categoryMap.set(
      hazard.category,
      (categoryMap.get(hazard.category) || 0) + 1,
    );
  });

  const topHazardCategories: HazardCategoryStat[] = Array.from(
    categoryMap.entries(),
  )
    .map(([category, count]) => ({
      category,
      count,
      percentage:
        totalHazards > 0 ? +((count / totalHazards) * 100).toFixed(1) : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Employee leaderboard
  const employeeReportMap = new Map<
    string,
    {
      reports: number;
      hazards: number;
      lastActive: Date | undefined;
      name: string;
    }
  >();

  for (const report of reports) {
    const empId = report.employeeId.toString();
    const emp = employees.find((e) => e._id.toString() === empId);
    const employeeName = emp ? `${emp.firstName} ${emp.lastName}` : "Unknown";

    if (!employeeReportMap.has(empId)) {
      employeeReportMap.set(empId, {
        reports: 0,
        hazards: 0,
        lastActive: undefined,
        name: employeeName,
      });
    }

    const entry = employeeReportMap.get(empId)!;
    entry.reports++;
    entry.lastActive =
      !entry.lastActive ||
      (report.createdAt && report.createdAt > entry.lastActive)
        ? report.createdAt
        : entry.lastActive;
  }

  // Count hazards per employee
  for (const hazard of hazards) {
    const report = reports.find(
      (r) => r._id.toString() === hazard.reportId.toString(),
    );
    if (report) {
      const empId = report.employeeId.toString();
      const entry = employeeReportMap.get(empId);
      if (entry) entry.hazards++;
    }
  }

  const employeeLeaderboard: EmployeeLeaderboardEntry[] = Array.from(
    employeeReportMap.entries(),
  )
    .map(([employeeId, data]) => ({
      employeeId,
      employeeName: data.name,
      totalReports: data.reports,
      totalHazards: data.hazards,
      lastActive: data.lastActive,
    }))
    .sort((a, b) => b.totalReports - a.totalReports)
    .slice(0, 10);

  // Monthly trends (last 6 months)
  const monthlyMap = new Map<string, { reports: number; hazards: number }>();
  const today = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthName = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    monthlyMap.set(monthKey, { reports: 0, hazards: 0 });
  }

  for (const report of reports) {
    const date = new Date(report.createdAt || Date.now());
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (monthlyMap.has(monthKey)) {
      monthlyMap.get(monthKey)!.reports++;
    }
  }

  for (const hazard of hazards) {
    const report = reports.find(
      (r) => r._id.toString() === hazard.reportId.toString(),
    );
    if (report) {
      const date = new Date(report.createdAt || Date.now());
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (monthlyMap.has(monthKey)) {
        monthlyMap.get(monthKey)!.hazards++;
      }
    }
  }

  const monthlyTrends: MonthlyReportTrend[] = Array.from(monthlyMap.entries())
    .map(([monthKey, data]) => {
      const [year, month] = monthKey.split("-");
      const monthName = new Date(
        parseInt(year),
        parseInt(month) - 1,
      ).toLocaleString("default", { month: "short" });
      return {
        month: `${monthName} ${year}`,
        reports: data.reports,
        hazards: data.hazards,
      };
    })
    .slice(-6);

  // App usage stats
  const totalReportsByEmployees = employeeLeaderboard.reduce(
    (sum, e) => sum + e.totalReports,
    0,
  );
  const averageReportsPerEmployee =
    activeEmployees > 0
      ? +(totalReportsByEmployees / activeEmployees).toFixed(1)
      : 0;
  const mostActiveEmployee =
    employeeLeaderboard.length > 0 ? employeeLeaderboard[0] : null;

  const appUsage: IAppUsageStats = {
    totalAppOpens: 0, // Would need separate tracking
    averageReportsPerEmployee,
    mostActiveEmployee: mostActiveEmployee
      ? {
          employeeId: mostActiveEmployee.employeeId,
          employeeName: mostActiveEmployee.employeeName,
          reportCount: mostActiveEmployee.totalReports,
        }
      : null,
  };

  return {
    metrics,
    severityStats,
    topHazardCategories,
    employeeLeaderboard,
    monthlyTrends,
    appUsage,
  };
}
