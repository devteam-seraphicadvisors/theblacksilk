import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scheduled Maintenance | The Black Silk",
  description:
    "The Black Silk platform is currently undergoing scheduled maintenance and updates. We will be back online shortly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
