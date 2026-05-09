import mongoose, { Schema, Document, Model } from "mongoose";
import { ICompany } from "@/definitions/company";
import User from "./user";

interface CompanyDocument extends Document, Omit<ICompany, "id" | "userId"> {
  userId: mongoose.Types.ObjectId;
}

const CompanySchema = new Schema<CompanyDocument>(
  {
    name: { type: String, required: true, trim: true },
    registrationNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    contactEmail: { type: String, required: true, trim: true, lowercase: true },
    contactPhone: { type: String, required: true, trim: true },
    billingAddress: { type: String, required: true, trim: true },
    vatNumber: { type: String, trim: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: User.modelName,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "suspended", "pending"],
      default: "pending",
    },
    subscriptionExpiry: { type: Date },
    subscriptionTier: {
      type: String,
      enum: ["essential", "standard", "premium"],
      default: "standard",
    },
    branding: {
      logo: { type: String },
      primaryColor: { type: String, default: "#3b82f6" },
      secondaryColor: { type: String, default: "#64748b" },
    },
  },
  { timestamps: true },
);

// ✅ Index to enable fast searching by name or registrationNumber
CompanySchema.index({
  name: "text",
  registrationNumber: "text",
  contactEmail: "text",
});

const Company: Model<CompanyDocument> =
  mongoose.models.Company ||
  mongoose.model<CompanyDocument>("Company", CompanySchema);

export default Company;
