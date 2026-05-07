"use client";

import { Users, UserCheck, UserX, Mail } from "lucide-react";

interface Employee {
  status: "active" | "inactive" | "invited";
}

export function EmployeeStats({ employees }: { employees: Employee[] }) {
  const total = employees.length;
  const active = employees.filter((e) => e.status === "active").length;
  const invited = employees.filter((e) => e.status === "invited").length;
  const inactive = employees.filter((e) => e.status === "inactive").length;

  const stats = [
    {
      label: "Total Employees",
      value: total,
      icon: Users,
      color: "bg-blue-500",
    },
    { label: "Active", value: active, icon: UserCheck, color: "bg-green-500" },
    { label: "Invited", value: invited, icon: Mail, color: "bg-yellow-500" },
    { label: "Inactive", value: inactive, icon: UserX, color: "bg-gray-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
  );
}
