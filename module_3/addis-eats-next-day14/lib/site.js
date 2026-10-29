export const SITE_URL = (process.env.SITE_URL || "https://addis-eats.example.com").replace(/\/$/, "");
export const SITE_NAME = "ADDIS EATS";
export function absoluteUrl(path = "/") { return new URL(path, `${SITE_URL}/`).toString(); }
