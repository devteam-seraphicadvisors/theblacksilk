import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, name, organization, phone, tier } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        organization,
        // Generate temporary password for OAuth users
        password: await bcrypt.hash(Math.random().toString(36), 10),
      },
    })

    // Create membership
    const endDate = new Date()
    endDate.setFullYear(endDate.getFullYear() + 1) // 1 year from now

    await prisma.membership.create({
      data: {
        userId: user.id,
        type: tier,
        status: "active",
        endDate,
      },
    })

    return NextResponse.json({ success: true, userId: user.id })
  } catch (error) {
    console.error("Registration failed:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
