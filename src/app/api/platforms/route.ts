import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!prisma) {
      return NextResponse.json({ success: true, data: [] });
    }

    const userId = (session.user as any).id;
    const platforms = await prisma.platform.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: platforms });
  } catch (error) {
    console.error("Fetch platforms error:", error);
    return NextResponse.json({ error: "Failed to fetch platforms" }, { status: 500 });
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
    const { type, code } = body;

    if (!type || !code) {
      return NextResponse.json({ error: "Platform type and authorization code are required" }, { status: 400 });
    }

    const userId = (session.user as any).id;

    const platform = await prisma.platform.create({
      data: {
        userId,
        type,
        accessToken: `mock_token_${Date.now()}`,
        refreshToken: `mock_refresh_${Date.now()}`,
        accountId: `account_${Date.now()}`,
        username: `user_${Date.now()}`,
        followersCount: Math.floor(Math.random() * 10000),
      },
    });

    return NextResponse.json({ success: true, data: platform }, { status: 201 });
  } catch (error) {
    console.error("Connect platform error:", error);
    return NextResponse.json({ error: "Failed to connect platform" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!prisma) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Platform ID required" }, { status: 400 });
    }

    const userId = (session.user as any).id;
    await prisma.platform.deleteMany({ where: { id, userId } });

    return NextResponse.json({ success: true, message: "Platform disconnected" });
  } catch (error) {
    console.error("Disconnect platform error:", error);
    return NextResponse.json({ error: "Failed to disconnect platform" }, { status: 500 });
  }
}
