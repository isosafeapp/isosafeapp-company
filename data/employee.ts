"use server";

import {
  getEmployeeByIdService,
  getEmployeeByUserIdService,
  getEmployeesWithUsageService,
  getEmployeeWithFullUsageService,
  updateEmployeeService,
  deleteEmployeeService,
  updateEmployeeStatusService,
} from "@/services/employee";
import {
  IEmployee,
  IEmployeeWithUsage,
  IEmployeesWithUsageResponse,
} from "@/definitions/employee";

// Mapper function
const mapEmployee = (employee: any): IEmployee => ({
  id: employee._id?.toString?.() ?? employee.id ?? "",
  companyId: employee.companyId?.toString?.() ?? employee.companyId ?? "",
  userId: employee.userId?.toString?.() ?? employee.userId ?? "",
  firstName: employee.firstName,
  lastName: employee.lastName,
  email: employee.email,
  phone: employee.phone,
  status: employee.status ?? "invited",
  lastLogin: employee.lastLogin,
  createdAt: employee.createdAt,
  updatedAt: employee.updatedAt,
});

// Get employee by ID
export async function getEmployeeById(employeeId: string) {
  try {
    const employee = await getEmployeeByIdService(employeeId);
    if (!employee) return null;
    return mapEmployee(employee);
  } catch (error: any) {
    console.error("❌ getEmployeeById error:", error);
    return null;
  }
}

// Get employee by user ID
export async function getEmployeeByUserId(userId: string) {
  try {
    const employee = await getEmployeeByUserIdService(userId);
    if (!employee) return null;
    return mapEmployee(employee);
  } catch (error: any) {
    console.error("❌ getEmployeeByUserId error:", error);
    return null;
  }
}

// Get employees with usage stats (for company admin)
export async function getEmployeesWithUsage(
  companyId: string,
  page: number = 1,
  limit: number = 10,
): Promise<{
  success: boolean;
  data?: IEmployeesWithUsageResponse;
  message?: string;
}> {
  try {
    const result = await getEmployeesWithUsageService(companyId, page, limit);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("❌ getEmployeesWithUsage error:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch employees",
    };
  }
}

// Get employee with full usage details (for detail page)
export async function getEmployeeWithFullUsage(
  employeeId: string,
  companyId: string,
) {
  try {
    const result = await getEmployeeWithFullUsageService(employeeId, companyId);
    if (!result) return { success: false, message: "Employee not found" };
    return { success: true, data: result };
  } catch (error: any) {
    console.error("❌ getEmployeeWithFullUsage error:", error);
    return { success: false, message: error.message };
  }
}

// Get all employees by company (without usage stats)
export async function getEmployees(companyId: string) {
  try {
    const result = await getEmployeesWithUsageService(companyId, 1, 1000);
    return { success: true, data: result?.employees || [] };
  } catch (error: any) {
    console.error("❌ getEmployees error:", error);
    return { success: false, data: [] };
  }
}

// Update employee
export async function updateEmployee(
  employeeId: string,
  data: Partial<IEmployee>,
) {
  try {
    const employee = await updateEmployeeService(employeeId, data);
    return { success: true, data: mapEmployee(employee) };
  } catch (error: any) {
    console.error("❌ updateEmployee error:", error);
    return { success: false, message: error.message };
  }
}

// Delete employee
export async function deleteEmployee(employeeId: string) {
  try {
    await deleteEmployeeService(employeeId);
    return { success: true };
  } catch (error: any) {
    console.error("❌ deleteEmployee error:", error);
    return { success: false, message: error.message };
  }
}

// Update employee status
export async function updateEmployeeStatus(
  employeeId: string,
  status: IEmployee["status"],
) {
  try {
    const employee = await updateEmployeeStatusService(employeeId, status);
    return { success: true, data: mapEmployee(employee) };
  } catch (error: any) {
    console.error("❌ updateEmployeeStatus error:", error);
    return { success: false, message: error.message };
  }
}
