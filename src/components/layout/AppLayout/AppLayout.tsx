// v1.0.2 - Main Application Layout
"use client";

import React, { useState } from "react";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import { cn } from "@/lib/utils/cn";

export interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      </div>

      {/* Sidebar - Mobile Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden">
            <Sidebar collapsed={false} />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          showMobileMenu
        />

        {/* Page Content */}
        <main className={cn("flex-1 overflow-y-auto overflow-x-hidden", className)}>
          <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
