import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Public API endpoint - no authentication required
// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  console.log("Jobs API called:", new Date().toISOString());

  try {
    if (!prisma) {
      throw new Error("Prisma client not initialized");
    }

    const jobs = await prisma.job.findMany({
      where: { status: "open" },
      orderBy: { postedAt: "desc" },
    });

    console.log(`Found ${jobs.length} jobs`);

    return NextResponse.json({
      jobs,
      count: jobs.length,
      public: true,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);

    // Always return JSON, never HTML
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        error: "Failed to fetch jobs",
        message: errorMessage,
        jobs: [],
        stack:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.stack
            : undefined,
      },
      { status: 500 }
    );
  }
}
