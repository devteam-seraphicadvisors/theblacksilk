"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ApplicationForm from "./application-form";

interface ApplicationDialogProps {
  committeeSlug: string;
  committeeName: string;
  focusAreas?: string[];
  triggerButton?: React.ReactNode;
  triggerClassName?: string;
}

export default function ApplicationDialog({
  committeeSlug,
  committeeName,
  focusAreas = [],
  triggerButton,
  triggerClassName = "",
}: ApplicationDialogProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    // If user is trying to open and is not authenticated, redirect to login
    if (newOpen && status === "unauthenticated") {
      router.push(`/login?callbackUrl=/community/committees/${committeeSlug}`);
      return;
    }
    setOpen(newOpen);
  };

  const handleButtonClick = () => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/community/committees/${committeeSlug}`);
    } else {
      setOpen(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Button
        size="lg"
        className={
          triggerClassName ||
          "w-full bg-white text-gray-900 hover:bg-gray-100 rounded-xl"
        }
        onClick={handleButtonClick}
      >
        {status === "unauthenticated" ? "Sign in to Apply" : "Apply to Join"}
      </Button>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <ApplicationForm
          committeeSlug={committeeSlug}
          committeeName={committeeName}
          focusAreas={focusAreas}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
