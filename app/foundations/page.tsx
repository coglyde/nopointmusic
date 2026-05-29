import type { Metadata } from "next";
import { PageShell } from "@/components/section/PageShell";
import { Manifesto } from "@/components/foundations/Manifesto";
import { Platform9 } from "@/components/foundations/Platform9";
import { CrewNote } from "@/components/foundations/CrewNote";

export const metadata: Metadata = {
  title: "Foundations · No Point Music",
  description:
    "Why No Point Music exists, and the warehouse it built: Platform 9, an artist-driven venue in Vancouver for music, dance, and collective creation.",
};

export default function FoundationsPage() {
  return (
    <PageShell
      index="04"
      kicker="Manifesto · Platform 9"
      title="Foundations"
      lede="The why, the where, and the who, in our own words."
    >
      <Manifesto />
      <Platform9 />
      <CrewNote />
    </PageShell>
  );
}
