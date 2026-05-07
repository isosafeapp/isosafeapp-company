"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import {
  loginUserformSchema,
  registerCompanyFormSchema,
} from "@/validations/auth";
import { createUser, getUserByEmail } from "@/services/user";
import { updateCompanyService } from "@/services/company";
import { createSession } from "@/lib/session";
import { COMPANY, EMPLOYEE } from "@/constants/roles";
import { cookies } from "next/headers";
import { getCompanyByUserId } from "@/data/company";

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

export type LoginUserState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function loginUser(
  prevState: LoginUserState | undefined,
  formData: FormData,
) {
  const validatedFields = loginUserformSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please check your inputs.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    // Get user by email
    const user = (await getUserByEmail(email)) as any;

    if (!user) {
      return {
        errors: { email: ["User not found"] },
        message: "No account found with this email.",
      };
    }
    const userId = user._id.toString();
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        errors: { password: ["Incorrect password"] },
        message: "Invalid credentials.",
      };
    }

    if (user.role !== COMPANY) {
      return {
        errors: { password: ["Company Admin Only"] },
        message: "Company Admin Only.",
      };
    }

    const company = await getCompanyByUserId(userId);

    await createSession({
      userId,
      companyId: company?.id?.toString(),
      role: COMPANY,
    });
  } catch (error: any) {
    console.error("❌ loginUser error:", error);
    return {
      message: error.message || "Failed to login. Please try again.",
    };
  }
  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}
