import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "session";

function signatureFor(payload, secret) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionToken({ userId, role }) {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must be at least 32 characters.");
  const payload = Buffer.from(JSON.stringify({ userId, role, exp: Date.now() + 1000 * 60 * 60 * 8 })).toString("base64url");
  return `${payload}.${signatureFor(payload, secret)}`;
}

export function verifySessionToken(token, secret = process.env.SESSION_SECRET) {
  if (!secret || !token || typeof token !== "string") return null;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;
  const payload = token.slice(0, dot);
  const supplied = token.slice(dot + 1);
  if (!/^[a-f0-9]{64}$/i.test(supplied)) return null;
  const expected = signatureFor(payload, secret);
  const left = Buffer.from(supplied, "hex");
  const right = Buffer.from(expected, "hex");
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.userId || !["customer", "staff"].includes(data.role) || !Number.isFinite(data.exp) || data.exp <= Date.now()) return null;
    return { userId: data.userId, role: data.role, expiresAt: data.exp };
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
}

// Compatibility alias for the earlier course days.
export const getVerifiedSession = getSession;
