"use client";

import { FileText, AlertTriangle, Activity, Calendar } from "lucide-react";

export function EmployeeUsageStats({ appUsage }: { appUsage: any }) {
  const stats = [
    {
      label: "Total Reports",
      value: appUsage.totalReports,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      label: "Hazards Found",
      value: appUsage.totalHazards,
      icon: AlertTriangle,
      color: "bg-red-500",
    },
    {
      label: "Last Active",
      value: appUsage.lastActive
        ? new Date(appUsage.lastActive).toLocaleDateString()
        : "Never",
      icon: Activity,
      color: "bg-green-500",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
              <div className={`p-2 rounded-xl ${stat.color} bg-opacity-10`}>
                <stat.icon size={20} className={`${stat.color} text-white`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hazard Categories */}
      {appUsage.hazardCategories && appUsage.hazardCategories.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Hazard Categories
          </h3>
          <div className="space-y-3">
            {appUsage.hazardCategories
              .slice(0, 5)
              .map((cat: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-32 truncate">
                    {cat.category}
                  </span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{
                        width: `${(cat.count / appUsage.totalHazards) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-12 text-right">
                    {cat.count}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
