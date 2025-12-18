"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Tipe data untuk item di keranjang
type CartItem = {
  id: number;
  uniqueId: string; // ID unik kombinasi produk + warna
  name: string;
  price: string;
  image: string;
  colorName: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: any, variant: any, qty: number) => void;
  removeFromCart: (uniqueId: string) => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Buka/Tutup Keranjang
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Fungsi Tambah ke Keranjang
  const addToCart = (product: any, variant: any, qty: number) => {
    const uniqueId = `${product.id}-${variant.colorName}`;
    
    setItems((prevItems) => {
      // Cek apakah item dengan warna yang sama sudah ada
      const existingItem = prevItems.find((item) => item.uniqueId === uniqueId);

      if (existingItem) {
        // Jika ada, tambahkan jumlahnya saja
        return prevItems.map((item) =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        // Jika belum ada, masukkan sebagai item baru
        return [
          ...prevItems,
          {
            id: product.id,
            uniqueId: uniqueId,
            name: product.name,
            price: product.basePrice,
            image: product.image, // Gambar dasar
            colorName: variant.colorName,
            quantity: qty,
          },
        ];
      }
    });
    // Otomatis buka keranjang setelah add
    setIsCartOpen(true);
  };

  // Fungsi Hapus Item
  const removeFromCart = (uniqueId: string) => {
    setItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  // Hitung Total Item (untuk badge merah di navbar)
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Hitung Total Harga (Konversi string "Rp 1.000.000" ke number dulu)
  const cartTotal = items.reduce((acc, item) => {
    const priceNumber = parseInt(item.price.replace(/[^0-9]/g, ""));
    return acc + (priceNumber * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ items, isCartOpen, openCart, closeCart, addToCart, removeFromCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}