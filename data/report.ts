"use server";

import {
  getReportByIdService,
  getHazardsByReportIdService,
  getRecentReportsService,
  getAllReportsService,
  getEmployeeStatsService,
  getCompanyReportsService,
} from "@/services/report";
import { IReport, IReportHazard } from "@/definitions/report";

const mapReport = (report: any): IReport => ({
  id: report._id.toString(),
  employeeId: report.employeeId.toString(),
  companyId: report.companyId.toString(),
  title: report.title,
  description: report.description,
  images: report.images,
  location: report.location,
  status: report.status,
  isFinalized: report.isFinalized,
  isReviewed: report.isReviewed,
  notes: report.notes,
  createdAt: report.createdAt,
  updatedAt: report.updatedAt,
});

const mapHazard = (hazard: any): IReportHazard => ({
  id: hazard._id.toString(),
  reportId: hazard.reportId.toString(),
  description: hazard.description,
  category: hazard.category,
  severity: hazard.severity,
  confidence: hazard.confidence,
  isAIDetected: hazard.isAIDetected,
  isManualOverride: hazard.isManualOverride,
  preventionTip: hazard.preventionTip,
  status: hazard.status,
  createdAt: hazard.createdAt,
});

export async function getReportWithHazards(reportId: string) {
  try {
    const report = await getReportByIdService(reportId);
    if (!report) return { success: false, message: "Report not found" };

    const hazards = await getHazardsByReportIdService(reportId);

    return {
      success: true,
      data: {
        report: mapReport(report),
        hazards: hazards.map(mapHazard),
      },
    };
  } catch (error: any) {
    console.error("❌ getReportWithHazards error:", error);
    return { success: false, message: error.message };
  }
}

// ============ ADD THESE NEW FUNCTIONS ============

export async function getEmployeeStats(employeeId: string) {
  try {
    const stats = await getEmployeeStatsService(employeeId);
    return { success: true, data: stats };
  } catch (error: any) {
    console.error("❌ getEmployeeStats error:", error);
    return {
      success: false,
      data: { totalReports: 0, totalHazards: 0, pendingReports: 0 },
    };
  }
}

export async function getRecentReports(employeeId: string, limit: number = 5) {
  try {
    const reports = await getRecentReportsService(employeeId, limit);
    return { success: true, data: reports };
  } catch (error: any) {
    console.error("❌ getRecentReports error:", error);
    return { success: false, data: [] };
  }
}

// Add to existing file
export async function getAllReports(
  employeeId: string,
  page: number = 1,
  limit: number = 10,
) {
  try {
    const result = await getAllReportsService(employeeId, page, limit);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("❌ getAllReports error:", error);
    return {
      success: false,
      data: { reports: [], total: 0, page: 1, totalPages: 0 },
    };
  }
}

// Add to existing file
export async function getCompanyReports(
  companyId: string,
  page: number = 1,
  limit: number = 10,
  employeeId?: string,
) {
  try {
    const result = await getCompanyReportsService(
      companyId,
      page,
      limit,
      employeeId,
    );
    return { success: true, data: result };
  } catch (error: any) {
    console.error("❌ getCompanyReports error:", error);
    return {
      success: false,
      data: { reports: [], total: 0, page: 1, totalPages: 0 },
    };
  }
}
