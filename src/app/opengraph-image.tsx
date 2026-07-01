import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.name;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0a0a0a",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #8b5cf6, #d946ef, #6366f1)",
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            B
          </div>
          <span style={{ fontSize: 34, fontWeight: 600 }}>BuyWise AI</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 66,
            fontWeight: 700,
            marginTop: 44,
            lineHeight: 1.1,
            maxWidth: 940,
          }}
        >
          Stop opening ten tabs. Just ask BuyWise AI.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa", marginTop: 26 }}>
          AI shopping intelligence across every major store.
        </div>
      </div>
    ),
    { ...size },
  );
}
