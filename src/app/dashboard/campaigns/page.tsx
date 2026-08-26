"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import CampaignList from "@/components/dashboard/CampaignList";
import { Plus, Search, Download, Megaphone } from "lucide-react";
import { Campaign, CampaignStatus, PlatformType } from "@/types";

const statusFilters: { label: string; value: CampaignStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Paused", value: "PAUSED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Draft", value: "DRAFT" },
];

export default function CampaignsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | "ALL">("ALL");
  const [loading, setLoading] = useState(false);

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    platform: "INSTAGRAM" as PlatformType,
    videoUrl: "",
    targetViews: "",
    targetLikes: "",
    targetComments: "",
    budget: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setShowCreateModal(false);
    setLoading(false);
    setNewCampaign({ name: "", platform: "INSTAGRAM", videoUrl: "", targetViews: "", targetLikes: "", targetComments: "", budget: "" });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-100">Campaigns</h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Manage and monitor all your boosting campaigns</p>
        </div>
        <Button icon={<Plus className="h-4 w-4" />} onClick={() => setShowCreateModal(true)} className="self-start">
          New Campaign
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-600/50 border border-dark-500/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
        </div>
        <div className="flex items-center gap-1 p-1 bg-dark-600/50 rounded-xl border border-dark-500/50 overflow-x-auto no-scrollbar">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-2 md:px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                statusFilter === filter.value
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <Button variant="ghost" size="sm" icon={<Download className="h-4 w-4" />}>
          <span className="hidden sm:inline">Export</span>
        </Button>
      </div>

      <CampaignList />

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Campaign"
        description="Set up a new boost campaign for your content"
        size="lg"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Campaign Name"
            placeholder="e.g., Summer Collection Launch"
            value={newCampaign.name}
            onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
            <div className="grid grid-cols-3 gap-2">
              {(["INSTAGRAM", "FACEBOOK", "TIKTOK"] as PlatformType[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setNewCampaign({ ...newCampaign, platform: p })}
                  className={`px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-medium transition-all border ${
                    newCampaign.platform === p
                      ? "bg-purple-500/20 border-purple-500/30 text-white"
                      : "bg-dark-600/50 border-dark-500/50 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Video URL"
            placeholder="https://instagram.com/reel/..."
            value={newCampaign.videoUrl}
            onChange={(e) => setNewCampaign({ ...newCampaign, videoUrl: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <Input
              label="Target Views"
              type="number"
              placeholder="10000"
              value={newCampaign.targetViews}
              onChange={(e) => setNewCampaign({ ...newCampaign, targetViews: e.target.value })}
            />
            <Input
              label="Target Likes"
              type="number"
              placeholder="1000"
              value={newCampaign.targetLikes}
              onChange={(e) => setNewCampaign({ ...newCampaign, targetLikes: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <Input
              label="Target Comments"
              type="number"
              placeholder="100"
              value={newCampaign.targetComments}
              onChange={(e) => setNewCampaign({ ...newCampaign, targetComments: e.target.value })}
            />
            <Input
              label="Budget ($)"
              type="number"
              placeholder="100"
              value={newCampaign.budget}
              onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" type="button" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Create Campaign
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
