import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      );
    }

    // Mock membership verification - replace with actual Stripe session verification
    const mockMembershipDetails = {
      plan: "Professional Membership",
      amount: 8500,
      validUntil: "December 31, 2024",
      memberId: `TBS-${Date.now().toString().slice(-6)}`,
      email: "user@example.com",
      sessionId,
    };

    return NextResponse.json(mockMembershipDetails);
  } catch (error) {
    console.error("Membership verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify membership" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    interface SessionUser {
      id: string;
      email?: string;
      name?: string;
      [key: string]: any;
    }

    interface Session {
      user?: SessionUser;
      [key: string]: any;
    }

    const session = await getServerSession(authOptions) as Session;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId, membershipType } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      );
    }

    console.log("Verifying membership for user:", session.user.id, {
      sessionId,
      membershipType,
    });

    // In a real app, you would verify the Stripe session and update the database
    // For now, we'll simulate successful verification
    const membershipData = {
      userId: session.user.id,
      type: membershipType || "professional",
      status: "active",
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      sessionId,
    };

    return NextResponse.json({
      success: true,
      membership: membershipData,
      message: "Membership activated successfully",
    });
  } catch (error) {
    console.error("Membership verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify membership" },
      { status: 500 }
    );
  }
}
