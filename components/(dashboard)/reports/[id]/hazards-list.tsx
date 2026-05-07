"use client";

import { IReportHazard } from "@/definitions/report";
import { AlertTriangle, Brain } from "lucide-react";

const severityColors = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

export function ReportDetailHazardsList({
  hazards,
}: {
  hazards: IReportHazard[];
}) {
  return (
    <div className="sm:bg-white sm:rounded-2xl sm:border sm:border-gray-200 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={18} className="text-yellow-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          Hazards Detected ({hazards.length})
        </h2>
      </div>

      <div className="space-y-3">
        {hazards.map((hazard) => (
          <div
            key={hazard.id}
            className="bg-white border border-gray-200 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${severityColors[hazard.severity]}`}
              >
                {hazard.severity.toUpperCase()}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {hazard.category}
              </span>
              <span className="text-xs text-gray-400">
                {Math.round(hazard.confidence * 100)}% confidence
              </span>
              {hazard.isAIDetected && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Brain size={10} /> AI Detected
                </span>
              )}
              {hazard.isManualOverride && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                  Manually Edited
                </span>
              )}
            </div>
            <p className="text-gray-700 text-sm">{hazard.description}</p>
            {hazard.preventionTip && (
              <div className="mt-2 p-2 bg-green-50 rounded-lg">
                <p className="text-xs text-green-700">
                  💡 {hazard.preventionTip}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
