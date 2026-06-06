import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { THEME_INIT_SCRIPT } from "@/lib/theme-init";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Handwriting for instant-print captions. Scoped via the .font-hand utility, // used only on the polaroids, nowhere structural.
const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "600"],
});

// Absolute URLs for OG/Twitter resolve against this. Prefer an explicit
// NEXT_PUBLIC_SITE_URL, then Vercel's deploy URLs (so previews and prod get
// correct, reachable image URLs automatically), then the production domain.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://nopointmusic.com";
const DESCRIPTION =
  "Vancouver electronic music collective. Spaces where the energy is real and the music does the talking. Art for art.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "No Point Music",
    template: "%s",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "No Point Music",
    description: DESCRIPTION,
    siteName: "No Point Music",
    url: SITE_URL,
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "No Point Music",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full bg-cream text-ink">
        {children}
        <ThemeToggle />
        <Analytics />
      </body>
    </html>
  );
}
