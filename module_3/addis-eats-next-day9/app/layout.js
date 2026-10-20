import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Providers from "../components/Providers";
import PerformanceScripts from "../components/PerformanceScripts";
import { localFont } from "next/font/local";
import { SITE_URL, SITE_NAME } from "../lib/site";

const appFont = localFont({
  src: [{ path: "../public/fonts/DejaVuSans.ttf", weight: "400", style: "normal" }, { path: "../public/fonts/DejaVuSans-Bold.ttf", weight: "700", style: "normal" }],
  variable: "--font-app",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: "%s | ADDIS EATS" },
  description: "Explore authentic Ethiopian favorites, browse traditional dishes, and order your next meal with ADDIS EATS.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: "Discover Ethiopian food favorites with ADDIS EATS.",
    url: SITE_URL,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ADDIS EATS — Ethiopian food favorites" }],
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: "Discover Ethiopian food favorites with ADDIS EATS.", images: ["/opengraph-image"] },
};

// RootLayout remains a Server Component. Only the provider boundary is client-side.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={appFont.className}>
        <Providers>
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </Providers>
        <PerformanceScripts />
      </body>
    </html>
  );
}
