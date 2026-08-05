import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user's saved publications
    const savedPublications = await prisma.userPublication.findMany({
      where: {
        userId: user.id,
      },
      include: {
        publication: true,
      },
      orderBy: {
        savedAt: "desc",
      },
    });

    const publications = savedPublications.map((saved) => ({
      id: saved.publication.id,
      title: saved.publication.title,
      author: saved.publication.author,
      publishDate: saved.publication.publishedAt.toISOString(),
      category: saved.publication.category,
      type: saved.publication.type,
      readTime: saved.publication.readTime || "N/A",
      description: saved.publication.excerpt,
      image: saved.publication.image,
      downloadCount: saved.publication.downloads,
      saved: true,
      tags: saved.publication.tags,
      pdfUrl: saved.publication.pdfUrl,
      savedAt: saved.savedAt.toISOString(),
    }));

    return NextResponse.json({ publications });
  } catch (error) {
    console.error("Error fetching saved publications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { publicationId } = await request.json();

    if (!publicationId) {
      return NextResponse.json(
        { error: "Publication ID is required" },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if publication exists
    const publication = await prisma.publication.findUnique({
      where: { id: publicationId },
    });

    if (!publication) {
      return NextResponse.json(
        { error: "Publication not found" },
        { status: 404 }
      );
    }

    // Save publication
    const savedPublication = await prisma.userPublication.create({
      data: {
        userId: user.id,
        publicationId: publicationId,
      },
    });

    return NextResponse.json({
      message: "Publication saved successfully",
      savedPublication,
    });
  } catch (error: any) {
    console.error("Error saving publication:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Publication already saved" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const publicationId = searchParams.get("publicationId");

    if (!publicationId) {
      return NextResponse.json(
        { error: "Publication ID is required" },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove saved publication
    await prisma.userPublication.deleteMany({
      where: {
        userId: user.id,
        publicationId: publicationId,
      },
    });

    return NextResponse.json({
      message: "Publication removed from saved list",
    });
  } catch (error) {
    console.error("Error removing saved publication:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
