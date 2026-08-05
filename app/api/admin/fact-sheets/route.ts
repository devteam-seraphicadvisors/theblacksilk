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

    const factSheets = await prisma.factSheet.findMany({
      orderBy: { createdAt: "desc" },
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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const factSheet = await prisma.factSheet.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        pages: parseInt(data.pages),
        image: data.image,
        tags: data.tags || [],
        featured: data.featured || false,
        rating: parseFloat(data.rating) || 0,
        pdfUrl: data.pdfUrl,
        published: data.published !== false,
      },
    });

    return NextResponse.json({ factSheet }, { status: 201 });
  } catch (error) {
    console.error("Error creating fact sheet:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
