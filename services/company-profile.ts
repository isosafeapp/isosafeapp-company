import Company from "@/models/company";
import {
  UpdateCompanyProfileInput,
  SubscriptionInfo,
  BillingInfo,
  Invoice,
} from "@/definitions/company-profile";
import { connectDB } from "@/lib/db";
import { Types } from "mongoose";

export async function getCompanyProfileService(companyId: string) {
  await connectDB();
  const company = await Company.findById(companyId).lean();

  if (!company) return null;

  return {
    id: company._id.toString(),
    name: company.name,
    registrationNumber: company.registrationNumber,
    contactEmail: company.contactEmail,
    contactPhone: company.contactPhone,
    billingAddress: company.billingAddress,
    vatNumber: company.vatNumber,
    status: company.status,
    subscriptionTier: company.subscriptionTier || "standard",
    subscriptionExpiry: company.subscriptionExpiry,
    branding: company.branding || {
      primaryColor: "#3b82f6",
      secondaryColor: "#64748b",
    },
    createdAt: company.createdAt,
    updatedAt: company.updatedAt,
  };
}

export async function updateCompanyProfileService(
  companyId: string,
  data: UpdateCompanyProfileInput,
) {
  await connectDB();

  const updateData: any = { ...data };

  const company = await Company.findByIdAndUpdate(companyId, updateData, {
    new: true,
  }).lean();

  return company;
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
    essential: 5000, // R5,000 per month
    standard: 15000, // R15,000 per month
    premium: 35000, // R35,000 per month
  };

  const tier = company.subscriptionTier || "standard";
  const expiryDate = company.subscriptionExpiry || null;
  const isActive =
    company.status === "active" &&
    (!expiryDate || new Date(expiryDate) > new Date());

  return {
    tier,
    expiryDate,
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

  // Mock invoices - in production, fetch from billing system
  const invoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      amount: subscription.price,
      status: "paid",
      dueDate: new Date("2024-01-15"),
      paidAt: new Date("2024-01-10"),
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      amount: subscription.price,
      status: "paid",
      dueDate: new Date("2024-02-15"),
      paidAt: new Date("2024-02-12"),
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      amount: subscription.price,
      status: "pending",
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
