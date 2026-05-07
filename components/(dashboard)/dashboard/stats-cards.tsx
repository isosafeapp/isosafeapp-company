"use client";

import { FileText, AlertTriangle, Clock } from "lucide-react";

interface Props {
  stats: {
    totalReports: number;
    totalHazards: number;
    pendingReports: number;
  };
}

export function StatsCards({ stats }: Props) {
  const cards = [
    {
      label: "Total Reports",
      value: stats.totalReports,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Hazards Found",
      value: stats.totalHazards,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Pending Review",
      value: stats.pendingReports,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl p-4 border border-gray-200 text-center"
        >
          <div
            className={`w-8 h-8 ${card.bg} rounded-lg flex items-center justify-center mx-auto mb-2`}
          >
            <card.icon size={16} className={card.color} />
          </div>
          <p className="text-xl font-bold text-gray-800">{card.value}</p>
          <p className="text-xs text-gray-500">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
