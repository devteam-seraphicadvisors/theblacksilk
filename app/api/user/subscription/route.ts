import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Force dynamic rendering - this route uses session
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mock subscription data - replace with actual database query
    const mockSubscription = {
      id: "sub_123",
      userId: session.user.id,
      plan: "Professional",
      status: "active",
      currentPeriodStart: new Date("2024-01-01"),
      currentPeriodEnd: new Date("2024-12-31"),
      cancelAtPeriodEnd: false,
      amount: 8500,
      currency: "INR",
      interval: "year",
      paymentMethod: {
        brand: "visa",
        last4: "4242",
        expiryMonth: 12,
        expiryYear: 2025,
      },
    };

    return NextResponse.json(mockSubscription);
  } catch (error) {
    console.error("Subscription fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action, planId } = await request.json();

    // Handle subscription updates
    switch (action) {
      case "cancel":
        // Cancel subscription at period end
        console.log("Cancelling subscription for user:", session.user.id);
        break;
      case "reactivate":
        // Reactivate cancelled subscription
        console.log("Reactivating subscription for user:", session.user.id);
        break;
      case "upgrade":
      case "downgrade":
        // Change subscription plan
        console.log(
          `${action} subscription to plan ${planId} for user:`,
          session.user.id
        );
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ message: "Subscription updated successfully" });
  } catch (error) {
    console.error("Subscription update error:", error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
