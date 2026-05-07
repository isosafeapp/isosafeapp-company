import { CompanyReportsClient } from "@/components/(dashboard)/reports/client";
import { verifySession } from "@/lib/dal";
import { getCompanyByUserId } from "@/data/company";
import { getCompanyReports } from "@/data/report";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CompanyReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; employeeId?: string }>;
}) {
  const session = (await verifySession()) as any;
  const params = await searchParams;

  if (!session) {
    redirect("/login");
  }

  const company = await getCompanyByUserId(session.userId as string);

  if (!company) {
    redirect("/login");
  }

  const page = params.page ? parseInt(params.page) : 1;
  const employeeId = params.employeeId;

  const result = await getCompanyReports(company.id!, page, 10, employeeId);

  return (
    <CompanyReportsClient
      reports={result.success ? result.data.reports : []}
      totalPages={result.success ? result.data.totalPages : 0}
      currentPage={page}
      employeeId={employeeId}
      companyId={company.id!}
    />
  );
}
