// Syncs the "From the feed" wall with @nopointmusic's latest posts.
//
//   node scripts/igsync.mjs [count]
//
// Uses Instagram's public web API (the same one the website calls, via the
// public web app-id header) to read the latest posts as JSON - no login, no
// token. Downloads each cover image into /public/feed and prints the POSTS
// array to paste into lib/content/instagram.ts. Re-run anytime to refresh.

import { writeFileSync, mkdirSync } from "node:fs";

const USERNAME = "nopointmusic";
const COUNT = Number(process.argv[2] || 8);
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

mkdirSync("public/feed", { recursive: true });

const res = await fetch(
  `https://www.instagram.com/api/v1/users/web_profile_info/?username=${USERNAME}`,
  {
    headers: {
      "user-agent": UA,
      "x-ig-app-id": "936619743392459",
      "x-requested-with": "XMLHttpRequest",
      accept: "*/*",
    },
  },
);
if (!res.ok) {
  console.error(`profile fetch failed: ${res.status}`);
  process.exit(1);
}
const json = await res.json();
const edges = json.data.user.edge_owner_to_timeline_media.edges.slice(0, COUNT);

function typeOf(node) {
  if (node.__typename === "GraphSidecar") return "carousel";
  if (node.__typename === "GraphVideo" || node.is_video) return "video";
  return "image";
}

const lines = [];
for (const { node } of edges) {
  const code = node.shortcode;
  const type = typeOf(node);
  const img = await fetch(node.display_url, { headers: { "user-agent": UA } });
  const buf = Buffer.from(await img.arrayBuffer());
  const ok = buf[0] === 0xff && buf[1] === 0xd8; // jpeg magic
  if (!ok) {
    console.error(`skip ${code}: not a jpeg`);
    continue;
  }
  writeFileSync(`public/feed/${code}.jpg`, buf);
  const t = type === "image" ? "" : `, type: "${type}"`;
  lines.push(
    `  { src: "/feed/${code}.jpg", url: "https://www.instagram.com/p/${code}/"${t} },`,
  );
  console.error(`saved ${code} (${type}) ${buf.length}b`);
}

console.log("\n// --- paste into lib/content/instagram.ts ---");
console.log("export const POSTS: readonly InstagramPost[] = [");
console.log(lines.join("\n"));
console.log("];");
