import { EmployeeDetailClient } from "@/components/(dashboard)/employees/[id]/client";
import { verifySession } from "@/lib/dal";
import { getCompanyByUserId } from "@/data/company";
import { getEmployeeWithFullUsage } from "@/data/employee";
import { redirect, notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = (await verifySession()) as any;
  const { id } = await params;

  if (!session) {
    redirect("/login");
  }

  const company = await getCompanyByUserId(session.userId as string);

  if (!company) {
    redirect("/login");
  }

  const result = await getEmployeeWithFullUsage(id, company.id!);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <EmployeeDetailClient
      employee={result.data.employee}
      reports={result.data.reports}
    />
  );
}
