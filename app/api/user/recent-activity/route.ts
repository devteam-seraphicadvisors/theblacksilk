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

    const activities = [];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Get recent committee joins
    const recentCommitteeJoins = await prisma.committeeMember.findMany({
      where: {
        userId: user.id,
        joinedAt: {
          gte: oneWeekAgo,
        },
      },
      include: {
        committee: true,
      },
      orderBy: {
        joinedAt: "desc",
      },
      take: 3,
    });

    recentCommitteeJoins.forEach((join) => {
      activities.push({
        action: `Joined ${join.committee.name}`,
        time: getRelativeTime(join.joinedAt),
        icon: "Users",
        color: "text-blue-600",
      });
    });

    // Get recent forum posts
    const recentForumPosts = await prisma.forumPost.findMany({
      where: {
        authorId: user.id,
        createdAt: {
          gte: oneWeekAgo,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    recentForumPosts.forEach((post) => {
      activities.push({
        action: `Posted "${post.title.substring(0, 50)}${
          post.title.length > 50 ? "..." : ""
        }"`,
        time: getRelativeTime(post.createdAt),
        icon: "MessageSquare",
        color: "text-purple-600",
      });
    });

    // Get recent event registrations
    const recentEventRegistrations = await prisma.eventRegistration.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: oneWeekAgo,
        },
      },
      include: {
        event: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    recentEventRegistrations.forEach((registration) => {
      activities.push({
        action: `Registered for ${registration.event.title}`,
        time: getRelativeTime(registration.createdAt),
        icon: "Calendar",
        color: "text-green-600",
      });
    });

    // Sort all activities by time and take the most recent 5
    activities.sort((a, b) => {
      const timeA = parseRelativeTime(a.time);
      const timeB = parseRelativeTime(b.time);
      return timeA - timeB;
    });

    return NextResponse.json({ activities: activities.slice(0, 5) });
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    return `${diffInDays} days ago`;
  }
}

function parseRelativeTime(timeString: string): number {
  const match = timeString.match(/(\d+)\s+(minutes?|hours?|days?)\s+ago/);
  if (!match) return 0;

  const value = Number.parseInt(match[1]);
  const unit = match[2];

  if (unit.startsWith("minute")) return value;
  if (unit.startsWith("hour")) return value * 60;
  if (unit.startsWith("day")) return value * 60 * 24;

  return 0;
}
