export interface IEmployee {
  id?: string | undefined;
  companyId: string;
  userId?: string; // Link to auth user
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: "active" | "inactive" | "invited";
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EmployeeFormState = {
  errors: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    role?: string[];
    global?: string[];
  };
  message: string;
};

export interface IEmployeeWithUsage extends IEmployee {
  appUsage: {
    totalReports: number;
    totalHazards: number;
    lastActive: Date | null;
  };
}

export interface IEmployeesWithUsageResponse {
  employees: IEmployeeWithUsage[];
  total: number;
  page: number;
  totalPages: number;
}
