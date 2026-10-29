import Link from "next/link";
import { signIn } from "../auth/actions";

export const metadata = { title: 'Sign In', description: 'Sign in to ADDIS EATS to manage your cart, place orders, and view your order status.' };

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const next = typeof params?.next === "string" ? params.next : "/menu";
  return <section className="checkout-panel">
    <p className="eyebrow">Welcome back</p><h1>Sign in</h1>
    <p>Demo accounts for this learning project:</p>
    <ul><li>Customer: customer@addiseats.local / EatsDemo2026!</li><li>Staff: staff@addiseats.local / StaffDemo2026!</li></ul>
    <form action={signIn} className="form-stack">
      <input type="hidden" name="next" value={next} />
      <label>Email<input name="username" type="email" autoComplete="username" required /></label>
      <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
      <button type="submit">Sign in</button>
    </form>
    <p><Link href="/menu">Continue browsing the menu</Link></p>
  </section>;
}
