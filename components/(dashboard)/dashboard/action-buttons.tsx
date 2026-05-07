"use client";

import Link from "next/link";
import { Camera, Image, History, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function ActionButtons() {
  const actions = [
    {
      label: "Take Photo",
      description: "Use camera to capture hazard",
      icon: Camera,
      href: "/report/camera",
      color: "bg-blue-500",
    },
    {
      label: "Upload Photo",
      description: "Select from gallery",
      icon: Image,
      href: "/report/upload",
      color: "bg-green-500",
    },
    {
      label: "My Reports",
      description: "View all reports",
      icon: History,
      href: "/reports",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {actions.map((action, idx) => (
        <Link key={idx} href={action.href} className="h-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all text-left flex items-center justify-between h-full"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl ${action.color} bg-opacity-10 shrink-0`}
              >
                <action.icon
                  size={24}
                  className={`${action.color} text-white`}
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {action.label}
                </h2>
                <p className="text-gray-500 text-sm">{action.description}</p>
              </div>
            </div>

            <ChevronRight
              size={18}
              className="text-gray-400 ml-3 flex-shrink-0"
            />
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
