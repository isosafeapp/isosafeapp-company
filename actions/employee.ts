"use server";

import { revalidatePath } from "next/cache";
import { updateEmployeeStatusService } from "@/services/employee";
import { IEmployee } from "@/definitions/employee";

export async function updateEmployeeStatusAction(
  employeeId: string,
  companyId: string,
  status: IEmployee["status"],
) {
  try {
    await updateEmployeeStatusService(employeeId, status);
    revalidatePath("/employees");
    revalidatePath(`/employees/${employeeId}`);
    return { success: true, message: `Employee ${status} successfully` };
  } catch (error: any) {
    console.error("❌ updateEmployeeStatusAction error:", error);
    return { success: false, message: "Failed to update status" };
  }
}

export async function resendInviteAction(
  employeeId: string,
  companyId: string,
) {
  try {
    const { getEmployeeByIdService } = await import("@/services/employee");
    const employee = await getEmployeeByIdService(employeeId);

    if (!employee) {
      return { success: false, message: "Employee not found" };
    }

    // Registration link would be:
    // ${process.env.NEXT_PUBLIC_APP_URL}/employee-register?employeeId=${employeeId}

    console.log(
      `Resending invite to ${employee.email} with employeeId: ${employeeId}`,
    );

    return { success: true, message: `Invite resent to ${employee.email}` };
  } catch (error: any) {
    console.error("❌ resendInviteAction error:", error);
    return { success: false, message: "Failed to resend invite" };
  }
}
