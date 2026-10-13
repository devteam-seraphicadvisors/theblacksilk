import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteAvatar, isCloudinaryConfigured, uploadAvatar } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Upload or replace the signed-in user's profile picture.
// Body: multipart/form-data with a "file" field.
export async function POST(request: NextRequest) {
  const session = (await getServerSession(authOptions)) as Session | null;
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Image uploads are not configured yet" },
      { status: 503 }
    );
  }

  let file: FormDataEntryValue | null;
  try {
    file = (await request.formData()).get("file");
  } catch {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Please upload a JPG, PNG, or WebP image" },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image must be 5 MB or smaller" },
      { status: 400 }
    );
  }

  try {
    const url = await uploadAvatar(
      session.user.id,
      Buffer.from(await file.arrayBuffer())
    );
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: url },
    });
    return NextResponse.json({ image: url });
  } catch (error) {
    console.error("Avatar upload error:", error);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}

// Remove the profile picture.
export async function DELETE() {
  const session = (await getServerSession(authOptions)) as Session | null;
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (isCloudinaryConfigured()) {
      await deleteAvatar(session.user.id);
    }
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: null },
    });
    return NextResponse.json({ image: null });
  } catch (error) {
    console.error("Avatar delete error:", error);
    return NextResponse.json(
      { error: "Could not remove the picture. Please try again." },
      { status: 500 }
    );
  }
}
