"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AccountCtaProps {
  // "dark" for use on black sections, "light" for white sections
  tone?: "dark" | "light";
  // Where signed-in users go, e.g. "/dashboard" or "/dashboard/forum"
  signedInHref: string;
  signedInLabel: string;
  align?: "start" | "center";
}

// Sign-in-aware call to action: signed-in users go straight to their panel,
// everyone else is invited to create a free account or sign in.
export function AccountCta({
  tone = "dark",
  signedInHref,
  signedInLabel,
  align = "start",
}: AccountCtaProps) {
  const { status } = useSession();

  const primary =
    tone === "dark"
      ? "bg-white !text-black hover:bg-neutral-200"
      : "bg-black !text-white hover:bg-neutral-800";
  const secondary =
    tone === "dark"
      ? "bg-transparent border-white text-white hover:bg-white hover:!text-black"
      : "bg-transparent border-black text-black hover:bg-black hover:!text-white";
  const base =
    "rounded-none font-mono text-xs uppercase tracking-wider px-8 py-3 h-auto";
  const wrapper = `flex flex-wrap gap-4 ${align === "center" ? "justify-center" : ""}`;

  if (status === "authenticated") {
    return (
      <div className={wrapper}>
        <Button asChild className={`${base} ${primary}`}>
          <Link href={signedInHref}>
            {signedInLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={wrapper}>
      <Button asChild className={`${base} ${primary}`}>
        <Link href="/register">
          Create Free Account
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button asChild variant="outline" className={`${base} ${secondary}`}>
        <Link href={`/login?callbackUrl=${encodeURIComponent(signedInHref)}`}>
          Sign In
        </Link>
      </Button>
    </div>
  );
}
