import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { authenticator } from "otplib"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { token } = await request.json()

    const mfaSecret = await prisma.mFASecret.findUnique({
      where: { userId: session.user.id },
    })

    if (!mfaSecret) {
      return NextResponse.json({ error: "MFA not setup" }, { status: 400 })
    }

    const isValid = authenticator.verify({
      token,
      secret: mfaSecret.secret,
    })

    if (!isValid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 })
    }

    // Enable MFA
    await prisma.mFASecret.update({
      where: { userId: session.user.id },
      data: { isEnabled: true },
    })

    await prisma.user.update({
      where: { id: session.user.id },
      data: { mfaEnabled: true },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to verify MFA" }, { status: 500 })
  }
}
