// v1.0.2 - Sidebar Types
import { ReactNode } from "react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: "pro" | "new" | "soon";
  active?: boolean;
}

export interface NavigationSection {
  title: string;
  icon?: ReactNode;
  items: NavigationItem[];
  collapsed?: boolean;
  pro?: boolean;
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
