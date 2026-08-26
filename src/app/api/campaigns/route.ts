import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { z } from "zod";

const campaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  platform: z.enum(["INSTAGRAM", "FACEBOOK", "TIKTOK"]),
  videoUrl: z.string().url().optional().or(z.literal("")),
  targetViews: z.coerce.number().min(1).optional().default(1000),
  targetLikes: z.coerce.number().min(0).optional().default(100),
  targetComments: z.coerce.number().min(0).optional().default(50),
  targetShares: z.coerce.number().min(0).optional().default(25),
  budget: z.coerce.number().min(0).optional().default(0),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!prisma) {
      return NextResponse.json({ success: true, data: [] });
    }

    const userId = (session.user as any).id;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const platform = searchParams.get("platform");

    const where: any = { userId };
    if (status && status !== "ALL") where.status = status;
    if (platform) where.platform = platform;

    const campaigns = await prisma.campaign.findMany({
      where,
      include: { boostTasks: true, analytics: true, platformRel: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: campaigns });
  } catch (error) {
    console.error("Fetch campaigns error:", error);
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!prisma) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const body = await request.json();
    const parsed = campaignSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const userId = (session.user as any).id;
    const data = parsed.data;

    const campaign = await prisma.campaign.create({
      data: {
        userId,
        name: data.name,
        platform: data.platform,
        videoUrl: data.videoUrl || null,
        targetViews: data.targetViews,
        targetLikes: data.targetLikes,
        targetComments: data.targetComments,
        targetShares: data.targetShares,
        budget: data.budget,
      },
      include: { boostTasks: true, analytics: true },
    });

    return NextResponse.json({ success: true, data: campaign }, { status: 201 });
  } catch (error) {
    console.error("Create campaign error:", error);
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }
}
