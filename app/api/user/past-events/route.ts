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

    // Get past events user registered for
    const pastEvents = await prisma.eventRegistration.findMany({
      where: {
        userId: user.id,
        event: {
          date: {
            lt: new Date(),
          },
        },
      },
      include: {
        event: true,
      },
      orderBy: {
        event: {
          date: "desc",
        },
      },
      take: 10,
    });

    const events = pastEvents.map((registration) => ({
      id: registration.event.id,
      title: registration.event.title,
      date: registration.event.date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      location: registration.event.isVirtual
        ? "Virtual Event"
        : registration.event.location || "TBD",
      type: registration.event.eventType || "Event",
      status: registration.status === "attended" ? "Attended" : "Registered",
      attendees: registration.event.maxAttendees || 0,
      isVirtual: registration.event.isVirtual,
    }));

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Error fetching past events:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
