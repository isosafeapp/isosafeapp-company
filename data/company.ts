"use server";

import {
  getCompanyByIdService,
  getCompanyByUserIdService,
} from "@/services/company";
import { ICompany } from "@/definitions/company";

const mapCompany = (company: any): ICompany => ({
  id: company._id?.toString?.() ?? company.id ?? "",
  userId: company.userId?.toString?.() ?? company.userId ?? "",
  name: company.name,
  registrationNumber: company.registrationNumber,
  contactEmail: company.contactEmail,
  contactPhone: company.contactPhone,
  billingAddress: company.billingAddress,
  vatNumber: company.vatNumber ?? "",
  status: company.status ?? "pending",
  subscriptionExpiry: company.subscriptionExpiry,
  branding: company.branding,
  createdAt: company.createdAt,
  updatedAt: company.updatedAt,
});

export async function getCompanyById(companyId: string) {
  try {
    const company = await getCompanyByIdService(companyId);
    if (!company) return null;
    return mapCompany(company);
  } catch (error: any) {
    console.error("❌ getCompanyById error:", error);
    return null;
  }
}

export async function getCompanyByUserId(userId: string) {
  try {
    const company = await getCompanyByUserIdService(userId);
    if (!company) return null;
    return mapCompany(company);
  } catch (error: any) {
    console.error("❌ getCompanyByUserId error:", error);
    return null;
  }
}
