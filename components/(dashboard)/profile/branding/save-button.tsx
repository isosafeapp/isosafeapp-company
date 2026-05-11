"use client";

import { Save, Loader2 } from "lucide-react";

export function SaveButton({
  loading,
  onSave,
}: {
  loading: boolean;
  onSave: () => void;
}) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onSave}
        disabled={loading}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save size={16} />
            Save Branding
          </>
        )}
      </button>
    </div>
  );
}
