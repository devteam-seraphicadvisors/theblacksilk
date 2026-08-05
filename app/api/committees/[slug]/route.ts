import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/committees/[slug] - Get single committee with full details
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const committee = await prisma.committee.findUnique({
      where: { slug },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        recentPublications: {
          orderBy: {
            date: "desc",
          },
        },
        upcomingEvents: {
          orderBy: {
            date: "asc",
          },
        },
      },
    });

    if (!committee) {
      return NextResponse.json(
        {
          success: false,
          error: "Committee not found",
        },
        { status: 404 }
      );
    }

    // Transform members to include user details
    const committeeWithMembers = {
      ...committee,
      memberCount: committee.members.length,
      committeeMembers: committee.members.map((member) => ({
        id: member.id,
        role: member.role,
        joinedAt: member.joinedAt,
        user: member.user,
      })),
      members: undefined, // Remove the raw members array
    };

    return NextResponse.json({
      success: true,
      committee: committeeWithMembers,
    });
  } catch (error) {
    console.error("Error fetching committee:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch committee",
      },
      { status: 500 }
    );
  }
}
