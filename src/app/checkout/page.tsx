"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import Router
import { ChevronRight, Truck, Store, CreditCard } from "lucide-react";

export default function CheckoutPage() {
  const { items, cartTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter(); // Inisialisasi Router untuk redirect

  const shippingCost = 0; 
  const grandTotal = cartTotal + shippingCost;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
  };

  // === LOGIKA PEMBAYARAN & DATABASE ===
  const handlePayment = async () => {
    // 1. Validasi Login
    if (!user) {
      alert("Mohon login terlebih dahulu untuk melanjutkan pembayaran.");
      router.push("/login");
      return;
    }

    try {
      // 2. Ubah Status Tombol (Loading UX)
      const btn = document.getElementById("pay-btn") as HTMLButtonElement;
      if (btn) {
         btn.innerText = "Memproses...";
         btn.disabled = true;
         btn.style.opacity = "0.7";
      }

      // 3. Kirim Data ke API Backend (Database)
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user,       // Data user dari AuthContext
          items: items,     // Data barang dari CartContext
          total: grandTotal // Total harga
        }),
      });

      const result = await response.json();

      // 4. Cek Hasil dari Backend
      if (result.success) {
        // Sukses masuk DB -> Arahkan ke Halaman Sukses
        router.push("/payment-success");
      } else {
        // Gagal -> Tampilkan pesan error
        alert("Gagal memproses pesanan: " + (result.error || "Kesalahan Database"));
        if (btn) {
          btn.innerText = "Bayar Sekarang";
          btn.disabled = false;
          btn.style.opacity = "1";
        }
      }
    } catch (error) {
      console.error("Error Checkout:", error);
      alert("Terjadi kesalahan koneksi sistem.");
      const btn = document.getElementById("pay-btn") as HTMLButtonElement;
      if (btn) {
         btn.innerText = "Bayar Sekarang";
         btn.disabled = false;
         btn.style.opacity = "1";
      }
    }
  };

  // Style Input: Warna #1a3c6e ditulis manual agar Tailwind mendeteksinya
  const inputClass = "w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:border-[#1a3c6e] focus:ring-1 focus:ring-[#1a3c6e] transition shadow-sm placeholder:text-gray-400";

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans text-gray-800">
      
      {/* ==============================================================
          BAGIAN KIRI: FORMULIR DATA (Putih)
      ============================================================== */}
      <div className="w-full md:w-[55%] lg:w-[58%] order-2 md:order-1 bg-white border-r border-gray-200">
         <div className="max-w-xl ml-auto mr-auto md:mr-4 lg:mr-20 px-6 py-8 md:py-12">
            
            {/* Header Logo */}
            <div className="mb-6">
               <h1 className="font-serif text-4xl font-bold text-[#1a3c6e] tracking-tight mb-4">bucini</h1>
               <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-[#1a3c6e] font-medium">Cart</span> <ChevronRight className="w-3 h-3 mx-1" />
                  <span className="text-black font-medium">Information</span> <ChevronRight className="w-3 h-3 mx-1" />
                  <span className="text-black font-medium">Shipping</span> <ChevronRight className="w-3 h-3 mx-1" />
                  <span className="font-medium">Payment</span>
               </div>
            </div>

            {/* Contact Info */}
            <div className="mb-8">
               <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-medium text-gray-900">Contact</h2>
                  {!user ? (
                     <Link href="/login" className="text-sm text-[#1a3c6e] underline">Log in</Link>
                  ) : (
                     <span className="text-sm text-gray-500">Logged in as {user.firstName}</span>
                  )}
               </div>
               <input 
                  type="email" 
                  defaultValue={user?.email} 
                  placeholder="Email or mobile phone number" 
                  className={inputClass}
               />
               <div className="flex items-center gap-2 mt-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#1a3c6e] rounded border-gray-300 focus:ring-[#1a3c6e]" />
                  <label className="text-sm text-gray-600">Beri tahu saya tentang berita dan penawaran eksklusif</label>
               </div>
            </div>

            {/* Delivery Method */}
            <div className="mb-8">
               <h2 className="text-lg font-medium text-gray-900 mb-3">Delivery</h2>
               <div className="border border-gray-300 rounded-lg overflow-hidden">
                  {/* Option: Ship */}
                  <div className="flex items-center justify-between p-4 bg-[#f0f5ff] border-b border-gray-300 cursor-pointer">
                     <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-white border-[6px] border-[#1a3c6e]"></div>
                        <span className="text-sm font-medium text-gray-900">Ship</span>
                     </div>
                     <Truck className="w-5 h-5 text-gray-500" />
                  </div>
                  {/* Option: Pickup */}
                  <div className="flex items-center justify-between p-4 bg-white cursor-pointer hover:bg-gray-50">
                     <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-white border border-gray-300"></div>
                        <span className="text-sm font-medium text-gray-900">Pick up</span>
                     </div>
                     <Store className="w-5 h-5 text-gray-500" />
                  </div>
               </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-10 space-y-3">
               <h2 className="text-lg font-medium text-gray-900 mb-2">Shipping address</h2>
               
               <div className="relative">
                 <label className="absolute text-[11px] text-gray-500 top-2 left-3 z-10 font-medium">Negara/Wilayah</label>
                 <select className="w-full border border-gray-300 rounded-md px-3 pt-6 pb-2 text-sm bg-gray-100 text-gray-700 appearance-none cursor-not-allowed" disabled>
                    <option>Indonesia</option>
                 </select>
                 <ChevronRight className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 rotate-90" />
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Nama depan" defaultValue={user?.firstName} className={inputClass} />
                  <input type="text" placeholder="Nama belakang" defaultValue={user?.lastName} className={inputClass} />
               </div>
               <input type="text" placeholder="Alamat" defaultValue={user?.address} className={inputClass} />
               <input type="text" placeholder="Kecamatan (Opsional)" defaultValue={user?.district} className={inputClass} />
               <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Kota / Kabupaten" defaultValue={user?.city} className={inputClass} />
                  <input type="text" placeholder="Provinsi" defaultValue={user?.province} className={inputClass} />
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Kode pos" defaultValue={user?.postalCode} className={inputClass} />
                  <input type="tel" placeholder="Telepon" defaultValue={user?.phone} className={inputClass} />
               </div>
            </div>

            {/* PAYMENT SECTION (Simulasi Midtrans) */}
            <div className="mb-8 pt-6 border-t border-gray-100">
               <h2 className="text-lg font-medium text-gray-900 mb-1">Pembayaran</h2>
               <p className="text-sm text-gray-500 mb-4">All transactions are secure and encrypted.</p>

               <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300">
                     <span className="text-sm font-medium text-gray-900">Payments via Midtrans</span>
                     <div className="flex gap-1 opacity-80">
                        <div className="h-5 px-1 bg-white border rounded text-[9px] font-bold text-blue-700 flex items-center">BCA</div>
                        <div className="h-5 px-1 bg-white border rounded text-[9px] font-bold text-green-600 flex items-center">GOPAY</div>
                        <div className="h-5 px-1 bg-white border rounded text-[9px] font-bold text-red-500 flex items-center">VISA</div>
                     </div>
                  </div>
                  <div className="p-8 flex flex-col items-center justify-center text-center bg-gray-50">
                     <div className="w-16 h-12 border-2 border-gray-300 rounded mb-4 bg-white flex items-center justify-center relative">
                        <CreditCard className="w-6 h-6 text-gray-400" />
                        <div className="absolute -right-2 -bottom-2 bg-white rounded-full border border-gray-300 p-0.5">
                           <ChevronRight className="w-3 h-3 text-gray-500" />
                        </div>
                     </div>
                     <p className="text-sm text-gray-500 max-w-[280px] leading-relaxed">
                        Setelah mengklik &quot;Bayar Sekarang&quot;, Anda akan diarahkan ke Midtrans untuk menyelesaikan pembayaran dengan aman.
                     </p>
                  </div>
               </div>
            </div>

            {/* BILLING ADDRESS */}
            <div className="mb-10">
               <h2 className="text-lg font-medium text-gray-900 mb-3">Billing address</h2>
               <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-[#f0f5ff] border-b border-gray-300 cursor-pointer">
                     <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-white border-[6px] border-[#1a3c6e]"></div>
                        <span className="text-sm font-medium text-gray-900">Same as shipping address</span>
                     </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white cursor-pointer hover:bg-gray-50">
                     <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-white border border-gray-300"></div>
                        <span className="text-sm font-medium text-gray-900">Use a different billing address</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* FOOTER BUTTONS */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100">
               <Link href="/satchel-bags" className="text-sm text-[#1a3c6e] hover:text-blue-800 flex items-center gap-2 transition font-medium">
                  <span>❮</span> Return to cart
               </Link>
               
               {/* Tombol Utama */}
               <button 
                  id="pay-btn" 
                  onClick={handlePayment}
                  className="w-full sm:w-auto bg-[#1a3c6e] text-white px-10 py-4 text-base font-bold rounded-md hover:bg-blue-900 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
               >
                  Bayar Sekarang
               </button>
            </div>
            <p className="text-xs text-gray-400 mt-8 text-center sm:text-left">All rights reserved Bucini Bag ID</p>

         </div>
      </div>

      {/* ==============================================================
          BAGIAN KANAN: RINGKASAN BARANG (Abu-abu)
      ============================================================== */}
      <div className="w-full md:w-[45%] lg:w-[42%] order-1 md:order-2 bg-[#fafafa] border-l border-gray-200 md:min-h-screen">
         <div className="max-w-md mr-auto ml-auto md:ml-6 lg:ml-10 px-6 py-8 md:py-12 sticky top-0">
            
            <div className="space-y-4 mb-6">
               {items.map((item) => (
                  <div key={item.uniqueId} className="flex items-center gap-4">
                     <div className="relative w-16 h-16 border border-gray-200 rounded-lg bg-white flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                        <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-[11px] font-semibold w-5 h-5 rounded-full flex items-center justify-center border border-white z-10 shadow-sm">
                           {item.quantity}
                        </span>
                     </div>
                     <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.colorName}</p>
                     </div>
                     <p className="text-sm font-medium text-gray-900">{item.price}</p>
                  </div>
               ))}
            </div>

            <div className="flex gap-3 mb-6 pb-6 border-b border-gray-200">
               <input type="text" placeholder="Discount code" className={inputClass} />
               <button className="bg-gray-200 text-gray-500 px-4 py-3 rounded-md text-sm font-bold hover:bg-gray-300 transition disabled:opacity-50">Apply</button>
            </div>

            <div className="space-y-3 text-sm text-gray-600 mb-6">
               <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">{formatRupiah(cartTotal)}</span>
               </div>
               <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-xs text-gray-500">Enter shipping address</span>
               </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-6">
               <span className="text-lg font-medium text-gray-900">Total</span>
               <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">IDR</span>
                  <span className="text-2xl font-bold text-gray-900 tracking-tight">{formatRupiah(grandTotal)}</span>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}