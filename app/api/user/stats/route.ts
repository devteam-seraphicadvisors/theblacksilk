import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Force dynamic rendering - this route uses session and database
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || session.user.id;

    // Verify user can access this data
    if (userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch user statistics from database
    const [eventsAttended, committeeMemberships, forumPosts, user] =
      await Promise.all([
        // Count event registrations
        prisma.eventRegistration.count({
          where: { userId },
        }),
        // Count committee memberships
        prisma.committeeMember.count({
          where: { userId },
        }),
        // Count forum posts
        prisma.forumPost.count({
          where: { authorId: userId },
        }),
        // Get user profile data
        prisma.user.findUnique({
          where: { id: userId },
          select: {
            bio: true,
            organization: true,
            position: true,
            location: true,
            website: true,
            linkedin: true,
            twitter: true,
          },
        }),
      ]);

    // Calculate profile completeness
    const profileFields = [
      user?.bio,
      user?.organization,
      user?.position,
      user?.location,
      user?.website,
      user?.linkedin,
      user?.twitter,
    ];
    const completedFields = profileFields.filter(
      (field) => field && field.trim() !== ""
    ).length;
    const profileCompleteness = Math.round(
      (completedFields / profileFields.length) * 100
    );

    const stats = {
      eventsAttended,
      committeeMemberships,
      publicationsDownloaded: 0, // This would need a separate table to track downloads
      forumPosts,
      totalConnections: 0, // This would need a connections/network table
      profileCompleteness,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch user statistics" },
      { status: 500 }
    );
  }
}
