"use client";

import { ColorPresets } from "./color-presets";

interface ColorPickerProps {
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
}

export function ColorPicker({
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
}: ColorPickerProps) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">Brand Colors</h3>
      <div className="space-y-4 sm:space-y-6">
        {/* Primary Color */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Primary Color
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg border border-gray-200 shadow-sm"
                style={{ backgroundColor: primaryColor }}
              />
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => onPrimaryColorChange(e.target.value)}
                className="w-16 h-10 rounded border border-gray-200 cursor-pointer"
              />
            </div>
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value)}
              className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* Secondary Color */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Secondary Color
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg border border-gray-200 shadow-sm"
                style={{ backgroundColor: secondaryColor }}
              />
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => onSecondaryColorChange(e.target.value)}
                className="w-16 h-10 rounded border border-gray-200 cursor-pointer"
              />
            </div>
            <input
              type="text"
              value={secondaryColor}
              onChange={(e) => onSecondaryColorChange(e.target.value)}
              className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>

        <ColorPresets onSelectColor={onPrimaryColorChange} />
      </div>
    </div>
  );
}
