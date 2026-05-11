"use server";

import {
  getCompanyProfileService,
  updateCompanyProfileService,
  getSubscriptionInfoService,
  getBillingInfoService,
} from "@/services/company-profile";
import { UpdateCompanyProfileInput } from "@/definitions/company-profile";

// Helper to serialize MongoDB objects to plain JSON
function serializeObject<T>(obj: T): T {
  if (!obj) return obj;
  return JSON.parse(JSON.stringify(obj));
}

export async function getCompanyProfile(companyId: string) {
  try {
    const profile = await getCompanyProfileService(companyId);
    if (!profile) return { success: false, message: "Company not found" };
    return { success: true, data: serializeObject(profile) };
  } catch (error: any) {
    console.error("❌ getCompanyProfile error:", error);
    return { success: false, message: error.message };
  }
}

export async function updateCompanyProfile(
  companyId: string,
  data: UpdateCompanyProfileInput,
) {
  try {
    const profile = await updateCompanyProfileService(companyId, data);
    if (!profile) return { success: false, message: "Company not found" };
    return { success: true, data: serializeObject(profile) };
  } catch (error: any) {
    console.error("❌ updateCompanyProfile error:", error);
    return { success: false, message: error.message };
  }
}

export async function getSubscriptionInfo(companyId: string) {
  try {
    const subscription = await getSubscriptionInfoService(companyId);
    return { success: true, data: serializeObject(subscription) };
  } catch (error: any) {
    console.error("❌ getSubscriptionInfo error:", error);
    return { success: false, message: error.message };
  }
}

export async function getBillingInfo(companyId: string) {
  try {
    const billing = await getBillingInfoService(companyId);
    return { success: true, data: serializeObject(billing) };
  } catch (error: any) {
    console.error("❌ getBillingInfo error:", error);
    return { success: false, message: error.message };
  }
}
