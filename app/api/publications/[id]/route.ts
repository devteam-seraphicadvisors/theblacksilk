import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET single publication
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const publication = await prisma.publication.findUnique({
      where: { id: params.id },
    });

    if (!publication) {
      return NextResponse.json(
        { error: "Publication not found" },
        { status: 404 }
      );
    }

    // Increment views
    await prisma.publication.update({
      where: { id: params.id },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ ...publication, views: publication.views + 1 });
  } catch (error) {
    console.error("Error fetching publication:", error);
    return NextResponse.json(
      { error: "Failed to fetch publication" },
      { status: 500 }
    );
  }
}

// PATCH update publication (admin only)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session as any).user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const updateData: any = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.readTime !== undefined) updateData.readTime = data.readTime;
    if (data.author !== undefined) updateData.author = data.author;
    if (data.authorImage !== undefined)
      updateData.authorImage = data.authorImage;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.pdfUrl !== undefined) updateData.pdfUrl = data.pdfUrl;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.published !== undefined) updateData.published = data.published;
    if (data.publishedAt !== undefined)
      updateData.publishedAt = new Date(data.publishedAt);

    const publication = await prisma.publication.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(publication);
  } catch (error) {
    console.error("Error updating publication:", error);
    return NextResponse.json(
      { error: "Failed to update publication" },
      { status: 500 }
    );
  }
}

// DELETE publication (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session as any).user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.publication.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting publication:", error);
    return NextResponse.json(
      { error: "Failed to delete publication" },
      { status: 500 }
    );
  }
}
