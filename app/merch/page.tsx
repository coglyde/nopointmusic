import type { Metadata } from "next";
import { PageShell } from "@/components/section/PageShell";
import { ProductGrid } from "@/components/merch/ProductGrid";

export const metadata: Metadata = {
  title: "Merch - No Point Music",
  description:
    "No Point Music merch - tees, hoodies, totes, and limited vinyl. Objects, not SKUs. Each links out to where it's sold.",
};

export default function MerchPage() {
  return (
    <PageShell
      index="05"
      kicker="Sleeves"
      title="Merch"
      lede="A small, considered run. Worn in the room, kept after. Each piece links out to where it's sold."
    >
      <ProductGrid />
    </PageShell>
  );
}
