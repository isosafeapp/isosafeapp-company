"use client";

import { Upload, Building2 } from "lucide-react";

export function LogoUploader({
  logoPreview,
  onLogoUpload,
}: {
  logoPreview: string | null;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">Company Logo</h3>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200 flex-shrink-0">
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <Building2 size={32} className="text-gray-400" />
          )}
        </div>
        <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition w-full sm:w-auto">
          <Upload size={16} />
          Upload Logo
          <input
            type="file"
            accept="image/*"
            onChange={onLogoUpload}
            className="hidden"
          />
        </label>
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center sm:text-left">
        Recommended size: 200x200px. Max file size: 2MB
      </p>
    </div>
  );
}
