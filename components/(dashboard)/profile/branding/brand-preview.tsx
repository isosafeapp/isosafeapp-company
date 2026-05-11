"use client";

import { Shield } from "lucide-react";

export function BrandPreview({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">Live Preview</h3>
      <div
        className="space-y-3 p-3 sm:p-4 rounded-xl border border-gray-200 transition-all duration-300"
        style={{ backgroundColor: `${primaryColor}08` }}
      >
        {/* Header Preview */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm"
              style={{ backgroundColor: primaryColor }}
            >
              HD
            </div>
            <span
              className="font-semibold text-sm sm:text-base transition-colors"
              style={{ color: primaryColor }}
            >
              Hazard Detect
            </span>
          </div>
          <span className="text-xs text-gray-500">
            Your brand identity in action
          </span>
        </div>

        {/* Button Preview */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
          <button
            className="px-3 py-1.5 text-sm text-white rounded-lg transition-all duration-200 hover:opacity-90 shadow-sm"
            style={{ backgroundColor: primaryColor }}
          >
            Primary Action
          </button>
          <button
            className="px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 hover:bg-opacity-10"
            style={{ borderColor: secondaryColor, color: secondaryColor }}
          >
            Secondary Action
          </button>
        </div>

        {/* Card Preview */}
        <div
          className="mt-3 p-3 rounded-lg border"
          style={{
            borderColor: `${primaryColor}30`,
            backgroundColor: `${primaryColor}05`,
          }}
        >
          <p className="text-xs" style={{ color: secondaryColor }}>
            Preview of how your brand colors appear on cards and containers
          </p>
        </div>
      </div>
    </div>
  );
}
