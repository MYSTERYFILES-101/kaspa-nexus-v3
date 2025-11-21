// v1.0.2 - User Profile Component
"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import type { UserStatus } from "./types";

interface UserProfileProps {
  user: UserStatus;
  collapsed?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, collapsed }) => {
  const getBadgeVariant = (role: UserStatus["role"]) => {
    switch (role) {
      case "admin":
        return "admin";
      case "pro":
        return "pro";
      case "free":
        return "free";
      default:
        return "default";
    }
  };

  if (collapsed) {
    return (
      <div className="flex justify-center">
        <div className="relative">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.username}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-semibold text-sm">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}
          {/* Status Dot */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-white dark:border-neutral-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.username}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-semibold">
            {user.username.charAt(0).toUpperCase()}
          </div>
        )}
        {/* Online Status */}
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-white dark:border-neutral-800" />
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
          {user.username}
        </p>
        <Badge variant={getBadgeVariant(user.role)} size="sm">
          {user.role.toUpperCase()}
        </Badge>
      </div>

      {/* Settings Icon */}
      <button
        className="flex-shrink-0 p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors"
        title="Settings"
      >
        <svg className="w-4 h-4 text-neutral-600 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  );
};
