import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = headers();
    const signature = headersList.get("stripe-signature")!;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    console.log("Webhook received:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("Payment successful for session:", session.id);

      // Extract metadata
      const { tier, name, phone, organization, userId } =
        session.metadata || {};

      // Here you would typically update your database
      // For now, we'll log the successful payment
      console.log("Membership payment completed:", {
        sessionId: session.id,
        email: session.customer_email,
        tier,
        name,
        phone,
        organization,
        userId,
        amount: session.amount_total,
        paymentStatus: session.payment_status,
      });

      // In a real application, you would:
      // 1. Update user's membership status in database
      // 2. Send welcome email
      // 3. Create subscription record
      // 4. Grant access to member benefits

      // Mock database update
      if (userId) {
        console.log(`Updating membership status for user ${userId}`);
        // await updateUserMembership(userId, { hasMembership: true, tier })
      }
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment intent succeeded:", paymentIntent.id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
