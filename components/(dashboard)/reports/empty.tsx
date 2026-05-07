"use client";

import { FileText } from "lucide-react";

export function CompanyReportsEmpty() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <FileText size={28} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        No Reports Yet
      </h3>
      <p className="text-gray-500">
        No safety reports have been submitted yet.
      </p>
    </div>
  );
}
