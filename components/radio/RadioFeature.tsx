import { OutboundLink } from "@/components/ui/OutboundLink";
import { PlayableThumb } from "@/components/video/PlayableThumb";
import type { Video } from "@/lib/content/youtube";
import { formatDate } from "@/lib/format";
import { youtubeWatch } from "@/lib/youtube";

type Props = {
  show: Video;
  onPlay: (show: Video) => void;
};

// The latest broadcast, given the headline treatment: a large stage on the
// left, the host and series billing on the right. The artist is the headline;
// the series and presenter sit under it.
export function RadioFeature({ show, onPlay }: Props) {
  return (
    <article className="grid grid-cols-1 items-center gap-10 border-t-2 border-accent pt-10 sm:grid-cols-[1.5fr_1fr] sm:gap-14">
      <PlayableThumb
        id={show.id}
        alt={`${show.artist} - ${show.title}`}
        onPlay={() => onPlay(show)}
        feature
      />

      <div className="flex flex-col">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">
          Latest
        </span>
        <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl">
          {show.artist}
        </h2>
        <p className="mt-4 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-ink">
          {show.title}
        </p>
        {show.presentedBy ? (
          <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
            Presented by {show.presentedBy}
          </p>
        ) : null}
        <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft/70">
          {formatDate(show.date)}
        </p>

        <div className="mt-7">
          <OutboundLink href={youtubeWatch(show.id)}>
            Watch on YouTube
          </OutboundLink>
        </div>
      </div>
    </article>
  );
}
