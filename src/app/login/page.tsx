"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // State untuk menampung semua inputan
  const [formData, setFormData] = useState({
    email: "",
    password: "", // Password hanya simulasi
    firstName: "",
    lastName: "",
    address: "",
    district: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi proses login/register
    setTimeout(() => {
      // Panggil fungsi login dan kirim data form tadi ke Context
      login(formData); 
      router.back(); // Kembali ke halaman sebelumnya (Produk)
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-white py-10 px-4 flex justify-center items-center font-sans text-gray-800">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-10">
           <h1 className="font-serif text-4xl font-bold text-gray-900 tracking-wider mb-2">BUCINI</h1>
           <p className="text-sm text-gray-500">Lengkapi data pengiriman Anda untuk melanjutkan.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 border border-gray-100 shadow-xl rounded-xl">
          
          {/* BAGIAN 1: AKUN */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4 border-b pb-2">Data Akun</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="email" type="email" placeholder="Email" required onChange={handleChange} className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-black transition" />
              <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-black transition" />
            </div>
          </div>

          {/* BAGIAN 2: ALAMAT PENGIRIMAN */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4 border-b pb-2">Alamat Pengiriman</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <input name="firstName" type="text" placeholder="Nama Depan" required onChange={handleChange} className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-black transition" />
                 <input name="lastName" type="text" placeholder="Nama Belakang" required onChange={handleChange} className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-black transition" />
              </div>
              
              <input name="address" type="text" placeholder="Alamat Lengkap (Jalan, No. Rumah, RT/RW)" required onChange={handleChange} className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-black transition" />
              
              <div className="grid grid-cols-2 gap-4">
                 <input name="district" type="text" placeholder="Kecamatan" required onChange={handleChange} className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-black transition" />
                 <input name="city" type="text" placeholder="Kota / Kabupaten" required onChange={handleChange} className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-black transition" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <select name="province" required onChange={handleChange} className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-black transition bg-white">
                    <option value="">Pilih Provinsi</option>
                    <option value="Jawa Barat">Jawa Barat</option>
                    <option value="DKI Jakarta">DKI Jakarta</option>
                    <option value="DI Yogyakarta">DI Yogyakarta</option>
                    <option value="Jawa Tengah">Jawa Tengah</option>
                    <option value="Jawa Timur">Jawa Timur</option>
                    <option value="Bali">Bali</option>
                    {/* Tambahkan lainnya sesuai kebutuhan */}
                 </select>
                 <input name="postalCode" type="text" placeholder="Kode Pos" required onChange={handleChange} className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-black transition" />
              </div>
              
              <input name="phone" type="tel" placeholder="Nomor Telepon (WA)" required onChange={handleChange} className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-black transition" />
            </div>
          </div>

          {/* TOMBOL AKSI */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-bucini-gold transition-colors duration-300 flex justify-center rounded"
            >
              {loading ? "Menyimpan Data..." : "Simpan & Lanjutkan Belanja"}
            </button>
            <button onClick={() => router.back()} type="button" className="w-full text-center mt-4 text-xs text-gray-400 hover:text-black transition">
              Batal & Kembali
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}