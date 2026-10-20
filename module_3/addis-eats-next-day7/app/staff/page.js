import { redirect } from "next/navigation";
import { getSession } from "../../lib/server/session";

export const dynamic = "force-dynamic";

export default async function StaffPage() {
  const session = await getSession();
  if (!session) redirect("/signin?next=%2Fstaff");
  if (session.role !== "staff") return <section><h1>Access denied</h1><p>This page is reserved for staff accounts.</p></section>;
  return <section><p className="eyebrow">Staff area</p><h1>Staff dashboard</h1><p>Server-rendered role check passed for staff account <strong>{session.userId}</strong>.</p><p>Do not rely on hiding this route or link; the role is verified here on every request.</p></section>;
}
