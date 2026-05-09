import { CompanyProfileClient } from "@/components/(dashboard)/profile/client";
import { verifySession } from "@/lib/dal";
import { getCompanyByUserId } from "@/data/company";
import { getCompanyProfile, getBillingInfo } from "@/data/company-profile";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CompanyProfilePage() {
  const session = (await verifySession()) as any;

  if (!session) {
    redirect("/login");
  }

  const company = await getCompanyByUserId(session.userId as string);

  if (!company) {
    redirect("/login");
  }

  const profileResult = await getCompanyProfile(company.id!);
  const billingResult = await getBillingInfo(company.id!);

  if (!profileResult.success) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {profileResult.message || "Failed to load profile"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <CompanyProfileClient
      profile={profileResult.data!}
      billing={billingResult.success ? billingResult.data : null}
      companyId={company.id!}
    />
  );
}
