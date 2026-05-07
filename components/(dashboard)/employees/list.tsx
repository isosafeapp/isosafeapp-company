"use client";

import { motion } from "framer-motion";
import { EmployeeCard } from "./card";
import { IEmployeeWithUsage } from "@/definitions/employee";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: "active" | "inactive" | "invited";
  appUsage: {
    totalReports: number;
    totalHazards: number;
    lastActive: Date | null;
  };
  createdAt: Date;
}

export function EmployeeList({
  employees,
  companyId,
  onRefresh,
}: {
  employees: IEmployeeWithUsage[];
  companyId: string;
  onRefresh: () => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {employees.map((employee, idx) => (
        <motion.div
          key={employee.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
        >
          <EmployeeCard
            employee={employee}
            companyId={companyId}
            onRefresh={onRefresh}
          />
        </motion.div>
      ))}
    </div>
  );
}
