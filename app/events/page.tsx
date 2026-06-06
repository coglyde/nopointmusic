import type { Metadata } from "next";
import { EventsPageContent } from "@/components/events/EventsPageContent";
import { PageShell } from "@/components/section/PageShell";
import { getEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events · No Point Music",
  description:
    "Upcoming and past No Point Music nights in Vancouver. Synced from Eventbrite. Tickets and flyers link out.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageShell
      index="02"
      kicker="A-side · B-side"
      title="Events"
      lede="Nights at Platform 9 and beyond, synced from Eventbrite. We don't sell tickets here, so every night links out. When a date passes, it flips to the B-side with the original flyer."
    >
      <EventsPageContent events={events} />
    </PageShell>
  );
}
