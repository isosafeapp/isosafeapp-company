"use client";

import { FileText } from "lucide-react";

export function ReportsHeader() {
  return (
    <div className="flex items-center gap-2">
      <FileText className="w-6 h-6 text-red-600" />
      <h1 className="text-xl font-semibold text-gray-800">My Reports</h1>
    </div>
  );
}
