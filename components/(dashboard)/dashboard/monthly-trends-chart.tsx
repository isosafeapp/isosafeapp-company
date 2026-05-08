"use client";

import { TrendingUp } from "lucide-react";
import { MonthlyReportTrend } from "@/definitions/analytics";

export function MonthlyTrendsChart({
  trends,
}: {
  trends: MonthlyReportTrend[];
}) {
  const maxReports = Math.max(...trends.map((t) => t.reports), 1);
  const maxHazards = Math.max(...trends.map((t) => t.hazards), 1);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hidden sm:block">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={18} className="text-green-500" />
        <h2 className="text-lg font-semibold text-gray-800">Monthly Trends</h2>
      </div>

      <div className="flex items-end gap-4 h-64">
        {trends.map((trend, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
            <div className="relative w-full flex flex-col items-center gap-1">
              <div className="w-full flex justify-center gap-1">
                <div
                  className="w-8 bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
                  style={{ height: `${(trend.reports / maxReports) * 150}px` }}
                />
                <div
                  className="w-8 bg-red-500 rounded-t-lg transition-all hover:bg-red-600"
                  style={{ height: `${(trend.hazards / maxHazards) * 150}px` }}
                />
              </div>
              <span className="text-xs text-gray-500 text-center mt-2">
                {trend.month}
              </span>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="text-blue-600">{trend.reports}</span>
              <span className="text-red-600">{trend.hazards}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded" />
          <span className="text-xs text-gray-600">Reports</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span className="text-xs text-gray-600">Hazards</span>
        </div>
      </div>
    </div>
  );
}
