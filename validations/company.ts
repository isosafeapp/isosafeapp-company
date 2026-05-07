import { z } from "zod";

export const companyFormSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(1, "Phone number is required"),
  billingAddress: z.string().min(1, "Billing address is required"),
  vatNumber: z.string().optional(),
});

export type CompanyFormData = z.infer<typeof companyFormSchema>;
