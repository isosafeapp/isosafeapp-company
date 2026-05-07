import { CompanyReportDetailClient } from "@/components/(dashboard)/reports/[id]/client";
import { verifySession } from "@/lib/dal";
import { getCompanyByUserId } from "@/data/company";
import { getReportWithHazards } from "@/data/report";
import { redirect, notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CompanyReportDetailPage({
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

  const result = await getReportWithHazards(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <CompanyReportDetailClient
      report={result.data.report}
      hazards={result.data.hazards}
      companyId={company.id!}
    />
  );
}
