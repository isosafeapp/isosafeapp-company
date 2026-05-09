import { Types } from "mongoose";

export interface ICompany {
  id?: string;
  name: string;
  registrationNumber: string;
  contactEmail: string;
  contactPhone: string;
  billingAddress: string;
  vatNumber?: string;
  userId?: string | Types.ObjectId; // company administrator (User)
  status: "active" | "suspended" | "pending";
  subscriptionExpiry?: Date;
  subscriptionTier?: "essential" | "standard" | "premium";
  branding?: {
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICompanyWithAdmin extends ICompany {
  adminEmail?: string;
  adminName?: string;
}

export type CompanyFormData = {
  name: string;
  registrationNumber: string;
  contactEmail: string;
  contactPhone: string;
  billingAddress: string;
  vatNumber?: string;
};

export type CompanyFormState = {
  errors: {
    name?: string[];
    registrationNumber?: string[];
    contactEmail?: string[];
    contactPhone?: string[];
    billingAddress?: string[];
    vatNumber?: string[];
    global?: string[];
  };
  message: string;
};
