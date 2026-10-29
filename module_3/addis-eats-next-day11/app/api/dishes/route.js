import { NextResponse } from "next/server";
import { listDishes } from "../../../lib/server/dishes";

const errorResponse = (code, message, status) => NextResponse.json({ error: { code, message } }, { status });

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const term = (searchParams.get("q") ?? "").trim().toLocaleLowerCase();
    const page = Math.max(1, Number.parseInt(searchParams.get("page") ?? "1", 10) || 1);
    const pageSize = Math.min(12, Math.max(1, Number.parseInt(searchParams.get("pageSize") ?? "3", 10) || 3));
    const filtered = listDishes().filter((dish) => !term || `${dish.name} ${dish.category} ${dish.description}`.toLocaleLowerCase().includes(term));
    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(page, pages);
    return NextResponse.json({ data: filtered.slice((safePage - 1) * pageSize, safePage * pageSize), pagination: { page: safePage, pageSize, total, pages }, query: term }, { status: 200 });
  } catch {
    return errorResponse("INTERNAL_ERROR", "Unable to load dishes.", 500);
  }
}
