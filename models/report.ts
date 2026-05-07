import { IReport } from "@/definitions/report";
import mongoose, { Schema, Model, Types } from "mongoose";
import Employee from "./employee";
import Company from "./company";

type IReportDoc = Omit<
  IReport,
  "id" | "employeeId" | "companyId" | "reviewedBy" | "createdAt" | "updatedAt"
> & {
  employeeId: Types.ObjectId;
  companyId: Types.ObjectId;
  reviewedBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

const ReportSchema = new Schema<IReportDoc>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: Employee.modelName,
      required: true,
      index: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: Company.modelName,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    images: {
      type: [String],
      default: [],
    },
    location: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false },
      address: { type: String, trim: true },
    },
    status: {
      type: String,
      enum: ["draft", "submitted", "reviewed", "resolved"],
      default: "draft",
      index: true,
    },
    isFinalized: {
      type: Boolean,
      default: false,
      index: true,
    },
    isReviewed: {
      type: Boolean,
      default: false,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    reviewedAt: {
      type: Date,
      required: false,
    },
    resolvedAt: {
      type: Date,
      required: false,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true },
);

// Compound indexes for efficient queries
ReportSchema.index({ employeeId: 1, createdAt: -1 });
ReportSchema.index({ companyId: 1, createdAt: -1 });
ReportSchema.index({ status: 1, createdAt: -1 });
ReportSchema.index({ isFinalized: 1, createdAt: -1 });

// Text search index
ReportSchema.index({ title: "text", description: "text" });

// Prevent model overwrite in dev mode
const Report: Model<IReportDoc> =
  (mongoose.models.Report as Model<IReportDoc>) ||
  mongoose.model<IReportDoc>("Report", ReportSchema);

export default Report;
