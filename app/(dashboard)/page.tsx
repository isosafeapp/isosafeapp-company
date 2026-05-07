import { DashboardClient } from "@/components/(dashboard)/dashboard/client";
import { verifySession } from "@/lib/dal";
import { getEmployeeByUserId } from "@/data/employee";
import { getEmployeeStats, getRecentReports } from "@/data/report";
import { redirect } from "next/navigation";
import { SessionPayload } from "@/definitions/auth";
import { getCompanyByUserId } from "@/data/company";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = (await verifySession()) as any;

  if (!session) {
    redirect("/login");
  }

  const company = await getCompanyByUserId(session.userId as string);

  if (!company) {
    redirect("/login");
  }

  const userId = "69fc8b16c7c177e7e2e42f3c";
  const employee = await getEmployeeByUserId(userId);

  if (!employee) {
    redirect("/login");
  }

  const statsResult = await getEmployeeStats(employee.id!);
  const recentReportsResult = await getRecentReports(employee.id!, 5);

  return (
    <DashboardClient
      employee={employee}
      initialStats={statsResult.success ? statsResult.data : null}
      initialReports={
        recentReportsResult.success ? recentReportsResult.data : []
      }
    />
  );
}
