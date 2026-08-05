import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all events
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = searchParams.get("limit");
    const featured = searchParams.get("featured");

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (featured === "true") {
      where.date = {
        gte: new Date(),
      };
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        registrations: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
      take: limit ? parseInt(limit) : undefined,
    });

    const eventsWithCount = events.map((event) => ({
      ...event,
      registrationCount: event.registrations.length,
      registrations: undefined,
    }));

    return NextResponse.json(eventsWithCount);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST create new event (admin only)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const event = await prisma.event.create({
      data: {
        slug,
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        endDate: data.endDate ? new Date(data.endDate) : null,
        location: data.location,
        isVirtual: data.isVirtual || false,
        eventType: data.eventType || undefined,
        youtubeUrl: data.youtubeUrl || undefined,
        speakers: data.speakers ? data.speakers : undefined,
        timeline: data.timeline ? data.timeline : undefined,
        registrationFormUrl: data.registrationFormUrl || undefined,
        maxAttendees: data.maxAttendees ? parseInt(data.maxAttendees) : null,
        price: data.price ? parseFloat(data.price) : null,
        status: data.status || "upcoming",
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
