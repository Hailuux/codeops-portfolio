import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ADDIS EATS — Ethiopian food favorites";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", background: "linear-gradient(135deg, #34180f, #9b3d1f)", color: "#fff7ed", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: 28, letterSpacing: 8, color: "#f7c873" }}>A TASTE OF ETHIOPIA</div>
      <div style={{ fontSize: 88, fontWeight: 800, marginTop: 28 }}>ADDIS EATS</div>
      <div style={{ fontSize: 38, marginTop: 18 }}>Traditional favorites. Made to share.</div>
      <div style={{ fontSize: 24, marginTop: 44, color: "#f7c873" }}>SHIRO · MISIR WOT · DORO WOT · TIBS</div>
    </div>, size
  );
}
