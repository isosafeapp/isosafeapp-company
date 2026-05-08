"use client";

import { motion } from "framer-motion";
import { CompanyReportCard } from "./card";
import { ICompanyReport } from "@/definitions/report";

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

export function CompanyReportsList({
  reports,
  companyId,
}: {
  reports: ICompanyReport[];
  companyId: string;
}) {
  return (
    <div className="space-y-3">
      {reports.map((report, idx) => (
        <motion.div
          key={report.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
        >
          <CompanyReportCard report={report} companyId={companyId} />
        </motion.div>
      ))}
    </div>
  );
}
