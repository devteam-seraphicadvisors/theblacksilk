import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions, createMembership } from "@/lib/auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as { user?: { id?: string } } | null;
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId, membershipType } = await request.json();

    if (!sessionId || !membershipType) {
      return NextResponse.json(
        { error: "Session ID and membership type required" },
        { status: 400 }
      );
    }

    console.log("Activating membership for user:", session.user.id, {
      sessionId,
      membershipType,
    });

    // Verify the Stripe session
    try {
      const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

      if (stripeSession.payment_status !== "paid") {
        return NextResponse.json(
          { error: "Payment not completed" },
          { status: 400 }
        );
      }

      console.log("Stripe session verified:", stripeSession.payment_status);

      // Create membership record
      const membership = await createMembership(
        session.user.id,
        membershipType
      );

      if (!membership) {
        return NextResponse.json(
          { error: "Failed to create membership" },
          { status: 500 }
        );
      }

      console.log("Membership created successfully:", membership.id);

      return NextResponse.json({
        success: true,
        membership: {
          id: membership.id,
          type: membership.type,
          status: membership.status,
          endDate: membership.endDate,
        },
      });
    } catch (stripeError) {
      console.error("Stripe verification error:", stripeError);
      return NextResponse.json(
        { error: "Failed to verify payment" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Membership activation error:", error);
    return NextResponse.json(
      { error: "Failed to activate membership" },
      { status: 500 }
    );
  }
}
