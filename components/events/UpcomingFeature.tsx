import { OutboundLink } from "@/components/ui/OutboundLink";
import { EVENTS, type NpEvent } from "@/lib/content/events";
import { isUpcoming } from "@/lib/format";

function dayParts(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return {
    day: String(d.getUTCDate()).padStart(2, "0"),
    month: d
      .toLocaleDateString("en-CA", { month: "short", timeZone: "UTC" })
      .toUpperCase(),
    year: d.getUTCFullYear(),
  };
}

function Feature({ event }: { event: NpEvent }) {
  const { day, month, year } = dayParts(event.date);
  return (
    <article className="grid grid-cols-1 gap-8 border-t-2 border-accent pt-8 sm:grid-cols-[auto_1fr] sm:gap-14">
      <div className="flex items-start gap-4 sm:flex-col sm:gap-1">
        <span className="text-6xl font-black leading-none tracking-[-0.04em] text-ink sm:text-8xl">
          {day}
        </span>
        <span className="font-mono text-sm uppercase tracking-[0.25em] text-ink-soft sm:mt-2">
          {month}
          <br className="hidden sm:block" /> <span className="sm:block">{year}</span>
        </span>
      </div>

      <div className="flex flex-col">
        <h2 className="text-5xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-ink sm:text-7xl">
          {event.title}
        </h2>
        <p className="mt-4 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-ink-soft">
          {event.lineup.join(" · ")}
        </p>
        <p className="mt-1 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-accent">
          {event.venue} - {event.city}
        </p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
          {event.description}
        </p>
        {event.ticket ? (
          <div className="mt-7">
            <OutboundLink href={event.ticket}>Tickets</OutboundLink>
          </div>
        ) : null}
      </div>
    </article>
  );
}

// A-side: the next night, treated as a headline - oversized date and title,
// an accent rule across the top. Any further upcoming dates list quietly
// beneath. Empty state stays composed rather than collapsing.
export function UpcomingFeature() {
  const upcoming = EVENTS.filter((e) => isUpcoming(e.date)).sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  return (
    <section className="mt-14">
      <div className="mb-10 flex items-baseline gap-3 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">
        <span className="text-accent">A-side</span>
        <span>Upcoming</span>
      </div>

      {upcoming.length === 0 ? (
        <p className="max-w-lg text-base leading-relaxed text-ink-soft">
          Nothing on the calendar right now. The next one goes to the mailing
          list and Instagram first.
        </p>
      ) : (
        <>
          <Feature event={upcoming[0]} />
          {upcoming.length > 1 ? (
            <div className="mt-10 divide-y divide-ink/10 border-t border-ink/10">
              {upcoming.slice(1).map((event) => {
                const { day, month } = dayParts(event.date);
                return (
                  <div
                    key={event.slug}
                    className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-5"
                  >
                    <span className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-ink-soft">
                      {month} {day}
                    </span>
                    <span className="text-lg font-bold text-ink">
                      {event.title}
                    </span>
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft/70">
                      {event.venue}
                    </span>
                    {event.ticket ? (
                      <span className="ml-auto">
                        <OutboundLink href={event.ticket}>Tickets</OutboundLink>
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
