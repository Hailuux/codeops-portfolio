import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Providers from "../components/Providers";
import PerformanceScripts from "../components/PerformanceScripts";
import { localFont } from "next/font/local";

const appFont = localFont({
  src: [{ path: "../public/fonts/DejaVuSans.ttf", weight: "400", style: "normal" }, { path: "../public/fonts/DejaVuSans-Bold.ttf", weight: "700", style: "normal" }],
  variable: "--font-app",
  display: "swap",
});

export const metadata = {
  title: "ADDIS EATS",
  description: "Discover Ethiopian food favorites with ADDIS EATS.",
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
