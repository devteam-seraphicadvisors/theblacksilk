import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Check if email already exists
    const existing = await prisma.newsletter.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      // Update existing subscriber
      const subscriber = await prisma.newsletter.update({
        where: { email: data.email },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          organization: data.organization,
          role: data.role,
          weeklyDigest: data.weeklyDigest !== false,
          eventUpdates: data.eventUpdates !== false,
          policyAlerts: data.policyAlerts || false,
          researchUpdates: data.researchUpdates || false,
          isActive: true,
        },
      });
      return NextResponse.json({ subscriber, updated: true });
    }

    // Create new subscriber
    const subscriber = await prisma.newsletter.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        organization: data.organization,
        role: data.role,
        weeklyDigest: data.weeklyDigest !== false,
        eventUpdates: data.eventUpdates !== false,
        policyAlerts: data.policyAlerts || false,
        researchUpdates: data.researchUpdates || false,
        isActive: true,
      },
    });

    return NextResponse.json({ subscriber }, { status: 201 });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
