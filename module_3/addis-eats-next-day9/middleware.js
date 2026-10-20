import { NextResponse } from "next/server";

function safeNext(path) {
  if (!path || !path.startsWith("/") || path.startsWith("//") || path.includes("\\\\")) return "/menu";
  try {
    const url = new URL(path, "https://addis-eats.local");
    if (url.origin !== "https://addis-eats.local") return "/menu";
    return `${url.pathname}${url.search}`;
  } catch { return "/menu"; }
}

export function middleware(request) {
  const hasCookie = Boolean(request.cookies.get("session")?.value);
  if (hasCookie) return NextResponse.next();
  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("next", safeNext(`${request.nextUrl.pathname}${request.nextUrl.search}`));
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/cart/:path*", "/checkout/:path*", "/orders/:path*", "/staff/:path*"],
};
