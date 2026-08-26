import prisma from "@/lib/db";
import { BoostSimulation, BoostReport, GrowthPrediction } from "@/types";

export class BoostSimulator {
  async simulateViews(campaignId: string, count: number): Promise<BoostSimulation> {
    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign) throw new Error("Campaign not found");

    const platformMultipliers: Record<string, number> = {
      INSTAGRAM: 1.2,
      FACEBOOK: 1.0,
      TIKTOK: 1.5,
    };

    const multiplier = platformMultipliers[campaign.platform] || 1.0;
    const estimatedViews = Math.round(count * multiplier * (0.8 + Math.random() * 0.4));
    const estimatedLikes = Math.round(estimatedViews * 0.05 * (0.8 + Math.random() * 0.4));
    const estimatedComments = Math.round(estimatedViews * 0.01 * (0.8 + Math.random() * 0.4));
    const estimatedShares = Math.round(estimatedViews * 0.005 * (0.8 + Math.random() * 0.4));
    const estimatedEngagement =
      estimatedViews > 0 ? ((estimatedLikes + estimatedComments + estimatedShares) / estimatedViews) * 100 : 0;
    const estimatedCost = (estimatedViews / 1000) * 2.5;
    const duration = Math.ceil(count / 1000) * 24;

    return {
      campaignId,
      platform: campaign.platform as any,
      estimatedViews,
      estimatedLikes,
      estimatedComments,
      estimatedShares,
      estimatedEngagement,
      estimatedCost,
      duration,
      confidence: 75 + Math.round(Math.random() * 20),
    };
  }

  async simulateEngagement(campaignId: string): Promise<{
    totalEngagement: number;
    engagementRate: number;
    projectedGrowth: number;
    peakEngagementHour: number;
    estimatedReach: number;
  }> {
    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign) throw new Error("Campaign not found");

    const baseEngagement = campaign.currentViews * 0.03;
    const totalEngagement = Math.round(baseEngagement * (0.8 + Math.random() * 0.4));
    const engagementRate = campaign.currentViews > 0 ? (totalEngagement / campaign.currentViews) * 100 : 0;
    const projectedGrowth = totalEngagement * 0.15;
    const peakEngagementHour = Math.floor(Math.random() * 12) + 8;
    const estimatedReach = Math.round(campaign.currentViews * 3.5);

    return {
      totalEngagement,
      engagementRate,
      projectedGrowth,
      peakEngagementHour,
      estimatedReach,
    };
  }

  async predictGrowth(campaignId: string, days: number): Promise<GrowthPrediction[]> {
    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign) throw new Error("Campaign not found");

    const predictions: GrowthPrediction[] = [];
    const dailyGrowthRate = campaign.status === "ACTIVE" ? 0.02 + Math.random() * 0.03 : 0.01;
    const currentViews = campaign.currentViews || 100;
    const currentLikes = campaign.currentLikes || 10;
    const currentComments = campaign.currentComments || 2;

    for (let i = 1; i <= days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      const growthFactor = Math.pow(1 + dailyGrowthRate, i);
      const noise = 0.9 + Math.random() * 0.2;

      predictions.push({
        date: date.toISOString().split("T")[0],
        views: Math.round(currentViews * growthFactor * noise),
        likes: Math.round(currentLikes * growthFactor * noise),
        comments: Math.round(currentComments * growthFactor * noise),
        confidence: Math.max(95 - i * 2, 50),
      });
    }

    return predictions;
  }

  async generateReport(campaignId: string): Promise<BoostReport> {
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { analytics: true, boostTasks: true },
    });
    if (!campaign) throw new Error("Campaign not found");

    const analytics = campaign.analytics;
    const totalViews = analytics.reduce((sum, a) => sum + a.views, 0) || campaign.currentViews;
    const totalLikes = analytics.reduce((sum, a) => sum + a.likes, 0) || campaign.currentLikes;
    const totalComments = analytics.reduce((sum, a) => sum + a.comments, 0) || campaign.currentComments;
    const totalShares = analytics.reduce((sum, a) => sum + a.shares, 0) || campaign.currentShares;
    const avgEngagement =
      analytics.length > 0 ? analytics.reduce((sum, a) => sum + a.engagement, 0) / analytics.length : 0;

    const peakHour = 14 + Math.floor(Math.random() * 6);
    const daysSinceStart = campaign.startDate
      ? Math.max(1, Math.ceil((Date.now() - new Date(campaign.startDate).getTime()) / 86400000))
      : 1;
    const growthRate = totalViews / daysSinceStart;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const topPerformingDay = days[Math.floor(Math.random() * 7)];

    const recommendations: string[] = [];
    if (totalViews < campaign.targetViews * 0.5) {
      recommendations.push("Consider increasing the boost budget to reach your views target.");
    }
    if (avgEngagement < 2) {
      recommendations.push("Try posting during peak hours (12-3 PM) to improve engagement.");
    }
    if (totalComments < campaign.targetComments * 0.3) {
      recommendations.push("Add a call-to-action in your video description to encourage comments.");
    }
    if (growthRate < 100) {
      recommendations.push("Your growth rate is moderate. Consider cross-promoting on multiple platforms.");
    }
    recommendations.push("Consistent posting schedule can improve algorithmic reach by 40%.");

    return {
      campaignId,
      totalViews,
      totalLikes,
      totalComments,
      totalShares,
      avgEngagement,
      peakHour,
      growthRate,
      topPerformingDay,
      recommendations,
    };
  }
}

export const boostSimulator = new BoostSimulator();
