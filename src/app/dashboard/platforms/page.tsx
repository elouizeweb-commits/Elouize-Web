"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { cn, formatNumber, getPlatformColor } from "@/lib/utils";
import { PlatformType } from "@/types";
import {
  Instagram,
  Facebook,
  Youtube,
  Plus,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Unlink,
  Users,
  TrendingUp,
  Eye,
} from "lucide-react";

interface ConnectedPlatform {
  id: string;
  type: PlatformType;
  username: string;
  followers: number;
  engagement: number;
  lastSync: string;
  isConnected: boolean;
}

const defaultPlatforms: ConnectedPlatform[] = [
  { id: "1", type: "INSTAGRAM", username: "@socialbooster", followers: 45200, engagement: 4.2, lastSync: "2 min ago", isConnected: true },
  { id: "2", type: "FACEBOOK", username: "Elouize Boost Pro", followers: 28900, engagement: 3.8, lastSync: "5 min ago", isConnected: true },
  { id: "3", type: "TIKTOK", username: "", followers: 0, engagement: 0, lastSync: "Never", isConnected: false },
];

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState(defaultPlatforms);
  const [showConnectModal, setShowConnectModal] = useState(false);

  const getIcon = (type: PlatformType) => {
    switch (type) {
      case "INSTAGRAM": return <Instagram className="h-5 w-5 md:h-6 md:w-6" />;
      case "FACEBOOK": return <Facebook className="h-5 w-5 md:h-6 md:w-6" />;
      case "TIKTOK": return <Youtube className="h-5 w-5 md:h-6 md:w-6" />;
    }
  };

  const handleDisconnect = (id: string) => {
    setPlatforms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isConnected: false, username: "", followers: 0, engagement: 0 } : p))
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-100">Platforms</h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Manage your connected social media accounts</p>
        </div>
        <Button icon={<Plus className="h-4 w-4" />} onClick={() => setShowConnectModal(true)} className="self-start">
          Connect Platform
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {platforms.map((platform) => (
          <Card key={platform.id} hover glow={platform.isConnected} className="relative">
            {!platform.isConnected && (
              <div className="absolute inset-0 rounded-2xl bg-dark-700/30 flex items-center justify-center z-10">
                <div className="text-center">
                  <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400 mb-3">Not Connected</p>
                  <Button size="sm" icon={<Plus className="h-3.5 w-3.5" />}>Connect</Button>
                </div>
              </div>
            )}

            <div className={cn(!platform.isConnected && "opacity-20 pointer-events-none")}>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className={cn("w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shrink-0", getPlatformColor(platform.type))}>
                  {getIcon(platform.type)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm md:text-base font-semibold text-gray-200">{platform.type}</h3>
                  <p className="text-xs md:text-sm text-gray-400 truncate">{platform.username || "Not connected"}</p>
                </div>
                {platform.isConnected && (
                  <Badge variant="success" dot className="ml-auto hidden sm:inline-flex">
                    Active
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="text-center p-2 md:p-3 rounded-xl bg-dark-600/30">
                  <Users className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-500 mx-auto mb-1" />
                  <p className="text-xs md:text-sm font-semibold text-gray-200">{formatNumber(platform.followers)}</p>
                  <p className="text-[10px] md:text-xs text-gray-500">Followers</p>
                </div>
                <div className="text-center p-2 md:p-3 rounded-xl bg-dark-600/30">
                  <TrendingUp className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-500 mx-auto mb-1" />
                  <p className="text-xs md:text-sm font-semibold text-gray-200">{platform.engagement}%</p>
                  <p className="text-[10px] md:text-xs text-gray-500">Engagement</p>
                </div>
                <div className="text-center p-2 md:p-3 rounded-xl bg-dark-600/30">
                  <Eye className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-500 mx-auto mb-1" />
                  <p className="text-xs md:text-sm font-semibold text-gray-200">{formatNumber(Math.round(platform.followers * 3.5))}</p>
                  <p className="text-[10px] md:text-xs text-gray-500">Reach</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-500 mb-3 md:mb-4">
                <span className="truncate">Last sync: {platform.lastSync}</span>
                <button className="flex items-center gap-1 text-purple-400 hover:text-purple-300 shrink-0 ml-2">
                  <RefreshCw className="h-3 w-3" />
                  <span className="hidden sm:inline">Sync now</span>
                </button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" fullWidth icon={<ExternalLink className="h-3.5 w-3.5" />}>
                  <span className="hidden sm:inline">Open Profile</span>
                  <span className="sm:hidden">Open</span>
                </Button>
                <Button variant="danger" size="sm" icon={<Unlink className="h-3.5 w-3.5" />} onClick={() => handleDisconnect(platform.id)}>
                  <span className="hidden sm:inline">Disconnect</span>
                  <span className="sm:hidden">Unlink</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        title="Connect a Platform"
        description="Choose a platform to connect to your account"
      >
        <div className="space-y-3">
          {(["INSTAGRAM", "FACEBOOK", "TIKTOK"] as PlatformType[]).map((type) => {
            const connected = platforms.find((p) => p.type === type)?.isConnected;
            return (
              <button
                key={type}
                disabled={connected}
                className={cn(
                  "w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border transition-all",
                  connected
                    ? "bg-dark-600/30 border-dark-500/30 opacity-50 cursor-not-allowed"
                    : "bg-dark-600/50 border-dark-500/50 hover:border-purple-500/30 hover:bg-dark-600"
                )}
              >
                <div className={cn("w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shrink-0", getPlatformColor(type))}>
                  {getIcon(type)}
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-200">{type}</p>
                  <p className="text-xs text-gray-500">{connected ? "Already connected" : "Click to authorize"}</p>
                </div>
                {connected ? <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" /> : <Plus className="h-5 w-5 text-gray-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
