"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { registerCompanyFormSchema } from "@/validations/auth";
import { createUser } from "@/services/user";
import { updateCompanyService } from "@/services/company";
import { createSession } from "@/lib/session";
import { COMPANY } from "@/constants/roles";

export type RegisterCompanyState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export async function registerCompany(
  companyId: string,
  prevState: RegisterCompanyState | undefined,
  formData: FormData,
): Promise<RegisterCompanyState> {
  const data = Object.fromEntries(formData);
  console.log("Received form data:", data);
  const validatedFields = registerCompanyFormSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please check your inputs.",
    };
  }

  const { email, password } = validatedFields.data;

  // Check if company exists
  const { getCompanyByIdService } = await import("@/services/company");
  const company = await getCompanyByIdService(companyId);

  if (!company) {
    return {
      message: "Company record not found.",
    };
  }

  // Check if email matches the company record
  if (company.contactEmail !== email) {
    return {
      errors: { email: ["Email does not match company record"] },
      message: "Please use the email address on file.",
    };
  }

  // Check if company already has a user account
  if (company.userId) {
    return {
      message: "This company already has an admin account. Please log in.",
    };
  }

  // Check if email is already used by another user
  const { getUserByEmail } = await import("@/services/user");
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {
      errors: { email: ["Email already registered"] },
      message: "This email is already in use.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create user account with company role
    const user = await createUser(email, hashedPassword, COMPANY);

    // Link user to company record
    await updateCompanyService(companyId, {
      userId: user.id,
    });

    // Create session
    await createSession({
      userId: user.id,
      companyId: companyId,
      role: COMPANY,
    });
  } catch (error) {
    console.error("❌ registerCompany error:", error);
    return {
      message: "Failed to create account. Please try again.",
    };
  }

  redirect("/");
}
