"use server";

import { getCompanyAnalyticsService } from "@/services/analytics";
import { CompanyAnalyticsData } from "@/definitions/analytics";

export async function getCompanyAnalytics(companyId: string): Promise<{
  success: boolean;
  data?: CompanyAnalyticsData;
  message?: string;
}> {
  try {
    const result = await getCompanyAnalyticsService(companyId);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("❌ getCompanyAnalytics error:", error);
    return { success: false, message: error.message };
  }
}
