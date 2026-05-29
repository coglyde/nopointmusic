import { OG_SIZE, OG_CONTENT_TYPE, renderSectionOg } from "@/lib/og";

export const alt = "Events · No Point Music";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderSectionOg({ kicker: "A-side · B-side", title: "Events" });
}
