import type { Release } from "@/lib/content/releases";
import { formatDate } from "@/lib/format";
import { ReleaseCover } from "./ReleaseCover";
import { StreamLinks } from "./StreamLinks";

type Props = {
  release: Release;
};

// One release as a horizontal entry: cover left, metadata + streaming right.
// Title and artist carry the weight; everything else is mono and quiet.
export function ReleaseRow({ release }: Props) {
  return (
    <article className="grid grid-cols-[96px_1fr] gap-5 py-8 sm:grid-cols-[160px_1fr] sm:gap-8">
      <div className="w-24 sm:w-40">
        <ReleaseCover release={release} />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink-soft">
          <span className="text-accent">{release.catalogue}</span>
          <span className="h-px w-5 bg-ink/20" />
          <span>{release.format}</span>
        </div>

        <h2 className="mt-2 text-2xl font-bold leading-tight tracking-[-0.01em] text-ink sm:text-3xl">
          {release.title}
        </h2>
        <p className="mt-1 text-base text-ink-soft">{release.artist}</p>

        <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft/70">
          {formatDate(release.releasedOn)}
        </p>

        <div className="mt-4">
          <StreamLinks links={release.links} />
        </div>
      </div>
    </article>
  );
}
