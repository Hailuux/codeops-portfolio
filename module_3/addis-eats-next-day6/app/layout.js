import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Providers from "../components/Providers";

export const metadata = {
  title: "ADDIS EATS",
  description: "Discover Ethiopian food favorites with ADDIS EATS.",
};

// RootLayout remains a Server Component. Only the provider boundary is client-side.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
