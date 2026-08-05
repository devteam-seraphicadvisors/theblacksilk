import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const membership = await prisma.membership.findUnique({
      where: { id: params.id },
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

    if (!membership) {
      return NextResponse.json({ error: "Membership not found" }, { status: 404 })
    }

    const formattedMembership = {
      id: membership.id,
      userId: membership.userId,
      user: membership.user,
      type: membership.type,
      status: membership.status,
      startDate: membership.startDate.toISOString(),
      endDate: membership.endDate.toISOString(),
      createdAt: membership.createdAt.toISOString(),
    }

    return NextResponse.json(formattedMembership)
  } catch (error) {
    console.error("Error fetching membership:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { type, status, startDate, endDate } = body

    const membership = await prisma.membership.update({
      where: { id: params.id },
      data: {
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

    return NextResponse.json(membership)
  } catch (error) {
    console.error("Error updating membership:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.membership.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Membership deleted successfully" })
  } catch (error) {
    console.error("Error deleting membership:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
