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

    // Get events attended (past events with confirmed attendance)
    const eventsAttended = await prisma.eventRegistration.count({
      where: {
        userId: user.id,
        status: "attended",
      },
    });

    // Get committee memberships
    const committeeMemberships = await prisma.committeeMember.count({
      where: {
        userId: user.id,
      },
    });

    // Get forum posts count
    const forumPosts = await prisma.forumPost.count({
      where: {
        authorId: user.id,
      },
    });

    // Get forum replies count
    const forumReplies = await prisma.forumReply.count({
      where: {
        authorId: user.id,
      },
    });

    // Calculate engagement score based on activity
    const totalActivity =
      eventsAttended + committeeMemberships + forumPosts + forumReplies;
    const engagementScore = Math.min(
      Math.round((totalActivity / 20) * 100),
      100
    ); // Scale to 100

    const stats = {
      eventsAttended,
      committeeMemberships,
      publicationsRead: forumPosts + forumReplies, // Using forum activity as proxy
      engagementScore,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
