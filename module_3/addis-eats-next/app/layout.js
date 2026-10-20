import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "ADDIS EATS",
  description: "Discover Ethiopian food favorites with ADDIS EATS.",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><Header /><main className="main-content">{children}</main></body></html>;
}
