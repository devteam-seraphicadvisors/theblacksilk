import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // In a real database / CRM, email would be stored or queued
    console.log(`[Maintenance] Subscriber registered for status updates: ${email}`);

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! You will receive an immediate notification as soon as the platform is live.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Maintenance notification error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again shortly." },
      { status: 500 }
    );
  }
}
