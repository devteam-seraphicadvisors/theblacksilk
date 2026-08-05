import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const city = searchParams.get("city") || "all";
    const filter = searchParams.get("filter") || "all";

    // Build where clause
    const where: any = {
      OR: [
        { role: "admin" },
        {
          membership: {
            status: "active",
          },
        },
      ],
    };

    // Add search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { organization: { contains: search, mode: "insensitive" } },
        { position: { contains: search, mode: "insensitive" } },
      ];
    }

    // Add location filter
    if (city && city !== "all") {
      where.location = { contains: city, mode: "insensitive" };
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        image: true,
        position: true,
        organization: true,
        location: true,
        bio: true,
        linkedin: true,
        twitter: true,
        email: true,
        createdAt: true,
        membership: {
          select: {
            type: true,
            status: true,
            startDate: true,
          },
        },
        committeeMembers: {
          include: {
            committee: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    // Format the response
    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name || "Unknown User",
      title: user.position || "Member",
      organization: user.organization || "Independent",
      location: user.location || "India",
      expertise: [], // Can be extracted from bio or added as a separate field
      memberSince: user.membership?.startDate
        ? new Date(user.membership.startDate).getFullYear().toString()
        : new Date(user.createdAt).getFullYear().toString(),
      image: user.image || "/placeholder.svg",
      verified: user.membership?.status === "active",
      committees: user.committeeMembers.map((cm) => cm.committee.name),
      social: {
        linkedin: user.linkedin || "#",
        twitter: user.twitter || "#",
        email: user.email,
      },
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error("Error fetching directory:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
