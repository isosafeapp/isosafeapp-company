// constants/index.ts
import {
  LayoutDashboard,
  Search,
  Sprout,
  CalendarCheck,
  BookOpen,
  Settings,
  Droplet,
  Sun,
  Thermometer,
  Clock,
  Award,
} from "lucide-react";

export const ICONS = {
  dashboard: LayoutDashboard,
  discover: Search,
  myPlants: Sprout,
  tasks: CalendarCheck,
  journal: BookOpen,
  settings: Settings,
  watering: Droplet,
  sun: Sun,
  temp: Thermometer,
  time: Clock,
  harvest: Award,
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
  icon: any; // ✅ string, not LucideIcon
  section: "main" | "other";
};

export const PAGE_PERMISSIONS = [
  {
    name: "Dashboard",
    href: "/",
    icon: "dashboard",
    action: "read",
    resource: "dashboard",
    section: "main",
  },
  {
    name: "Discover",
    href: "/discover",
    icon: "discover",
    action: "read",
    resource: "discover",
    section: "main",
  },
  {
    name: "My Plants",
    href: "/my-plants",
    icon: "myPlants",
    action: "read",
    resource: "myPlants",
    section: "main",
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: "tasks",
    action: "read",
    resource: "tasks",
    section: "main",
  },
  {
    name: "Journal",
    href: "/journal",
    icon: "journal",
    action: "read",
    resource: "journal",
    section: "other",
  },
];

export const MOCK_PLANTS = [
  {
    id: "1",
    name: "Spinach",
    difficulty: "Easy",
    months: ["Mar", "Apr", "Aug", "Sep"],
    sun: "Partial",
    water: "High",
    container: true,
    germination: "7-14 days",
    harvest: "~40 days",
    tips: "Keep soil moist. Harvest regularly from the outside.",
  },
  {
    id: "2",
    name: "Lettuce",
    difficulty: "Easy",
    months: ["Feb", "Mar", "Apr", "Sep"],
    sun: "Partial",
    water: "High",
    container: true,
    germination: "2-10 days",
    harvest: "~45 days",
    tips: "Thin seedlings to avoid crowding.",
  },
  {
    id: "3",
    name: "Carrots",
    difficulty: "Easy",
    months: ["Feb", "Mar", "Apr", "Aug"],
    sun: "Full",
    water: "Medium",
    container: true,
    germination: "14-21 days",
    harvest: "~70 days",
    tips: "Soil should be loose and free of rocks.",
  },
  {
    id: "4",
    name: "Tomatoes",
    difficulty: "Medium",
    months: ["Aug", "Sep", "Oct"],
    sun: "Full",
    water: "High",
    container: true,
    germination: "5-10 days",
    harvest: "~85 days",
    tips: "Support with stakes or cages.",
  },
  {
    id: "5",
    name: "Basil",
    difficulty: "Easy",
    months: ["Sep", "Oct", "Nov"],
    sun: "Full",
    water: "Medium",
    container: true,
    germination: "5-10 days",
    harvest: "~60 days",
    tips: "Pinch flowers to encourage leaf growth.",
  },
];

export const MOCK_USER_PLANTS = [
  {
    id: "p1",
    plantId: "1",
    plantName: "Spinach",
    plantedDate: "2026-04-08",
    stage: "Germination",
    day: 5,
    method: "Seeds",
    location: "Pot",
    health: "Good",
    tasks: [
      { id: "t1", type: "Water", status: "pending" },
      { id: "t2", type: "Pest Check", status: "pending" },
    ],
  },
  {
    id: "p2",
    plantId: "2",
    plantName: "Lettuce",
    plantedDate: "2026-04-01",
    stage: "Seedling",
    day: 12,
    method: "Seedling",
    location: "Garden",
    health: "Good",
    tasks: [
      { id: "t3", type: "Water", status: "done" },
      { id: "t4", type: "Fertilise", status: "pending" },
    ],
  },
];

export const MOCK_JOURNAL_ENTRIES = [
  {
    id: "j1",
    plantId: "p1",
    plantName: "Spinach",
    date: "2026-04-10",
    note: "Leaves looking a bit yellow. Maybe overwatering?",
    image: null,
  },
  {
    id: "j2",
    plantId: "p2",
    plantName: "Lettuce",
    date: "2026-04-09",
    note: "Growing well! Watered this morning.",
    image: null,
  },
];
