import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Instagram per-post image endpoint (and the CDN it redirects to) for the
    // "From the feed" wall. Used with unoptimized <Image>, loaded client-side.
    remotePatterns: [
      { protocol: "https", hostname: "www.instagram.com" },
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
};

export default nextConfig;
