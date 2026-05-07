"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Activity,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { EmployeeDetailHeader } from "./header";
import { EmployeeUsageStats } from "./usage-stats";
import { EmployeeReportsList } from "./reports-list";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: "active" | "inactive" | "invited";
  createdAt: Date;
  appUsage: {
    totalReports: number;
    totalHazards: number;
    lastActive: Date | null;
    reportsByMonth: { month: string; count: number }[];
    hazardCategories: { category: string; count: number }[];
  };
}

interface Report {
  id: string;
  title: string;
  hazardCount: number;
  status: string;
  createdAt: Date;
}

export function EmployeeDetailClient({
  employee,
  reports,
}: {
  employee: Employee;
  reports: Report[];
}) {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={18} /> Back to Employees
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <EmployeeDetailHeader employee={employee} />
        <EmployeeUsageStats appUsage={employee.appUsage} />
        <EmployeeReportsList reports={reports} />
      </motion.div>
    </div>
  );
}
