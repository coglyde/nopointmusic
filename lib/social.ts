// Outbound homes for the collective. These are the real channels pulled from
// nopointmusic.com, everything on the site links *out* to one of these rather
// than hosting media directly. Editing this file updates every footer and
// "follow" strip at once.

export type SocialLink = {
  label: string;
  href: string;
  // Short mono handle shown in the footer.
  handle: string;
};

export const EMAIL = "info@nopointmusic.com";
export const DEMO_EMAIL = "demo@nopointmusic.com";

export const SOCIALS: readonly SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/nopointmusic/",
    handle: "@nopointmusic",
  },
  {
    label: "SoundCloud",
    href: "https://soundcloud.com/nopointmusic",
    handle: "/nopointmusic",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@NoPointMusic",
    handle: "@NoPointMusic",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@nopointmusic",
    handle: "@nopointmusic",
  },
] as const;

export const LOCATION = "based in vancouver";
export const ESTABLISHED = "est. 2024";
