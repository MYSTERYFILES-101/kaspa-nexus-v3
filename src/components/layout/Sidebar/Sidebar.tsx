// v1.0.4 - Sidebar Navigation Component (Correct Structure from Project Plan)
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { NavigationSection } from "./NavigationSection";
import { UserProfile } from "./UserProfile";
import type { SidebarProps, NavigationSection as NavSection, UserStatus } from "./types";

// Navigation configuration - According to Project Plan
const navigationSections: NavSection[] = [
  {
    title: "Dashboard",
    icon: "📊",
    items: [
      { label: "Kaspa-Nexus (Main)", href: "/dashboard/main", icon: "🏠" },
      { label: "KRC-20 Netzwerk", href: "/dashboard/krc20", icon: "🌐" },
      { label: "Signal Dashboard", href: "/dashboard/signal", icon: "📈", badge: "pro" },
      { label: "Investment Hub", href: "/dashboard/investment", icon: "💰" },
      { label: "Account & Shop", href: "/dashboard/account", icon: "🛒" },
      { label: "Team & Info", href: "/dashboard/team", icon: "ℹ️" },
    ],
  },
  {
    title: "Ecosystem",
    icon: "🌐",
    collapsed: false,
    items: [
      { label: "Coins & Tokens", href: "/ecosystem/coins", icon: "🪙" },
      { label: "DEX & DeFi", href: "/ecosystem/defi", icon: "🔄" },
      { label: "NFT Projects", href: "/ecosystem/nft", icon: "🎨" },
      { label: "Gaming & Metaverse", href: "/ecosystem/gaming", icon: "🎮" },
      { label: "Infrastructure", href: "/ecosystem/infrastructure", icon: "🔧" },
    ],
  },
  {
    title: "Signal Dashboard",
    icon: "📈",
    pro: true,
    collapsed: false,
    items: [
      { label: "AI Signals", href: "/signals/ai-signals", icon: "🤖", badge: "pro" },
      { label: "Signal Analytics", href: "/signals/analytics", icon: "📊", badge: "pro" },
    ],
  },
  {
    title: "Investment Hub",
    icon: "💰",
    collapsed: false,
    items: [
      { label: "Portfolio Vorschlag", href: "/investment/portfolio", icon: "💼" },
      { label: "Zukunfts-Rechner", href: "/investment/calculator", icon: "🧮" },
    ],
  },
  {
    title: "Account & Shop",
    icon: "🛒",
    collapsed: false,
    items: [
      { label: "Signal Pro", href: "/account/pro", icon: "⭐", badge: "pro" },
      { label: "API Codes", href: "/account/api", icon: "🔑" },
    ],
  },
  {
    title: "Team & Info",
    icon: "ℹ️",
    collapsed: false,
    items: [
      { label: "Team", href: "/team", icon: "👥" },
      { label: "Sponsoren", href: "/team/sponsors", icon: "❤️" },
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
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-6">
        {navigationSections.map((section, index) => (
          <NavigationSection
            key={index}
            section={section}
            collapsed={collapsed}
          />
        ))}
      </div>

      {/* Footer: User Profile */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800/50">
        <UserProfile user={demoUser} collapsed={collapsed} />
      </div>

      {/* Version Badge */}
      {!collapsed && (
        <div className="px-4 pb-4 pt-2">
          <div className="text-center text-2xs text-neutral-500 dark:text-neutral-500">
            Version 1.0.4 • <span className="text-brand-primary font-semibold">Development</span>
          </div>
        </div>
      )}
    </aside>
  );
};
