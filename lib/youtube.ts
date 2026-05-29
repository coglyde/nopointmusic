// Pure helpers for YouTube content. No data here, just URL builders so every
// component derives thumbnails and watch links the same way.

// 16:9-ish still. hqdefault always exists (unlike maxresdefault); we crop the
// letterbox bars with object-cover in a 16:9 frame.
export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

// Best-effort high-res still; falls back to hqdefault on error at the <img>.
export function youtubeThumbHd(id: string): string {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

export function youtubeWatch(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

// Privacy-friendly embed, autoplay on open.
export function youtubeEmbed(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}
