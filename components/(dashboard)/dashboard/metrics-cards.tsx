"use client";

import {
  FileText,
  AlertTriangle,
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { ReportMetrics } from "@/definitions/analytics";

export function MetricsCards({ metrics }: { metrics: ReportMetrics }) {
  const cards = [
    {
      label: "Total Reports",
      value: metrics.totalReports,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      label: "Total Hazards",
      value: metrics.totalHazards,
      icon: AlertTriangle,
      color: "bg-red-500",
    },
    {
      label: "Active Employees",
      value: metrics.activeEmployees,
      icon: Users,
      color: "bg-green-500",
    },
    {
      label: "Pending Reviews",
      value: metrics.pendingReviews,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      label: "Resolved Hazards",
      value: metrics.resolvedHazards,
      icon: CheckCircle,
      color: "bg-purple-500",
    },
    {
      label: "Avg Hazards/Report",
      value: metrics.averageHazardsPerReport,
      icon: TrendingUp,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-xs text-gray-500 mt-1">{card.label}</p>
            </div>
            <div className={`p-2 rounded-xl ${card.color} bg-opacity-10`}>
              <card.icon size={18} className={`${card.color} text-white`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
