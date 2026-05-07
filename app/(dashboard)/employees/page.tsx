import { EmployeesClient } from "@/components/(dashboard)/employees/client";
import { verifySession } from "@/lib/dal";
import { getCompanyByUserId } from "@/data/company";
import { getEmployeesWithUsage } from "@/data/employee";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EmployeesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
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
  const result = await getEmployeesWithUsage(company.id!, page, 10);

  if (!result.success) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {result.message || "Failed to load employees"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <EmployeesClient
      employees={result.data?.employees || []}
      totalPages={result.data?.totalPages || 0}
      currentPage={page}
      companyId={company.id!}
    />
  );
}
