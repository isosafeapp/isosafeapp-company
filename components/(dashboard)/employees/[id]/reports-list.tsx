"use client";

import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";

const statusColors = {
  draft: "bg-gray-100 text-gray-600",
  submitted: "bg-blue-100 text-blue-700",
  reviewed: "bg-purple-100 text-purple-700",
  resolved: "bg-green-100 text-green-700",
};

export function EmployeeReportsList({ reports }: { reports: any[] }) {
  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No reports submitted yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl sm:border sm:border-gray-200 sm:p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Recent Reports
      </h3>
      <div className="divide-y divide-gray-200">
        {reports.map((report) => (
          <Link key={report.id} href={`/reports/${report.id}`}>
            <div className="p-2 sm:py-3 sm:px-2 border sm:border:none border-gray-200 sm:border-white hover:bg-gray-50 rounded-xl transition cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText size={14} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {report.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${statusColors[report.status as keyof typeof statusColors]}`}
                      >
                        {report.status}
                      </span>
                      <span className="text-xs text-gray-400">
                        {report.hazardCount} hazards
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
