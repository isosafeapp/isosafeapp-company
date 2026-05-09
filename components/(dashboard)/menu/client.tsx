"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, LogOut } from "lucide-react";
import { logout } from "@/actions/auth";
import { ICONS } from "@/constants";
import Link from "next/link";

interface NavItem {
  name: string;
  href: string;
  iconName: keyof typeof ICONS;
}

export function MenuClient({ otherNavItems }: { otherNavItems: NavItem[] }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Menu</h1>
        <div className="w-6" />
      </div>

      {/* Menu List */}
      <div className="space-y-2 divide-y divide-gray-100">
        {otherNavItems.map((item, index) => {
          const Icon = ICONS[item.iconName];
          return (
            <Link
              key={index}
              href={item.href}
              className="flex items-center justify-between px-3 py-4 bg-white hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-700" />
                <span className="text-gray-800 font-medium">{item.name}</span>
              </div>
              <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </Link>
          );
        })}

        {/* Logout Option */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-3 py-4 bg-white hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-red-600" />
            <span className="text-red-600 font-medium">Logout</span>
          </div>
          <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
        </button>
      </div>

      {/* App Version */}
      <div className="pt-6 text-center">
        <p className="text-xs text-gray-400">Version 1.0.0</p>
        <p className="text-xs text-gray-400 mt-1">
          Hazard Detect Safety System
        </p>
      </div>
    </div>
  );
}
