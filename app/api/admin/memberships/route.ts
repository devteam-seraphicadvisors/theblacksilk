import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const memberships = await prisma.membership.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const formattedMemberships = memberships.map((membership) => ({
      id: membership.id,
      userId: membership.userId,
      user: membership.user,
      type: membership.type,
      status: membership.status,
      startDate: membership.startDate.toISOString(),
      endDate: membership.endDate.toISOString(),
      createdAt: membership.createdAt.toISOString(),
    }))

    return NextResponse.json(formattedMemberships)
  } catch (error) {
    console.error("Error fetching memberships:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { userId, type, status, startDate, endDate } = body

    // Check if user already has an active membership
    const existingMembership = await prisma.membership.findFirst({
      where: {
        userId,
        status: "active",
      },
    })

    if (existingMembership) {
      return NextResponse.json({ error: "User already has an active membership" }, { status: 400 })
    }

    const membership = await prisma.membership.create({
      data: {
        userId,
        type,
        status,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(membership, { status: 201 })
  } catch (error) {
    console.error("Error creating membership:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
