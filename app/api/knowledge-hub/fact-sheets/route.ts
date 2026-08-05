import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const factSheets = await prisma.factSheet.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json({ factSheets });
  } catch (error) {
    console.error("Error fetching fact sheets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
