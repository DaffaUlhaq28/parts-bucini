import { prisma } from "@/lib/prisma"; // Panggil helper database kita
import Link from "next/link";
import { Package, User, ShoppingBag, ArrowLeft } from "lucide-react";

// Agar data selalu fresh (tidak di-cache) saat di-refresh
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // 1. Ambil data Order dari Database, urutkan dari yang terbaru
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,  // Ikutkan data pembeli
      items: true, // Ikutkan rincian barang
    },
  });

  // Helper Format Rupiah
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
  };

  // Helper Format Tanggal
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* NAVBAR ADMIN */}
      <nav className="bg-[#1a3c6e] text-white px-6 py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="font-serif text-xl font-bold tracking-widest">BUCINI ADMIN</h1>
          <Link href="/" className="text-xs bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Lihat Toko
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* JUDUL HALAMAN */}
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-[#1a3c6e]" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Daftar Pesanan Masuk</h2>
            <p className="text-sm text-gray-500">Total Transaksi: {orders.length}</p>
          </div>
        </div>

        {/* TABEL PESANAN */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                  <th className="p-6 font-semibold">Invoice ID</th>
                  <th className="p-6 font-semibold">Tanggal</th>
                  <th className="p-6 font-semibold">Pelanggan</th>
                  <th className="p-6 font-semibold">Total</th>
                  <th className="p-6 font-semibold">Status</th>
                  <th className="p-6 font-semibold">Detail Barang</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-gray-400">Belum ada pesanan masuk.</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition">
                      
                      {/* 1. Invoice */}
                      <td className="p-6">
                        <span className="font-mono text-xs font-bold text-[#1a3c6e] bg-blue-50 px-2 py-1 rounded">
                          {order.invoice}
                        </span>
                      </td>

                      {/* 2. Tanggal */}
                      <td className="p-6 text-sm text-gray-600">
                        {formatDate(order.createdAt)}
                      </td>

                      {/* 3. Pelanggan */}
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{order.user.firstName}</p>
                            <p className="text-xs text-gray-400">{order.user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* 4. Total Harga */}
                      <td className="p-6 text-sm font-bold text-gray-900">
                        {formatRupiah(order.totalAmount)}
                      </td>

                      {/* 5. Status */}
                      <td className="p-6">
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-green-200">
                          {order.status}
                        </span>
                      </td>

                      {/* 6. List Barang (Looping lagi di dalam tabel) */}
                      <td className="p-6">
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-100">
                               <ShoppingBag className="w-3 h-3 text-gray-400" />
                               <span className="font-bold text-gray-900">{item.quantity}x</span>
                               <span>{item.productName}</span>
                               <span className="text-gray-400">({item.color})</span>
                            </div>
                          ))}
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}