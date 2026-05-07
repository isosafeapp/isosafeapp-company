"use client";

import Link from "next/link";
import { Calendar, CheckCircle, User } from "lucide-react";

const statusColors = {
  draft: "bg-gray-100 text-gray-600",
  submitted: "bg-blue-100 text-blue-700",
  reviewed: "bg-purple-100 text-purple-700",
  resolved: "bg-green-100 text-green-700",
};

export function ReportDetailHeader({ report }: { report: any }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{report.title}</h1>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span
              className={`text-xs px-2 py-1 rounded-full ${statusColors[report.status as keyof typeof statusColors]}`}
            >
              {report.status}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar size={12} />
              {new Date(report.createdAt).toLocaleDateString()}
            </span>
            <Link href={`/employees/${report.employeeId}`}>
              <span className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                <User size={12} />
                View Employee
              </span>
            </Link>
          </div>
        </div>
        {report.isReviewed && (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle size={16} />
            <span className="text-xs">Reviewed</span>
          </div>
        )}
      </div>
      {report.description && (
        <p className="text-gray-600 mt-4 text-sm border-t border-gray-100 pt-4">
          {report.description}
        </p>
      )}
    </div>
  );
}
