"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; // <--- Import Router
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartSidebar() {
  const router = useRouter(); // <--- Inisialisasi Router
  const { isCartOpen, closeCart, items, removeFromCart, cartTotal } = useCart();

  // Format Rupiah
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
  };

  // Fungsi untuk Tombol Checkout
  const handleCheckout = () => {
    closeCart(); // 1. Tutup keranjang samping
    router.push("/checkout"); // 2. Pindah ke halaman checkout
  };

  return (
    <>
      {/* 1. OVERLAY GELAP (Background Dimmer) */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300 ${isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeCart}
      />

      {/* 2. SIDEBAR PANEL */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[100] shadow-2xl transform transition-transform duration-300 ease-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Header Sidebar */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
           <h2 className="font-serif text-xl tracking-widest text-gray-900 flex items-center gap-2">
             <ShoppingBag className="w-5 h-5 text-bucini-gold" /> YOUR CART
           </h2>
           <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition">
             <X className="w-5 h-5 text-gray-500" />
           </button>
        </div>

        {/* List Item */}
        <div className="h-[calc(100vh-250px)] overflow-y-auto p-6 space-y-6">
           {items.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
               <ShoppingBag className="w-16 h-16 opacity-20" />
               <p className="text-sm tracking-wide">Your cart is currently empty.</p>
               <button onClick={closeCart} className="text-xs font-bold border-b border-black pb-0.5 hover:text-bucini-gold hover:border-bucini-gold transition">
                 Start Shopping
               </button>
             </div>
           ) : (
             items.map((item) => (
               <div key={item.uniqueId} className="flex gap-4">
                  {/* Gambar Kecil */}
                  <div className="relative w-20 h-24 bg-stone-50 rounded-sm overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  
                  {/* Detail Item */}
                  <div className="flex-1 flex flex-col justify-between">
                     <div>
                       <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{item.name}</h3>
                       <p className="text-xs text-gray-500 mt-1">Color: {item.colorName}</p>
                       <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                     </div>
                     <div className="flex justify-between items-end">
                       <p className="text-sm font-bold text-bucini-gold">{item.price}</p>
                       <button 
                         onClick={() => removeFromCart(item.uniqueId)}
                         className="text-gray-400 hover:text-red-500 transition text-xs flex items-center gap-1"
                       >
                         <Trash2 className="w-3 h-3" /> Remove
                       </button>
                     </div>
                  </div>
               </div>
             ))
           )}
        </div>

        {/* Footer Sidebar (Total & Checkout) */}
        {items.length > 0 && (
          <div className="absolute bottom-0 w-full bg-stone-50 p-6 border-t border-gray-200">
             <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-gray-600 uppercase tracking-widest">Subtotal</span>
                <span className="text-lg font-bold text-gray-900">{formatRupiah(cartTotal)}</span>
             </div>
             <p className="text-[10px] text-gray-400 mb-4 text-center">Shipping & taxes calculated at checkout</p>
             
             {/* Tombol Checkout dengan Navigasi */}
             <button 
                onClick={handleCheckout} 
                className="w-full bg-black text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-bucini-gold transition-colors"
             >
                Checkout Now
             </button>
          </div>
        )}

      </div>
    </>
  );
}