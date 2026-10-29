import { redirect } from "next/navigation";
import { getSession } from "../../lib/server/session";
import CartClient from "./CartClient";

export const dynamic = "force-dynamic";

export const metadata = { title: 'Your Cart', description: 'Review the Ethiopian dishes in your cart and adjust quantities before proceeding to secure checkout.' };

export default async function CartPage() {
  const session = await getSession();
  if (!session) redirect("/signin?next=%2Fcart");
  return <CartClient />;
}
