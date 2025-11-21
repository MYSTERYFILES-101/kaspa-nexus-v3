// v1.0.2 - Navigation Item Component
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
        "hover:bg-brand-light dark:hover:bg-neutral-700",
        isActive && "bg-brand-primary text-white hover:bg-brand-primary dark:hover:bg-brand-primary",
        !isActive && "text-neutral-700 dark:text-neutral-300",
        collapsed && "justify-center"
      )}
      title={collapsed ? item.label : undefined}
    >
      {/* Icon */}
      <span className={cn(
        "text-xl flex-shrink-0 transition-transform group-hover:scale-110",
        isActive && "scale-110"
      )}>
        {item.icon}
      </span>

      {/* Label */}
      {!collapsed && (
        <>
          <span className="flex-1 font-medium text-sm truncate">
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
