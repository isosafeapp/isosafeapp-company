"use client";

import { AlertTriangle } from "lucide-react";
import { SeverityStats } from "@/definitions/analytics";

const severityColors = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  critical: "bg-red-500",
};

export function SeverityChart({
  severityStats,
}: {
  severityStats: SeverityStats;
}) {
  const total = Object.values(severityStats).reduce((a, b) => a + b, 0);
  const severityData = [
    { label: "Low", value: severityStats.low, color: severityColors.low },
    {
      label: "Medium",
      value: severityStats.medium,
      color: severityColors.medium,
    },
    { label: "High", value: severityStats.high, color: severityColors.high },
    {
      label: "Critical",
      value: severityStats.critical,
      color: severityColors.critical,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={18} className="text-yellow-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          Hazards by Severity
        </h2>
      </div>

      <div className="space-y-4">
        {severityData.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium text-gray-800">{item.value}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-full`}
                style={{
                  width: `${total > 0 ? (item.value / total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Hazards</span>
          <span className="font-semibold text-gray-800">{total}</span>
        </div>
      </div>
    </div>
  );
}
