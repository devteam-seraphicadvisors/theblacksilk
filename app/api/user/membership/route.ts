import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || session.user.id;

    // Verify user can access this data
    if (userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch user's membership data
    const membership = await prisma.membership.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!membership) {
      return NextResponse.json(
        { error: "No membership found" },
        { status: 404 }
      );
    }

    return NextResponse.json(membership);
  } catch (error) {
    console.error("Error fetching membership:", error);
    return NextResponse.json(
      { error: "Failed to fetch membership data" },
      { status: 500 }
    );
  }
}
