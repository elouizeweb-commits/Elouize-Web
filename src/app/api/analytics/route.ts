import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { analyticsTracker } from "@/lib/analytics/tracker";
import { boostSimulator } from "@/lib/boost/simulator";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view");

    switch (view) {
      case "dashboard": {
        const stats = await analyticsTracker.getDashboardStats(userId);
        return NextResponse.json({ success: true, data: stats });
      }

      case "predictions": {
        const campaignId = searchParams.get("campaignId");
        const days = parseInt(searchParams.get("days") || "30");
        if (!campaignId) {
          return NextResponse.json({ error: "campaignId required" }, { status: 400 });
        }
        const predictions = await boostSimulator.predictGrowth(campaignId, days);
        return NextResponse.json({ success: true, data: predictions });
      }

      case "report": {
        const campaignId = searchParams.get("campaignId");
        if (!campaignId) {
          return NextResponse.json({ error: "campaignId required" }, { status: 400 });
        }
        const report = await boostSimulator.generateReport(campaignId);
        return NextResponse.json({ success: true, data: report });
      }

      case "platforms": {
        const comparison = await analyticsTracker.getPlatformComparison(userId);
        return NextResponse.json({ success: true, data: comparison });
      }

      case "activity": {
        const activity = await analyticsTracker.getRecentActivity(userId);
        return NextResponse.json({ success: true, data: activity });
      }

      case "export": {
        const format = searchParams.get("format") || "json";
        const data = await analyticsTracker.exportAnalytics(userId, format);
        return NextResponse.json({ success: true, data });
      }

      default: {
        const stats = await analyticsTracker.getDashboardStats(userId);
        return NextResponse.json({ success: true, data: stats });
      }
    }
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
