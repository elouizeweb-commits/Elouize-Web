import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { boostEngine } from "@/lib/boost/engine";
import { boostSimulator } from "@/lib/boost/simulator";
import { z } from "zod";

const boostActionSchema = z.object({
  campaignId: z.string().min(1, "Campaign ID is required"),
  action: z.enum(["start", "stop", "status", "retry", "simulate"]),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = boostActionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { campaignId, action } = parsed.data;

    switch (action) {
      case "start": {
        const result = await boostEngine.startBoost(campaignId);
        return NextResponse.json({ success: result.success, message: result.message });
      }

      case "stop": {
        const result = await boostEngine.stopBoost(campaignId);
        return NextResponse.json({ success: result.success, message: result.message });
      }

      case "retry": {
        const result = await boostEngine.retryFailed(campaignId);
        return NextResponse.json({ success: result.success, message: result.message });
      }

      case "simulate": {
        const simulation = await boostSimulator.simulateViews(campaignId, 10000);
        return NextResponse.json({ success: true, data: simulation });
      }

      case "status": {
        const queueStatus = await boostEngine.getQueueStatus();
        return NextResponse.json({ success: true, data: queueStatus });
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Boost operation error:", error);
    return NextResponse.json(
      { error: `Boost operation failed: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const queueStatus = await boostEngine.getQueueStatus();
    return NextResponse.json({ success: true, data: queueStatus });
  } catch (error) {
    console.error("Queue status error:", error);
    return NextResponse.json({ error: "Failed to get queue status" }, { status: 500 });
  }
}
