import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as { user?: { id: string } } | null;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, tier, userDetails } = await request.json();

    if (!tier || !userDetails?.name || !userDetails?.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the base URL from the request headers if NEXT_PUBLIC_BASE_URL is not set
    const baseUrl =
      process.env.NEXTAUTH_URL ||
      `${request.nextUrl.protocol}//${request.nextUrl.host}`;

    // Ensure the URL has proper scheme
    const normalizedBaseUrl = baseUrl.startsWith("http")
      ? baseUrl
      : `https://${baseUrl}`;

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `The Black Silk - ${tier} Membership`,
              description: "Annual membership subscription",
            },
            unit_amount: amount * 100, // Stripe expects amount in paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${normalizedBaseUrl}/membership/success?session_id={CHECKOUT_SESSION_ID}&membership_type=${tier}`,
      cancel_url: `${normalizedBaseUrl}/community/membership/payment?tier=${tier}`,
      customer_email: userDetails.email,
      metadata: {
        userId: session.user.id,
        tier,
        name: userDetails.name,
        phone: userDetails.phone || "",
        organization: userDetails.organization || "",
      },
    });

    console.log(
      "Checkout session created:",
      checkoutSession.id,
      "for user:",
      session.user.id
    );

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      {
        error: "Failed to create checkout session",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
