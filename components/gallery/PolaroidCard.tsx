import { youtubeThumb, youtubeThumbHd } from "@/lib/youtube";

type Props = {
  // YouTube id for the still.
  id: string;
  caption: string;
  meta?: string;
};

// A single instant-print: the still in a thick white border with a handwritten
// caption along the bottom. The physical object earns a soft shadow and a hair
// of corner radius, it's a print on a table, not site chrome. Pure presentation;
// the stack handles position and drag.
export function PolaroidCard({ id, caption, meta }: Props) {
  return (
    <figure className="flex h-full w-full select-none flex-col rounded-[3px] bg-[#fbfaf6] p-3 pb-0 shadow-[0_18px_40px_-12px_rgba(24,20,16,0.45)] ring-1 ring-ink/5">
      <div className="relative aspect-square w-full overflow-hidden bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={youtubeThumbHd(id)}
          alt={caption}
          draggable={false}
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src.includes("maxres")) img.src = youtubeThumb(id);
          }}
          className="absolute inset-0 h-full w-full scale-[1.35] object-cover"
        />
        {/* faint print grain */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/15 to-transparent" />
      </div>

      <figcaption className="flex items-baseline justify-between gap-2 px-1 py-3">
        <span className="font-hand text-2xl leading-none text-ink">
          {caption}
        </span>
        {meta ? (
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-ink-soft">
            {meta}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
