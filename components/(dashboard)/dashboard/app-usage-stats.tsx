"use client";

import Link from "next/link";
import {
  Smartphone,
  TrendingUp,
  User,
  Activity,
  Award,
  FileText,
} from "lucide-react";
import { IAppUsageStats } from "@/definitions/analytics";

export function AppUsageStats({ appUsage }: { appUsage: IAppUsageStats }) {
  const stats = [
    {
      label: "Reports per Employee",
      value: appUsage.averageReportsPerEmployee,
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Smartphone size={18} className="text-green-500" />
        <h2 className="text-lg font-semibold text-gray-800">App Usage</h2>
      </div>

      <div className="space-y-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 ${stat.bg} rounded-lg`}>
                <stat.icon size={16} className={stat.color} />
              </div>
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              {stat.value}
            </span>
          </div>
        ))}

        {appUsage.mostActiveEmployee && (
          <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <Award size={14} className="text-yellow-600" />
              <span className="text-xs font-medium text-yellow-700">
                Most Active Employee
              </span>
            </div>
            <Link
              href={`/company/employees/${appUsage.mostActiveEmployee.employeeId}`}
            >
              <div className="flex items-center justify-between cursor-pointer hover:opacity-80">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-gray-500" />
                  <span className="font-medium text-gray-800 text-sm">
                    {appUsage.mostActiveEmployee.employeeName}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText size={12} className="text-blue-500" />
                  <span className="text-sm font-semibold text-gray-800">
                    {appUsage.mostActiveEmployee.reportCount} reports
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
