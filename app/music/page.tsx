import type { Metadata } from "next";
import { PageShell } from "@/components/section/PageShell";
import { ReleaseList } from "@/components/music/ReleaseList";

export const metadata: Metadata = {
  title: "Music · No Point Music",
  description:
    "Releases from No Point Music, a Vancouver electronic music label. Singles, EPs, and compilations, linked out to streaming.",
};

export default function MusicPage() {
  return (
    <PageShell
      index="01"
      kicker="Releases"
      title="Music"
      lede="Music that exists because it needs to, not because it fits a playlist formula. Each record links out to its streaming home. Listen wherever you live."
    >
      <ReleaseList />
    </PageShell>
  );
}
