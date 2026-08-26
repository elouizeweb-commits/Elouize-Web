"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { cn, formatNumber, getPlatformColor } from "@/lib/utils";
import { Instagram, Facebook, Youtube, RefreshCw } from "lucide-react";

interface PlatformStatusItem {
  name: string;
  platform: "INSTAGRAM" | "FACEBOOK" | "TIKTOK";
  connected: boolean;
  followers: number;
  engagement: number;
  lastSync: string;
}

const defaultPlatforms: PlatformStatusItem[] = [
  { name: "Instagram", platform: "INSTAGRAM", connected: true, followers: 45200, engagement: 4.2, lastSync: "2 min ago" },
  { name: "Facebook", platform: "FACEBOOK", connected: true, followers: 28900, engagement: 3.8, lastSync: "5 min ago" },
  { name: "TikTok", platform: "TIKTOK", connected: false, followers: 0, engagement: 0, lastSync: "Never" },
];

interface PlatformStatusProps {
  platforms?: PlatformStatusItem[];
}

export default function PlatformStatus({ platforms = defaultPlatforms }: PlatformStatusProps) {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "INSTAGRAM": return <Instagram className="h-4 w-4 md:h-5 md:w-5" />;
      case "FACEBOOK": return <Facebook className="h-4 w-4 md:h-5 md:w-5" />;
      case "TIKTOK": return <Youtube className="h-4 w-4 md:h-5 md:w-5" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-300">Platform Status</h3>
      {platforms.map((p) => (
        <Card key={p.platform} hover className="group">
          <div className="flex items-center gap-3 md:gap-4">
            <div className={cn("w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shrink-0", getPlatformColor(p.platform))}>
              {getIcon(p.platform)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-200">{p.name}</span>
                {p.connected ? (
                  <Badge variant="success" dot size="sm"><span className="hidden sm:inline">Connected</span><span className="sm:hidden">OK</span></Badge>
                ) : (
                  <Badge variant="danger" dot size="sm"><span className="hidden sm:inline">Disconnected</span><span className="sm:hidden">Off</span></Badge>
                )}
              </div>
              <div className="flex items-center gap-3 md:gap-4 mt-1">
                <span className="text-[10px] md:text-xs text-gray-500">{formatNumber(p.followers)} followers</span>
                <span className="text-[10px] md:text-xs text-gray-500">{p.engagement}% engagement</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] md:text-xs text-gray-500 mb-1">Last sync: {p.lastSync}</div>
              {p.connected && (
                <button className="p-1.5 rounded-lg hover:bg-dark-600 text-gray-500 hover:text-gray-300 transition-colors">
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
