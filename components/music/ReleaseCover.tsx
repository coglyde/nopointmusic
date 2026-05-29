import Image from "next/image";
import type { Release } from "@/lib/content/releases";

type Props = {
  release: Release;
};

// Square cover for a release. Uses the supplied art when present; otherwise
// falls back to the engraved vinyl asset with the catalogue number stamped
// over it - so an un-art'd release still looks intentional, not broken.
export function ReleaseCover({ release }: Props) {
  if (release.cover) {
    return (
      <div className="relative aspect-square w-full overflow-hidden bg-cream-deep">
        <Image
          src={release.cover}
          alt={`${release.title} - ${release.artist}`}
          fill
          sizes="(min-width: 640px) 160px, 96px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-ink">
      <Image
        src="/deck/vinyl.png"
        alt=""
        aria-hidden
        fill
        sizes="(min-width: 640px) 160px, 96px"
        className="scale-[1.35] object-contain opacity-90"
      />
      <span className="relative z-10 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-cream/80">
        {release.catalogue}
      </span>
    </div>
  );
}
