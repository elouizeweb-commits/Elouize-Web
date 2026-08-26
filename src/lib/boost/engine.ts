import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { InstagramPlatform } from "@/lib/platforms/instagram";
import { FacebookPlatform } from "@/lib/platforms/facebook";
import { TikTokPlatform } from "@/lib/platforms/tiktok";
import { QueueStatus } from "@/types";

const RATE_LIMIT_MS = 1000;
const BATCH_SIZE = 50;

export class BoostEngine {
  private isProcessing = false;
  private processingInterval: NodeJS.Timeout | null = null;

  async startBoost(campaignId: string): Promise<{ success: boolean; message: string }> {
    try {
      const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: { boostTasks: true, platformRel: true },
      });

      if (!campaign) return { success: false, message: "Campaign not found" };
      if (campaign.status === "ACTIVE") return { success: false, message: "Campaign already active" };

      const hasPlatform = campaign.platformRel && campaign.platformRel.accessToken;
      if (!hasPlatform) return { success: false, message: "No platform connected for this campaign" };

      await prisma.campaign.update({
        where: { id: campaignId },
        data: {
          status: "ACTIVE",
          startDate: campaign.startDate || new Date(),
        },
      });

      const tasks: { campaignId: string; type: string; target: number; priority: number }[] = [];

      if (campaign.targetViews > campaign.currentViews) {
        tasks.push({
          campaignId,
          type: "VIEWS",
          target: campaign.targetViews - campaign.currentViews,
          priority: 3,
        });
      }
      if (campaign.targetLikes > campaign.currentLikes) {
        tasks.push({
          campaignId,
          type: "LIKES",
          target: campaign.targetLikes - campaign.currentLikes,
          priority: 2,
        });
      }
      if (campaign.targetComments > campaign.currentComments) {
        tasks.push({
          campaignId,
          type: "COMMENTS",
          target: campaign.targetComments - campaign.currentComments,
          priority: 1,
        });
      }
      if (campaign.targetShares > campaign.currentShares) {
        tasks.push({
          campaignId,
          type: "SHARES",
          target: campaign.targetShares - campaign.currentShares,
          priority: 1,
        });
      }

      if (tasks.length > 0) {
        await prisma.boostTask.createMany({ data: tasks });
      }

      if (!this.isProcessing) {
        this.startProcessing();
      }

      return { success: true, message: `Boost started with ${tasks.length} tasks` };
    } catch (error) {
      return { success: false, message: `Failed to start boost: ${(error as Error).message}` };
    }
  }

  async stopBoost(campaignId: string): Promise<{ success: boolean; message: string }> {
    try {
      await prisma.campaign.update({
        where: { id: campaignId },
        data: { status: "PAUSED" },
      });

      await prisma.boostTask.updateMany({
        where: {
          campaignId,
          status: { in: ["PENDING", "IN_PROGRESS"] },
        },
        data: { status: "CANCELLED" },
      });

      return { success: true, message: "Boost stopped" };
    } catch (error) {
      return { success: false, message: `Failed to stop boost: ${(error as Error).message}` };
    }
  }

  async processQueue(): Promise<QueueStatus> {
    const tasks = await prisma.boostTask.groupBy({
      by: ["status"],
      _count: { id: true },
    });

    const statusCounts = tasks.reduce((acc, t) => {
      acc[t.status] = t._count.id;
      return acc;
    }, {} as Record<string, number>);

    const pendingTasks = await prisma.boostTask.findMany({
      where: { status: "PENDING" },
      include: { campaign: { include: { platformRel: true } } },
      orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
      take: BATCH_SIZE,
    });

    for (const task of pendingTasks) {
      await this.processTask(task);
      await sleep(RATE_LIMIT_MS);
    }

    const completedCount = statusCounts["COMPLETED"] || 0;
    const totalTasks = Object.values(statusCounts).reduce((a, b) => a + b, 0);

    return {
      total: totalTasks,
      pending: statusCounts["PENDING"] || 0,
      inProgress: statusCounts["IN_PROGRESS"] || 0,
      completed: completedCount,
      failed: statusCounts["FAILED"] || 0,
      averageProcessingTime: totalTasks > 0 ? (completedCount * 2000) / totalTasks : 0,
    };
  }

  private async processTask(task: any): Promise<void> {
    try {
      await prisma.boostTask.update({
        where: { id: task.id },
        data: { status: "IN_PROGRESS", startedAt: new Date() },
      });

      const platform = task.campaign.platformRel;
      if (!platform || !platform.accessToken) {
        throw new Error("Platform not connected");
      }

      const batchSize = Math.min(task.target - task.current, BATCH_SIZE);
      let boosted = 0;

      switch (task.campaign.platform) {
        case "INSTAGRAM": {
          const ig = new InstagramPlatform(platform.accessToken, platform.accountId);
          if (task.type === "VIEWS") {
            const result = await ig.boostViews(task.campaign.videoUrl || "", batchSize);
            boosted = result.boosted;
          } else if (task.type === "LIKES") {
            const result = await ig.boostLikes(task.campaign.videoUrl || "", batchSize);
            boosted = result.boosted;
          } else if (task.type === "COMMENTS") {
            const result = await ig.boostComments(task.campaign.videoUrl || "", batchSize);
            boosted = result.boosted;
          }
          break;
        }
        case "FACEBOOK": {
          const fb = new FacebookPlatform(platform.accessToken, platform.accountId);
          if (task.type === "VIEWS") {
            const result = await fb.boostViews(task.campaign.videoUrl || "", batchSize);
            boosted = result.boosted;
          } else if (task.type === "LIKES") {
            const result = await fb.boostLikes(task.campaign.videoUrl || "", batchSize);
            boosted = result.boosted;
          } else if (task.type === "COMMENTS") {
            const result = await fb.boostComments(task.campaign.videoUrl || "", batchSize);
            boosted = result.boosted;
          }
          break;
        }
        case "TIKTOK": {
          const tt = new TikTokPlatform(platform.accessToken, platform.accountId);
          if (task.type === "VIEWS") {
            const result = await tt.boostViews(task.campaign.videoUrl || "", batchSize);
            boosted = result.boosted;
          } else if (task.type === "LIKES") {
            const result = await tt.boostLikes(task.campaign.videoUrl || "", batchSize);
            boosted = result.boosted;
          } else if (task.type === "COMMENTS") {
            const result = await tt.boostComments(task.campaign.videoUrl || "", batchSize);
            boosted = result.boosted;
          }
          break;
        }
      }

      const newCurrent = Math.min(task.current + boosted, task.target);
      const isComplete = newCurrent >= task.target;

      await prisma.boostTask.update({
        where: { id: task.id },
        data: {
          current: newCurrent,
          status: isComplete ? "COMPLETED" : "IN_PROGRESS",
          completedAt: isComplete ? new Date() : null,
        },
      });

      const updateField =
        task.type === "VIEWS" ? { currentViews: newCurrent } :
        task.type === "LIKES" ? { currentLikes: newCurrent } :
        task.type === "COMMENTS" ? { currentComments: newCurrent } :
        { currentShares: newCurrent };

      await prisma.campaign.update({
        where: { id: task.campaignId },
        data: updateField,
      });

      if (isComplete) {
        const campaign = await prisma.campaign.findUnique({ where: { id: task.campaignId } });
        if (campaign) {
          const allDone = await prisma.boostTask.findFirst({
            where: {
              campaignId: task.campaignId,
              status: { in: ["PENDING", "IN_PROGRESS"] },
            },
          });
          if (!allDone) {
            await prisma.campaign.update({
              where: { id: task.campaignId },
              data: { status: "COMPLETED", completedAt: new Date() },
            });
          }
        }
      }
    } catch (error) {
      const retryCount = (task.retryCount || 0) + 1;
      if (retryCount >= (task.maxRetries || 3)) {
        await prisma.boostTask.update({
          where: { id: task.id },
          data: {
            status: "FAILED",
            failedAt: new Date(),
            errorMessage: (error as Error).message,
            retryCount,
          },
        });
      } else {
        await prisma.boostTask.update({
          where: { id: task.id },
          data: {
            status: "PENDING",
            retryCount,
            errorMessage: (error as Error).message,
          },
        });
      }
    }
  }

  async retryFailed(taskId: string): Promise<{ success: boolean; message: string }> {
    try {
      await prisma.boostTask.update({
        where: { id: taskId },
        data: {
          status: "PENDING",
          errorMessage: null,
          failedAt: null,
        },
      });
      return { success: true, message: "Task queued for retry" };
    } catch (error) {
      return { success: false, message: `Retry failed: ${(error as Error).message}` };
    }
  }

  async getQueueStatus(): Promise<QueueStatus> {
    return this.processQueue();
  }

  startProcessing(): void {
    this.isProcessing = true;
    this.processingInterval = setInterval(async () => {
      try {
        await this.processQueue();
      } catch (error) {
        console.error("Queue processing error:", error);
      }
    }, 10000);
  }

  stopProcessing(): void {
    this.isProcessing = false;
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
    }
  }
}

export const boostEngine = new BoostEngine();
