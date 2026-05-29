// Helpers for deriving display data from a public Instagram post URL.

// Pulls the shortcode out of a /p/, /reel/, /reels/, or /tv/ URL.
export function instagramShortcode(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:p|reel|reels|tv)\/([^/?#]+)/i);
  return match ? match[1] : null;
}

// Instagram's public per-post image endpoint (no auth). Returns null for URLs
// we can't parse a shortcode from.
export function instagramImageUrl(url: string): string | null {
  const code = instagramShortcode(url);
  return code ? `https://www.instagram.com/p/${code}/media/?size=l` : null;
}

// Reels are video; used to pick the corner badge when a type isn't set.
export function isReelUrl(url: string): boolean {
  return /instagram\.com\/(?:reel|reels)\//i.test(url);
}
