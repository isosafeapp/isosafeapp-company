import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { Types } from "mongoose";
import { cache } from "react";

export const getUser = cache(async (userData: any) => {
  await connectDB();
  return await User.findOne(userData);
});

export const getUserById = cache(async (userId: string) => {
  await connectDB();
  return await User.findById(userId);
});

export const createUser = async (
  email: string,
  password: string,
  role: "admin" | "company" | "employee" = "employee",
  //   employeeId?: string,
  //   companyId?: string,
) => {
  await connectDB();
  const user = await User.create({
    email,
    password,
    role,
    // employeeId: employeeId ? new Types.ObjectId(employeeId) : undefined,
    // companyId: companyId ? new Types.ObjectId(companyId) : undefined,
  });
  return user;
};

export const updateUser = async (userId: string, data: any) => {
  await connectDB();
  return await User.findByIdAndUpdate(userId, data, { new: true });
};

export async function getUserByEmail(email: string) {
  await connectDB();
  return await User.findOne({ email }).lean();
}

export async function createUserService(
  email: string,
  password: string,
  role: "admin" | "company" | "employee" = "employee",
  employeeId?: string,
  companyId?: string,
) {
  await connectDB();

  const user = await User.create({
    email,
    password,
    role,
    employeeId: employeeId ? new Types.ObjectId(employeeId) : undefined,
    companyId: companyId ? new Types.ObjectId(companyId) : undefined,
  });

  return user;
}

export async function updateUserService(userId: string, data: any) {
  await connectDB();
  return await User.findByIdAndUpdate(userId, data, { new: true }).lean();
}
