"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { Menu } from "lucide-react";
import { PagePermission } from "@/constants";
import { ICONS } from "@/constants";

export default function DashboardLayoutClient({
  children,
  allowedPages,
}: {
  children: React.ReactNode;
  allowedPages: PagePermission[];
}) {
  const pathname = usePathname();
  const [sidebarHovered, setSidebarHovered] = useState(false);

  const mainNav = allowedPages.filter((p) => p.section === "main");

  return (
    <div className="flex min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={clsx(
          "hidden md:flex flex-col fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-sm z-40 transition-all duration-300",
          sidebarHovered ? "w-56" : "w-16",
        )}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <div
            className={clsx(
              "transition-all duration-300 font-bold text-xl flex items-center justify-center",
              sidebarHovered ? "w-32" : "w-8",
            )}
          >
            <span className="text-red-600 text-2xl">⚠️</span>
            {sidebarHovered && (
              <span className="ml-2 text-gray-800 text-sm">HazardDetect</span>
            )}
          </div>
        </div>

        <nav className="flex-1 mt-4 space-y-1">
          {mainNav.map((item) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS];
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-red-50 text-red-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <Icon size={20} className="shrink-0" />
                <span
                  className={clsx(
                    "transition-opacity duration-200 text-sm whitespace-nowrap",
                    sidebarHovered ? "opacity-100" : "opacity-0",
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
          <Link
            href="/menu"
            className={clsx(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === "/menu"
                ? "bg-red-50 text-red-600 font-medium"
                : "text-gray-700 hover:bg-gray-100",
            )}
          >
            <Menu size={20} className="shrink-0" />
            <span
              className={clsx(
                "transition-opacity duration-200 text-sm whitespace-nowrap",
                sidebarHovered ? "opacity-100" : "opacity-0",
              )}
            >
              Menu
            </span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-16 pb-20 md:pb-4 min-h-screen">
        <div className="p-4">{children}</div>
      </main>

      {/* Mobile Bottom Navigation - Only Main Nav Items + Menu Button */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-50 shadow-lg">
        {mainNav.slice(0, 4).map((item) => {
          const Icon = ICONS[item.icon as keyof typeof ICONS];
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex flex-col items-center text-xs transition-colors py-1",
                isActive
                  ? "text-red-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              <Icon size={22} strokeWidth={1.8} />
              <span className="mt-1">{item.name}</span>
            </Link>
          );
        })}

        {/* Menu Button - Navigates to /menu page */}
        <Link
          href="/menu"
          className={clsx(
            "flex flex-col items-center text-xs transition-colors py-1",
            pathname === "/menu"
              ? "text-red-600 font-semibold"
              : "text-gray-500 hover:text-gray-700",
          )}
        >
          <Menu size={22} />
          <span className="mt-1">Menu</span>
        </Link>
      </nav>
    </div>
  );
}
