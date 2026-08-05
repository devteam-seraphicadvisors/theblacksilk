import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || session.user.id;

    // Verify user can access this data
    if (userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // For now, return mock data since we don't have a billing table
    // In a real app, you'd fetch from a payments/invoices table
    const mockInvoices = [
      {
        id: "INV-2024-001",
        amount: 8500,
        currency: "inr",
        status: "paid",
        description: "Professional Membership - Annual",
        createdAt: "2024-01-15T00:00:00Z",
        paidAt: "2024-01-15T00:00:00Z",
      },
      {
        id: "INV-2023-012",
        amount: 7500,
        currency: "inr",
        status: "paid",
        description: "Professional Membership - Annual",
        createdAt: "2023-01-15T00:00:00Z",
        paidAt: "2023-01-15T00:00:00Z",
      },
    ];

    return NextResponse.json({ invoices: mockInvoices });
  } catch (error) {
    console.error("Error fetching billing data:", error);
    return NextResponse.json(
      { error: "Failed to fetch billing data" },
      { status: 500 }
    );
  }
}
