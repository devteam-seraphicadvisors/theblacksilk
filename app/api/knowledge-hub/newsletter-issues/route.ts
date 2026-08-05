import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const issues = await prisma.newsletterIssue.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 10,
    });

    return NextResponse.json({ issues });
  } catch (error) {
    console.error("Error fetching newsletter issues:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
