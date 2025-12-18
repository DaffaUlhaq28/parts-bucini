"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Menu, User, Heart, ChevronDown, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

// === DATA PRODUK (8 ITEM) ===
const products = [
  {
    id: 1,
    name: "Classic Cambridge",
    basePrice: "Rp 1.450.000",
    image: "/image/Satchelcoklat.png",
    variants: [
      { color: "#8B4513", colorName: "Saddle Brown", filter: "none" },
      { color: "#5F9EA0", colorName: "Ocean Teal", filter: "hue-rotate(160deg) saturate(0.8) brightness(0.9)" },
      { color: "#800000", colorName: "Deep Maroon", filter: "hue-rotate(320deg) saturate(1.2)" },
    ],
  },
  {
    id: 2,
    name: "Gardenia Mini",
    basePrice: "Rp 1.250.000",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=600&auto=format&fit=crop",
    variants: [
      { color: "#F5F5DC", colorName: "Cream", filter: "none" },
      { color: "#FFB6C1", colorName: "Soft Pink", filter: "sepia(1) hue-rotate(300deg) saturate(0.8) brightness(1.1)" },
      { color: "#1A1A1A", colorName: "Midnight", filter: "grayscale(100%) brightness(0.3)" },
    ],
  },
  {
    id: 3,
    name: "Oxford Messenger",
    basePrice: "Rp 1.850.000",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=600&auto=format&fit=crop",
    variants: [
      { color: "#800000", colorName: "Maroon", filter: "none" },
      { color: "#2F4F4F", colorName: "Dark Slate", filter: "hue-rotate(120deg) brightness(0.7)" },
      { color: "#A0522D", colorName: "Classic Tan", filter: "sepia(1) hue-rotate(20deg) saturate(1.5)" },
    ],
  },
  {
    id: 4,
    name: "Luna Crossbody",
    basePrice: "Rp 950.000",
    image: "https://images.unsplash.com/photo-1549525732-c518840c968f?q=80&w=600&auto=format&fit=crop",
    variants: [
      { color: "#1A1A1A", colorName: "Jet Black", filter: "none" },
      { color: "#8B4513", colorName: "Espresso", filter: "sepia(1) hue-rotate(350deg) brightness(0.9)" },
    ],
  },
  {
    id: 5,
    name: "Heritage Briefcase",
    basePrice: "Rp 2.100.000",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    variants: [
      { color: "#8B4513", colorName: "Vintage Brown", filter: "sepia(0.5)" },
      { color: "#000000", colorName: "Formal Black", filter: "grayscale(100%)" },
    ],
  },
  {
    id: 6,
    name: "Urban Satchel",
    basePrice: "Rp 1.650.000",
    image: "https://images.unsplash.com/photo-1590874103328-3fb828b6f543?q=80&w=600&auto=format&fit=crop",
    variants: [
      { color: "#A0522D", colorName: "Tan", filter: "none" },
      { color: "#556B2F", colorName: "Olive", filter: "hue-rotate(90deg) brightness(0.8)" },
    ],
  },
  {
    id: 7,
    name: "Miniature Classic",
    basePrice: "Rp 850.000",
    image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=600&auto=format&fit=crop",
    variants: [
      { color: "#FFD700", colorName: "Mustard", filter: "hue-rotate(20deg) saturate(1.5)" },
      { color: "#800080", colorName: "Plum", filter: "hue-rotate(280deg)" },
    ],
  },
  {
    id: 8,
    name: "Executive Tote",
    basePrice: "Rp 1.950.000",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
    variants: [
      { color: "#8B0000", colorName: "Dark Red", filter: "none" },
      { color: "#000080", colorName: "Navy", filter: "hue-rotate(200deg) brightness(0.6)" },
    ],
  },
];

// === KOMPONEN KARTU PRODUK ===
const ProductCard = ({ product }: { product: any }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  return (
    <div className="group flex flex-col items-center">
      {/* 1. CONTAINER GAMBAR */}
      <Link href={`/satchel-bags/${product.id}`} className="w-full">
        <div className="relative w-full aspect-[4/5] bg-stone-50 overflow-hidden mb-4 cursor-pointer rounded-sm">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
            style={{ filter: selectedVariant.filter, transition: "filter 0.5s ease" }}
          />
          {/* Overlay Harga */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
             <div className="bg-white px-4 py-2 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 border border-gray-100">
                <p className="text-[#1a3c6e] font-bold tracking-widest text-xs">
                  {product.basePrice}
                </p>
             </div>
          </div>
        </div>
      </Link>

      {/* 2. PILIHAN WARNA */}
      <div className="flex gap-2 mb-3">
        {product.variants.map((variant: any, index: number) => (
          <button
            key={index}
            onClick={(e) => { e.preventDefault(); setSelectedVariant(variant); }}
            className={`w-4 h-4 rounded-full border border-gray-200 transition-all duration-300 ${
              selectedVariant.color === variant.color ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : "hover:scale-110"
            }`}
            style={{ backgroundColor: variant.color }}
            title={variant.colorName}
          />
        ))}
      </div>

      {/* 3. NAMA PRODUK */}
      <Link href={`/satchel-bags/${product.id}`}>
        <h3 className="text-xs uppercase tracking-[0.2em] text-gray-800 font-medium text-center group-hover:text-[#1a3c6e] transition-colors">
          {product.name}
        </h3>
      </Link>
      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
        {selectedVariant.colorName}
      </p>
    </div>
  );
};

// === HALAMAN UTAMA ===
export default function SatchelPage() {
  const [isBagsOpen, setIsBagsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openCart, cartCount } = useCart();
  
  const toggleBagsMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBagsOpen(!isBagsOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsBagsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <main className="min-h-screen w-full bg-white font-sans text-gray-800">
      
      {/* 1. TOP BAR HITAM (FULL) */}
      <div className="w-full bg-black text-white text-[9px] md:text-[10px] py-2.5 flex items-center tracking-widest uppercase z-[60] relative overflow-hidden">
        <div className="flex w-full whitespace-nowrap animate-marquee">
            <span className="mx-8">Global Quality Leather Products</span> <span className="mx-2">|</span>
            <span className="mx-8 font-bold">100% Leather Guarantee</span> <span className="mx-2">|</span>
            <span className="mx-8">Hand Made</span> <span className="mx-2">|</span>
            <span className="mx-8">Global Quality Leather Products</span> <span className="mx-2">|</span>
            <span className="mx-8 font-bold">100% Leather Guarantee</span>
        </div>
        <div className="absolute right-0 top-0 h-full bg-black px-4 flex items-center z-10">
           <X className="w-3 h-3 cursor-pointer text-gray-400 hover:text-white" />
        </div>
      </div>

      {/* 2. NAVBAR UTAMA (LOGO TENGAH & MENU BAWAH) */}
      <nav className="w-full bg-white z-50 border-b border-gray-100 sticky top-0">
        
        {/* Baris Atas: Logo & Icons */}
        <div className="flex justify-between items-center px-6 py-5 md:px-12 bg-white relative z-50">
          <div className="flex-1 flex justify-start"></div>

          {/* Logo Tengah */}
          <Link href="/" className="flex-1 flex justify-center items-center flex-col cursor-pointer hover:opacity-80 transition">
             <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-[#1a3c6e]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                <h1 className="font-serif text-3xl font-bold tracking-widest text-[#1a3c6e]">BUCINI</h1>
             </div>
             <p className="text-[8px] uppercase tracking-[0.4em] text-[#1a3c6e] mt-1">The Beauty of Leather</p>
          </Link>

          {/* Icon Kanan */}
          <div className="flex-1 flex justify-end gap-6 text-gray-800 items-center">
            <Search className="w-5 h-5 cursor-pointer hover:text-[#1a3c6e] transition" />
            <User className="w-5 h-5 hidden md:block cursor-pointer hover:text-[#1a3c6e] transition" />
            <Heart className="w-5 h-5 hidden md:block cursor-pointer hover:text-[#1a3c6e] transition" />
            
            {/* Keranjang */}
            <div onClick={openCart} className="relative cursor-pointer hover:text-[#1a3c6e] transition">
              <ShoppingBag className="w-5 h-5" />
              <span className={`absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition-transform ${cartCount > 0 ? 'scale-100' : 'scale-0'}`}>
                {cartCount}
              </span>
            </div>

            <Menu className="w-6 h-6 md:hidden cursor-pointer" />
          </div>
        </div>

        {/* Baris Bawah: Menu Links Lengkap */}
        <div className="hidden md:flex justify-center pb-6 bg-white border-t border-gray-50 pt-4 relative">
           <div className="flex gap-8 text-[13px] tracking-wide font-sans text-gray-800 items-center font-normal static">
              
              <div ref={menuRef} className="static">
                <button 
                  onClick={toggleBagsMenu} 
                  className={`flex items-center gap-1 py-2 border-b-2 transition focus:outline-none ${isBagsOpen ? 'text-[#1a3c6e] border-[#1a3c6e]' : 'border-transparent hover:text-[#1a3c6e] hover:border-[#1a3c6e]'}`}
                >
                   Bags 
                   <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isBagsOpen ? 'rotate-180 text-[#1a3c6e]' : 'text-gray-400'}`} />
                </button>

                {/* DROPDOWN MENU BAGS */}
                <div className={`absolute left-0 top-full w-full bg-white border-t border-b border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] z-40 transition-all duration-300 ease-out origin-top ${isBagsOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
                   <div className="container mx-auto px-12 py-12">
                      <div className="flex justify-center gap-24">
                         <div className="flex gap-20 text-left">
                            <div className="space-y-6">
                               <h4 className="font-bold text-[11px] tracking-[0.2em] text-[#1a3c6e] border-b border-gray-100 pb-2 mb-4 uppercase">Types</h4>
                               <ul className="space-y-3 text-[13px] text-gray-500">
                                  <li><Link href="/satchel-bags" className="hover:text-[#1a3c6e] hover:translate-x-1 transition-all inline-block font-bold text-[#1a3c6e]">Satchel Bags</Link></li>
                                  <li><Link href="#" className="hover:text-[#1a3c6e] hover:translate-x-1 transition-all inline-block">Backpacks</Link></li>
                                  <li><Link href="#" className="hover:text-[#1a3c6e] hover:translate-x-1 transition-all inline-block">Sling Bags</Link></li>
                                  <li><Link href="#" className="hover:text-[#1a3c6e] hover:translate-x-1 transition-all inline-block">Tote Bags</Link></li>
                               </ul>
                            </div>
                            <div className="space-y-6">
                               <h4 className="font-bold text-[11px] tracking-[0.2em] text-[#1a3c6e] border-b border-gray-100 pb-2 mb-4 uppercase">More</h4>
                               <ul className="space-y-3 text-[13px] text-gray-500">
                                  <li><Link href="#" className="hover:text-[#1a3c6e] hover:translate-x-1 transition-all inline-block">Messenger Bags</Link></li>
                                  <li><Link href="#" className="hover:text-[#1a3c6e] hover:translate-x-1 transition-all inline-block">Hand Bag</Link></li>
                                  <li><Link href="#" className="hover:text-[#1a3c6e] hover:translate-x-1 transition-all inline-block">Clutch</Link></li>
                                  <li className="pt-2"><Link href="#" className="text-[#1a3c6e] font-bold hover:underline text-[12px] uppercase tracking-widest">View All Products</Link></li>
                               </ul>
                            </div>
                         </div>
                         <div className="flex gap-6">
                            <div className="relative w-56 h-64 bg-stone-50 overflow-hidden group/img cursor-pointer">
                              <Image src="https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=600" alt="Bag 1" fill className="object-cover group-hover/img:scale-110 transition duration-500" />
                            </div>
                            <div className="relative w-56 h-64 bg-stone-50 overflow-hidden group/img cursor-pointer">
                              <Image src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600" alt="Bag 2" fill className="object-cover group-hover/img:scale-110 transition duration-500" />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* MENU LINKS LAINNYA */}
              <Link href="#" className="hover:text-[#1a3c6e] transition py-2 border-b-2 border-transparent hover:border-[#1a3c6e]">Wallets</Link>
              <Link href="#" className="hover:text-[#1a3c6e] transition py-2 border-b-2 border-transparent hover:border-[#1a3c6e]">Pouch & Clutch</Link>
              <Link href="#" className="hover:text-[#1a3c6e] transition py-2 border-b-2 border-transparent hover:border-[#1a3c6e]">Accessories</Link>
              <Link href="#" className="hover:text-[#1a3c6e] transition py-2 border-b-2 border-transparent hover:border-[#1a3c6e]">BeYou by BUCINI</Link>
              <Link href="#" className="hover:text-[#1a3c6e] transition py-2 border-b-2 border-transparent hover:border-[#1a3c6e]">Footwears</Link>
              <Link href="#" className="hover:text-[#1a3c6e] transition py-2 border-b-2 border-transparent hover:border-[#1a3c6e]">Custom Merchandise</Link>
           </div>
        </div>
      </nav>

      {/* 3. KONTEN UTAMA */}
      <div className="container mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="text-center mb-16 space-y-4">
           <h1 className="font-sans text-2xl md:text-3xl uppercase tracking-[0.3em] font-light text-gray-900">Satchel Bags</h1>
           <div className="w-12 h-0.5 bg-[#1a3c6e] mx-auto"></div>
           <p className="text-xs text-gray-400 tracking-widest max-w-lg mx-auto leading-relaxed">
             Koleksi tas satchel kulit asli dengan desain klasik yang tak lekang oleh waktu.
           </p>
        </div>
        
        {/* GRID PRODUK (8 ITEM) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}