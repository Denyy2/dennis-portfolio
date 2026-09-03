import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "88px",
          background: "#0a0d10",
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#e5ecf0",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#4ade80" }} />
          <span style={{ fontSize: 26, color: "#8b98a3" }}>{site.availability}</span>
        </div>
        <div style={{ display: "flex", fontSize: 78, fontWeight: 800, marginTop: 32 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 38, color: "#38bdf8", marginTop: 16 }}>
          {site.role}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#8b98a3",
            marginTop: 32,
            maxWidth: 920,
            lineHeight: 1.5,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
