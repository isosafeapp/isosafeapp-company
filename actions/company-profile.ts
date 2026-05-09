"use server";

import { revalidatePath } from "next/cache";
import { companyFormSchema } from "@/validations/company";
import { updateCompanyService } from "@/services/company";
import { getCompanyByIdService } from "@/services/company";

export async function updateCompanyProfileAction(
  prevState: any,
  formData: FormData,
) {
  try {
    const rawData = Object.fromEntries(formData);

    const validated = companyFormSchema.safeParse({
      name: rawData.name,
      registrationNumber: rawData.registrationNumber,
      contactEmail: rawData.contactEmail,
      contactPhone: rawData.contactPhone,
      billingAddress: rawData.billingAddress,
      vatNumber: rawData.vatNumber || "",
    });

    if (!validated.success) {
      console.log("Validation errors:", validated.error.flatten().fieldErrors);
      return {
        message: "Validation failed",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    // Get the company ID from the session or form data
    // For now, we need to get the current company ID
    // This assumes you have the company ID available in the session
    const { verifySession } = await import("@/lib/dal");
    const session = (await verifySession()) as any;

    if (!session || !session.companyId) {
      return {
        message: "Unauthorized",
        errors: { global: "Company not found" },
      };
    }

    const companyId = session.companyId as string;

    // Don't allow updating registration number
    const existingCompany = await getCompanyByIdService(companyId);
    if (
      existingCompany &&
      validated.data.registrationNumber !== existingCompany.registrationNumber
    ) {
      return {
        message: "Validation failed",
        errors: {
          registrationNumber: ["Registration number cannot be changed"],
        },
      };
    }

    await updateCompanyService(companyId, validated.data);

    revalidatePath("/company/profile");
    revalidatePath("/company");

    return { success: true, message: "Company updated successfully" };
  } catch (error: any) {
    console.error("❌ updateCompanyProfileAction error:", error);
    return {
      message: "Failed to update company",
      errors: { global: error.message },
    };
  }
}
