import type { Metadata } from "next";
import { PageShell } from "@/components/section/PageShell";
import { Platform9 } from "@/components/foundations/Platform9";

export const metadata: Metadata = {
  title: "Foundations · No Point Music",
  description:
    "Platform 9, an artist-driven venue in Vancouver for music, dance, and collective creation, operated under No Point Music.",
};

export default function FoundationsPage() {
  return (
    <PageShell
      index="04"
      kicker="The space"
      title="Foundations"
      lede="An old warehouse rebuilt into a home for music, dance, and collective creation."
    >
      <Platform9 />
    </PageShell>
  );
}
