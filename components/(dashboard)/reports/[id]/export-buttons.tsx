"use client";

import { useState } from "react";
import { FileText, FileSpreadsheet, FileJson, Loader2 } from "lucide-react";
import {
  exportToPDF,
  exportToWord,
  exportToExcel,
  ReportForExport,
} from "@/lib/export-utils";

interface ExportButtonsProps {
  report: ReportForExport;
  reportElementId: string;
}

export function ExportButtons({ report, reportElementId }: ExportButtonsProps) {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => {
    setTimeout(() => setError(null), 3000);
  };

  const handleExportPDF = async () => {
    setIsExporting("pdf");
    setError(null);
    try {
      await exportToPDF(reportElementId, `Hazard_Report_${report.id}`);
    } catch (error: any) {
      console.error("PDF export failed:", error);
      setError(error.message || "Failed to generate PDF");
    } finally {
      setIsExporting(null);
      clearError();
    }
  };

  const handleExportWord = async () => {
    setIsExporting("word");
    setError(null);
    try {
      await exportToWord(report, `Hazard_Report_${report.id}`);
    } catch (error: any) {
      console.error("Word export failed:", error);
      setError(error.message || "Failed to generate Word document");
    } finally {
      setIsExporting(null);
      clearError();
    }
  };

  const handleExportExcel = async () => {
    setIsExporting("excel");
    setError(null);
    try {
      await exportToExcel(report, `Hazard_Report_${report.id}`);
    } catch (error: any) {
      console.error("Excel export failed:", error);
      setError(error.message || "Failed to generate Excel file");
    } finally {
      setIsExporting(null);
      clearError();
    }
  };

  const buttons = [
    {
      id: "pdf",
      label: "PDF",
      icon: FileText,
      onClick: handleExportPDF,
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      id: "word",
      label: "Word",
      icon: FileJson,
      onClick: handleExportWord,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "excel",
      label: "Excel",
      icon: FileSpreadsheet,
      onClick: handleExportExcel,
      color: "bg-green-500 hover:bg-green-600",
    },
  ];

  return (
    <div className="relative">
      <div className="flex gap-2">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={btn.onClick}
            disabled={isExporting !== null}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-sm font-medium transition ${btn.color} disabled:opacity-50`}
          >
            {isExporting === btn.id ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <btn.icon size={14} />
            )}
            <span className="">{btn.label}</span>
          </button>
        ))}
      </div>

      {error && (
        <div className="absolute top-full right-0 mt-2 z-10 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
}
