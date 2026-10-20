"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, getSession } from "../../lib/server/session";

function safeNext(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.includes("\\\\")) return "/menu";
  try {
    const parsed = new URL(value, "https://addis-eats.local");
    if (parsed.origin !== "https://addis-eats.local") return "/menu";
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch { return "/menu"; }
}

export async function signIn(_prev, formData) {
  const username = String(formData.get("username") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  // Demo-only identities. Replace this map with a password-hashed database lookup.
  const users = {
    "customer@addiseats.local": { password: "EatsDemo2026!", userId: "customer-1", role: "customer" },
    "staff@addiseats.local": { password: "StaffDemo2026!", userId: "staff-1", role: "staff" },
  };
  const user = users[username];
  if (!user || user.password !== password) return { error: "Email or password is incorrect." };
  const jar = await cookies();
  jar.set("session", createSessionToken({ userId: user.userId, role: user.role }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  redirect(safeNext(String(formData.get("next") || "/menu")));
}

export async function signOut() {
  const jar = await cookies();
  jar.set("session", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
  redirect("/signin");
}

export async function requireSession() {
  return getSession();
}
