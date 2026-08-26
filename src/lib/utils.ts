import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type PlatformType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return value.toFixed(1) + "%";
}

export function getPlatformColor(platform: PlatformType): string {
  switch (platform) {
    case "INSTAGRAM":
      return "from-pink-500 to-purple-600";
    case "FACEBOOK":
      return "from-blue-600 to-blue-500";
    case "TIKTOK":
      return "from-cyan-400 to-pink-500";
    default:
      return "from-gray-500 to-gray-400";
  }
}

export function getPlatformBg(platform: PlatformType): string {
  switch (platform) {
    case "INSTAGRAM":
      return "bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-pink-500/30";
    case "FACEBOOK":
      return "bg-gradient-to-r from-blue-600/20 to-blue-500/20 border-blue-500/30";
    case "TIKTOK":
      return "bg-gradient-to-r from-cyan-400/20 to-pink-500/20 border-cyan-500/30";
    default:
      return "bg-gray-500/20 border-gray-500/30";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "ACTIVE":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "PAUSED":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "COMPLETED":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "DRAFT":
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    case "CANCELLED":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "PENDING":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "IN_PROGRESS":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "FAILED":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
}

export function calculateProgress(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getInitials(name: string | null | undefined): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getVideoId(url: string, platform: PlatformType): string | null {
  try {
    const urlObj = new URL(url);
    switch (platform) {
      case "INSTAGRAM":
        return urlObj.pathname.split("/").filter(Boolean).pop() || null;
      case "FACEBOOK":
        return urlObj.searchParams.get("v") || urlObj.pathname.split("/").filter(Boolean).pop() || null;
      case "TIKTOK":
        return urlObj.pathname.split("/").filter(Boolean).pop() || null;
      default:
        return null;
    }
  } catch {
    return null;
  }
}
