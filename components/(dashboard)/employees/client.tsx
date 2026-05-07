"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { EmployeeList } from "./list";
import { EmployeeStats } from "./stats";
import { Pagination } from "@/components/ui/pagination";
import { useState } from "react";
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

export function EmployeesClient({
  employees,
  totalPages,
  currentPage,
  companyId,
}: {
  employees: IEmployeeWithUsage[];
  totalPages: number;
  currentPage: number;
  companyId: string;
}) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePageChange = (page: number) => {
    window.location.href = `/employees?page=${page}`;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-blue-600" />
        <h1 className="text-xl font-semibold text-gray-800">Employees</h1>
      </div>

      <EmployeeStats employees={employees} />

      {employees.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Users size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No Employees Yet
          </h3>
          <p className="text-gray-500">
            Employees will appear here once they are added by the master admin.
          </p>
        </div>
      ) : (
        <>
          <EmployeeList
            employees={employees}
            companyId={companyId}
            onRefresh={() => setRefreshKey((prev) => prev + 1)}
          />
          <Pagination
            currentPage={currentPage}
            pageCount={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
