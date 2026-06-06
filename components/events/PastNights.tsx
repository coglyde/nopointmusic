import type { NpEvent } from "@/lib/content/events";
import { isUpcoming } from "@/lib/format";
import { PastNightCard } from "./PastNightCard";

type Props = {
  events: readonly NpEvent[];
};

// B-side: the archive. Past nights, most recent first, each with its Eventbrite
// flyer and a link back to the listing.
export function PastNights({ events }: Props) {
  const past = events.filter((e) => !isUpcoming(e.date)).sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <section className="mt-24">
      <div className="mb-10 flex items-baseline gap-3 border-b border-ink/15 pb-4 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">
        <span className="text-accent">B-side</span>
        <span>Past</span>
        <span className="ml-auto tabular-nums text-ink-soft/60">
          {String(past.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {past.map((event) => (
          <PastNightCard key={event.slug} event={event} />
        ))}
      </div>
    </section>
  );
}
