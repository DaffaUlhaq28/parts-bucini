import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// IMPORT CONTEXT & COMPONENT
// Pastikan baris-baris ini hanya muncul SATU KALI
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";

// Setup Font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bucini - The Beauty of Leather",
  description: "Handcrafted leather goods from Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* URUTAN PEMBUNGKUS (PROVIDER) */}
        <AuthProvider>     {/* 1. Cek Login */}
          <CartProvider>   {/* 2. Cek Keranjang */}
            {children}     {/* 3. Tampilkan Halaman */}
            <CartSidebar /> {/* 4. Tampilkan Sidebar Keranjang */}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}