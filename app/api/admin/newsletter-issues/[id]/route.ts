import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const issue = await prisma.newsletterIssue.update({
      where: { id: params.id },
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        topics: data.topics || [],
        image: data.image,
        readTime: data.readTime,
        published: data.published || false,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
      },
    });

    return NextResponse.json({ issue });
  } catch (error) {
    console.error("Error updating newsletter issue:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.newsletterIssue.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting newsletter issue:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
