import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const subscribers = await prisma.newsletter.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedSubscribers = subscribers.map((sub) => ({
      id: sub.id,
      email: sub.email,
      isActive: sub.isActive,
      createdAt: sub.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedSubscribers);
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
