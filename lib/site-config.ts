// Hero background video. Served from /public by default (works locally and on
// Vercel with zero setup). To move it to a CDN later (e.g. Vercel Blob to keep
// the binary out of git), set these env vars in `.env.local` and the hero picks
// them up automatically:
//   NEXT_PUBLIC_HERO_VIDEO_URL, NEXT_PUBLIC_HERO_VIDEO_WEBM, NEXT_PUBLIC_HERO_POSTER_URL
export const HERO_VIDEO_MP4 =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? "/video/hero.mp4";
export const HERO_VIDEO_WEBM =
  process.env.NEXT_PUBLIC_HERO_VIDEO_WEBM ?? "/video/hero.webm";
export const HERO_POSTER_URL =
  process.env.NEXT_PUBLIC_HERO_POSTER_URL ?? "/video/hero-poster.jpg";
