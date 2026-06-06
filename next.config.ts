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
  // Music and Merch are hidden until they have real content. Send any direct
  // visits home (temporary, so not a permanent redirect). Remove these two to
  // bring the pages back.
  async redirects() {
    return [
      { source: "/music", destination: "/", permanent: false },
      { source: "/merch", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
