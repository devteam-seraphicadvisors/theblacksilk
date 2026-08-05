import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Get current date and date 30 days ago
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Fetch all stats in parallel
    const [
      totalMembers,
      newMembersThisMonth,
      totalEvents,
      upcomingEvents,
      totalPublications,
      newPublicationsThisMonth,
      activeCommittees,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
      }),
      prisma.event.count(),
      prisma.event.count({
        where: {
          date: {
            gte: now,
          },
          status: "upcoming",
        },
      }),
      prisma.publication.count({
        where: {
          published: true,
        },
      }),
      prisma.publication.count({
        where: {
          published: true,
          publishedAt: {
            gte: thirtyDaysAgo,
          },
        },
      }),
      prisma.committee.count({
        where: {
          status: "active",
        },
      }),
    ]);

    const stats = {
      totalMembers,
      newMembersThisMonth,
      totalEvents,
      upcomingEvents,
      eventsThisMonth: upcomingEvents,
      totalPublications,
      newPublicationsThisMonth,
      activeCommittees,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
