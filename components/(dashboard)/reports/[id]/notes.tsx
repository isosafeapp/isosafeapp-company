"use client";

export function ReportDetailNotes({ notes }: { notes: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <h3 className="font-medium text-gray-700 mb-2">Additional Notes</h3>
      <p className="text-sm text-gray-600">{notes}</p>
    </div>
  );
}
