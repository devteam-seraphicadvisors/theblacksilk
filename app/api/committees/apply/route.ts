import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const applicationSchema = z.object({
  committeeSlug: z.string().min(1, "Committee is required"),
  committeeName: z.string().min(1, "Committee name is required"),
  motivation: z
    .string()
    .min(
      50,
      "Please provide at least 50 characters explaining your motivation"
    ),
  experience: z
    .string()
    .min(
      50,
      "Please provide at least 50 characters about your relevant experience"
    ),
  contribution: z
    .string()
    .min(
      50,
      "Please provide at least 50 characters about how you can contribute"
    ),
  availability: z.enum(["full-time", "part-time", "flexible"], {
    required_error: "Please select your availability",
  }),
  expertise: z
    .array(z.string())
    .min(1, "Please select at least one area of expertise"),
  linkedinUrl: z
    .string()
    .url("Please provide a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
});

export async function POST(request: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to apply" },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const validatedData = applicationSchema.parse(body);

    // Check if user has already applied to this committee
    const existingApplication = await prisma.committeeApplication.findFirst({
      where: {
        userId: user.id,
        committeeSlug: validatedData.committeeSlug,
        status: {
          in: ["pending", "approved"],
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied to this committee" },
        { status: 400 }
      );
    }

    // Check if user is already a member
    const existingMember = await prisma.committeeMember.findFirst({
      where: {
        userId: user.id,
        committee: {
          name: validatedData.committeeName,
        },
      },
    });

    if (existingMember) {
      return NextResponse.json(
        { error: "You are already a member of this committee" },
        { status: 400 }
      );
    }

    // Create the application
    const application = await prisma.committeeApplication.create({
      data: {
        userId: user.id,
        committeeId: "", // We're using slug-based system, not DB IDs
        committeeSlug: validatedData.committeeSlug,
        committeeName: validatedData.committeeName,
        motivation: validatedData.motivation,
        experience: validatedData.experience,
        contribution: validatedData.contribution,
        availability: validatedData.availability,
        expertise: validatedData.expertise,
        linkedinUrl: validatedData.linkedinUrl || null,
        status: "pending",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        application: {
          id: application.id,
          status: application.status,
          createdAt: application.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Committee application error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to view applications" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const committeeSlug = searchParams.get("committeeSlug");

    const whereClause: any = { userId: user.id };
    if (committeeSlug) {
      whereClause.committeeSlug = committeeSlug;
    }

    const applications = await prisma.committeeApplication.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        committeeSlug: true,
        committeeName: true,
        status: true,
        createdAt: true,
        reviewedAt: true,
        reviewNotes: true,
      },
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Fetch applications error:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
