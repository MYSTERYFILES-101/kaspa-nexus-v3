// v1.0.4 - Navigation Item Component (Light + Dark Theme Support)
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import type { NavigationItem as NavigationItemType } from "./types";

interface NavigationItemProps {
  item: NavigationItemType;
  collapsed?: boolean;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({ item, collapsed }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
        "hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
        isActive && "bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary border border-brand-primary/30 hover:bg-brand-primary/20 dark:hover:bg-brand-primary/30 shadow-sm",
        !isActive && "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white",
        collapsed && "justify-center"
      )}
      title={collapsed ? item.label : undefined}
    >
      {/* Icon */}
      <span className={cn(
        "text-lg flex-shrink-0 transition-transform group-hover:scale-110",
        isActive && "scale-110"
      )}>
        {item.icon}
      </span>

      {/* Label */}
      {!collapsed && (
        <>
          <span className="flex-1 font-normal text-[13px] truncate">
            {item.label}
          </span>

          {/* Badges */}
          {item.badge && (
            <Badge
              variant={item.badge === "pro" ? "pro" : item.badge === "new" ? "success" : "warning"}
              size="sm"
            >
              {item.badge.toUpperCase()}
            </Badge>
          )}
        </>
      )}
    </Link>
  );
};
