import { redirect } from "next/navigation";
import { getSession } from "../../lib/server/session";
import CartClient from "./CartClient";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const session = await getSession();
  if (!session) redirect("/signin?next=%2Fcart");
  return <CartClient />;
}
