import { ImageResponse } from "next/og";
import { OG_SIZE, OG_CONTENT_TYPE, loadOgAssets } from "@/lib/og";

// Site-wide share card (also used for Twitter): the disc mark top-left, the
// hand-drawn wordmark as the hero, and the "art for art" line with the single
// red accent, on a warm dark ground. Section pages render their own variant.
export const alt = "No Point Music. Art for art, based in Vancouver.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  const { disc, wordmark } = await loadOgAssets();

  const mono = {
    fontSize: 22,
    letterSpacing: 6,
    textTransform: "uppercase" as const,
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#17130d",
          color: "#efeae0",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={disc} width={132} height={132} alt="" />
          <div style={{ ...mono, display: "flex", color: "#8a8076" }}>
            based in vancouver
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <img src={wordmark} width={261} height={132} alt="" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 30,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: "#b8ad9d",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 9999,
                background: "#e51b18",
              }}
            />
            art for art
          </div>
        </div>

        <div
          style={{
            ...mono,
            display: "flex",
            justifyContent: "space-between",
            color: "#6e655c",
          }}
        >
          <div style={{ display: "flex" }}>est. 2024</div>
          <div style={{ display: "flex" }}>nopointmusic.com</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
