"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Zap, Plus, Download, RefreshCw } from "lucide-react";

const StatsCards = dynamic(() => import("@/components/dashboard/StatsCards"), { loading: () => <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{Array(4).fill(0).map((_,i) => <div key={i} className="h-32 rounded-2xl bg-dark-700/50 animate-pulse" />)}</div> });
const BoostSimulator = dynamic(() => import("@/components/dashboard/BoostSimulator"), { loading: () => <div className="h-96 rounded-2xl bg-dark-700/50 animate-pulse" /> });
const PlatformStatus = dynamic(() => import("@/components/dashboard/PlatformStatus"));
const RecentActivity = dynamic(() => import("@/components/dashboard/RecentActivity"));
const CampaignList = dynamic(() => import("@/components/dashboard/CampaignList"));
const Chart = dynamic(() => import("@/components/ui/Chart"), { loading: () => <div className="h-64 rounded-xl bg-dark-600/30 animate-pulse" /> });

const weeklyData = [
  { name: "Mon", views: 4200, likes: 420, comments: 84 },
  { name: "Tue", views: 5800, likes: 580, comments: 116 },
  { name: "Wed", views: 7100, likes: 710, comments: 142 },
  { name: "Thu", views: 6200, likes: 620, comments: 124 },
  { name: "Fri", views: 8900, likes: 890, comments: 178 },
  { name: "Sat", views: 10200, likes: 1020, comments: 204 },
  { name: "Sun", views: 9500, likes: 950, comments: 190 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-100">Dashboard</h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Welcome back! Here&apos;s your social media overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" icon={<RefreshCw className="h-4 w-4" />}>
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button variant="ghost" size="sm" icon={<Download className="h-4 w-4" />}>
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-300">Views Over Time</h3>
            <div className="flex items-center gap-1">
              {["7D", "30D", "90D"].map((period) => (
                <button
                  key={period}
                  className="px-2 md:px-3 py-1 text-xs rounded-lg text-gray-400 hover:text-gray-200 hover:bg-dark-600 transition-colors"
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <Chart
            data={weeklyData}
            type="area"
            dataKeys={["views", "likes"]}
            colors={["#8b5cf6", "#06b6d4"]}
            height={280}
          />
        </Card>

        <BoostSimulator />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <PlatformStatus />
        <RecentActivity />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-300">Active Campaigns</h3>
          <Button variant="ghost" size="sm" icon={<Plus className="h-4 w-4" />}>
            <span className="hidden sm:inline">New Campaign</span>
          </Button>
        </div>
        <CampaignList />
      </div>
    </div>
  );
}
