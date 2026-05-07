export interface IReport {
  id?: string;
  employeeId: string;
  companyId: string;
  title: string;
  description?: string;
  images: string[];
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  status: "draft" | "submitted" | "reviewed" | "resolved";
  isFinalized: boolean;
  isReviewed: boolean;
  reviewedBy?: string;
  reviewedAt?: Date;
  resolvedAt?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReportHazard {
  id?: string;
  reportId: string;
  description: string;
  category: string;
  subcategory?: string;
  severity: "low" | "medium" | "high" | "critical";
  confidence: number;
  isAIDetected: boolean;
  isManualOverride: boolean;
  originalDescription?: string;
  imageUrl?: string;
  preventionTip?: string;
  status: "open" | "in_progress" | "resolved" | "false_positive";
  resolvedAt?: Date;
  resolvedBy?: string;
  resolutionNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateReportInput {
  employeeId: string;
  companyId: string;
  title: string;
  description?: string;
  images?: string[];
  location?: {
    address: string;
    lat: number;
    lng: number;
  };
  status: "draft" | "submitted";
  isFinalized: boolean;
  notes?: string;
}

export interface CreateHazardInput {
  description: string;
  category: string;
  severity: "low" | "medium" | "high" | "critical";
  confidence: number;
  isAIDetected: boolean;
  isManualOverride: boolean;
  originalDescription?: string;
  preventionTip?: string;
  status: "open";
}

export interface ICompanyReport {
  id: string;
  title: string;
  employeeName: string;
  employeeId: string;
  hazardCount: number;
  status: "draft" | "submitted" | "reviewed" | "resolved";
  createdAt: Date;
  location?: string;
}

export interface IEmployeeReport {
  id: string;
  title: string;
  hazardCount: number;
  status: "draft" | "submitted" | "reviewed" | "resolved";
  createdAt: Date | undefined;
  location?: string;
}

export interface ICompanyReportsResponse {
  reports: ICompanyReport[];
  total: number;
  page: number;
  totalPages: number;
}

export interface IEmployeeReportsResponse {
  reports: IEmployeeReport[];
  total: number;
  page: number;
  totalPages: number;
}

export interface IReportWithHazards {
  report: IReport;
  hazards: IReportHazard[];
}

export interface IEmployeeStats {
  totalReports: number;
  totalHazards: number;
  pendingReports: number;
}

export type CreateReportState = {
  errors?: {
    title?: string[];
    global?: string[];
  };
  success?: boolean;
  message?: string | null;
  reportId?: string;
};

export interface Hazard {
  id: string;
  description: string;
  category: string;
  severity: "low" | "medium" | "high" | "critical";
  confidence: number;
  isAIDetected?: boolean;
  isManualOverride?: boolean;
  preventionTip?: string;
  isEdited?: boolean;
}
