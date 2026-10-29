import { SITE_URL } from "../lib/site";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: ["/", "/menu/"], disallow: ["/cart", "/checkout", "/signin", "/staff", "/orders/", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
