import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { authenticator } from "otplib"
import QRCode from "qrcode"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const secret = authenticator.generateSecret()
    const serviceName = "The Black Silk"
    const accountName = session.user.email!

    const otpauth = authenticator.keyuri(accountName, serviceName, secret)
    const qrCodeUrl = await QRCode.toDataURL(otpauth)

    // Store the secret temporarily (not enabled yet)
    await prisma.mFASecret.upsert({
      where: { userId: session.user.id },
      update: { secret, isEnabled: false },
      create: { userId: session.user.id, secret, isEnabled: false },
    })

    return NextResponse.json({
      secret,
      qrCodeUrl,
      manualEntryKey: secret,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to setup MFA" }, { status: 500 })
  }
}
