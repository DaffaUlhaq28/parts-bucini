"use client";

import { useState, use } from "react"; 
import Image from "next/image";
import Link from "next/link";
// 1. IMPORT PENTING DI SINI
import { useRouter } from "next/navigation"; // <--- Untuk pindah halaman
import { ChevronLeft, Minus, Plus, Star, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext"; 
import { useAuth } from "@/context/AuthContext"; // <--- Import Cek Login

// === DATA PRODUK (Sama seperti sebelumnya) ===
const products = [
  {
    id: 1,
    name: "Classic Cambridge",
    basePrice: "Rp 1.450.000",
    description: "Tas satchel klasik bergaya Inggris yang terbuat dari kulit sapi asli kualitas premium (Full Grain). Dilengkapi dengan kompartemen luas untuk laptop 13 inci.",
    image: "/image/Satchelcoklat.png", // Pastikan path ini benar sesuai file Anda
    variants: [
      { color: "#8B4513", colorName: "Saddle Brown", filter: "none", stock: 5 },
      { color: "#5F9EA0", colorName: "Ocean Teal", filter: "hue-rotate(160deg) saturate(0.8) brightness(0.9)", stock: 3 },
      { color: "#800000", colorName: "Deep Maroon", filter: "hue-rotate(320deg) saturate(1.2)", stock: 8 },
    ],
  },
  {
    id: 2,
    name: "Gardenia Mini",
    basePrice: "Rp 1.250.000",
    description: "Versi mungil dari seri Gardenia yang manis. Dibuat dengan teknik jahitan tangan (handmade) yang presisi.",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=600&auto=format&fit=crop",
    variants: [
      { color: "#F5F5DC", colorName: "Cream", filter: "none", stock: 12 },
      { color: "#FFB6C1", colorName: "Soft Pink", filter: "sepia(1) hue-rotate(300deg) saturate(0.8) brightness(1.1)", stock: 0 },
      { color: "#1A1A1A", colorName: "Midnight", filter: "grayscale(100%) brightness(0.3)", stock: 4 },
    ],
  },
  // ... tambahkan produk lain jika ada ...
];

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === parseInt(id));

  // 2. PANGGIL HOOKS DI SINI (DI DALAM FUNGSI UTAMA)
  const router = useRouter();       // <--- Panggil fungsi Router
  const { isLoggedIn } = useAuth(); // <--- Panggil Status Login (True/False)
  const { addToCart } = useCart();  // <--- Panggil Fungsi Keranjang

  const [selectedVariant, setSelectedVariant] = useState(product ? product.variants[0] : null);
  const [quantity, setQuantity] = useState(1);

  if (!product || !selectedVariant) {
    return <div className="min-h-screen flex items-center justify-center">Produk tidak ditemukan</div>;
  }

  const handleQuantity = (type: "plus" | "minus") => {
    if (type === "plus" && quantity < selectedVariant.stock) {
      setQuantity(quantity + 1);
    } else if (type === "minus" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // 3. FUNGSI BARU: LOGIKA CEK LOGIN
  const handleAddToCart = () => {
    // Cek: Jika User BELUM Login
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk berbelanja."); // Opsional: Beri pesan
      router.push("/login"); // <--- Lempar ke halaman Login
    } 
    // Cek: Jika User SUDAH Login
    else {
      addToCart(product, selectedVariant, quantity); // <--- Masukkan ke Keranjang
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-800 pb-20">
      
      {/* Header Back */}
      <div className="border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
           <Link href="/satchel-bags" className="flex items-center gap-1 text-xs uppercase tracking-widest text-gray-500 hover:text-bucini-gold transition">
             <ChevronLeft className="w-4 h-4" /> Back to Collection
           </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Gambar Besar */}
          <div className="relative w-full aspect-[4/5] bg-stone-50 rounded-sm overflow-hidden sticky top-24">
             <Image 
               src={product.image} 
               alt={product.name} 
               fill 
               className="object-contain p-10 transition-all duration-500"
               style={{ filter: selectedVariant.filter }} 
               priority
             />
          </div>

          {/* Detail Produk */}
          <div className="flex flex-col justify-center">
             <p className="text-xs text-bucini-gold tracking-[0.2em] uppercase mb-2">Bucini Satchel Series</p>
             <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">{product.name}</h1>
             
             <div className="flex items-center gap-6 mb-8 border-b border-gray-100 pb-8">
                <span className="text-2xl font-light text-gray-800">{product.basePrice}</span>
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                   <Star className="w-4 h-4 fill-current" /> <span>4.9</span>
                </div>
             </div>

             <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3">Description</h3>
                <p className="text-sm text-gray-500 leading-loose text-justify">{product.description}</p>
             </div>

             {/* Pilihan Warna */}
             <div className="mb-8">
                <div className="flex justify-between mb-3">
                   <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900">Color</h3>
                   <span className="text-xs text-gray-500">{selectedVariant.colorName}</span>
                </div>
                <div className="flex gap-3">
                   {product.variants.map((variant, index) => (
                      <button 
                        key={index}
                        onClick={() => { setSelectedVariant(variant); setQuantity(1); }}
                        className={`w-8 h-8 rounded-full border border-gray-200 transition-all duration-200 flex items-center justify-center ${selectedVariant.color === variant.color ? 'ring-2 ring-offset-2 ring-gray-900' : 'hover:scale-110'}`}
                        style={{ backgroundColor: variant.color }}
                      >
                         {selectedVariant.color === variant.color && <CheckCircle className="w-4 h-4 text-white drop-shadow-md" />}
                      </button>
                   ))}
                </div>
             </div>

             {/* Quantity */}
             <div className="mb-10">
                <div className="flex justify-between mb-3">
                   <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900">Quantity</h3>
                   <span className={`text-xs ${selectedVariant.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                      {selectedVariant.stock > 0 ? `Stok Tersedia: ${selectedVariant.stock}` : "Stok Habis"}
                   </span>
                </div>
                <div className="flex items-center gap-4">
                   <div className="flex items-center border border-gray-300 rounded-sm">
                      <button onClick={() => handleQuantity("minus")} disabled={selectedVariant.stock === 0} className="p-3 hover:bg-gray-100 disabled:opacity-50"><Minus className="w-4 h-4" /></button>
                      <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                      <button onClick={() => handleQuantity("plus")} disabled={selectedVariant.stock === 0} className="p-3 hover:bg-gray-100 disabled:opacity-50"><Plus className="w-4 h-4" /></button>
                   </div>
                </div>
             </div>

             {/* 4. TOMBOL BELI (YANG DIUBAH) */}
             <button 
                disabled={selectedVariant.stock === 0}
                // SEKARANG MENGGUNAKAN FUNGSI LOGIKA BARU KITA:
                onClick={handleAddToCart} 
                className="w-full bg-black text-white py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-bucini-gold transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
             >
                {selectedVariant.stock > 0 ? "Add to Cart" : "Out of Stock"}
             </button>

             <div className="mt-8 space-y-3 text-xs text-gray-500 tracking-wide">
                <p>✓ 100% Genuine Leather Guarantee</p>
                <p>✓ Free Shipping across Indonesia</p>
                <p>✓ 6 Months Warranty</p>
             </div>

          </div>
        </div>
      </div>
    </main>
  );
}