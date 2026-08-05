import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to apply for jobs" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      jobId,
      jobTitle,
      coverLetter,
      experience,
      whyInterested,
      availability,
      portfolioUrl,
      linkedinUrl,
      resumeUrl,
    } = body;

    // Validate required fields
    if (
      !jobId ||
      !coverLetter ||
      !experience ||
      !whyInterested ||
      !availability ||
      !resumeUrl
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled out" },
        { status: 400 }
      );
    }

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Check if user has already applied for this job
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobId,
        userId: user.id,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      );
    }

    // Create the application
    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        userId: user.id,
        coverLetter,
        experience,
        whyInterested,
        availability,
        portfolioUrl: portfolioUrl || null,
        linkedinUrl: linkedinUrl || null,
        resumeUrl,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      application: {
        id: application.id,
        jobTitle: job.title,
        status: application.status,
      },
    });
  } catch (error) {
    console.error("Error submitting job application:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        error: "Failed to submit application",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

// Get user's job applications
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to view applications" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const applications = await prisma.jobApplication.findMany({
      where: { userId: user.id },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            department: true,
            location: true,
            type: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching job applications:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        error: "Failed to fetch applications",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
