import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  try {
    const { eventId, eventSlug, amount, ticketType, userDetails } =
      await request.json();

    // Get the base URL from the request headers if NEXT_PUBLIC_BASE_URL is not set
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      `${request.nextUrl.protocol}//${request.nextUrl.host}`;

    // Ensure the URL has proper scheme
    const normalizedBaseUrl = baseUrl.startsWith("http")
      ? baseUrl
      : `https://${baseUrl}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Event Registration - ${eventSlug}`,
              description: `${
                ticketType === "earlybird" ? "Early Bird" : "Regular"
              } ticket registration`,
            },
            unit_amount: amount * 100, // Stripe expects amount in paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${normalizedBaseUrl}/events/${eventSlug}/register/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${normalizedBaseUrl}/events/${eventSlug}/register?cancelled=true`,
      customer_email: userDetails.email,
      metadata: {
        eventId: eventId.toString(),
        eventSlug,
        ticketType,
        name: userDetails.name,
        phone: userDetails.phone,
        organization: userDetails.organization,
        designation: userDetails.designation || "",
        experience: userDetails.experience || "",
        dietaryRequirements: userDetails.dietaryRequirements || "",
        specialRequests: userDetails.specialRequests || "",
      },
    });

    return NextResponse.json({ url: session.url });
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
