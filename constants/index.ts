import {
  LayoutDashboard,
  AlertTriangle,
  FileText,
  Camera,
  History,
  Settings,
  LogOut,
  Menu,
  User,
  Bell,
  HelpCircle,
} from "lucide-react";

export const ICONS = {
  dashboard: LayoutDashboard,
  hazards: AlertTriangle,
  reports: FileText,
  camera: Camera,
  history: History,
  settings: Settings,
  logout: LogOut,
  menu: Menu,
  user: User,
  bell: Bell,
  help: HelpCircle,
} as const;

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
    name: "Dashboard",
    href: "/",
    icon: "dashboard",
    action: "read",
    resource: "dashboard",
    section: "main",
  },
  {
    name: "New Report",
    href: "/report",
    icon: "camera",
    action: "create",
    resource: "report",
    section: "main",
  },
  {
    name: "My Reports",
    href: "/reports",
    icon: "reports",
    action: "read",
    resource: "reports",
    section: "main",
  },
  {
    name: "Hazards",
    href: "/hazards",
    icon: "hazards",
    action: "read",
    resource: "hazards",
    section: "other",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "user",
    action: "read",
    resource: "profile",
    section: "other",
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: "bell",
    action: "read",
    resource: "notifications",
    section: "other",
  },
  {
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
  },
];

// Export only icon names (not components) for server components
export const otherNavItems = PAGE_PERMISSIONS.filter(
  (p) => p.section === "other",
).map((item) => ({
  name: item.name,
  href: item.href,
  iconName: item.icon, // Pass only the icon name as string
}));
