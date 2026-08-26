import prisma from "@/lib/db";
import { BoostTask } from "@/types";

export class BoostScheduler {
  async scheduleBoost(task: Partial<BoostTask>, cronExpression: string): Promise<{ success: boolean; taskId: string }> {
    const created = await prisma.boostTask.create({
      data: {
        campaignId: task.campaignId!,
        type: task.type || "VIEWS",
        target: task.target || 0,
        status: "PENDING",
        priority: task.priority || 0,
        scheduledAt: new Date(),
      },
    });

    return { success: true, taskId: created.id };
  }

  async cancelScheduled(taskId: string): Promise<{ success: boolean; message: string }> {
    try {
      await prisma.boostTask.update({
        where: { id: taskId },
        data: { status: "CANCELLED" },
      });
      return { success: true, message: "Task cancelled" };
    } catch (error) {
      return { success: false, message: `Cancel failed: ${(error as Error).message}` };
    }
  }

  async getPendingTasks(): Promise<BoostTask[]> {
    const tasks = await prisma.boostTask.findMany({
      where: {
        status: "PENDING",
        scheduledAt: { lte: new Date() },
      },
      include: { campaign: true },
      orderBy: [{ priority: "desc" }, { scheduledAt: "asc" }],
    });

    return tasks.map((t) => ({
      id: t.id,
      campaignId: t.campaignId,
      type: t.type as any,
      target: t.target,
      current: t.current,
      status: t.status as any,
      priority: t.priority,
      scheduledAt: t.scheduledAt,
      startedAt: t.startedAt,
      completedAt: t.completedAt,
      failedAt: t.failedAt,
      errorMessage: t.errorMessage,
      retryCount: t.retryCount,
      maxRetries: t.maxRetries,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    }));
  }

  async processScheduledTasks(): Promise<{ processed: number; failed: number }> {
    const pending = await prisma.boostTask.findMany({
      where: {
        status: "PENDING",
        scheduledAt: { lte: new Date() },
      },
      take: 50,
    });

    let processed = 0;
    let failed = 0;

    for (const task of pending) {
      try {
        await prisma.boostTask.update({
          where: { id: task.id },
          data: { status: "IN_PROGRESS", startedAt: new Date() },
        });
        processed++;
      } catch {
        failed++;
        await prisma.boostTask.update({
          where: { id: task.id },
          data: { status: "FAILED", failedAt: new Date(), errorMessage: "Scheduler processing error" },
        });
      }
    }

    return { processed, failed };
  }

  async getScheduledCount(): Promise<number> {
    return prisma.boostTask.count({
      where: { status: "PENDING", scheduledAt: { not: null } },
    });
  }
}

export const boostScheduler = new BoostScheduler();
