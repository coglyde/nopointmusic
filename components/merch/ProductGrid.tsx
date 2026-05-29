import { PRODUCTS } from "@/lib/content/products";
import { ProductCard } from "./ProductCard";

// Product grid: two up on small screens, three on large. Generous gaps keep it
// reading like a gallery wall rather than a store shelf.
export function ProductGrid() {
  return (
    <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 pb-8 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-16">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
