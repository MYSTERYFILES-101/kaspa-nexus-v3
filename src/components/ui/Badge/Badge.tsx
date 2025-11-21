// v1.0.2 - Badge Component
import React from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "free" | "pro" | "admin";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-full";

    const variants = {
      default: "bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200",
      success: "bg-success-light text-success-dark",
      warning: "bg-warning-light text-warning-dark",
      error: "bg-error-light text-error-dark",
      info: "bg-info-light text-info-dark",
      free: "bg-neutral-100 text-neutral-700 border border-neutral-300",
      pro: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md",
      admin: "bg-error text-white shadow-md",
    };

    const sizes = {
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-2.5 py-1",
      lg: "text-base px-3 py-1.5",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
