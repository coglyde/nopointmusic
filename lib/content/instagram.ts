// Instagram feed config + curated post list.
//
// The @nopointmusic profile sits behind a login wall, so we can't scrape the
// "latest" posts server-side. Instead we render a curated poster wall from the
// list below - the collective picks their strongest posts, which is the look
// we want anyway. Each tile links out to the real post.
//
// To add a post:
//   1. Save its image to /public/feed/ (e.g. 01.jpg). Square crops look best.
//   2. Add an entry here with the image path and the post URL.
//
//   export const POSTS = [
//     { src: "/feed/01.jpg", permalink: "https://www.instagram.com/p/ABC123/", type: "image" },
//     { src: "/feed/02.jpg", permalink: "https://www.instagram.com/reel/XYZ789/", type: "video" },
//   ] as const;
//
// While the list is empty, the feed shows a tasteful follow strip instead.

export const INSTAGRAM_PROFILE = "https://www.instagram.com/nopointmusic/";
export const INSTAGRAM_HANDLE = "@nopointmusic";

export type InstagramPost = {
  // The post URL this tile opens. The image is pulled from Instagram's public
  // per-post endpoint based on this URL unless `src` is set.
  url: string;
  // Optional saved image under /public/feed. Set this to pin a guaranteed image
  // (e.g. if the live endpoint gets walled). Omit to auto-pull from the URL.
  src?: string;
  // Drives the corner badge; reels default to "video" automatically.
  type?: "image" | "video" | "carousel";
  // Accessible description of the image.
  alt?: string;
};

// To populate with real posts, replace each entry with just the post URL:
//   { url: "https://www.instagram.com/p/ABC123/" },
// These are the latest posts, synced via `node scripts/igsync.mjs` (reads
// @nopointmusic's public web API and downloads each cover into /public/feed, so
// images load reliably without hotlinking Instagram at runtime). Re-run that
// script to refresh; collab posts owned by another account won't appear.
export const POSTS: readonly InstagramPost[] = [
  { src: "/feed/C7ClHhPxQTI.jpg", url: "https://www.instagram.com/p/C7ClHhPxQTI/", type: "carousel" },
  { src: "/feed/DMd0A7wzrr7.jpg", url: "https://www.instagram.com/p/DMd0A7wzrr7/", type: "carousel" },
  { src: "/feed/DNYn3vqp6lg.jpg", url: "https://www.instagram.com/p/DNYn3vqp6lg/", type: "carousel" },
  { src: "/feed/DYyShXFG1OH.jpg", url: "https://www.instagram.com/p/DYyShXFG1OH/", type: "carousel" },
  { src: "/feed/DYkfe5RPYku.jpg", url: "https://www.instagram.com/p/DYkfe5RPYku/", type: "video" },
  { src: "/feed/DYibSAEgfpJ.jpg", url: "https://www.instagram.com/p/DYibSAEgfpJ/" },
  { src: "/feed/DYBgojuFEcQ.jpg", url: "https://www.instagram.com/p/DYBgojuFEcQ/", type: "carousel" },
  { src: "/feed/DXfGu_lEuHt.jpg", url: "https://www.instagram.com/p/DXfGu_lEuHt/", type: "carousel" },
];
