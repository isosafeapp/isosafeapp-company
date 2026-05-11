"use client";

import { Palette } from "lucide-react";

export function BrandingHeader() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Palette size={20} className="text-blue-500" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Brand Customization
        </h2>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Customize your company's look and feel across the platform
      </p>
    </div>
  );
}
