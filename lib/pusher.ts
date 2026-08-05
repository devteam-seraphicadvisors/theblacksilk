import PusherServer from "pusher"
import PusherClient from "pusher-js"

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID || "app_id_placeholder",
  key: process.env.PUSHER_KEY || "key_placeholder",
  secret: process.env.PUSHER_SECRET || "secret_placeholder",
  cluster: process.env.PUSHER_CLUSTER || "ap2",
  useTLS: true,
})

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY || "key_placeholder", {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap2",
})
