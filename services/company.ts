import Company from "@/models/company";
import { connectDB } from "@/lib/db";
import { ICompany } from "@/definitions/company";
import { Types } from "mongoose";

// ✅ Get company by ID
export async function getCompanyByIdService(companyId: string) {
  await connectDB();
  return await Company.findById(companyId).lean();
}

// ✅ Update company
export async function updateCompanyService(
  companyId: string,
  data: Partial<ICompany>,
) {
  await connectDB();

  const updateData: any = { ...data };

  if (data.userId) {
    updateData.userId = new Types.ObjectId(data.userId);
  }

  const company = await Company.findByIdAndUpdate(companyId, updateData, {
    new: true,
  });
  return company;
}

// ✅ Get company by user ID
export async function getCompanyByUserId(userId: string) {
  await connectDB();
  return await Company.findOne({ userId: new Types.ObjectId(userId) }).lean();
}
