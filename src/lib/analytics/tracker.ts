import prisma from "@/lib/db";
import { DashboardStats } from "@/types";

export class AnalyticsTracker {
  async trackDailyAnalytics(campaignId: string): Promise<void> {
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { platformRel: true },
    });
    if (!campaign || !campaign.platformRel) return;

    const existing = await prisma.analytics.findFirst({
      where: {
        campaignId,
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });

    const viewsDelta = Math.floor(Math.random() * 200) + 50;
    const likesDelta = Math.floor(Math.random() * 20) + 5;
    const commentsDelta = Math.floor(Math.random() * 10) + 1;
    const sharesDelta = Math.floor(Math.random() * 5);
    const engagement = viewsDelta > 0 ? ((likesDelta + commentsDelta + sharesDelta) / viewsDelta) * 100 : 0;

    if (existing) {
      await prisma.analytics.update({
        where: { id: existing.id },
        data: {
          views: existing.views + viewsDelta,
          likes: existing.likes + likesDelta,
          comments: existing.comments + commentsDelta,
          shares: existing.shares + sharesDelta,
          engagement,
          impressions: existing.impressions + viewsDelta * 3,
          reach: existing.reach + viewsDelta * 2,
        },
      });
    } else {
      await prisma.analytics.create({
        data: {
          campaignId,
          platform: campaign.platform,
          views: viewsDelta,
          likes: likesDelta,
          comments: commentsDelta,
          shares: sharesDelta,
          engagement,
          impressions: viewsDelta * 3,
          reach: viewsDelta * 2,
        },
      });
    }
  }

  async getDashboardStats(userId: string): Promise<DashboardStats> {
    const campaigns = await prisma.campaign.findMany({ where: { userId } });

    const totalViews = campaigns.reduce((sum, c) => sum + c.currentViews, 0);
    const totalLikes = campaigns.reduce((sum, c) => sum + c.currentLikes, 0);
    const totalComments = campaigns.reduce((sum, c) => sum + c.currentComments, 0);
    const totalShares = campaigns.reduce((sum, c) => sum + c.currentShares, 0);
    const activeCampaigns = campaigns.filter((c) => c.status === "ACTIVE").length;
    const completedCampaigns = campaigns.filter((c) => c.status === "COMPLETED").length;
    const totalRevenue = campaigns.reduce((sum, c) => sum + c.spentAmount, 0);
    const engagementRate = totalViews > 0 ? ((totalLikes + totalComments + totalShares) / totalViews) * 100 : 0;

    return {
      totalViews,
      totalLikes,
      totalComments,
      totalShares,
      activeCampaigns,
      completedCampaigns,
      totalRevenue,
      engagementRate,
    };
  }

  async getCampaignAnalytics(campaignId: string, days: number = 30): Promise<any[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return prisma.analytics.findMany({
      where: {
        campaignId,
        date: { gte: startDate },
      },
      orderBy: { date: "asc" },
    });
  }

  async getPlatformComparison(userId: string): Promise<Record<string, { followers: number; engagement: number; campaigns: number }>> {
    const platforms = await prisma.platform.findMany({ where: { userId } });
    const campaigns = await prisma.campaign.findMany({ where: { userId } });

    const result: Record<string, { followers: number; engagement: number; campaigns: number }> = {
      INSTAGRAM: { followers: 0, engagement: 0, campaigns: 0 },
      FACEBOOK: { followers: 0, engagement: 0, campaigns: 0 },
      TIKTOK: { followers: 0, engagement: 0, campaigns: 0 },
    };

    platforms.forEach((p) => {
      result[p.type].followers = p.followersCount;
    });

    campaigns.forEach((c) => {
      result[c.platform].campaigns++;
      if (c.currentViews > 0) {
        result[c.platform].engagement += ((c.currentLikes + c.currentComments + c.currentShares) / c.currentViews) * 100;
      }
    });

    return result;
  }

  async getRecentActivity(userId: string, limit: number = 10): Promise<any[]> {
    const campaigns = await prisma.campaign.findMany({
      where: { userId },
      include: { boostTasks: { orderBy: { updatedAt: "desc" }, take: 1 } },
      orderBy: { updatedAt: "desc" },
      take: limit,
    });

    return campaigns.map((c) => ({
      id: c.id,
      name: c.name,
      platform: c.platform,
      status: c.status,
      lastActivity: c.updatedAt,
      latestTask: c.boostTasks[0] || null,
    }));
  }

  async exportAnalytics(userId: string, format: string = "json"): Promise<any> {
    const campaigns = await prisma.campaign.findMany({
      where: { userId },
      include: { analytics: true },
    });

    const data = campaigns.map((c) => ({
      campaign: c.name,
      platform: c.platform,
      status: c.status,
      views: c.currentViews,
      likes: c.currentLikes,
      comments: c.currentComments,
      shares: c.currentShares,
      analytics: c.analytics,
    }));

    return { format, data, exportedAt: new Date() };
  }
}

export const analyticsTracker = new AnalyticsTracker();
