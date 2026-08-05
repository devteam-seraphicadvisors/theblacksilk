import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        registrations: {
          select: { id: true },
        },
      },
    });

    const eventsWithAttendeeCount = events.map((event) => ({
      ...event,
      currentAttendees: event.registrations.length,
    }));

    return NextResponse.json(eventsWithAttendeeCount);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      date,
      endDate,
      location,
      isVirtual,
      maxAttendees,
      price,
    } = body;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const event = await prisma.event.create({
      data: {
        slug,
        title,
        description,
        date: new Date(date),
        endDate: endDate ? new Date(endDate) : null,
        location: location || null,
        isVirtual: Boolean(isVirtual),
        eventType: body.eventType || undefined,
        youtubeUrl: body.youtubeUrl || undefined,
        speakers: body.speakers ? body.speakers : undefined,
        timeline: body.timeline ? body.timeline : undefined,
        registrationFormUrl: body.registrationFormUrl || undefined,
        maxAttendees: maxAttendees ? Number.parseInt(maxAttendees) : null,
        price: price ? Number.parseFloat(price) : null,
        status: "upcoming",
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
