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

    // Get user's committee memberships
    const committeeMemberships = await prisma.committeeMember.findMany({
      where: {
        userId: user.id,
      },
      include: {
        committee: true,
      },
      orderBy: {
        joinedAt: "desc",
      },
    });

    const committees = committeeMemberships.map((membership) => ({
      id: membership.committee.id,
      name: membership.committee.name,
      role: membership.role || "Member",
      meetings: Math.floor(Math.random() * 10) + 1, // Mock data for meetings attended
      joinedAt: membership.joinedAt,
    }));

    return NextResponse.json({ committees });
  } catch (error) {
    console.error("Error fetching committees:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
