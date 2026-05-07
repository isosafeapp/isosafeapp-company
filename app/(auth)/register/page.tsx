import CompanyRegister from "@/components/(auth)/register/register";
import { getCompanyById } from "@/data/company";
import { SearchParams } from "@/definitions";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = await searchParams;
  const companyId = query.companyId || "";

  if (!companyId) {
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
        role="alert"
      >
        <p className="text-center text-sm text-gray-600">
          Invalid registration link. Please contact your administrator.
        </p>
      </div>
    );
  }

  const company = await getCompanyById(companyId);
  const hasPassword = !!company?.userId;

  return <CompanyRegister company={company} hasPassword={hasPassword} />;
}
