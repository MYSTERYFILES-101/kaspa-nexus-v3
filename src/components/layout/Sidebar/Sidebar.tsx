// v1.0.23 - Sidebar Navigation Component with updated ecosystem URLs
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { NavigationSection } from "./NavigationSection";
import { UserProfile } from "./UserProfile";
import type { SidebarProps, NavigationSection as NavSection, UserStatus } from "./types";

// Navigation configuration - Korrekte Struktur laut Projektplan
// 1x Hauptlink (KASPA-NEXUS) + 5x Sections (Dashboards 2-6)
const navigationSections: NavSection[] = [
  {
    title: "KRC-20 Netzwerk",
    icon: "🌐",
    href: "/dashboard/krc20", // Dashboard 2 - Hauptlink
    collapsed: true,
    items: [
      { label: "Coins & Tokens", href: "/dashboard/ecosystem/coins", icon: "🪙" },
      { label: "DEX & DeFi", href: "/dashboard/ecosystem/defi", icon: "🔄", prefetch: false },
      { label: "NFT Projects", href: "/dashboard/ecosystem/nft", icon: "🎨", prefetch: false },
      { label: "Gaming & Metaverse", href: "/dashboard/ecosystem/gaming", icon: "🎮", prefetch: false },
      { label: "Infrastructure", href: "/dashboard/ecosystem/infrastructure", icon: "🔧", prefetch: false },
    ],
  },
  {
    title: "Signal Dashboard",
    icon: "📈",
    href: "/dashboard/signals",
    collapsed: true,
    prefetch: false,
    items: [
      { label: "AI Signals", href: "/signals/ai-signals", icon: "🤖", badge: "pro", prefetch: false },
      { label: "Signal Analytics", href: "/signals/analytics", icon: "📊", badge: "pro", prefetch: false },
    ],
  },
  {
    title: "Investment Hub",
    icon: "💰",
    href: "/dashboard/investment",
    collapsed: true,
    prefetch: false,
    items: [
      { label: "Portfolio Vorschlag", href: "/investment/portfolio", icon: "💼", badge: "pro", prefetch: false },
      { label: "Zukunfts-Rechner", href: "/investment/calculator", icon: "🧮", badge: "pro", prefetch: false },
    ],
  },
  {
    title: "Account & Shop",
    icon: "🛒",
    href: "/dashboard/account",
    collapsed: true,
    prefetch: false,
    items: [
      { label: "Signal Pro", href: "/account/pro", icon: "⭐", badge: "pro", prefetch: false },
      { label: "API Codes", href: "/account/api", icon: "🔑", prefetch: false },
    ],
  },
  {
    title: "Team & Info",
    icon: "ℹ️",
    href: "/dashboard/team", // Dashboard 6 - Hauptlink
    collapsed: true,
    prefetch: false,
    items: [
      { label: "Team", href: "/team", icon: "👥", prefetch: false },
      { label: "Sponsoren", href: "/team/sponsors", icon: "❤️", prefetch: false },
    ],
  },
];

// Demo user - will be replaced with real auth
const demoUser: UserStatus = {
  username: "Demo User",
  role: "free",
};

export const Sidebar: React.FC<SidebarProps> = ({
  className,
  collapsed: controlledCollapsed,
  onCollapse,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = controlledCollapsed ?? internalCollapsed;
  const pathname = usePathname();

  const handleCollapse = () => {
    const newState = !collapsed;
    setInternalCollapsed(newState);
    onCollapse?.(newState);
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300",
        collapsed ? "w-20" : "w-72",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800/50">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logos/Kaspa-Nexus-logo.png"
            alt="KASPA-NEXUS"
            width={40}
            height={40}
            className="flex-shrink-0"
          />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-neutral-900 dark:text-white leading-tight">
                KASPA
              </span>
              <span className="text-xs text-brand-primary font-semibold tracking-wide">
                NEXUS 3.0
              </span>
            </div>
          )}
        </Link>

        {/* Collapse Toggle */}
        <button
          onClick={handleCollapse}
          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 rounded-lg transition-colors"
          title={collapsed ? "Expand" : "Collapse"}
        >
          <svg
            className={cn("w-5 h-5 text-neutral-400 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-all", collapsed && "rotate-180")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-3">
        {/* Dashboard 1: KASPA-NEXUS Main - Einzelner Link ganz oben */}
        <Link
          href="/dashboard/main"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
            "hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
            "text-neutral-700 dark:text-neutral-300",
            "hover:text-brand-primary dark:hover:text-brand-primary",
            pathname === "/dashboard/main" && "bg-brand-primary/10 dark:bg-brand-primary/10 text-brand-primary font-semibold"
          )}
        >
          <span className="text-xl">🏠</span>
          {!collapsed && (
            <span className="text-sm font-medium">KASPA-NEXUS</span>
          )}
        </Link>

        {/* Dashboards 2-6: Sections mit Untermenüs */}
        <div className="space-y-3 pt-2">
          {navigationSections.map((section, index) => (
            <NavigationSection
              key={index}
              section={section}
              collapsed={collapsed}
            />
          ))}
        </div>
      </div>

      {/* Footer: User Profile */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800/50">
        <UserProfile user={demoUser} collapsed={collapsed} />
      </div>

      {/* Version Badge */}
      {!collapsed && (
        <div className="px-4 pb-4 pt-2">
          <div className="text-center text-2xs text-neutral-500 dark:text-neutral-500">
            Version 1.0.23 • <span className="text-brand-primary font-semibold">Development</span>
          </div>
        </div>
      )}
    </aside>
  );
};
