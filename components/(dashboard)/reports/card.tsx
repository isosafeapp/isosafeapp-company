"use client";

import Link from "next/link";
import { FileText, ChevronRight, User, MapPin } from "lucide-react";
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

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-600" },
  submitted: { label: "Submitted", color: "bg-blue-100 text-blue-700" },
  reviewed: { label: "Reviewed", color: "bg-purple-100 text-purple-700" },
  resolved: { label: "Resolved", color: "bg-green-100 text-green-700" },
};

export function CompanyReportCard({
  report,
  companyId,
}: {
  report: ICompanyReport;
  companyId: string;
}) {
  const status = statusConfig[report.status];

  return (
    <Link href={`/reports/${report.id}`}>
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <FileText size={18} className="text-gray-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-semibold text-gray-800">{report.title}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}
                >
                  {status.label}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-500 mb-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <User size={12} />
                  <span>{report.employeeName}</span>
                </div>
                <span>•</span>
                <span>
                  {report.hazardCount} hazard
                  {report.hazardCount !== 1 ? "s" : ""}
                </span>
                <span>•</span>
                <span>{new Date(report.createdAt!).toLocaleDateString()}</span>
              </div>

              {report.location && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin size={12} />
                  <span className="truncate">{report.location}</span>
                </div>
              )}
            </div>
          </div>
          <ChevronRight
            size={18}
            className="text-gray-400 ml-3 flex-shrink-0"
          />
        </div>
      </div>
    </Link>
  );
}
