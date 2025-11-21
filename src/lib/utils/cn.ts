// v1.0.2 - ClassName utility (similar to shadcn/ui)
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper precedence
 * Usage: cn("text-red-500", condition && "bg-blue-500", "p-4")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
