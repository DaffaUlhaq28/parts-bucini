"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Menu, User, Heart, ChevronDown, X } from "lucide-react";

export default function Home() {
  // === STATE MANAGEMENT ===
  const [isBagsOpen, setIsBagsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
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
      
      {/* 1. TOP BAR HITAM (ANIMASI BERJALAN) */}
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

      {/* 2. NAVBAR UTAMA */}
      <nav className="w-full bg-white z-50 border-b border-gray-100 sticky top-0">
        <div className="flex justify-between items-center px-6 py-5 md:px-12 bg-white relative z-50">
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-center items-center flex-col">
             <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-bucini-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                <h1 className="font-serif text-3xl font-bold tracking-widest text-bucini-gold">BUCINI</h1>
             </div>
             <p className="text-[8px] uppercase tracking-[0.4em] text-bucini-gold mt-1">The Beauty of Leather</p>
          </div>
          <div className="flex-1 flex justify-end gap-6 text-gray-800 items-center">
            <Search className="w-5 h-5 cursor-pointer hover:text-bucini-gold transition" />
            <User className="w-5 h-5 hidden md:block cursor-pointer hover:text-bucini-gold transition" />
            <Heart className="w-5 h-5 hidden md:block cursor-pointer hover:text-bucini-gold transition" />
            <div className="relative cursor-pointer hover:text-bucini-gold transition">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </div>
            <Menu className="w-6 h-6 md:hidden cursor-pointer" />
          </div>
        </div>

        {/* 3. MENU LINKS & MEGA MENU */}
        <div className="hidden md:flex justify-center pb-6 bg-white border-t border-gray-50 pt-4 relative">
           <div className="flex gap-8 text-[13px] tracking-wide font-sans text-gray-800 items-center font-normal static">
              
              {/* === MENU BAGS (CLICK TRIGGER) === */}
              <div ref={menuRef} className="static">
                <button onClick={toggleBagsMenu} className={`flex items-center gap-1 py-2 border-b-2 transition focus:outline-none ${isBagsOpen ? 'text-bucini-gold border-bucini-gold' : 'border-transparent hover:text-bucini-gold hover:border-bucini-gold'}`}>
                   Bags <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isBagsOpen ? 'rotate-180 text-bucini-gold' : 'text-gray-400'}`} />
                </button>
                <div className={`absolute left-0 top-full w-full bg-white border-t border-b border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] z-40 transition-all duration-300 ease-out origin-top ${isBagsOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
                   <div className="container mx-auto px-12 py-12">
                      <div className="flex justify-center gap-24">
                         <div className="flex gap-20 text-left">
                            <div className="space-y-6">
                               <h4 className="font-bold text-[11px] tracking-[0.2em] text-bucini-gold border-b border-gray-100 pb-2 mb-4 uppercase">Types</h4>
                               <ul className="space-y-3 text-[13px] text-gray-500">
                                  {/* LINK KE HALAMAN SATCHEL BAGS */}
                                  <li><Link href="/satchel-bags" className="hover:text-bucini-gold hover:translate-x-1 transition-all inline-block font-bold text-bucini-gold">Satchel Bags</Link></li>
                                  <li><Link href="#" className="hover:text-bucini-gold hover:translate-x-1 transition-all inline-block">Backpacks</Link></li>
                                  <li><Link href="#" className="hover:text-bucini-gold hover:translate-x-1 transition-all inline-block">Sling Bags</Link></li>
                                  <li><Link href="#" className="hover:text-bucini-gold hover:translate-x-1 transition-all inline-block">Tote Bags</Link></li>
                               </ul>
                            </div>
                            <div className="space-y-6">
                               <h4 className="font-bold text-[11px] tracking-[0.2em] text-bucini-gold border-b border-gray-100 pb-2 mb-4 uppercase">More</h4>
                               <ul className="space-y-3 text-[13px] text-gray-500">
                                  <li><Link href="#" className="hover:text-bucini-gold hover:translate-x-1 transition-all inline-block">Messenger Bags</Link></li>
                                  <li><Link href="#" className="hover:text-bucini-gold hover:translate-x-1 transition-all inline-block">Hand Bag</Link></li>
                                  <li><Link href="#" className="hover:text-bucini-gold hover:translate-x-1 transition-all inline-block">Clutch</Link></li>
                                  <li className="pt-2"><Link href="#" className="text-bucini-gold font-bold hover:underline text-[12px] uppercase tracking-widest">View All Products</Link></li>
                               </ul>
                            </div>
                         </div>
                         <div className="flex gap-6">
                            <div className="group/img relative w-56 h-64 bg-stone-50 overflow-hidden cursor-pointer">
                               <Image src="https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=600" alt="Featured Bag 1" fill className="object-cover group-hover/img:scale-110 transition duration-700 ease-in-out" />
                            </div>
                            <div className="group/img relative w-56 h-64 bg-stone-50 overflow-hidden cursor-pointer">
                               <Image src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600" alt="Featured Bag 2" fill className="object-cover group-hover/img:scale-110 transition duration-700 ease-in-out" />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
              <Link href="#" className="hover:text-bucini-gold transition py-2 border-b-2 border-transparent hover:border-bucini-gold">Wallets</Link>
              <Link href="#" className="hover:text-bucini-gold transition py-2 border-b-2 border-transparent hover:border-bucini-gold">Pouch & Clutch</Link>
              <Link href="#" className="hover:text-bucini-gold transition py-2 border-b-2 border-transparent hover:border-bucini-gold">Accessories</Link>
              <Link href="#" className="hover:text-bucini-gold transition py-2 border-b-2 border-transparent hover:border-bucini-gold">BeYou by BUCINI</Link>
              <Link href="#" className="hover:text-bucini-gold transition py-2 border-b-2 border-transparent hover:border-bucini-gold">Footwears</Link>
              <Link href="#" className="hover:text-bucini-gold transition py-2 border-b-2 border-transparent hover:border-bucini-gold">Custom Merchandise</Link>
           </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative w-full h-[85vh] overflow-hidden bg-stone-100">
        <Image src="/image/ModelBucini.png" alt="Bucini Hero" fill className="object-cover brightness-95" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 z-10">
          <div className="max-w-4xl text-white mt-10">
            <p className="text-white/90 tracking-[0.3em] text-xs font-sans uppercase mb-4 pl-1">New Collection 2025</p>
            <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-8 drop-shadow-lg">
              <span className="block">Leather</span>
              <span className="block ml-16 md:ml-32 italic font-light text-bucini-gold">Legacy</span>
            </h2>
            <button className="ml-2 bg-white text-bucini-gold border border-white px-10 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-bucini-gold hover:text-white transition-all duration-300">Shop Now</button>
          </div>
        </div>
      </div>

      {/* WELCOME SECTION */}
      <section className="py-24 px-6 bg-white text-center">
        <h3 className="font-sans text-lg md:text-xl uppercase tracking-[0.2em] text-gray-800 mb-8">Selamat Datang di Bucini</h3>
        <p className="max-w-3xl mx-auto text-gray-500 leading-loose font-light text-sm md:text-base">Setiap produk Bucini adalah cinta yang disampaikan dalam bahasa keindahan kulit asli...</p>
      </section>

      {/* NEW ARRIVAL */}
      <section className="pb-24 px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
           <h3 className="font-sans text-sm uppercase tracking-[0.2em] text-gray-800">New Arrival</h3>
           <Link href="#" className="text-xs uppercase tracking-widest text-bucini-gold hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {/* Item 1 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-square bg-gray-100 mb-4 overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800" alt="Bag 1" fill className="object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <h4 className="text-center text-xs tracking-[0.15em] uppercase text-gray-700">Gardenia Sling</h4>
            <p className="text-center text-xs text-gray-400 mt-1">Rp 1.250.000</p>
          </div>
          {/* Item 2 */}
          <div className="group cursor-pointer">
             <div className="relative aspect-square bg-gray-100 mb-4 overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800" alt="Bag 2" fill className="object-cover group-hover:scale-105 transition duration-500" />
             </div>
             <h4 className="text-center text-xs tracking-[0.15em] uppercase text-gray-700">Jasmine Tote</h4>
             <p className="text-center text-xs text-gray-400 mt-1">Rp 2.100.000</p>
          </div>
           {/* Item 3 */}
          <div className="group cursor-pointer">
             <div className="relative aspect-square bg-gray-100 mb-4 overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800" alt="Bag 3" fill className="object-cover group-hover:scale-105 transition duration-500" />
             </div>
             <h4 className="text-center text-xs tracking-[0.15em] uppercase text-gray-700">Magnolia Clutch</h4>
             <p className="text-center text-xs text-gray-400 mt-1">Rp 850.000</p>
          </div>
           {/* Item 4 */}
          <div className="group cursor-pointer">
             <div className="relative aspect-square bg-gray-100 mb-4 overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=800" alt="Bag 4" fill className="object-cover group-hover:scale-105 transition duration-500" />
             </div>
             <h4 className="text-center text-xs tracking-[0.15em] uppercase text-gray-700">Lavender Satchel</h4>
             <p className="text-center text-xs text-gray-400 mt-1">Rp 1.850.000</p>
          </div>
        </div>
      </section>

      {/* CATEGORY BANNERS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-1 px-2 pb-20">
        <div className="relative h-[60vh] group overflow-hidden cursor-pointer">
           <Image src="https://images.unsplash.com/photo-1570211776045-af3a51026f4a?auto=format&fit=crop&q=80&w=800" alt="Collection 1" fill className="object-cover brightness-75 group-hover:scale-105 transition duration-700" />
           <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
              <p className="uppercase tracking-widest text-xs mb-2">Women's Collection</p>
              <h3 className="font-serif text-3xl mb-6">Classic</h3>
              <button className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-bucini-gold hover:text-white transition">Lihat Produk</button>
           </div>
        </div>
        <div className="relative h-[60vh] group overflow-hidden cursor-pointer">
           <Image src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop" alt="Weaving Collection" fill className="object-cover brightness-75 group-hover:scale-105 transition duration-700" />
           <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
              <p className="uppercase tracking-widest text-xs mb-2">Exclusive</p>
              <h3 className="font-serif text-3xl mb-6">Weaving</h3>
              <button className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-bucini-gold hover:text-white transition">Lihat Produk</button>
           </div>
        </div>
        <div className="relative h-[60vh] group overflow-hidden cursor-pointer">
           <Image src="https://images.unsplash.com/photo-1550159930-40066082a4fc?auto=format&fit=crop&q=80&w=800" alt="Collection 3" fill className="object-cover brightness-75 group-hover:scale-105 transition duration-700" />
           <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
              <p className="uppercase tracking-widest text-xs mb-2">New Season</p>
              <h3 className="font-serif text-3xl mb-6">Crochet</h3>
              <button className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-bucini-gold hover:text-white transition">Lihat Produk</button>
           </div>
        </div>
      </section>
    </main>
  );
}