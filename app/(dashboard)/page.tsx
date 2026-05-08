import { AnalyticsClient } from "@/components/(dashboard)/dashboard/client";
import { verifySession } from "@/lib/dal";
import { getCompanyByUserId } from "@/data/company";
import { getCompanyAnalytics } from "@/data/analytics";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const session = (await verifySession()) as any;

  if (!session) {
    redirect("/login");
  }

  const company = await getCompanyByUserId(session.userId as string);

  if (!company) {
    redirect("/login");
  }

  const result = await getCompanyAnalytics(company.id!);

  if (!result.success) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {result.message || "Failed to load analytics"}
          </div>
        </div>
      </div>
    );
  }

  return <AnalyticsClient analytics={result.data!} companyId={company.id!} />;
}
