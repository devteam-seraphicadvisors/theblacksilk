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

    // Get upcoming events user is registered for
    const upcomingEvents = await prisma.eventRegistration.findMany({
      where: {
        userId: user.id,
        event: {
          date: {
            gte: new Date(),
          },
        },
      },
      include: {
        event: true,
      },
      orderBy: {
        event: {
          date: "asc",
        },
      },
      take: 5,
    });

    const events = upcomingEvents.map((registration) => ({
      id: registration.event.id,
      title: registration.event.title,
      date: registration.event.date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: registration.event.date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      location: registration.event.isVirtual
        ? "Virtual Event"
        : registration.event.location || "TBD",
      status: registration.status === "confirmed" ? "Registered" : "Pending",
      attendees: registration.event.maxAttendees || 0,
      isVirtual: registration.event.isVirtual,
    }));

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
