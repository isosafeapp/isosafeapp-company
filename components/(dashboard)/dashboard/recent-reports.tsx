"use client";

import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";

interface Report {
  id: string;
  title: string;
  hazardCount: number;
  status: string;
  createdAt: string;
}

export function RecentReports({ reports }: { reports: Report[] }) {
  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
        <p className="text-gray-500 text-sm">No reports yet.</p>
        <Link
          href="/report/camera"
          className="text-sm text-red-600 hover:underline mt-2 inline-block"
        >
          Create your first report →
        </Link>
      </div>
    );
  }

  const statusColors = {
    draft: "bg-gray-100 text-gray-600",
    submitted: "bg-blue-100 text-blue-700",
    reviewed: "bg-green-100 text-green-700",
  };

  return (
    <div className="space-y-2">
      {reports.map((report) => (
        <Link key={report.id} href={`/reports/${report.id}`}>
          <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText size={14} className="text-gray-500" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{report.title}</p>
                <p className="text-xs text-gray-500">
                  {report.hazardCount} hazards •{" "}
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${statusColors[report.status as keyof typeof statusColors]}`}
              >
                {report.status}
              </span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
