"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ReportDetailHeader } from "./header";
import { ReportDetailLocation } from "./location";
import { ReportDetailHazardsList } from "./hazards-list";
import { ReportDetailNotes } from "./notes";
import { IReport, IReportHazard } from "@/definitions/report";

export function CompanyReportDetailClient({
  report,
  hazards,
  companyId,
}: {
  report: IReport;
  hazards: IReportHazard[];
  companyId: string;
}) {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={18} /> Back to Reports
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <ReportDetailHeader report={report} />
        {report.location && (
          <ReportDetailLocation location={report.location.address} />
        )}
        <ReportDetailHazardsList hazards={hazards} />
        {report.notes && <ReportDetailNotes notes={report.notes} />}
      </motion.div>
    </div>
  );
}
