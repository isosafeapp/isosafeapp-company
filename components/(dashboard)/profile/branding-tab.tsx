"use client";

import { useState } from "react";
import { Save, Upload, Palette as PaletteIcon } from "lucide-react";
import { CompanyProfile } from "@/definitions/company-profile";
import { updateCompanyProfile } from "@/data/company-profile";
import { toast } from "sonner";

export function BrandingTab({
  profile,
  companyId,
  onUpdate,
}: {
  profile: CompanyProfile;
  companyId: string;
  onUpdate: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(
    profile.branding.primaryColor,
  );
  const [secondaryColor, setSecondaryColor] = useState(
    profile.branding.secondaryColor,
  );
  const [logoPreview, setLogoPreview] = useState<string | null>(
    profile.branding.logo || null,
  );

  const handleSave = async () => {
    setLoading(true);
    const result = await updateCompanyProfile(companyId, {
      branding: {
        primaryColor,
        secondaryColor,
        logo: logoPreview || undefined,
      },
    });
    if (result.success) {
      toast.success("Branding updated successfully");
      onUpdate();
    } else {
      toast.error(result.message || "Failed to update");
    }
    setLoading(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const colorPresets = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Red", value: "#ef4444" },
    { name: "Green", value: "#22c55e" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Orange", value: "#f97316" },
    { name: "Pink", value: "#ec4899" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Logo Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
          Company Logo
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200 flex-shrink-0">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <PaletteIcon size={32} className="text-gray-400" />
            )}
          </div>
          <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition w-full sm:w-auto">
            <Upload size={16} />
            Upload Logo
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Colors Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
          Brand Colors
        </h2>
        <div className="space-y-4 sm:space-y-6">
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
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-16 h-10 rounded border border-gray-200 cursor-pointer"
                />
              </div>
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>

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
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-16 h-10 rounded border border-gray-200 cursor-pointer"
                />
              </div>
              <input
                type="text"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Color Presets
            </label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {colorPresets.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setPrimaryColor(color.value)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-110"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
          Preview
        </h2>
        <div
          className="space-y-3 p-3 sm:p-4 rounded-xl border border-gray-200"
          style={{ backgroundColor: `${primaryColor}10` }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: primaryColor }}
              >
                HD
              </div>
              <span
                className="font-semibold text-sm sm:text-base"
                style={{ color: primaryColor }}
              >
                Hazard Detect
              </span>
            </div>
            <span className="text-xs text-gray-500">
              Preview of your brand colors
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              className="px-3 py-1.5 text-sm text-white rounded-lg transition"
              style={{ backgroundColor: primaryColor }}
            >
              Primary Button
            </button>
            <button
              className="px-3 py-1.5 text-sm rounded-lg border transition"
              style={{ borderColor: secondaryColor, color: secondaryColor }}
            >
              Secondary Button
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
        >
          <Save size={16} /> {loading ? "Saving..." : "Save Branding"}
        </button>
      </div>
    </div>
  );
}
