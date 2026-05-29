import { youtubeThumb } from "@/lib/youtube";

// The space. No Point's home is a real venue, an old warehouse they rebuilt
// into an artist-driven event space. This feature gives Platform 9 its own
// block: a still from the room, the venue's own description, the build story,
// and the numbers. Still is pulled from a real Platform 9 set on YouTube.
const ROOM_VIDEO_ID = "h-_5cVb5aSg";

const STATS = [
  { value: "90+", label: "events hosted" },
  { value: "2024", label: "doors opened" },
  { value: "all", label: "genres welcome" },
] as const;

export function Platform9() {
  return (
    <section className="mt-28">
      <div className="mb-10 flex items-baseline gap-3 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">
        <span className="text-accent">→</span>
        <span>The space · operated under No Point Music</span>
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={youtubeThumb(ROOM_VIDEO_ID)}
            alt="Platform 9, the room"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-5xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl">
            Platform 9
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-ink">
            An artist-driven venue built to serve as a home for music, dance,
            and collective creation. Space for independent promoters, curators,
            and artists to host performances, workshops, exhibitions, and
            community events.
          </p>

          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            From late-night dance floors to experimental showcases, Platform 9
            brings people together in the spirit of shared energy and raw
            expression. We took an old warehouse and built everything from the
            ground up. No big budgets, just big dreams and hard work.
          </p>

          <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-ink/15 pt-6">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt className="text-3xl font-black tracking-[-0.03em] text-ink sm:text-4xl">
                  {s.value}
                </dt>
                <dd className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink-soft">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
