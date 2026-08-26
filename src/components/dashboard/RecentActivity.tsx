"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { cn, getPlatformColor } from "@/lib/utils";
import { Activity, TrendingUp, AlertCircle, CheckCircle, Clock, Zap } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "boost_started" | "milestone_reached" | "campaign_completed" | "error" | "sync";
  platform: string;
  message: string;
  time: string;
}

const defaultActivity: ActivityItem[] = [
  {
    id: "1",
    type: "boost_started",
    platform: "INSTAGRAM",
    message: "Boost started for 'Summer Collection Launch'",
    time: "2 min ago",
  },
  {
    id: "2",
    type: "milestone_reached",
    platform: "FACEBOOK",
    message: "Product Demo reached 50K views!",
    time: "15 min ago",
  },
  {
    id: "3",
    type: "campaign_completed",
    platform: "TIKTOK",
    message: "Dance Challenge campaign completed",
    time: "1 hour ago",
  },
  {
    id: "4",
    type: "error",
    platform: "INSTAGRAM",
    message: "Rate limit reached for Instagram API",
    time: "2 hours ago",
  },
  {
    id: "5",
    type: "sync",
    platform: "FACEBOOK",
    message: "Platform data synced successfully",
    time: "3 hours ago",
  },
];

interface RecentActivityProps {
  activities?: ActivityItem[];
}

export default function RecentActivity({ activities = defaultActivity }: RecentActivityProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "boost_started":
        return <Zap className="h-4 w-4 text-purple-400" />;
      case "milestone_reached":
        return <TrendingUp className="h-4 w-4 text-emerald-400" />;
      case "campaign_completed":
        return <CheckCircle className="h-4 w-4 text-blue-400" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      case "sync":
        return <Clock className="h-4 w-4 text-yellow-400" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-300">Recent Activity</h3>
        <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">View all</button>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 group">
            <div className="mt-0.5 p-1.5 rounded-lg bg-dark-600/50 group-hover:bg-dark-600 transition-colors">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300 leading-snug">{activity.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{activity.time}</span>
                <Badge variant="purple" size="sm">{activity.platform}</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
