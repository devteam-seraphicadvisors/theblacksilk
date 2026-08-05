import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user's active membership
    const membership = await prisma.membership.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!membership) {
      return NextResponse.json({
        membershipStatus: {
          type: "No Membership",
          status: "inactive",
          validUntil: null,
          progress: 0,
          remainingDays: 0,
          isExpired: true,
        },
      });
    }

    const endDate = new Date(membership.endDate);
    const startDate = new Date(membership.startDate);
    const today = new Date();

    const totalDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const remainingDays = Math.max(
      0,
      Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    );
    const progress = Math.max(
      0,
      Math.min(100, ((totalDays - remainingDays) / totalDays) * 100)
    );
    const isExpired = remainingDays === 0;

    const membershipStatus = {
      type:
        membership.type.charAt(0).toUpperCase() +
        membership.type.slice(1) +
        " Member",
      status: isExpired ? "expired" : membership.status,
      validUntil: endDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      progress: Math.round(progress),
      remainingDays,
      isExpired,
    };

    return NextResponse.json({ membershipStatus });
  } catch (error) {
    console.error("Error fetching membership status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
