"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "purple";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "sm", dot, children, ...props }, ref) => {
    const variants = {
      default: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      danger: "bg-red-500/20 text-red-400 border-red-500/30",
      info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };

    const sizes = {
      sm: "text-xs px-2 py-0.5",
      md: "text-xs px-2.5 py-1",
      lg: "text-sm px-3 py-1",
    };

    const dotColors = {
      default: "bg-gray-400",
      success: "bg-emerald-400",
      warning: "bg-yellow-400",
      danger: "bg-red-400",
      info: "bg-blue-400",
      purple: "bg-purple-400",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 font-medium rounded-full border",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])} />}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
export default Badge;
