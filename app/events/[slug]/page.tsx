import { redirect } from "next/navigation";

export default function EventDetailRedirectPage() {
  redirect("/events");
}
