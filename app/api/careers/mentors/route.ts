import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Public API endpoint - no authentication required
// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  console.log("Mentors API called:", new Date().toISOString());

  try {
    if (!prisma) {
      throw new Error("Prisma client not initialized");
    }

    const mentors = await prisma.mentor.findMany({
      where: { active: true },
      orderBy: { rating: "desc" },
    });

    console.log(`Found ${mentors.length} mentors`);

    return NextResponse.json({
      mentors,
      count: mentors.length,
      public: true,
    });
  } catch (error) {
    console.error("Error fetching mentors:", error);

    // Always return JSON, never HTML
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        error: "Failed to fetch mentors",
        message: errorMessage,
        mentors: [],
        stack:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.stack
            : undefined,
      },
      { status: 500 }
    );
  }
}
