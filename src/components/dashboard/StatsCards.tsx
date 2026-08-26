"use client";

import Card from "@/components/ui/Card";
import { cn, formatNumber, formatPercentage, formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Eye, Heart, MessageCircle, Users } from "lucide-react";

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
  sparkline?: number[];
}

const defaultStats: StatCard[] = [
  {
    title: "Total Views",
    value: "2.4M",
    change: 12.5,
    icon: <Eye className="h-5 w-5" />,
    color: "from-purple-500 to-blue-500",
    sparkline: [10, 25, 20, 35, 30, 45, 40, 55, 50, 65, 60, 75],
  },
  {
    title: "Active Campaigns",
    value: 8,
    change: 3,
    icon: <Users className="h-5 w-5" />,
    color: "from-blue-500 to-cyan-500",
    sparkline: [5, 3, 6, 4, 7, 5, 8, 6, 9, 7, 8, 8],
  },
  {
    title: "Engagement Rate",
    value: "4.8%",
    change: 0.8,
    icon: <Heart className="h-5 w-5" />,
    color: "from-cyan-500 to-emerald-500",
    sparkline: [3.2, 3.5, 3.8, 4.0, 4.2, 4.1, 4.3, 4.5, 4.6, 4.7, 4.8, 4.8],
  },
  {
    title: "Revenue",
    value: "$12,450",
    change: 18.2,
    icon: <MessageCircle className="h-5 w-5" />,
    color: "from-emerald-500 to-yellow-500",
    sparkline: [8000, 9200, 9800, 10500, 11000, 11200, 11800, 12000, 12200, 12300, 12400, 12450],
  },
];

interface StatsCardsProps {
  stats?: StatCard[];
}

export default function StatsCards({ stats = defaultStats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} hover className="group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-100">{stat.value}</p>
              <div className="flex items-center gap-1 mt-2">
                {stat.change > 0 ? (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    stat.change > 0 ? "text-emerald-400" : "text-red-400"
                  )}
                >
                  {stat.change > 0 ? "+" : ""}
                  {typeof stat.value === "string" && stat.value.includes("$")
                    ? formatCurrency(stat.change * 100).replace("$", "+$")
                    : stat.change}
                </span>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
            </div>
            <div
              className={cn(
                "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shrink-0",
                stat.color
              )}
            >
              {stat.icon}
            </div>
          </div>

          {stat.sparkline && (
            <div className="mt-4 h-10 flex items-end gap-[2px]">
              {stat.sparkline.map((val, i) => {
                const max = Math.max(...stat.sparkline!);
                const height = max > 0 ? (val / max) * 100 : 0;
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 rounded-sm transition-all duration-300 group-hover:opacity-100",
                      i === stat.sparkline!.length - 1
                        ? "bg-gradient-to-t opacity-100"
                        : "opacity-50 bg-gradient-to-t",
                      stat.color
                    )}
                    style={{ height: `${Math.max(height, 8)}%` }}
                  />
                );
              })}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
