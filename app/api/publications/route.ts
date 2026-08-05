import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all publications
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");
    const type = searchParams.get("type");

    const where: any = {
      published: true,
    };

    if (category) {
      where.category = category;
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (type) {
      where.type = type;
    }

    const publications = await prisma.publication.findMany({
      where,
      orderBy: {
        publishedAt: "desc",
      },
      take: limit ? parseInt(limit) : undefined,
    });

    // Transform data for dashboard compatibility
    const transformedPublications = publications.map((pub) => ({
      id: pub.id,
      title: pub.title,
      author: pub.author,
      publishDate: pub.publishedAt.toISOString(),
      category: pub.category,
      type: pub.type,
      readTime: pub.readTime || "N/A",
      description: pub.excerpt,
      image: pub.image,
      downloadCount: pub.downloads,
      saved: false, // Will be determined by client-side logic
      tags: pub.tags,
      pdfUrl: pub.pdfUrl,
    }));

    return NextResponse.json({ publications: transformedPublications });
  } catch (error) {
    console.error("Error fetching publications:", error);
    return NextResponse.json(
      { error: "Failed to fetch publications" },
      { status: 500 }
    );
  }
}

// POST create new publication (admin only)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session as any).user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const publication = await prisma.publication.create({
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        readTime: data.readTime,
        author: data.author,
        authorImage: data.authorImage,
        image: data.image,
        type: data.type || "article",
        tags: data.tags || [],
        pdfUrl: data.pdfUrl,
        featured: data.featured || false,
        published: data.published !== false,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      },
    });

    return NextResponse.json(publication);
  } catch (error) {
    console.error("Error creating publication:", error);
    return NextResponse.json(
      { error: "Failed to create publication" },
      { status: 500 }
    );
  }
}
