"use client";

import Link from "next/link";
import { Check, ArrowRight, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function PaymentSuccessPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans text-gray-800">
      
      {/* Kartu Sukses */}
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-100 relative overflow-hidden">
        
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-900"></div>

        {/* Ikon Sukses Animasi */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
             <Check className="w-8 h-8 text-white stroke-[3]" />
          </div>
        </div>

        {/* Teks Utama */}
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-blue-900 mb-2">
          Terima Kasih!
        </h1>
        <p className="text-lg font-medium text-gray-900 mb-6">
          Pesanan Anda berhasil dibuat.
        </p>

        {/* Detail Pesanan Ringkas */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left border border-gray-100">
           <div className="flex justify-between mb-2 border-b border-gray-200 pb-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Order ID</span>
              <span className="text-sm font-bold text-blue-900">#BCN-88291</span>
           </div>
           <div className="flex justify-between mb-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Nama</span>
              <span className="text-sm font-medium text-gray-900">{user?.firstName || "Pelanggan"}</span>
           </div>
           <div className="flex justify-between">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Email</span>
              <span className="text-sm font-medium text-gray-900">{user?.email || "email@contoh.com"}</span>
           </div>
        </div>

        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Konfirmasi pesanan dan detail pengiriman telah dikirim ke email Anda. Kami akan segera memproses barang impian Anda.
        </p>

        {/* Tombol Aksi */}
        <div className="space-y-3">
           <Link href="/satchel-bags" className="block w-full bg-blue-900 text-white py-4 rounded-lg font-bold text-sm hover:bg-blue-800 transition shadow-lg flex items-center justify-center gap-2 group">
              <ShoppingBag className="w-4 h-4" />
              Lanjut Belanja
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </Link>
           
           <Link href="/" className="block w-full text-gray-400 py-3 text-xs font-medium hover:text-blue-900 transition">
              Kembali ke Beranda
           </Link>
        </div>

      </div>

      <p className="mt-8 text-xs text-gray-400">© 2024 Bucini Leather. All rights reserved.</p>
    </div>
  );
}