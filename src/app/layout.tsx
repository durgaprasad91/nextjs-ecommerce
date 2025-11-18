"use client";

import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./components/context/CartContext";
import { WishlistProvider } from "./components/context/WishlistContext";
import { AuthProvider } from "./components/context/AuthContext";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />

        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Navbar />
              <main className="pt-24">{children}</main>
              {isHome && <Footer />}
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
