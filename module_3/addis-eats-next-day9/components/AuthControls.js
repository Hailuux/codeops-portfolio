import Link from "next/link";
import { getSession } from "../lib/server/session";
import { signOut } from "../app/auth/actions";

export default async function AuthControls() {
  const session = await getSession();
  if (!session) return <Link href="/signin">Sign in</Link>;
  return <div className="auth-controls"><span>{session.role === "staff" ? "Staff" : "Signed in"}</span><form action={signOut}><button type="submit" className="nav-button">Sign out</button></form></div>;
}
