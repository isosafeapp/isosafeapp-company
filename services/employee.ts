import Employee from "@/models/employee";
import Report from "@/models/report";
import Hazard from "@/models/hazard";
import {
  IEmployee,
  IEmployeeWithUsage,
  IEmployeesWithUsageResponse,
} from "@/definitions/employee";
import { connectDB } from "@/lib/db";
import { Types } from "mongoose";

// ✅ Get employee by ID
export async function getEmployeeByIdService(employeeId: string) {
  await connectDB();
  return await Employee.findById(employeeId).lean();
}

// ✅ Get employee by user ID
export async function getEmployeeByUserIdService(userId: string) {
  await connectDB();
  return await Employee.findOne({ userId: new Types.ObjectId(userId) }).lean();
}

// ✅ Get employees by company with pagination and usage stats
export async function getEmployeesWithUsageService(
  companyId: string,
  page: number = 1,
  limit: number = 10,
): Promise<IEmployeesWithUsageResponse> {
  await connectDB();

  const skip = (page - 1) * limit;

  // Get employees with pagination
  const employees = await Employee.find({
    companyId: new Types.ObjectId(companyId),
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Employee.countDocuments({
    companyId: new Types.ObjectId(companyId),
  });

  // Get usage stats for each employee
  const employeesWithUsage = await Promise.all(
    employees.map(async (employee) => {
      // Get all reports by this employee
      const reports = await Report.find({
        employeeId: employee._id,
        isFinalized: true,
      }).lean();

      const reportIds = reports.map((r) => r._id);

      // Get all hazards from these reports
      const hazards = await Hazard.find({
        reportId: { $in: reportIds },
      }).lean();

      // Get last active date (most recent report)
      const lastActive = reports.length > 0 ? reports[0].createdAt : null;

      return {
        id: employee._id.toString(),
        companyId: employee.companyId.toString(),
        userId: employee.userId?.toString(),
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        status: employee.status,
        lastLogin: employee.lastLogin,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt,
        appUsage: {
          totalReports: reports.length,
          totalHazards: hazards.length,
          lastActive: lastActive,
        },
      } as IEmployeeWithUsage;
    }),
  );

  return {
    employees: employeesWithUsage,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

// ✅ Update employee
export async function updateEmployeeService(
  employeeId: string,
  data: Partial<IEmployee>,
) {
  await connectDB();

  const updateData: any = { ...data };

  if (data.userId) {
    updateData.userId = new Types.ObjectId(data.userId);
  }

  const employee = await Employee.findByIdAndUpdate(employeeId, updateData, {
    new: true,
  });
  return employee;
}

// ✅ Delete employee
export async function deleteEmployeeService(employeeId: string) {
  await connectDB();
  return await Employee.findByIdAndDelete(employeeId);
}

// ✅ Update employee status
export async function updateEmployeeStatusService(
  employeeId: string,
  status: IEmployee["status"],
) {
  await connectDB();
  return await Employee.findByIdAndUpdate(
    employeeId,
    { status },
    { new: true },
  );
}

// ✅ Get employee with full usage details (for detail page)
export async function getEmployeeWithFullUsageService(
  employeeId: string,
  companyId: string,
) {
  await connectDB();

  const employee = await Employee.findOne({
    _id: new Types.ObjectId(employeeId),
    companyId: new Types.ObjectId(companyId),
  }).lean();

  if (!employee) return null;

  const reports = (await Report.find({
    employeeId: new Types.ObjectId(employeeId),
    isFinalized: true,
  })
    .sort({ createdAt: -1 })
    .lean()) as any[];

  const reportIds = reports.map((r) => r._id);
  const hazards = await Hazard.find({ reportId: { $in: reportIds } }).lean();

  // Group by month
  const reportsByMonth: { month: string; count: number }[] = [];
  const monthMap = new Map<string, number>();

  reports.forEach((report) => {
    const date = new Date(report.createdAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + 1);
  });

  monthMap.forEach((count, monthKey) => {
    const [year, month] = monthKey.split("-");
    const monthName = new Date(
      parseInt(year),
      parseInt(month) - 1,
    ).toLocaleString("default", { month: "short" });
    reportsByMonth.push({ month: `${monthName} ${year}`, count });
  });
  reportsByMonth.sort((a, b) => {
    const dateA = new Date(a.month);
    const dateB = new Date(b.month);
    return dateA.getTime() - dateB.getTime();
  });

  // Group by category
  const categoryMap = new Map<string, number>();
  hazards.forEach((hazard) => {
    categoryMap.set(
      hazard.category,
      (categoryMap.get(hazard.category) || 0) + 1,
    );
  });

  const hazardCategories = Array.from(categoryMap.entries()).map(
    ([category, count]) => ({ category, count }),
  );
  hazardCategories.sort((a, b) => b.count - a.count);

  const employeeReports = reports.map((report) => ({
    id: report._id.toString(),
    title: report.title,
    hazardCount: hazards.filter(
      (h) => h.reportId.toString() === report._id.toString(),
    ).length,
    status: report.status,
    createdAt: report.createdAt,
  }));

  return {
    employee: {
      id: employee._id.toString(),
      companyId: employee.companyId.toString(),
      userId: employee.userId?.toString(),
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      status: employee.status,
      createdAt: employee.createdAt,
      appUsage: {
        totalReports: reports.length,
        totalHazards: hazards.length,
        lastActive: reports[0]?.createdAt || null,
        reportsByMonth,
        hazardCategories,
      },
    },
    reports: employeeReports,
  };
}
