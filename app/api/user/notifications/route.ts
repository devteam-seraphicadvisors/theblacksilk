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

    const notifications = [];

    // Check for upcoming events
    const upcomingEvents = await prisma.eventRegistration.findMany({
      where: {
        userId: user.id,
        event: {
          date: {
            gte: new Date(),
            lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next 7 days
          },
        },
      },
      include: {
        event: true,
      },
      take: 1,
    });

    if (upcomingEvents.length > 0) {
      const event = upcomingEvents[0];
      notifications.push({
        message: `Upcoming event: ${event.event.title}`,
        time: "2 hours ago",
        type: "event",
        color: "blue",
      });
    }

    // Check for membership expiry
    const membership = await prisma.membership.findFirst({
      where: {
        userId: user.id,
        status: "active",
      },
      orderBy: {
        endDate: "desc",
      },
    });

    if (membership) {
      const daysUntilExpiry = Math.ceil(
        (new Date(membership.endDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (daysUntilExpiry <= 30) {
        notifications.push({
          message: `Membership expires in ${daysUntilExpiry} days`,
          time: "1 day ago",
          type: "membership",
          color: "orange",
        });
      }
    }

    // Add some general notifications
    notifications.push({
      message: "New publication available in Knowledge Hub",
      time: "3 days ago",
      type: "publication",
      color: "green",
    });

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
