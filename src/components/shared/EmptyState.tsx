"use client";

import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16", className)}>
      <div className="w-16 h-16 rounded-2xl bg-dark-600/50 border border-dark-500/50 flex items-center justify-center mb-4">
        {icon || <Inbox className="h-8 w-8 text-gray-500" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-300 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-sm text-center mb-6">{description}</p>}
      {action}
    </div>
  );
}
