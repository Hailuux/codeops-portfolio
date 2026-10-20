import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

// Session cookie format: <userId>.<hex HMAC-SHA256(userId, SESSION_SECRET)>.
// Your authentication system must issue this cookie as HttpOnly, Secure in production,
// SameSite=Lax, Path=/; this helper deliberately fails closed if the secret is absent.
function signatureFor(userId, secret) {
  return createHmac("sha256", secret).update(userId).digest("hex");
}

export function verifySessionToken(token, secret = process.env.SESSION_SECRET) {
  if (!secret || !token || typeof token !== "string") return null;
  const splitAt = token.lastIndexOf(".");
  if (splitAt < 1) return null;
  const userId = token.slice(0, splitAt);
  const supplied = token.slice(splitAt + 1);
  if (!/^[a-f0-9]{64}$/i.test(supplied)) return null;
  const expected = signatureFor(userId, secret);
  const left = Buffer.from(supplied, "hex");
  const right = Buffer.from(expected, "hex");
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  return { userId };
}

export async function getVerifiedSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get("session")?.value);
}
