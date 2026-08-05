import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = headers().get("stripe-signature")!;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Handle successful event registration payment
      const {
        eventId,
        eventSlug,
        ticketType,
        name,
        phone,
        organization,
        designation,
        experience,
        dietaryRequirements,
        specialRequests,
      } = session.metadata!;

      console.log("Event registration successful:", {
        email: session.customer_email,
        eventId,
        eventSlug,
        ticketType,
        name,
        phone,
        organization,
        designation,
        experience,
        dietaryRequirements,
        specialRequests,
        amount: session.amount_total,
        sessionId: session.id,
      });

      // Here you would typically:
      // 1. Create event registration record in your database
      // 2. Send confirmation email to attendee
      // 3. Send event details and calendar invite
      // 4. Update event capacity/availability

      // Example database operations:
      // await createEventRegistration({
      //   email: session.customer_email,
      //   eventId: parseInt(eventId),
      //   eventSlug,
      //   ticketType,
      //   attendeeDetails: {
      //     name,
      //     phone,
      //     organization,
      //     designation,
      //     experience,
      //     dietaryRequirements,
      //     specialRequests,
      //   },
      //   stripeSessionId: session.id,
      //   amountPaid: session.amount_total,
      //   paymentStatus: 'completed',
      // })

      // await sendEventConfirmationEmail({
      //   email: session.customer_email,
      //   name,
      //   eventSlug,
      //   sessionId: session.id,
      // })
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Event webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
