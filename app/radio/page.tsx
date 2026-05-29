import type { Metadata } from "next";
import { PageShell } from "@/components/section/PageShell";
import { RadioShows } from "@/components/radio/RadioShows";

export const metadata: Metadata = {
  title: "Radio · No Point Music",
  description:
    "No Point Radio. DJ sets and mixes from the Vancouver collective and its guests, recorded live and aired in full. Play any show right here.",
};

export default function RadioPage() {
  return (
    <PageShell
      index="03"
      kicker="Broadcasts"
      title="Radio"
      lede="Between the big headliners are countless artists with a sound and a story worth hearing, but nowhere to tell it. The No Point Music Radio Show gives them that stage, recorded live and aired in full. Hit play and it runs right here."
    >
      <RadioShows />
    </PageShell>
  );
}
