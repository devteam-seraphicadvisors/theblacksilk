import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const reviewSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  reviewNotes: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = reviewSchema.parse(body);

    const application = await prisma.committeeApplication.findUnique({
      where: { id: params.id },
      include: {
        user: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    if (application.status !== "pending") {
      return NextResponse.json(
        { error: "Application has already been reviewed" },
        { status: 400 }
      );
    }

    // Update application status
    const updatedApplication = await prisma.committeeApplication.update({
      where: { id: params.id },
      data: {
        status: validatedData.status,
        reviewedBy: user.id,
        reviewedAt: new Date(),
        reviewNotes: validatedData.reviewNotes,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // If approved, add user as committee member in database
    if (validatedData.status === "approved") {
      try {
        // Find committee by slug
        const committee = await prisma.committee.findUnique({
          where: {
            slug: application.committeeSlug,
          },
        });

        if (!committee) {
          console.error(
            `Committee not found with slug: ${application.committeeSlug}`
          );
          return NextResponse.json(
            {
              error:
                "Committee not found. Please ensure the committee exists in the database.",
            },
            { status: 404 }
          );
        }

        // Check if user is already a member
        const existingMember = await prisma.committeeMember.findUnique({
          where: {
            userId_committeeId: {
              userId: application.userId,
              committeeId: committee.id,
            },
          },
        });

        // Add user as committee member if not already a member
        if (!existingMember) {
          await prisma.committeeMember.create({
            data: {
              userId: application.userId,
              committeeId: committee.id,
              role: "member",
            },
          });
        }
      } catch (error) {
        console.error("Error adding member to committee:", error);
        return NextResponse.json(
          { error: "Failed to add member to committee" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      message: `Application ${validatedData.status}`,
      application: updatedApplication,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Review application error:", error);
    return NextResponse.json(
      { error: "Failed to review application" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const application = await prisma.committeeApplication.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            organization: true,
            position: true,
            bio: true,
            linkedin: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ application });
  } catch (error) {
    console.error("Fetch application error:", error);
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 }
    );
  }
}
