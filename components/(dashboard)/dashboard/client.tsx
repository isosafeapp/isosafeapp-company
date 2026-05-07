// components/(dashboard)/dashboard/client.tsx
"use client";

import { useState } from "react";
import { LayoutDashboard, CalendarCheck, Sprout } from "lucide-react";
import { MOCK_PLANTS, MOCK_USER_PLANTS } from "@/constants";
import Link from "next/link";
import { motion } from "framer-motion";

export function DashboardClient() {
  const [location] = useState("Johannesburg");
  const [month] = useState("April");

  // Get monthly suggestions (plants that can be planted this month)
  const monthlySuggestions = MOCK_PLANTS.filter((plant) =>
    plant.months.includes("Apr"),
  ).slice(0, 3);

  // Get today's tasks from user plants
  const todayTasks = MOCK_USER_PLANTS.flatMap((plant) =>
    plant.tasks
      .filter((t) => t.status === "pending")
      .map((t) => ({ ...t, plantName: plant.plantName, plantId: plant.id })),
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
        <LayoutDashboard className="w-6 h-6 text-green-600" />
        <h1 className="text-xl font-semibold text-gray-800">My Garden</h1>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Hello, Gardener! 🌱
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {location}, {month}. Ready to grow something today?
        </p>
      </div>

      {/* What can I plant this month? */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-md font-semibold text-gray-700 flex items-center gap-2">
            <Sprout size={18} className="text-green-600" />
            What can I plant this month?
          </h2>
          <Link
            href="/discover"
            className="text-sm text-green-600 hover:underline"
          >
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {monthlySuggestions.map((plant) => (
            <Link key={plant.id} href={`/discover/${plant.id}`}>
              <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-gray-800">{plant.name}</h3>
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  {plant.difficulty}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Today's Tasks */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CalendarCheck size={18} className="text-green-600" />
          <h2 className="text-md font-semibold text-gray-700">Today's Tasks</h2>
        </div>
        {todayTasks.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
            <p className="text-gray-500 text-sm">No tasks for today! 🎉</p>
          </div>
        ) : (
          <div className="grid space-y-2">
            {todayTasks.map((task) => (
              <Link
                key={task.id}
                href={`/tasks/${task.id}?plantId=${task.plantId}`}
              >
                <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between hover:shadow-sm transition-shadow">
                  <div>
                    <p className="font-medium text-gray-800">{task.type}</p>
                    <p className="text-sm text-gray-500">{task.plantName}</p>
                  </div>
                  <span className="text-gray-400 text-sm">⏳ Pending</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <p className="text-2xl font-bold text-green-600">
            {MOCK_USER_PLANTS.length}
          </p>
          <p className="text-xs text-gray-500">Plants Growing</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <p className="text-2xl font-bold text-green-600">
            {todayTasks.length}
          </p>
          <p className="text-xs text-gray-500">Tasks Today</p>
        </div>
      </div>
    </motion.div>
  );
}
