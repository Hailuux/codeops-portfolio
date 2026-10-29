import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getDishById } from "../data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function DishOpenGraphImage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);
  if (!dish) notFound();
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", background: "linear-gradient(135deg, #34180f, #9b3d1f)", color: "#fff7ed", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: 28, letterSpacing: 8, color: "#f7c873" }}>ADDIS EATS · {dish.category.toUpperCase()}</div>
      <div style={{ fontSize: 82, fontWeight: 800, marginTop: 32 }}>{dish.name}</div>
      <div style={{ fontSize: 32, marginTop: 20 }}>{dish.description.length > 75 ? dish.description.slice(0, 72) + "…" : dish.description}</div>
      <div style={{ fontSize: 42, fontWeight: 700, marginTop: 38, color: "#f7c873" }}>{dish.price} ETB</div>
    </div>, size
  );
}
