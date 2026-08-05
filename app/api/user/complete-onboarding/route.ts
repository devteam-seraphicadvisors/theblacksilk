import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions, updateUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as { user?: { id?: string } } | null;
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      bio,
      organization,
      position,
      location,
      website,
      linkedin,
      twitter,
    } = await request.json();

    // Update user profile
    const updatedUser = await updateUser(session.user.id, {
      bio: bio || null,
      organization: organization || null,
      position: position || null,
      location: location || null,
      website: website || null,
      linkedin: linkedin || null,
      twitter: twitter || null,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Onboarding completed successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        organization: updatedUser.organization,
        position: updatedUser.position,
        location: updatedUser.location,
        website: updatedUser.website,
        linkedin: updatedUser.linkedin,
        twitter: updatedUser.twitter,
      },
    });
  } catch (error) {
    console.error("Onboarding completion error:", error);
    return NextResponse.json(
      { error: "Failed to complete onboarding" },
      { status: 500 }
    );
  }
}
