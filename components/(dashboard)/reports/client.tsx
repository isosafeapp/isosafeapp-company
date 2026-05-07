"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, ArrowLeft } from "lucide-react";
import { CompanyReportsList } from "./list";
import { CompanyReportsEmpty } from "./empty";
import { Pagination } from "./pagination";

interface Report {
  id: string;
  title: string;
  employeeName: string;
  employeeId: string;
  hazardCount: number;
  status: "draft" | "submitted" | "reviewed" | "resolved";
  createdAt: Date;
  location?: string;
}

export function CompanyReportsClient({
  reports,
  totalPages,
  currentPage,
  employeeId,
  companyId,
}: {
  reports: Report[];
  totalPages: number;
  currentPage: number;
  employeeId?: string;
  companyId: string;
}) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const url = employeeId
      ? `/reports?page=${page}&employeeId=${employeeId}`
      : `/reports?page=${page}`;
    router.push(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          {employeeId && (
            <button
              onClick={() => router.push(`/employees/${employeeId}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mr-2"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">
            {employeeId ? "Employee Reports" : "All Reports"}
          </h1>
        </div>

        {reports.length === 0 ? (
          <CompanyReportsEmpty />
        ) : (
          <>
            <CompanyReportsList reports={reports} companyId={companyId} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
