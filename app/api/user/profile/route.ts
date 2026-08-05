import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";


// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as { user?: { id?: string; name?: string; email?: string; image?: string } } | null;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mock profile data - replace with actual database query
    const mockProfile = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      bio: "Legal technology enthusiast with 5+ years of experience",
      organization: "Tech Law Firm",
      position: "Senior Associate",
      experience: "6-10",
      location: "Mumbai, India",
      interests: ["AI & Machine Learning", "Data Privacy", "Legal Technology"],
      goals: "Stay updated on legal tech trends and network with professionals",
      onboardingCompleted: true,
      memberSince: new Date("2023-01-15"),
      eventsAttended: 12,
      committeeMemberships: 3,
      publicationsRead: 28,
    };

    return NextResponse.json(mockProfile);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profileData = await request.json();

    // Here you would update the profile in your database
    console.log("Updating profile for user", session.user.id, ":", profileData);

    // In a real app:
    /*
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: profileData.name,
        bio: profileData.bio,
        organization: profileData.organization,
        position: profileData.position,
        location: profileData.location,
        website: profileData.website,
        linkedin: profileData.linkedin,
        twitter: profileData.twitter,
      }
    })
    */

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
