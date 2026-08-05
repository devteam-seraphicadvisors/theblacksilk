import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            registrations: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const formattedEvent = {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date.toISOString(),
      endDate: event.endDate ? event.endDate.toISOString() : null,
      location: event.location,
      eventType: event.eventType,
      youtubeUrl: event.youtubeUrl,
      speakers: event.speakers,
      timeline: event.timeline,
      registrationFormUrl: event.registrationFormUrl,
      status: event.status,
      maxAttendees: event.maxAttendees,
      currentAttendees: event._count.registrations,
      price: event.price,
      createdAt: event.createdAt.toISOString(),
    };

    return NextResponse.json(formattedEvent);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      title,
      description,
      date,
      endDate,
      location,
      eventType,
      youtubeUrl,
      speakers,
      timeline,
      registrationFormUrl,
      status,
      maxAttendees,
      price,
    } = body;

    // Generate slug from title if title is being updated
    const slug = title
      ? title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      : undefined;

    const event = await prisma.event.update({
      where: { id },
      data: {
        slug,
        title,
        description,
        date: date ? new Date(date) : undefined,
        endDate: endDate ? new Date(endDate) : null,
        location,
        eventType,
        youtubeUrl,
        speakers: speakers ? speakers : undefined,
        timeline: timeline ? timeline : undefined,
        registrationFormUrl: registrationFormUrl || undefined,
        status,
        maxAttendees: maxAttendees ? Number.parseInt(maxAttendees) : null,
        price: price ? Number.parseFloat(price) : null,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
