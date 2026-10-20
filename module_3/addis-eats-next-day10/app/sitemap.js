import dishes from "./menu/dishes";
import { SITE_URL } from "../lib/site";

export default function sitemap() {
  const now = new Date();
  const publicRoutes = ["", "/menu"].map((path) => ({
    url: `${SITE_URL}${path || "/"}`, lastModified: now, changeFrequency: path === "/menu" ? "daily" : "weekly", priority: path === "/menu" ? 0.9 : 1,
  }));
  const dishRoutes = dishes.map((dish) => ({
    url: `${SITE_URL}/menu/${dish.id}`, lastModified: now, changeFrequency: "weekly", priority: 0.7,
  }));
  // Deliberately exclude cart, checkout, sign-in, staff, order status, and API routes.
  return [...publicRoutes, ...dishRoutes];
}
