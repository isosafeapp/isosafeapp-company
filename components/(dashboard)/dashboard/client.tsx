"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Camera,
  Image,
  FileText,
  History,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IEmployee } from "@/definitions/employee";
import { WelcomeBanner } from "./welcome-banner";
import { StatsCards } from "./stats-cards";
import { RecentReports } from "./recent-reports";
import { ActionButtons } from "./action-buttons";

interface Props {
  employee: IEmployee;
  initialStats: {
    totalReports: number;
    totalHazards: number;
    pendingReports: number;
  } | null;
  initialReports: any[];
}

export function DashboardClient({
  employee,
  initialStats,
  initialReports,
}: Props) {
  const [stats] = useState(
    initialStats || {
      totalReports: 0,
      totalHazards: 0,
      pendingReports: 0,
    },
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <LayoutDashboard className="w-6 h-6 text-red-600" />
        <h1 className="text-xl font-semibold text-gray-800">Hazard Detect</h1>
      </div>

      {/* Welcome Banner */}
      <WelcomeBanner firstName={employee.firstName} />

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-md font-semibold text-gray-700">Quick Actions</h2>
        </div>
        <ActionButtons />
      </div>

      {/* Recent Reports */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-md font-semibold text-gray-700 flex items-center gap-2">
            <FileText size={18} className="text-red-600" />
            Recent Reports
          </h2>
          <Link
            href="/reports"
            className="text-sm text-red-600 hover:underline"
          >
            View all →
          </Link>
        </div>
        <RecentReports reports={initialReports} />
      </div>
    </motion.div>
  );
}
