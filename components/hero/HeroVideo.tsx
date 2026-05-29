import {
  HERO_POSTER_URL,
  HERO_VIDEO_MP4,
  HERO_VIDEO_WEBM,
} from "@/lib/site-config";

// Full-bleed background layer for the hero: a muted, looping, autoplaying video
// (WebM first, MP4 fallback). A light scrim sits on top so white type stays
// readable over any frame without hiding the footage.
export function HeroVideo() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0c0a08]">
      <video
        className="h-full w-full object-cover"
        poster={HERO_POSTER_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={HERO_VIDEO_WEBM} type="video/webm" />
        <source src={HERO_VIDEO_MP4} type="video/mp4" />
      </video>
      {/* Scrim: gentle darken + bottom vignette for legibility. */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
    </div>
  );
}
