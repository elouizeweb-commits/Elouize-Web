"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn, formatNumber, getStatusColor, calculateProgress, getPlatformBg } from "@/lib/utils";
import { Campaign } from "@/types";
import { Play, Pause, MoreHorizontal, TrendingUp } from "lucide-react";

interface CampaignListProps {
  campaigns?: Campaign[];
  onAction?: (id: string, action: string) => void;
}

const defaultCampaigns: Campaign[] = [
  {
    id: "1", userId: "u1", platformId: "p1", name: "Summer Collection Launch", platform: "INSTAGRAM", videoUrl: "https://instagram.com/reel/abc123",
    targetViews: 50000, targetLikes: 5000, targetComments: 500, targetShares: 200, budget: 500, spentAmount: 250, status: "ACTIVE",
    startDate: new Date("2024-06-01"), endDate: new Date("2024-07-01"), currentViews: 32000, currentLikes: 3200, currentComments: 320, currentShares: 128, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "2", userId: "u1", platformId: "p2", name: "Product Demo Video", platform: "FACEBOOK", videoUrl: "https://facebook.com/watch?v=456",
    targetViews: 100000, targetLikes: 10000, targetComments: 2000, targetShares: 500, budget: 1000, spentAmount: 800, status: "ACTIVE",
    startDate: new Date("2024-05-15"), endDate: new Date("2024-06-15"), currentViews: 78000, currentLikes: 7800, currentComments: 1560, currentShares: 390, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "3", userId: "u1", platformId: "p3", name: "TikTok Dance Challenge", platform: "TIKTOK", videoUrl: "https://tiktok.com/@user/video/789",
    targetViews: 200000, targetLikes: 20000, targetComments: 3000, targetShares: 1000, budget: 2000, spentAmount: 1500, status: "PAUSED",
    startDate: new Date("2024-05-01"), endDate: new Date("2024-06-01"), currentViews: 145000, currentLikes: 14500, currentComments: 2175, currentShares: 725, createdAt: new Date(), updatedAt: new Date(),
  },
];

export default function CampaignList({ campaigns = defaultCampaigns, onAction }: CampaignListProps) {
  return (
    <div className="space-y-3">
      {campaigns.map((campaign) => {
        const progress = calculateProgress(campaign.currentViews, campaign.targetViews);
        return (
          <Card key={campaign.id} hover className="group">
            {/* Mobile layout */}
            <div className="flex flex-col gap-3 sm:hidden">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl border flex items-center justify-center shrink-0", getPlatformBg(campaign.platform))}>
                  <TrendingUp className="h-4 w-4 text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-200 truncate">{campaign.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={campaign.status === "ACTIVE" ? "success" : campaign.status === "PAUSED" ? "warning" : campaign.status === "COMPLETED" ? "info" : "default"}
                      dot size="sm"
                    >
                      {campaign.status}
                    </Badge>
                    <Badge variant="purple" size="sm">{campaign.platform}</Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[10px] text-gray-500">
                <span>Views: {formatNumber(campaign.currentViews)} / {formatNumber(campaign.targetViews)}</span>
                <span>Likes: {formatNumber(campaign.currentLikes)}</span>
              </div>

              <div className="w-full bg-dark-600 rounded-full h-2 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">{progress}% complete - ${campaign.spentAmount}/${campaign.budget}</span>
                <div className="flex items-center gap-1">
                  {campaign.status === "ACTIVE" ? (
                    <Button variant="ghost" size="sm" icon={<Pause className="h-3.5 w-3.5" />} onClick={() => onAction?.(campaign.id, "pause")} className="!px-2">
                      Pause
                    </Button>
                  ) : campaign.status === "PAUSED" || campaign.status === "DRAFT" ? (
                    <Button variant="primary" size="sm" icon={<Play className="h-3.5 w-3.5" />} onClick={() => onAction?.(campaign.id, "start")} className="!px-2">
                      Start
                    </Button>
                  ) : null}
                  <button className="p-1.5 rounded-lg hover:bg-dark-600 text-gray-400 hover:text-gray-200 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden sm:flex items-start gap-4">
              <div className={cn("w-12 h-12 rounded-xl border flex items-center justify-center shrink-0", getPlatformBg(campaign.platform))}>
                <TrendingUp className="h-5 w-5 text-gray-300" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-gray-200 truncate">{campaign.name}</h3>
                  <Badge
                    variant={campaign.status === "ACTIVE" ? "success" : campaign.status === "PAUSED" ? "warning" : campaign.status === "COMPLETED" ? "info" : "default"}
                    dot size="sm"
                  >
                    {campaign.status}
                  </Badge>
                  <Badge variant="purple" size="sm">{campaign.platform}</Badge>
                </div>

                <div className="flex items-center gap-6 text-xs text-gray-500 mb-3">
                  <span>Views: {formatNumber(campaign.currentViews)} / {formatNumber(campaign.targetViews)}</span>
                  <span>Likes: {formatNumber(campaign.currentLikes)} / {formatNumber(campaign.targetLikes)}</span>
                  <span>Comments: {formatNumber(campaign.currentComments)} / {formatNumber(campaign.targetComments)}</span>
                </div>

                <div className="w-full bg-dark-600 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs text-gray-500">{progress}% complete</span>
                  <span className="text-xs text-gray-500">Budget: ${campaign.spentAmount} / ${campaign.budget}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                {campaign.status === "ACTIVE" ? (
                  <Button variant="ghost" size="sm" icon={<Pause className="h-3.5 w-3.5" />} onClick={() => onAction?.(campaign.id, "pause")}>Pause</Button>
                ) : campaign.status === "PAUSED" || campaign.status === "DRAFT" ? (
                  <Button variant="primary" size="sm" icon={<Play className="h-3.5 w-3.5" />} onClick={() => onAction?.(campaign.id, "start")}>Start</Button>
                ) : null}
                <button className="p-2 rounded-lg hover:bg-dark-600 text-gray-400 hover:text-gray-200 transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
