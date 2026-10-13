"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Inquiries are delivered by email until a form backend exists: submitting
// opens the visitor's mail app with the inquiry pre-filled.
const INQUIRY_EMAIL = "partnerships@theblacksilk.org";

interface SponsorshipInquiryFormProps {
  tiers: { id: string; name: string; price: string }[];
}

const labelClass =
  "block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2";
const fieldClass =
  "rounded-none border-neutral-300 focus:border-black focus-visible:ring-black";

export function SponsorshipInquiryForm({ tiers }: SponsorshipInquiryFormProps) {
  const searchParams = useSearchParams();
  const [tier, setTier] = useState("");

  // Tier buttons on the page link to ?tier=<id>#sponsorship-form
  useEffect(() => {
    const requested = searchParams.get("tier");
    if (requested && (requested === "custom" || tiers.some((t) => t.id === requested))) {
      setTier(requested);
    }
  }, [searchParams, tiers]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const tierName =
      tier === "custom"
        ? "Custom package"
        : tiers.find((t) => t.id === tier)?.name ?? "Not specified";

    const body = [
      `Company: ${data.get("company")}`,
      `Contact person: ${data.get("contact")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "-"}`,
      `Website: ${data.get("website") || "-"}`,
      `Preferred tier: ${tierName}`,
      "",
      "Sponsorship goals:",
      `${data.get("goals") || "-"}`,
      "",
      "Additional requirements:",
      `${data.get("requirements") || "-"}`,
    ].join("\n");

    const subject = `Sponsorship inquiry - ${data.get("company")}`;
    window.location.href = `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className={labelClass}>
            Company Name *
          </label>
          <Input id="company" name="company" required placeholder="Your company name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact" className={labelClass}>
            Contact Person *
          </label>
          <Input id="contact" name="contact" required placeholder="Full name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address *
          </label>
          <Input id="email" name="email" type="email" required placeholder="you@company.com" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>
          <Input id="phone" name="phone" type="tel" placeholder="Phone number" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="website" className={labelClass}>
            Company Website
          </label>
          <Input id="website" name="website" type="url" placeholder="https://your-company.com" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Preferred Tier</label>
          <Select value={tier} onValueChange={setTier}>
            <SelectTrigger className="rounded-none border-neutral-300 focus:ring-black">
              <SelectValue placeholder="Select a sponsorship tier" />
            </SelectTrigger>
            <SelectContent>
              {tiers.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name} ({t.price})
                </SelectItem>
              ))}
              <SelectItem value="custom">Not sure yet / custom package</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label htmlFor="goals" className={labelClass}>
          Sponsorship Goals
        </label>
        <Textarea
          id="goals"
          name="goals"
          placeholder="What would you like to achieve through this sponsorship?"
          className={`${fieldClass} min-h-[110px]`}
        />
      </div>

      <div>
        <label htmlFor="requirements" className={labelClass}>
          Additional Requirements
        </label>
        <Textarea
          id="requirements"
          name="requirements"
          placeholder="Any specific benefits or customisations you would like to discuss"
          className={`${fieldClass} min-h-[90px]`}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-black hover:bg-neutral-800 !text-white rounded-none font-mono text-sm uppercase tracking-wider py-4 h-auto"
      >
        Send Sponsorship Inquiry
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <p className="text-xs text-neutral-500 text-center">
        This opens your email app with your inquiry pre-filled, addressed to{" "}
        <a href={`mailto:${INQUIRY_EMAIL}`} className="underline hover:text-black">
          {INQUIRY_EMAIL}
        </a>
        .
      </p>
    </form>
  );
}
