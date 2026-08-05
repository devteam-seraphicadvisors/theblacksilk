import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!(session as any)?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { conversationId, content, sender, senderId, timestamp, avatar } =
      await request.json();

    // Validate input
    if (!conversationId || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Trigger Pusher event for real-time message delivery
    const channelName = `private-chat-${conversationId}`;
    await pusherServer.trigger(channelName, "new-message", {
      sender,
      senderId,
      content,
      timestamp,
      avatar,
    });

    // TODO: Save message to database
    // const message = await prisma.message.create({
    //   data: {
    //     conversationId,
    //     content,
    //     senderId: session.user.email,
    //   },
    // });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
