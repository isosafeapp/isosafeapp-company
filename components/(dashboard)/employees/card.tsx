"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MoreVertical,
  Activity,
  FileText,
  AlertTriangle,
  UserCheck,
  UserX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  updateEmployeeStatusAction,
  resendInviteAction,
} from "@/actions/employee";
import { IEmployeeWithUsage } from "@/definitions/employee";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: "active" | "inactive" | "invited";
  appUsage: {
    totalReports: number;
    totalHazards: number;
    lastActive: Date | null;
  };
  createdAt: Date;
}

const statusColors = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-red-100 text-red-700",
  invited: "bg-yellow-100 text-yellow-700",
};

const statusIcons = {
  active: "🟢",
  inactive: "🔴",
  invited: "🟡",
};

export function EmployeeCard({
  employee,
  companyId,
  onRefresh,
}: {
  employee: IEmployeeWithUsage;
  companyId: string;
  onRefresh: () => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (status: IEmployeeWithUsage["status"]) => {
    setIsLoading(true);
    const result = await updateEmployeeStatusAction(
      employee.id!,
      companyId,
      status,
    );
    if (result.success) {
      toast.success(result.message);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  const handleResendInvite = async () => {
    setIsLoading(true);
    const result = await resendInviteAction(employee.id!, companyId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

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
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <User size={20} className="text-gray-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800">
                {employee.firstName} {employee.lastName}
              </h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${statusColors[employee.status]}`}
              >
                {statusIcons[employee.status]} {employee.status}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Mail size={12} className="text-gray-400" />
              <p className="text-xs text-gray-500">{employee.email}</p>
            </div>
            {employee.phone && (
              <div className="flex items-center gap-2 mt-1">
                <Phone size={12} className="text-gray-400" />
                <p className="text-xs text-gray-500">{employee.phone}</p>
              </div>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/employees/${employee.id}`)}
            >
              View Details
            </DropdownMenuItem>
            {employee.status === "invited" && (
              <DropdownMenuItem
                onClick={handleResendInvite}
                disabled={isLoading}
              >
                Resend Invite
              </DropdownMenuItem>
            )}
            {employee.status !== "active" && (
              <DropdownMenuItem
                onClick={() => handleStatusChange("active")}
                className="text-green-600"
              >
                <UserCheck size={14} className="mr-2" />
                Activate
              </DropdownMenuItem>
            )}
            {employee.status !== "inactive" && employee.status === "active" && (
              <DropdownMenuItem
                onClick={() => handleStatusChange("inactive")}
                className="text-red-600"
              >
                <UserX size={14} className="mr-2" />
                Deactivate
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* App Usage Stats */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <FileText size={14} className="text-blue-500" />
            <span className="text-gray-600">
              {employee.appUsage.totalReports} reports
            </span>
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle size={14} className="text-red-500" />
            <span className="text-gray-600">
              {employee.appUsage.totalHazards} hazards
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Activity size={14} className="text-green-500" />
            <span className="text-gray-600 text-xs">
              Last active: {formatLastActive(employee.appUsage.lastActive)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
