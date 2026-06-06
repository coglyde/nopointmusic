import { OutboundLink } from "@/components/ui/OutboundLink";
import type { NpEvent } from "@/lib/content/events";
import { formatStamp } from "@/lib/format";

type Props = {
  event: NpEvent;
};

// One past night: Eventbrite flyer up top, then date·venue, title, and lineup.
export function PastNightCard({ event }: Props) {
  return (
    <article className="flex flex-col">
      {event.imageUrl ? (
        <div className="relative aspect-video w-full overflow-hidden bg-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.imageUrl}
            alt={`${event.title}, ${event.venue}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-cream-deep">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-ink-soft/60">
            {event.venue}
          </span>
        </div>
      )}

      <div className="mt-4 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">
        <span className="text-ink">{formatStamp(event.date)}</span>
        <span className="h-px w-4 bg-ink/20" />
        <span>{event.venue}</span>
      </div>

      <h3 className="mt-2 text-xl font-bold leading-tight tracking-[-0.01em] text-ink">
        {event.title}
      </h3>
      <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-soft/80">
        {event.lineup.join(" · ")}
      </p>

      {event.ticket ? (
        <div className="mt-3">
          <OutboundLink href={event.ticket}>View on Eventbrite</OutboundLink>
        </div>
      ) : null}
    </article>
  );
}
