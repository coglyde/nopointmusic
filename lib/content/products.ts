// Merch - treated as objects, not SKUs. v1 links out to wherever the item is
// sold (Big Cartel / Shopify / Bandcamp). The proposal's direct Stripe checkout
// can replace the outbound `href` later without touching the layout.
//
// SAMPLE DATA. Real shape, placeholder entries. Add a shot under
// /public/merch/ and point `image` at it for a real photo.

export type Product = {
  slug: string;
  name: string;
  // Free-text price, e.g. "$40 CAD" - keeps currency/format in the label.
  price: string;
  // Short material / edition note shown as mono metadata.
  detail: string;
  image?: string; // /public path, optional
  // Outbound store link, or undefined for "sold out / coming".
  href?: string;
  soldOut?: boolean;
};

export const PRODUCTS: readonly Product[] = [
  {
    slug: "logo-tee-black",
    name: "Yin-Yang Tee",
    price: "$40 CAD",
    detail: "Heavyweight cotton · screen print · unisex",
    href: "https://nopointmusic.com/",
  },
  {
    slug: "no-point-hoodie",
    name: "No Point Hoodie",
    price: "$80 CAD",
    detail: "Garment-dyed · embroidered mark · limited run",
    href: "https://nopointmusic.com/",
  },
  {
    slug: "np-tote",
    name: "Record Tote",
    price: "$25 CAD",
    detail: "12\" capacity · natural canvas",
    href: "https://nopointmusic.com/",
  },
  {
    slug: "np001-vinyl",
    name: "NP001 - 12\"",
    price: "$30 CAD",
    detail: "Limited press · 180g · hand-stamped sleeve",
    soldOut: true,
  },
];
