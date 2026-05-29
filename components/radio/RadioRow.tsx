import { PlayableThumb } from "@/components/video/PlayableThumb";
import type { Video } from "@/lib/content/youtube";
import { formatDate } from "@/lib/format";

type Props = {
  show: Video;
  onPlay: (show: Video) => void;
};

// A non-featured broadcast: a small playable still beside its billing. Clicking
// the still plays it in the lightbox.
export function RadioRow({ show, onPlay }: Props) {
  return (
    <article className="grid grid-cols-[140px_1fr] gap-5 py-8 sm:grid-cols-[220px_1fr] sm:gap-8">
      <div className="w-full">
        <PlayableThumb
          id={show.id}
          alt={`${show.artist}, ${show.title}`}
          onPlay={() => onPlay(show)}
        />
      </div>

      <div className="flex flex-col justify-center">
        <h3 className="text-xl font-bold leading-tight tracking-[-0.01em] text-ink sm:text-2xl">
          {show.artist}
        </h3>
        <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft">
          {show.title}
        </p>
        {show.presentedBy ? (
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
            Presented by {show.presentedBy}
          </p>
        ) : null}
        <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft/70">
          {formatDate(show.date)}
        </p>
      </div>
    </article>
  );
}
