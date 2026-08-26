"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { cn, formatNumber, getPlatformColor } from "@/lib/utils";
import { PlatformType } from "@/types";
import { Play, Instagram, Facebook, Youtube, Zap, TrendingUp, Clock, DollarSign } from "lucide-react";

interface SimulationResult {
  platform: PlatformType;
  estimatedViews: number;
  estimatedLikes: number;
  estimatedComments: number;
  estimatedCost: number;
  duration: number;
  confidence: number;
}

export default function BoostSimulator() {
  const [platform, setPlatform] = useState<PlatformType>("INSTAGRAM");
  const [videoUrl, setVideoUrl] = useState("");
  const [targetViews, setTargetViews] = useState("10000");
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleSimulate = async () => {
    setIsSimulating(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 2000));

    const views = parseInt(targetViews) || 10000;
    setResult({
      platform,
      estimatedViews: views,
      estimatedLikes: Math.round(views * 0.05),
      estimatedComments: Math.round(views * 0.01),
      estimatedCost: (views / 1000) * 2.5,
      duration: Math.ceil(views / 1000) * 24,
      confidence: 78 + Math.floor(Math.random() * 15),
    });
    setIsSimulating(false);
  };

  const platforms = [
    { id: "INSTAGRAM" as PlatformType, name: "Instagram", icon: <Instagram className="h-4 w-4" /> },
    { id: "FACEBOOK" as PlatformType, name: "Facebook", icon: <Facebook className="h-4 w-4" /> },
    { id: "TIKTOK" as PlatformType, name: "TikTok", icon: <Youtube className="h-4 w-4" /> },
  ];

  return (
    <Card gradient>
      <div className="flex items-center gap-2 mb-6">
        <Zap className="h-5 w-5 text-purple-400" />
        <h3 className="text-base font-semibold text-gray-200">Boost Simulator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
          <div className="grid grid-cols-3 gap-2">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={cn(
                  "flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border",
                  platform === p.id
                    ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30 text-white"
                    : "bg-dark-600/50 border-dark-500/50 text-gray-400 hover:text-gray-200 hover:border-dark-500"
                )}
              >
                {p.icon}
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Video URL"
          placeholder="https://instagram.com/reel/..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          icon={<TrendingUp className="h-4 w-4" />}
        />

        <Input
          label="Target Views"
          placeholder="10000"
          type="number"
          value={targetViews}
          onChange={(e) => setTargetViews(e.target.value)}
          hint="Minimum 1,000 views"
        />

        <Button
          variant="primary"
          fullWidth
          loading={isSimulating}
          icon={<Play className="h-4 w-4" />}
          onClick={handleSimulate}
        >
          Run Simulation
        </Button>

        {result && (
          <div className="mt-6 p-4 rounded-xl bg-dark-600/50 border border-dark-500/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Estimated Views</span>
              <span className="text-sm font-semibold text-gray-200">{formatNumber(result.estimatedViews)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Estimated Likes</span>
              <span className="text-sm font-semibold text-gray-200">{formatNumber(result.estimatedLikes)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Est. Comments</span>
              <span className="text-sm font-semibold text-gray-200">{formatNumber(result.estimatedComments)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Estimated Cost</span>
              <span className="text-sm font-semibold text-emerald-400">${result.estimatedCost.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Duration</span>
              <span className="text-sm font-semibold text-gray-200">{result.duration}h</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-dark-500/50">
              <span className="text-sm text-gray-400">Confidence</span>
              <Badge variant={result.confidence > 85 ? "success" : "warning"}>
                {result.confidence}%
              </Badge>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
