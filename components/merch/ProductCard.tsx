import Image from "next/image";
import { OutboundLink } from "@/components/ui/OutboundLink";
import type { Product } from "@/lib/content/products";

type Props = {
  product: Product;
};

// One product, presented like a sleeve: a square image (or a quiet placeholder
// when none is set yet), then name, price, a mono material note, and the
// outbound action. Sold-out items stay in the grid, dimmed, marked in red.
export function ProductCard({ product }: Props) {
  const sold = product.soldOut;

  return (
    <article className="group flex flex-col">
      <div
        className={`relative aspect-square w-full overflow-hidden bg-cream-deep ${
          sold ? "opacity-60" : ""
        }`}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 640px) 300px, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="px-6 text-center font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft/60">
              {product.name}
            </span>
          </div>
        )}
        {sold ? (
          <span className="absolute left-3 top-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">
            Sold out
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-base font-semibold text-ink">{product.name}</h2>
          <span className="font-mono text-[0.7rem] tabular-nums tracking-[0.1em] text-ink-soft">
            {product.price}
          </span>
        </div>

        <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink-soft/70">
          {product.detail}
        </p>

        <div className="mt-3">
          {sold ? (
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft/50">
              No longer available
            </span>
          ) : product.href ? (
            <OutboundLink href={product.href}>Buy</OutboundLink>
          ) : (
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft/50">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
