import Report from "@/models/report";
import Hazard from "@/models/hazard";
import Employee from "@/models/employee";
import {
  CreateReportInput,
  CreateHazardInput,
  IEmployeeStats,
  ICompanyReportsResponse,
  IEmployeeReportsResponse,
  ICompanyReport,
  IEmployeeReport,
} from "@/definitions/report";
import { connectDB } from "@/lib/db";
import { Types } from "mongoose";

// ============ CRUD Operations ============

export async function createReportService(data: CreateReportInput) {
  await connectDB();

  const report = await Report.create({
    employeeId: new Types.ObjectId(data.employeeId),
    companyId: new Types.ObjectId(data.companyId),
    title: data.title,
    description: data.description,
    images: data.images || [],
    location: data.location,
    status: data.status,
    isFinalized: data.isFinalized,
    notes: data.notes,
  });

  return report;
}

export async function createHazardsService(
  reportId: string,
  hazards: CreateHazardInput[],
) {
  await connectDB();

  const hazardsWithReportId = hazards.map((hazard) => ({
    reportId: new Types.ObjectId(reportId),
    description: hazard.description,
    category: hazard.category,
    severity: hazard.severity,
    confidence: hazard.confidence,
    isAIDetected: hazard.isAIDetected,
    isManualOverride: hazard.isManualOverride,
    originalDescription: hazard.originalDescription,
    preventionTip: hazard.preventionTip,
    status: hazard.status,
  }));

  return await Hazard.insertMany(hazardsWithReportId);
}

export async function getReportByIdService(reportId: string) {
  await connectDB();
  return await Report.findById(reportId).lean();
}

export async function getHazardsByReportIdService(reportId: string) {
  await connectDB();
  return await Hazard.find({ reportId: new Types.ObjectId(reportId) }).lean();
}

// ============ Employee Report Services ============

export async function getReportsByEmployeeIdService(
  employeeId: string,
  limit?: number,
) {
  await connectDB();
  const query = Report.find({
    employeeId: new Types.ObjectId(employeeId),
    isFinalized: true,
  }).sort({ createdAt: -1 });

  if (limit) query.limit(limit);
  return await query.lean();
}

export async function getEmployeeStatsService(
  employeeId: string,
): Promise<IEmployeeStats> {
  await connectDB();

  const reports = await Report.find({
    employeeId: new Types.ObjectId(employeeId),
    isFinalized: true,
  }).lean();

  const totalReports = reports.length;
  const reportIds = reports.map((r) => r._id);
  const hazards = await Hazard.find({ reportId: { $in: reportIds } }).lean();
  const totalHazards = hazards.length;

  const pendingReports = await Report.countDocuments({
    employeeId: new Types.ObjectId(employeeId),
    isFinalized: true,
    isReviewed: false,
  });

  return { totalReports, totalHazards, pendingReports };
}

export async function getRecentReportsService(
  employeeId: string,
  limit: number = 5,
): Promise<IEmployeeReport[]> {
  await connectDB();

  const reports = await Report.find({
    employeeId: new Types.ObjectId(employeeId),
    isFinalized: true,
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  const reportsWithCounts = await Promise.all(
    reports.map(async (report) => {
      const hazardCount = await Hazard.countDocuments({ reportId: report._id });
      return {
        id: report._id.toString(),
        title: report.title,
        hazardCount,
        status: report.status,
        createdAt: report.createdAt,
        location: report.location?.address,
      };
    }),
  );

  return reportsWithCounts;
}

export async function getAllReportsService(
  employeeId: string,
  page: number = 1,
  limit: number = 10,
): Promise<IEmployeeReportsResponse> {
  await connectDB();

  const skip = (page - 1) * limit;

  const reports = await Report.find({
    employeeId: new Types.ObjectId(employeeId),
    isFinalized: true,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Report.countDocuments({
    employeeId: new Types.ObjectId(employeeId),
    isFinalized: true,
  });

  const reportsWithCounts = await Promise.all(
    reports.map(async (report) => {
      const hazardCount = await Hazard.countDocuments({ reportId: report._id });
      return {
        id: report._id.toString(),
        title: report.title,
        hazardCount,
        status: report.status,
        createdAt: report.createdAt,
        location: report.location?.address,
      };
    }),
  );

  return {
    reports: reportsWithCounts,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

// ============ Company Report Services (Aggregation for Performance) ============

export async function getCompanyReportsService(
  companyId: string,
  page: number = 1,
  limit: number = 10,
  employeeId?: string,
): Promise<ICompanyReportsResponse> {
  await connectDB();

  const skip = (page - 1) * limit;

  // Build match stage
  const matchStage: any = {
    companyId: new Types.ObjectId(companyId),
    isFinalized: true,
  };

  if (employeeId) {
    matchStage.employeeId = new Types.ObjectId(employeeId);
  }

  // Aggregation pipeline for better performance
  const [result] = await Report.aggregate([
    { $match: matchStage },
    { $sort: { createdAt: -1 } },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        reports: [
          { $skip: skip },
          { $limit: limit },
          {
            $lookup: {
              from: "employees",
              localField: "employeeId",
              foreignField: "_id",
              as: "employee",
            },
          },
          { $unwind: { path: "$employee", preserveNullAndEmptyArrays: true } },
          {
            $lookup: {
              from: "hazards",
              localField: "_id",
              foreignField: "reportId",
              as: "hazards",
            },
          },
          {
            $addFields: {
              hazardCount: { $size: "$hazards" },
              employeeName: {
                $cond: {
                  if: { $ifNull: ["$employee", false] },
                  then: {
                    $concat: ["$employee.firstName", " ", "$employee.lastName"],
                  },
                  else: "Unknown",
                },
              },
            },
          },
          {
            $project: {
              id: { $toString: "$_id" },
              title: 1,
              employeeName: 1,
              employeeId: { $toString: "$employeeId" },
              hazardCount: 1,
              status: 1,
              createdAt: 1,
              location: "$location.address",
            },
          },
        ],
      },
    },
  ]);

  const reports: ICompanyReport[] = result?.reports || [];
  const total = result?.metadata?.[0]?.total || 0;

  return {
    reports,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

// ============ Report With Hazards ============

export async function getReportWithHazardsService(reportId: string) {
  await connectDB();

  const report = await Report.findById(reportId).lean();
  if (!report) return null;

  const hazards = await Hazard.find({
    reportId: new Types.ObjectId(reportId),
  }).lean();

  // Get employee name for the report
  const employee = await Employee.findById(report.employeeId).lean();
  const employeeName = employee
    ? `${employee.firstName} ${employee.lastName}`
    : "Unknown";

  return {
    report: {
      id: report._id.toString(),
      employeeId: report.employeeId.toString(),
      employeeName,
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
    },
    hazards: hazards.map((hazard) => ({
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
    })),
  };
}
