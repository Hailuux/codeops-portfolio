import { NextResponse } from "next/server";
import { findDish } from "../../../../lib/server/dishes";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const dish = findDish(id);
    if (!dish) return NextResponse.json({ error: { code: "NOT_FOUND", message: "Dish not found." } }, { status: 404 });
    return NextResponse.json({ data: dish }, { status: 200 });
  } catch {
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to load dish." } }, { status: 500 });
  }
}
