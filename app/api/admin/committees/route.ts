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

    const committees = await prisma.committee.findMany({
      include: {
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedCommittees = committees.map((committee) => ({
      id: committee.id,
      name: committee.name,
      description: committee.description,
      chairName: committee.chairName || null,
      coChairName: committee.coChairName || null,
      focusAreas: committee.focusAreas,
      memberCount: committee._count.members,
      status: committee.status,
      createdAt: committee.createdAt.toISOString(),
    }));

    return NextResponse.json({ committees: formattedCommittees });
  } catch (error) {
    console.error("Error fetching committees:", error);
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
    const { name, description, chairName, coChairName, focusAreas, status } =
      body;

    const committee = await prisma.committee.create({
      data: {
        name,
        description,
        chairName,
        coChairName,
        focusAreas,
        status,
        slug: name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      },
    });

    return NextResponse.json(committee, { status: 201 });
  } catch (error) {
    console.error("Error creating committee:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
