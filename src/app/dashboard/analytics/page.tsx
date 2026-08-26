"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Table from "@/components/ui/Table";
import { formatNumber } from "@/lib/utils";
import { Download, Eye, Heart, MessageCircle, Share2 } from "lucide-react";

const Chart = dynamic(() => import("@/components/ui/Chart"), { loading: () => <div className="h-64 rounded-xl bg-dark-600/30 animate-pulse" /> });

const performanceData = [
  { name: "Jan", views: 12000, likes: 1200, comments: 240, shares: 60 },
  { name: "Feb", views: 18000, likes: 1800, comments: 360, shares: 90 },
  { name: "Mar", views: 25000, likes: 2500, comments: 500, shares: 125 },
  { name: "Apr", views: 32000, likes: 3200, comments: 640, shares: 160 },
  { name: "May", views: 48000, likes: 4800, comments: 960, shares: 240 },
  { name: "Jun", views: 65000, likes: 6500, comments: 1300, shares: 325 },
];

const platformData = [
  { name: "Instagram", value: 45 },
  { name: "Facebook", value: 30 },
  { name: "TikTok", value: 25 },
];

const topCampaigns = [
  { name: "Summer Collection", platform: "INSTAGRAM", views: 125000, engagement: 5.2 },
  { name: "Product Demo", platform: "FACEBOOK", views: 89000, engagement: 4.8 },
  { name: "Dance Challenge", platform: "TIKTOK", views: 250000, engagement: 8.1 },
  { name: "Brand Story", platform: "INSTAGRAM", views: 67000, engagement: 3.9 },
  { name: "Tutorial Series", platform: "FACEBOOK", views: 43000, engagement: 6.2 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d");

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-100">Analytics</h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Track your performance and growth metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-dark-600/50 rounded-xl border border-dark-500/50 overflow-x-auto no-scrollbar">
            {["7d", "30d", "90d", "1y"].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-2 md:px-3 py-1.5 text-[10px] md:text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  dateRange === range
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" icon={<Download className="h-4 w-4" />}>
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Total Views", value: "2.4M", change: "+12.5%", icon: <Eye className="h-4 w-4 md:h-5 md:w-5" />, color: "from-purple-500 to-blue-500" },
          { label: "Total Likes", value: "180K", change: "+8.3%", icon: <Heart className="h-4 w-4 md:h-5 md:w-5" />, color: "from-blue-500 to-cyan-500" },
          { label: "Total Comments", value: "32K", change: "+15.7%", icon: <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />, color: "from-cyan-500 to-emerald-500" },
          { label: "Total Shares", value: "8.5K", change: "+22.1%", icon: <Share2 className="h-4 w-4 md:h-5 md:w-5" />, color: "from-emerald-500 to-yellow-500" },
        ].map((stat, i) => (
          <Card key={i} hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] md:text-sm text-gray-400 mb-1">{stat.label}</p>
                <p className="text-lg md:text-2xl font-bold text-gray-100">{stat.value}</p>
                <span className="text-[10px] md:text-xs font-medium text-emerald-400">{stat.change}</span>
              </div>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shrink-0`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Performance Overview</h3>
          <Chart
            data={performanceData}
            type="area"
            dataKeys={["views", "likes", "comments"]}
            colors={["#8b5cf6", "#3b82f6", "#06b6d4"]}
            height={350}
          />
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Platform Distribution</h3>
          <Chart
            data={platformData}
            type="pie"
            colors={["#ec4899", "#3b82f6", "#06b6d4"]}
            height={200}
          />
          <div className="mt-4 space-y-2">
            {platformData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ["#ec4899", "#3b82f6", "#06b6d4"][i] }} />
                  <span className="text-gray-300">{item.name}</span>
                </div>
                <span className="text-gray-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Top Performing Campaigns</h3>
        <Table
          columns={[
            { key: "name", header: "Campaign" },
            { key: "platform", header: "Platform", render: (item: any) => <Badge variant="purple" size="sm">{item.platform}</Badge> },
            { key: "views", header: "Views", render: (item: any) => formatNumber(item.views) },
            { key: "engagement", header: "Engagement", render: (item: any) => <span className="text-emerald-400">{item.engagement}%</span> },
          ]}
          data={topCampaigns}
          keyExtractor={(item: any) => item.name}
        />
      </Card>
    </div>
  );
}
