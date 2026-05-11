import Company from "@/models/company";
import {
  UpdateCompanyProfileInput,
  SubscriptionInfo,
  BillingInfo,
  CompanyProfile,
} from "@/definitions/company-profile";
import { connectDB } from "@/lib/db";

export async function getCompanyProfileService(
  companyId: string,
): Promise<CompanyProfile | null> {
  await connectDB();
  const company = await Company.findById(companyId).lean();

  if (!company) return null;

  // Return plain object with converted IDs and no null values
  return {
    id: company._id.toString(),
    name: company.name,
    registrationNumber: company.registrationNumber,
    contactEmail: company.contactEmail,
    contactPhone: company.contactPhone,
    billingAddress: company.billingAddress,
    vatNumber: company.vatNumber || undefined,
    status: company.status,
    subscriptionTier: company.subscriptionTier || "standard",
    subscriptionExpiry: company.subscriptionExpiry || undefined,
    branding: {
      logo: company.branding?.logo || undefined, // Convert null to undefined
      primaryColor: company.branding?.primaryColor || "#3b82f6",
      secondaryColor: company.branding?.secondaryColor || "#64748b",
    },
    createdAt: company.createdAt,
    updatedAt: company.updatedAt,
  };
}

export async function updateCompanyProfileService(
  companyId: string,
  data: UpdateCompanyProfileInput,
): Promise<CompanyProfile | null> {
  await connectDB();

  const updateData: any = { ...data };

  const company = await Company.findByIdAndUpdate(companyId, updateData, {
    new: true,
  }).lean();

  if (!company) return null;

  // Return plain serialized object (no MongoDB types, no null values)
  return {
    id: company._id.toString(),
    name: company.name,
    registrationNumber: company.registrationNumber,
    contactEmail: company.contactEmail,
    contactPhone: company.contactPhone,
    billingAddress: company.billingAddress,
    vatNumber: company.vatNumber || undefined,
    status: company.status,
    subscriptionTier: company.subscriptionTier || "standard",
    subscriptionExpiry: company.subscriptionExpiry || undefined,
    branding: {
      logo: company.branding?.logo || undefined,
      primaryColor: company.branding?.primaryColor || "#3b82f6",
      secondaryColor: company.branding?.secondaryColor || "#64748b",
    },
    createdAt: company.createdAt,
    updatedAt: company.updatedAt,
  };
}

export async function getSubscriptionInfoService(
  companyId: string,
): Promise<SubscriptionInfo> {
  await connectDB();
  const company = await Company.findById(companyId).lean();

  if (!company) {
    throw new Error("Company not found");
  }

  const features = {
    essential: [
      "Up to 50 employees",
      "Basic analytics",
      "Email support",
      "Monthly reports",
    ],
    standard: [
      "Up to 200 employees",
      "Advanced analytics",
      "Priority support",
      "Weekly reports",
      "AI hazard detection",
      "Custom reports",
    ],
    premium: [
      "Unlimited employees",
      "Real-time analytics",
      "24/7 phone support",
      "Daily reports",
      "Advanced AI features",
      "Custom branding",
      "API access",
      "Dedicated account manager",
    ],
  };

  const prices = {
    essential: 5000,
    standard: 15000,
    premium: 35000,
  };

  const tier = company.subscriptionTier || "standard";
  const expiryDate = company.subscriptionExpiry || null;
  const isActive =
    company.status === "active" &&
    (!expiryDate || new Date(expiryDate) > new Date());

  return {
    tier,
    expiryDate: expiryDate ? new Date(expiryDate) : null,
    isActive,
    features: features[tier],
    price: prices[tier],
  };
}

export async function getBillingInfoService(
  companyId: string,
): Promise<BillingInfo> {
  await connectDB();

  const subscription = await getSubscriptionInfoService(companyId);

  const invoices = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      amount: subscription.price,
      status: "paid" as const,
      dueDate: new Date("2024-01-15"),
      paidAt: new Date("2024-01-10"),
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      amount: subscription.price,
      status: "paid" as const,
      dueDate: new Date("2024-02-15"),
      paidAt: new Date("2024-02-12"),
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      amount: subscription.price,
      status: "pending" as const,
      dueDate: new Date("2024-03-15"),
    },
  ];

  return {
    subscription,
    invoices,
    paymentMethod: {
      last4: "4242",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2025,
    },
  };
}
