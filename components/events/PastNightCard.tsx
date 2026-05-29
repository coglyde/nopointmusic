import { OutboundLink } from "@/components/ui/OutboundLink";
import { PlayableThumb } from "@/components/video/PlayableThumb";
import type { NpEvent } from "@/lib/content/events";
import { formatStamp } from "@/lib/format";
import { youtubeWatch } from "@/lib/youtube";

type Props = {
  event: NpEvent;
  // Opens the capture in the lightbox (only meaningful when there's a video).
  onPlay: (event: NpEvent) => void;
};

// One past night: its captured still up top (click to play in the lightbox),
// then date·venue, title, and lineup. Nights without a capture show a quiet
// placeholder so the grid stays even.
export function PastNightCard({ event, onPlay }: Props) {
  return (
    <article className="flex flex-col">
      {event.videoId ? (
        <PlayableThumb
          id={event.videoId}
          alt={`${event.title} - ${event.venue}`}
          onPlay={() => onPlay(event)}
        />
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

      {event.videoId ? (
        <div className="mt-3">
          <OutboundLink href={youtubeWatch(event.videoId)}>
            Watch on YouTube
          </OutboundLink>
        </div>
      ) : null}
    </article>
  );
}
