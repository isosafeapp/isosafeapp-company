"use client";

import { MapPin } from "lucide-react";

export function ReportDetailLocation({ location }: { location: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <div className="flex items-center gap-2">
        <MapPin size={18} className="text-gray-500" />
        <span className="text-sm text-gray-600">{location}</span>
      </div>
    </div>
  );
}
