import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const committee = await prisma.committee.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            members: true,
          },
        },
      },
    });

    if (!committee) {
      return NextResponse.json(
        { error: "Committee not found" },
        { status: 404 }
      );
    }

    const formattedCommittee = {
      id: committee.id,
      name: committee.name,
      description: committee.description,
      chairName: committee.chairName || null,
      coChairName: committee.coChairName || null,
      focusAreas: committee.focusAreas,
      memberCount: committee._count.members,
      status: committee.status,
      createdAt: committee.createdAt.toISOString(),
    };

    return NextResponse.json(formattedCommittee);
  } catch (error) {
    console.error("Error fetching committee:", error);
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
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, chairName, coChairName, focusAreas, status } =
      body;

    const committee = await prisma.committee.update({
      where: { id },
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

    return NextResponse.json(committee);
  } catch (error) {
    console.error("Error updating committee:", error);
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
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.committee.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Committee deleted successfully" });
  } catch (error) {
    console.error("Error deleting committee:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
