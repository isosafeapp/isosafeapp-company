import {
  LayoutDashboard,
  AlertTriangle,
  FileText,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  User,
  Bell,
  HelpCircle,
  Shield,
  Activity,
} from "lucide-react";

export const ICONS = {
  dashboard: LayoutDashboard,
  analytics: BarChart3,
  employees: Users,
  reports: FileText,
  hazards: AlertTriangle,
  settings: Settings,
  logout: LogOut,
  menu: Menu,
  user: User,
  bell: Bell,
  help: HelpCircle,
  shield: Shield,
  activity: Activity,
} as const;

export type IconName = keyof typeof ICONS;

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export type PagePermission = {
  name: string;
  href: string;
  action: string;
  resource: string;
  icon: keyof typeof ICONS;
  section: "main" | "other";
};

export const PAGE_PERMISSIONS: PagePermission[] = [
  {
    name: "Analytics",
    href: "/",
    icon: "analytics",
    action: "read",
    resource: "dashboard",
    section: "main",
  },
  {
    name: "Employees",
    href: "/employees",
    icon: "employees",
    action: "read",
    resource: "employee",
    section: "main",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: "reports",
    action: "read",
    resource: "reports",
    section: "main",
  },
  {
    name: "Company Profile",
    href: "/profile",
    icon: "user",
    action: "read",
    resource: "profile",
    section: "other",
  },
  /* {
    name: "Settings",
    href: "/settings",
    icon: "settings",
    action: "read",
    resource: "settings",
    section: "other",
  },
  {
    name: "Help & Support",
    href: "/help",
    icon: "help",
    action: "read",
    resource: "help",
    section: "other",
  }, */
];

// Export only icon names (not components) for server components
export const otherNavItems = PAGE_PERMISSIONS.filter(
  (p) => p.section === "other",
).map((item) => ({
  name: item.name,
  href: item.href,
  iconName: item.icon, // Pass only the icon name as string
}));
