/* eslint-disable @next/next/no-img-element -- ImageResponse (satori) renders
   raw <img>; next/image is not available in this context. */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared building blocks for the social cards so the home card and every
// section card share one frame: warm dark ground, the disc mark + hand-drawn
// wordmark lockup, a single red accent, gallery-grade negative space.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BG = "#17130d";
const CREAM = "#efeae0";
const RED = "#e51b18";
const DIM = "#6e655c";

async function dataUri(relPath: string, mime = "image/png") {
  const bytes = await readFile(join(process.cwd(), relPath));
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

export async function loadOgAssets() {
  const [disc, wordmark] = await Promise.all([
    dataUri("app/icon.png"),
    dataUri("public/logos/text-logo-white.png"),
  ]);
  return { disc, wordmark };
}

// Section card: the brand lockup up top, then the section name set huge, with
// its mono kicker above it. Long titles step down a size so they never clip.
export async function renderSectionOg({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  const { disc, wordmark } = await loadOgAssets();
  const titleSize = title.length > 8 ? 108 : 152;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          color: CREAM,
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <img src={disc} width={84} height={84} alt="" />
          <img src={wordmark} width={111} height={56} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 28,
              letterSpacing: 9,
              textTransform: "uppercase",
              color: "#b8ad9d",
            }}
          >
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: 9999,
                background: RED,
              }}
            />
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 900,
              letterSpacing: -4,
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: DIM,
          }}
        >
          <div style={{ display: "flex" }}>art for art</div>
          <div style={{ display: "flex" }}>nopointmusic.com</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
