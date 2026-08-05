import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const issues = await prisma.newsletterIssue.findMany({
      orderBy: { createdAt: "desc" },
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

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const issue = await prisma.newsletterIssue.create({
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        topics: data.topics || [],
        image: data.image,
        readTime: data.readTime,
        published: data.published || false,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      },
    });

    return NextResponse.json({ issue }, { status: 201 });
  } catch (error) {
    console.error("Error creating newsletter issue:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
