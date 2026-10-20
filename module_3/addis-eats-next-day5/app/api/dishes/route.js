import { NextResponse } from "next/server";
import { listDishes } from "../../../lib/server/dishes";

export async function GET() {
  try {
    return NextResponse.json({ data: listDishes() }, { status: 200 });
  } catch {
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to load dishes." } }, { status: 500 });
  }
}
