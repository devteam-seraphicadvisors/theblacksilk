import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/committees - Get all active committees with member counts
export async function GET(request: NextRequest) {
  try {
    const committees = await prisma.committee.findMany({
      where: { status: "active" },
      include: {
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const formattedCommittees = committees.map((committee) => ({
      id: committee.id,
      name: committee.name,
      description: committee.description,
      memberCount: committee._count.members,
    }));

    return NextResponse.json({ committees: formattedCommittees });
  } catch (error) {
    console.error("Error fetching committees:", error);
    return NextResponse.json(
      { error: "Failed to fetch committees" },
      { status: 500 }
    );
  }
}
