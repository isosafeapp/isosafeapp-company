"use client";

import Link from "next/link";
import {
  Trophy,
  Medal,
  User,
  FileText,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { EmployeeLeaderboardEntry } from "@/definitions/analytics";

const rankIcons = {
  0: <Trophy size={16} className="text-yellow-500" />,
  1: <Medal size={16} className="text-gray-400" />,
  2: <Medal size={16} className="text-amber-600" />,
};

export function EmployeeLeaderboard({
  employees,
  companyId,
}: {
  employees: EmployeeLeaderboardEntry[];
  companyId: string;
}) {
  const formatLastActive = (date: Date | null) => {
    if (!date) return "Never";
    const days = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24),
    );
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={18} className="text-yellow-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          Employee Leaderboard
        </h2>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {employees.map((employee, idx) => (
          <Link
            key={employee.employeeId}
            href={`/employees/${employee.employeeId}`}
          >
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 text-center">
                  {rankIcons[idx as keyof typeof rankIcons] || (
                    <span className="text-sm text-gray-400">{idx + 1}</span>
                  )}
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={14} className="text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {employee.employeeName}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FileText size={10} /> {employee.totalReports}
                    </span>
                    <span className="flex items-center gap-1">
                      <AlertTriangle size={10} /> {employee.totalHazards}
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity size={10} />{" "}
                      {formatLastActive(employee.lastActive || null)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {employees.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No employee data available
        </div>
      )}
    </div>
  );
}
