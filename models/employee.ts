import { IEmployee } from "@/definitions/employee";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface EmployeeDocument
  extends Document, Omit<IEmployee, "id" | "companyId"> {
  companyId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema = new Schema<EmployeeDocument>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, trim: true },
    status: {
      type: String,
      enum: ["active", "inactive", "invited"],
      default: "invited",
    },
    lastLogin: { type: Date },
  },
  { timestamps: true },
);

EmployeeSchema.index({ email: 1, companyId: 1 }, { unique: true });
EmployeeSchema.index({ firstName: "text", lastName: "text", email: "text" });

const Employee =
  (mongoose.connection.models.Employee as Model<EmployeeDocument>) ||
  mongoose.model<EmployeeDocument>("Employee", EmployeeSchema);

export default Employee;
