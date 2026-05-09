export interface CompanyProfile {
  id: string;
  name: string;
  registrationNumber: string;
  contactEmail: string;
  contactPhone: string;
  billingAddress: string;
  vatNumber?: string;
  status: "active" | "suspended" | "pending";
  subscriptionTier: "essential" | "standard" | "premium";
  subscriptionExpiry?: Date;
  branding: {
    logo?: string;
    primaryColor?: string | undefined;
    secondaryColor?: string | undefined;
  };
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export interface UpdateCompanyProfileInput {
  name?: string;
  contactEmail?: string;
  contactPhone?: string;
  billingAddress?: string;
  vatNumber?: string;
  branding?: {
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
}

export interface SubscriptionInfo {
  tier: "essential" | "standard" | "premium";
  expiryDate: Date | null;
  isActive: boolean;
  features: string[];
  price: number;
}

export interface BillingInfo {
  subscription: SubscriptionInfo;
  invoices: Invoice[];
  paymentMethod?: {
    last4: string;
    brand: string;
    expiryMonth: number;
    expiryYear: number;
  };
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: Date;
  paidAt?: Date;
  pdfUrl?: string;
}
