import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const profileSelect = {
  id: true,
  name: true,
  email: true,
  image: true,
  phone: true,
  organization: true,
  position: true,
  bio: true,
  createdAt: true,
} as const;

// Editable fields and their maximum lengths. Email is the login and is not
// editable here; the image has its own endpoint (/api/user/avatar).
const LIMITS = {
  name: 100,
  phone: 30,
  organization: 150,
  position: 150,
  bio: 1000,
} as const;

type EditableField = keyof typeof LIMITS;

export async function GET() {
  const session = (await getServerSession(authOptions)) as Session | null;
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: profileSelect,
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(request: NextRequest) {
  const session = (await getServerSession(authOptions)) as Session | null;
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const data: Partial<Record<EditableField, string | null>> = {};
  for (const field of Object.keys(LIMITS) as EditableField[]) {
    if (!(field in body)) continue;
    const raw = body[field];
    if (raw !== null && typeof raw !== "string") {
      return NextResponse.json({ error: `Invalid ${field}` }, { status: 400 });
    }
    const value = typeof raw === "string" ? raw.trim() : "";
    if (value.length > LIMITS[field]) {
      return NextResponse.json(
        { error: `${field} must be at most ${LIMITS[field]} characters` },
        { status: 400 }
      );
    }
    data[field] = value === "" ? null : value;
  }

  if ("name" in data && !data.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data,
    select: profileSelect,
  });

  return NextResponse.json(user);
}
