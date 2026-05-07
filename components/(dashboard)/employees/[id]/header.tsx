"use client";

import { User, Mail, Phone, Calendar } from "lucide-react";

const statusColors = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-red-100 text-red-700",
  invited: "bg-yellow-100 text-yellow-700",
};

export function EmployeeDetailHeader({ employee }: { employee: any }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
          <User size={32} className="text-gray-500" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {employee.firstName} {employee.lastName}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${statusColors[employee.status as keyof typeof statusColors]}`}
                >
                  {employee.status}
                </span>
                <span className="text-xs text-gray-400">
                  Employee since{" "}
                  {new Date(employee.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm">
              <Mail size={14} className="text-gray-400" />
              <span className="text-gray-600">{employee.email}</span>
            </div>
            {employee.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone size={14} className="text-gray-400" />
                <span className="text-gray-600">{employee.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
