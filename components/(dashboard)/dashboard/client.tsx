"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { CompanyAnalyticsData } from "@/definitions/analytics";
import { MetricsCards } from "./metrics-cards";
import { SeverityChart } from "./severity-chart";
import { HazardCategoriesChart } from "./hazard-categories-chart";
import { MonthlyTrendsChart } from "./monthly-trends-chart";
import { EmployeeLeaderboard } from "./employee-leaderboard";
import { AppUsageStats } from "./app-usage-stats";

export function AnalyticsClient({
  analytics,
  companyId,
}: {
  analytics: CompanyAnalyticsData;
  companyId: string;
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <h1 className="text-xl font-semibold text-gray-800">
          Analytics Dashboard
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <MetricsCards metrics={analytics.metrics} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SeverityChart severityStats={analytics.severityStats} />
          <HazardCategoriesChart categories={analytics.topHazardCategories} />
        </div>

        <MonthlyTrendsChart trends={analytics.monthlyTrends} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmployeeLeaderboard
            employees={analytics.employeeLeaderboard}
            companyId={companyId}
          />
          <AppUsageStats appUsage={analytics.appUsage} />
        </div>
      </motion.div>
    </div>
  );
}
