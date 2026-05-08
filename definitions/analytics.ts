export interface ReportMetrics {
  totalReports: number;
  totalHazards: number;
  activeEmployees: number;
  pendingReviews: number;
  resolvedHazards: number;
  averageHazardsPerReport: number;
}

export interface SeverityStats {
  low: number;
  medium: number;
  high: number;
  critical: number;
}

export interface HazardCategoryStat {
  category: string;
  count: number;
  percentage: number;
}

export interface EmployeeLeaderboardEntry {
  employeeId: string;
  employeeName: string;
  totalReports: number;
  totalHazards: number;
  lastActive: Date | undefined;
}

export interface IAppUsageStats {
  totalAppOpens: number;
  averageReportsPerEmployee: number;
  mostActiveEmployee: {
    employeeId: string;
    employeeName: string;
    reportCount: number;
  } | null;
}

export interface MonthlyReportTrend {
  month: string;
  reports: number;
  hazards: number;
}

export interface CompanyAnalyticsData {
  metrics: ReportMetrics;
  severityStats: SeverityStats;
  topHazardCategories: HazardCategoryStat[];
  employeeLeaderboard: EmployeeLeaderboardEntry[];
  monthlyTrends: MonthlyReportTrend[];
  appUsage: IAppUsageStats;
}
