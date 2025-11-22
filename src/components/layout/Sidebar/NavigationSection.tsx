// v1.0.14 - Navigation Section Component (Anklickbare Section Headers)
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import { NavigationItem } from "./NavigationItem";
import type { NavigationSection as NavigationSectionType } from "./types";

interface NavigationSectionProps {
  section: NavigationSectionType;
  collapsed?: boolean;
}

export const NavigationSection: React.FC<NavigationSectionProps> = ({
  section,
  collapsed,
}) => {
  const [isExpanded, setIsExpanded] = useState(!section.collapsed);
  const pathname = usePathname();
  const isActive = section.href && pathname === section.href;

  if (collapsed) {
    // Simplified view when sidebar is collapsed
    return (
      <div className="space-y-1">
        {section.items.map((item) => (
          <NavigationItem key={item.href} item={item} collapsed={collapsed} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Section Header - Anklickbar wenn href vorhanden */}
      <div className="relative">
        {section.href ? (
          <Link
            href={section.href}
            prefetch={section.prefetch !== false}
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-3 text-sm font-bold uppercase tracking-wide transition-colors rounded-lg",
              isActive
                ? "bg-brand-primary/10 dark:bg-brand-primary/10 text-brand-primary"
                : "text-neutral-800 dark:text-neutral-300 hover:text-brand-primary hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
            )}
          >
            <div className="flex items-center gap-2.5">
              {section.icon && <span className="text-xl">{section.icon}</span>}
              <span className="text-[13px] leading-tight">{section.title}</span>
              {section.badge === "pro" && <Badge variant="pro" size="sm">PRO</Badge>}
            </div>

            {/* Expand/Collapse Icon */}
            <svg
              className={cn(
                "w-5 h-5 transition-transform duration-200",
                isExpanded && "rotate-180"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        ) : (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between px-3 py-3 text-sm font-bold text-neutral-800 dark:text-neutral-300 uppercase tracking-wide hover:text-brand-primary transition-colors"
          >
            <div className="flex items-center gap-2.5">
              {section.icon && <span className="text-xl">{section.icon}</span>}
              <span className="text-[13px] leading-tight">{section.title}</span>
              {section.badge === "pro" && <Badge variant="pro" size="sm">PRO</Badge>}
            </div>

            {/* Expand/Collapse Icon */}
            <svg
              className={cn(
                "w-5 h-5 transition-transform duration-200",
                isExpanded && "rotate-180"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Section Items - Better Visual Grouping */}
      {isExpanded && (
        <div className="ml-2 pl-3 border-l-2 border-neutral-200 dark:border-neutral-700 space-y-1 py-1">
          {section.items.map((item) => (
            <NavigationItem key={item.href} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
