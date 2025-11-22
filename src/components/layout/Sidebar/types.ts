// v1.0.14 - Sidebar Types (Added href & badge to NavigationSection)
import { ReactNode } from "react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: "pro" | "new" | "soon";
  active?: boolean;
  prefetch?: boolean;
}

export interface NavigationSection {
  title: string;
  icon?: ReactNode;
  href?: string; // Hauptlink für die Section (anklickbarer Header)
  badge?: "pro" | "new" | "soon"; // Badge für die Section
  items: NavigationItem[];
  collapsed?: boolean;
  pro?: boolean; // Legacy - wird von badge ersetzt
  prefetch?: boolean;
}

export interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export interface UserStatus {
  username: string;
  role: "visitor" | "free" | "pro" | "admin";
  avatar?: string;
}
