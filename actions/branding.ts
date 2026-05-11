"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { updateCompanyService } from "@/services/company";
import { getCompanyByIdService } from "@/services/company";

const brandingSchema = z.object({
  primaryColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  secondaryColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  logo: z.string().optional(),
});

export type BrandingState = {
  success?: boolean;
  message?: string;
  errors?: {
    primaryColor?: string[];
    secondaryColor?: string[];
    global?: string[];
  };
};

export async function updateBrandingAction(
  companyId: string,
  prevState: BrandingState | undefined,
  formData: FormData,
): Promise<BrandingState> {
  try {
    const rawData = {
      primaryColor: formData.get("primaryColor"),
      secondaryColor: formData.get("secondaryColor"),
      logo: formData.get("logo"),
    };

    const validated = brandingSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    // Check if company exists
    const existingCompany = await getCompanyByIdService(companyId);
    if (!existingCompany) {
      return {
        success: false,
        message: "Company not found",
      };
    }

    // Update branding
    await updateCompanyService(companyId, {
      branding: {
        logo: validated.data.logo,
        primaryColor: validated.data.primaryColor,
        secondaryColor: validated.data.secondaryColor,
      },
    });

    revalidatePath("/company/profile");
    revalidatePath("/company");

    return {
      success: true,
      message: "Branding updated successfully",
    };
  } catch (error: any) {
    console.error("❌ updateBrandingAction error:", error);
    return {
      success: false,
      message: error.message || "Failed to update branding",
      errors: { global: [error.message] },
    };
  }
}
