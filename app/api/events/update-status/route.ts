import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// This endpoint updates event statuses based on their dates
export async function POST(request: NextRequest) {
  try {
    const now = new Date();

    // Update past events to "completed"
    await prisma.event.updateMany({
      where: {
        date: {
          lt: now,
        },
        status: {
          in: ["upcoming", "open"],
        },
      },
      data: {
        status: "completed",
      },
    });

    // Update future events to "upcoming" if they were marked completed mistakenly
    await prisma.event.updateMany({
      where: {
        date: {
          gte: now,
        },
        status: "completed",
      },
      data: {
        status: "upcoming",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Event statuses updated successfully",
    });
  } catch (error) {
    console.error("Error updating event statuses:", error);
    return NextResponse.json(
      { error: "Failed to update event statuses" },
      { status: 500 }
    );
  }
}

// Allow GET requests to manually trigger status updates
export async function GET(request: NextRequest) {
  return POST(request);
}
