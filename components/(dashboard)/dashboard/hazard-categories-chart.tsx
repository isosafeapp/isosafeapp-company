"use client";

import { PieChart } from "lucide-react";
import { HazardCategoryStat } from "@/definitions/analytics";

export function HazardCategoriesChart({
  categories,
}: {
  categories: HazardCategoryStat[];
}) {
  const topCategories = categories.slice(0, 8);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <PieChart size={18} className="text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          Top Hazard Categories
        </h2>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {topCategories.map((category, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 truncate flex-1">
                {category.category}
              </span>
              <span className="font-medium text-gray-800 ml-2">
                {category.count} ({category.percentage}%)
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hazard data available
        </div>
      )}
    </div>
  );
}
