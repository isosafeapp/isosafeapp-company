"use client";

import { Loader2, Save } from "lucide-react";

export function SaveButton({ isPending }: { isPending: boolean }) {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
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
