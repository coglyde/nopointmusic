import type { Metadata } from "next";
import { PageShell } from "@/components/section/PageShell";
import { UpcomingFeature } from "@/components/events/UpcomingFeature";
import { PastNights } from "@/components/events/PastNights";

export const metadata: Metadata = {
  title: "Events · No Point Music",
  description:
    "Upcoming and past No Point Music nights in Vancouver: Platform 9, Village Studios, Prospect Point. Tickets link out; past sets play right here.",
};

export default function EventsPage() {
  return (
    <PageShell
      index="02"
      kicker="A-side · B-side"
      title="Events"
      lede="90+ nights at Platform 9 and NOP Studios, built around one thing: human connection. We don't sell tickets here, so every upcoming night links out to its own source. When a night passes, it flips to the B-side, where the set lives on."
    >
      <UpcomingFeature />
      <PastNights />
    </PageShell>
  );
}
