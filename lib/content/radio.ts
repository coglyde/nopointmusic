import data from "@/content/radio.json";
import type { Video } from "./youtube";

// Radio broadcasts, newest first. Data lives in content/radio.json
// (dashboard-editable); this module types it and tags it as radio. `id` is the
// real YouTube video id, so thumbnails and embeds are live.
type RawRadio = {
  id: string;
  title: string;
  artist: string;
  date: string;
  presentedBy?: string;
};

export const RADIO_SHOWS: readonly Video[] = (data as RawRadio[])
  .map((d) => ({ ...d, kind: "radio" as const }))
  .sort((a, b) => b.date.localeCompare(a.date));
