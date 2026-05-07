import { IReportHazard } from "@/definitions/report";
import mongoose, { Schema, Model, Types } from "mongoose";
import Report from "./report";

type IHazardDoc = Omit<
  IReportHazard,
  "id" | "reportId" | "resolvedBy" | "createdAt" | "updatedAt"
> & {
  reportId: Types.ObjectId;
  resolvedBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

const HazardSchema = new Schema<IHazardDoc>(
  {
    reportId: {
      type: Schema.Types.ObjectId,
      ref: Report.modelName,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      required: true,
      default: "medium",
      index: true,
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
      default: 0,
    },
    isAIDetected: {
      type: Boolean,
      default: false,
    },
    isManualOverride: {
      type: Boolean,
      default: false,
    },
    originalDescription: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "false_positive"],
      default: "open",
      index: true,
    },
    resolvedAt: {
      type: Date,
      required: false,
    },
    resolvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    resolutionNotes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  { timestamps: true },
);

// Compound indexes for efficient queries
HazardSchema.index({ reportId: 1, severity: 1 });
HazardSchema.index({ category: 1, severity: 1 });
HazardSchema.index({ status: 1, createdAt: -1 });
HazardSchema.index({ isAIDetected: 1, confidence: -1 });

// Text search index for hazard descriptions
HazardSchema.index({ description: "text", category: "text" });

// Virtual for report reference
HazardSchema.virtual("report", {
  ref: Report.modelName,
  localField: "reportId",
  foreignField: "_id",
  justOne: true,
});

// Ensure virtuals are included in JSON output
HazardSchema.set("toJSON", { virtuals: true });
HazardSchema.set("toObject", { virtuals: true });

// Prevent model overwrite in dev mode
const Hazard: Model<IHazardDoc> =
  (mongoose.models.Hazard as Model<IHazardDoc>) ||
  mongoose.model<IHazardDoc>("Hazard", HazardSchema);

export default Hazard;
