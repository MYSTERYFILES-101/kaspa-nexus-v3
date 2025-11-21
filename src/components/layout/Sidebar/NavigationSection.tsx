// v1.0.4 - Navigation Section Component (Light + Dark Theme Support)
"use client";

import React, { useState } from "react";
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
      {/* Section Header - BOLD & LARGER */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-3 text-sm font-bold text-neutral-800 dark:text-neutral-300 uppercase tracking-wide hover:text-brand-primary transition-colors"
      >
        <div className="flex items-center gap-2.5">
          {section.icon && <span className="text-xl">{section.icon}</span>}
          <span className="text-[13px] leading-tight">{section.title}</span>
          {section.pro && <Badge variant="pro" size="sm">PRO</Badge>}
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

      {/* Section Items */}
      {isExpanded && (
        <div className="space-y-1">
          {section.items.map((item) => (
            <NavigationItem key={item.href} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
