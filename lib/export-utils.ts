import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Hazard } from "@/definitions/report";

export interface ReportForExport {
  id: string;
  title: string;
  description?: string;
  status: string;
  createdAt: Date;
  location?: { address: string; lat?: number; lng?: number };
  notes?: string;
  hazards: Hazard[];
}

export async function exportToPDF(
  elementId: string,
  filename: string,
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error("Content not found");

  const originalTitle = document.title;
  document.title = filename;

  const printWindow = window.open("", "_blank");
  if (!printWindow) throw new Error("Pop-up blocked");

  const content = element.cloneNode(true) as HTMLElement;
  content.style.margin = "0";
  content.style.padding = "20px";

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${filename}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .no-print { display: none; }
        @media print {
          body { margin: 0; padding: 0; }
        }
      </style>
    </head>
    <body>
      ${content.outerHTML}
      <script>
        window.onload = () => { window.print(); setTimeout(() => window.close(), 1000); };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();

  document.title = originalTitle;
}

export async function exportToPDF1(
  elementId: string,
  filename: string,
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Report content not found");
  }

  try {
    // Show loading indicator
    const loadingDiv = createLoadingIndicator();
    document.body.appendChild(loadingDiv);

    // Wait for any images to load
    await waitForImages(element);

    // Get element dimensions
    const rect = element.getBoundingClientRect();

    // Create a clone of the element with explicit styles
    const cloneElement = element.cloneNode(true) as HTMLElement;

    // Apply explicit styles to the clone
    cloneElement.style.position = "fixed";
    cloneElement.style.top = "-9999px";
    cloneElement.style.left = "-9999px";
    cloneElement.style.width = `${rect.width}px`;
    cloneElement.style.backgroundColor = "#ffffff";
    cloneElement.style.padding = "20px";
    cloneElement.style.borderRadius = "0px";
    cloneElement.style.display = "block";

    // Replace Tailwind classes with inline styles for better compatibility
    fixTailwindStyles(cloneElement);

    document.body.appendChild(cloneElement);

    // Use html2canvas with better settings
    const canvas = await html2canvas(cloneElement, {
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
      useCORS: true,
      allowTaint: false,
      windowWidth: rect.width,
      windowHeight: rect.height,
      onclone: (clonedDoc, element) => {
        // Ensure cloned element has proper styles
        const clonedEl = clonedDoc.getElementById(elementId);
        if (clonedEl) {
          clonedEl.style.backgroundColor = "#ffffff";
        }
      },
    });

    // Remove the clone
    document.body.removeChild(cloneElement);

    // Remove loading indicator
    document.body.removeChild(loadingDiv);

    // Generate PDF
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 190;
    const pageHeight = 277;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;
    pdf.addImage(imgData, "PNG", 10, position + 10, imgWidth, imgHeight);

    let heightLeft = imgHeight - pageHeight;
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position + 10, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error("PDF export failed:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
}

function createLoadingIndicator(): HTMLDivElement {
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "pdf-loading";
  loadingDiv.innerHTML = `
    <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:20px 30px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.15);z-index:10000;display:flex;align-items:center;gap:12px;">
      <div class="spinner" style="width:20px;height:20px;border:2px solid #e5e7eb;border-top-color:#3b82f6;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
      <span>Generating PDF...</span>
    </div>
    <style>
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  `;
  return loadingDiv;
}

async function waitForImages(element: HTMLElement): Promise<void> {
  const images = element.querySelectorAll("img");
  const promises = Array.from(images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  });
  await Promise.all(promises);
}

function fixTailwindStyles(element: HTMLElement): void {
  // Convert common Tailwind classes to inline styles
  const elements = element.querySelectorAll("*");
  elements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const classes = htmlEl.className;

    // Background colors
    if (classes.includes("bg-white")) htmlEl.style.backgroundColor = "#ffffff";
    if (classes.includes("bg-gray-50"))
      htmlEl.style.backgroundColor = "#f9fafb";
    if (classes.includes("bg-gray-100"))
      htmlEl.style.backgroundColor = "#f3f4f6";
    if (classes.includes("bg-blue-50"))
      htmlEl.style.backgroundColor = "#eff6ff";
    if (classes.includes("bg-green-50"))
      htmlEl.style.backgroundColor = "#f0fdf4";
    if (classes.includes("bg-red-50")) htmlEl.style.backgroundColor = "#fef2f2";
    if (classes.includes("bg-yellow-50"))
      htmlEl.style.backgroundColor = "#fefce8";

    // Text colors
    if (classes.includes("text-gray-800")) htmlEl.style.color = "#1f2937";
    if (classes.includes("text-gray-600")) htmlEl.style.color = "#4b5563";
    if (classes.includes("text-gray-500")) htmlEl.style.color = "#6b7280";
    if (classes.includes("text-white")) htmlEl.style.color = "#ffffff";
    if (classes.includes("text-green-700")) htmlEl.style.color = "#166534";

    // Borders
    if (classes.includes("border")) htmlEl.style.border = "1px solid #e5e7eb";
    if (classes.includes("border-gray-200"))
      htmlEl.style.borderColor = "#e5e7eb";

    // Padding
    if (classes.includes("p-4")) htmlEl.style.padding = "16px";
    if (classes.includes("p-6")) htmlEl.style.padding = "24px";
    if (classes.includes("px-4")) {
      htmlEl.style.paddingLeft = "16px";
      htmlEl.style.paddingRight = "16px";
    }
    if (classes.includes("py-2")) {
      htmlEl.style.paddingTop = "8px";
      htmlEl.style.paddingBottom = "8px";
    }

    // Border radius
    if (classes.includes("rounded-lg")) htmlEl.style.borderRadius = "8px";
    if (classes.includes("rounded-xl")) htmlEl.style.borderRadius = "12px";
    if (classes.includes("rounded-2xl")) htmlEl.style.borderRadius = "16px";
  });
}

export async function exportToWord(
  report: ReportForExport,
  filename: string,
): Promise<void> {
  const severityColors: Record<string, string> = {
    low: "#10b981",
    medium: "#f59e0b",
    high: "#f97316",
    critical: "#ef4444",
  };

  const hazardsHtml = report.hazards
    .map(
      (hazard, index) => `
    <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 16px; page-break-inside: avoid;">
      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 8px;">
        <span style="background-color: ${severityColors[hazard.severity]}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold;">
          ${hazard.severity.toUpperCase()}
        </span>
        <span style="background-color: #f3f4f6; color: #374151; padding: 4px 12px; border-radius: 20px; font-size: 11px;">
          ${escapeHtml(hazard.category)}
        </span>
        <span style="color: #6b7280; font-size: 11px;">
          ${Math.round(hazard.confidence * 100)}% confidence
        </span>
        <span style="background-color: ${hazard.isAIDetected ? "#dbeafe" : "#fef3c7"}; color: ${hazard.isAIDetected ? "#1e40af" : "#92400e"}; padding: 4px 12px; border-radius: 20px; font-size: 10px;">
          ${hazard.isAIDetected ? "🤖 AI Detected" : "✏️ Manual"}
        </span>
      </div>
      <p style="color: #374151; font-size: 14px; margin: 12px 0 8px 0;">${escapeHtml(hazard.description)}</p>
      ${
        hazard.preventionTip
          ? `
        <div style="background-color: #f0fdf4; padding: 12px; border-radius: 8px; margin-top: 8px;">
          <span style="color: #166534; font-size: 12px;">💡 Prevention Tip: ${escapeHtml(hazard.preventionTip)}</span>
        </div>
      `
          : ""
      }
    </div>
  `,
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${escapeHtml(report.title)}</title>
      <style>
        body {
          font-family: 'Calibri', Arial, sans-serif;
          line-height: 1.6;
          color: #1f2937;
          max-width: 900px;
          margin: 0 auto;
          padding: 40px;
        }
        h1 { color: #1f2937; font-size: 28px; margin-bottom: 8px; }
        .header { margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #3b82f6; }
        .info-grid { display: grid; grid-template-columns: 150px 1fr; gap: 8px 16px; margin-bottom: 24px; background: #f9fafb; padding: 16px; border-radius: 12px; }
        .info-label { font-weight: bold; color: #4b5563; }
        .section { margin-bottom: 32px; }
        .section-title { font-size: 20px; font-weight: bold; margin-bottom: 16px; color: #374151; border-left: 4px solid #3b82f6; padding-left: 12px; }
        .hazard-count { background: #3b82f6; color: white; padding: 2px 8px; border-radius: 20px; font-size: 12px; margin-left: 8px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${escapeHtml(report.title)}</h1>
        <p style="color: #6b7280;">Generated on ${new Date().toLocaleString()}</p>
      </div>
      
      <div class="info-grid">
        <div><span class="info-label">Report ID:</span></div><div>${escapeHtml(report.id)}</div>
        <div><span class="info-label">Status:</span></div><div>${escapeHtml(report.status)}</div>
        <div><span class="info-label">Date:</span></div><div>${new Date(report.createdAt).toLocaleString()}</div>
        <div><span class="info-label">Location:</span></div><div>${escapeHtml(report.location?.address || "Not specified")}</div>
        <div><span class="info-label">Total Hazards:</span></div><div>${report.hazards.length}</div>
      </div>
      
      ${
        report.description
          ? `
        <div class="section">
          <div class="section-title">Description</div>
          <p style="margin: 0;">${escapeHtml(report.description)}</p>
        </div>
      `
          : ""
      }
      
      <div class="section">
        <div class="section-title">
          Hazards Detected <span class="hazard-count">${report.hazards.length}</span>
        </div>
        ${hazardsHtml}
      </div>
      
      ${
        report.notes
          ? `
        <div class="section">
          <div class="section-title">Additional Notes</div>
          <p style="margin: 0;">${escapeHtml(report.notes)}</p>
        </div>
      `
          : ""
      }
      
      <div style="margin-top: 40px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 11px; color: #9ca3af;">
        Generated by Hazard Detect Safety System
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function exportToExcel(
  report: ReportForExport,
  filename: string,
): Promise<void> {
  const hazardsData = report.hazards.map((hazard, index) => ({
    "No.": index + 1,
    Description: hazard.description,
    Category: hazard.category,
    Severity: hazard.severity.toUpperCase(),
    Confidence: `${Math.round(hazard.confidence * 100)}%`,
    "Prevention Tip": hazard.preventionTip || "N/A",
    "Detection Method": hazard.isAIDetected ? "AI Detected" : "Manual",
    Edited: hazard.isManualOverride ? "Yes" : "No",
  }));

  const reportInfo = [
    { Field: "Report ID", Value: report.id },
    { Field: "Title", Value: report.title },
    {
      Field: "Date Created",
      Value: new Date(report.createdAt).toLocaleString(),
    },
    { Field: "Status", Value: report.status },
    { Field: "Location", Value: report.location?.address || "Not specified" },
    { Field: "Description", Value: report.description || "N/A" },
    { Field: "Additional Notes", Value: report.notes || "N/A" },
    { Field: "Total Hazards", Value: report.hazards.length },
    { Field: "Generated On", Value: new Date().toLocaleString() },
  ];

  const workbook = XLSX.utils.book_new();

  const infoSheet = XLSX.utils.json_to_sheet(reportInfo);
  XLSX.utils.book_append_sheet(workbook, infoSheet, "Report Info");

  const hazardsSheet = XLSX.utils.json_to_sheet(hazardsData);
  hazardsSheet["!cols"] = [
    { wch: 6 },
    { wch: 50 },
    { wch: 20 },
    { wch: 10 },
    { wch: 12 },
    { wch: 50 },
    { wch: 15 },
    { wch: 8 },
  ];

  XLSX.utils.book_append_sheet(workbook, hazardsSheet, "Hazards");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
