import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma"; 
import Sidebar from "@/components/admin/sidebar"; 
import styles from "./product.module.css"; 
import { deleteProduct } from "../actions/productAction"; 
import { Plus } from "lucide-react"; // Ikon tambah

// Pastikan data selalu fresh saat dibuka
export const dynamic = "force-dynamic";

export default async function ProductListPage() {
  // Ambil data produk dari database
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { collection: true } // Jika mau menampilkan nama koleksi
  });

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className={styles.container}>
      {/* Sidebar Admin */}
      <Sidebar activeMenu="Produk" />

      <main className={styles.mainContent}>
        {/* Header: Judul & Tombol Tambah */}
        <div className={styles.headerAction}>
          <h1 className={styles.pageTitle}>Daftar Produk</h1>
          
          <Link href="/admin/products/add" className={styles.btnAdd}>
            <Plus size={18} />
            Tambah Produk Baru
          </Link>
        </div>

        {/* Tabel Data */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{width: '100px'}}>Foto</th>
                <th>Info Produk</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Status</th>
                <th>Kelola</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{textAlign: 'center', padding: '50px', color: '#64748b'}}>
                    Belum ada produk. Silakan tambah produk baru.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    {/* 1. FOTO */}
                    <td>
                      <div className={styles.productImageWrapper}>
                        <Image 
                          src={product.image && product.image !== "" ? product.image : "/images/placeholder.png"} 
                          alt={product.name} 
                          fill
                          style={{objectFit: 'cover'}}
                        />
                      </div>
                    </td>

                    {/* 2. INFO (NAMA & ID) */}
                    <td>
                      <div className={styles.productName}>{product.name}</div>
                      <div className={styles.productId}>
                        ID: #{product.id} • {product.collection ? product.collection.name : "Uncategorized"}
                      </div>
                    </td>

                    {/* 3. HARGA */}
                    <td style={{fontWeight: 600}}>{formatRupiah(product.price)}</td>

                    {/* 4. STOK (Angka) */}
                    <td style={{fontWeight: 600}}>{product.stock} pcs</td>

                    {/* 5. STATUS (Label Warna) */}
                    <td>
                      <span className={`${styles.stockLabel} ${
                        product.stock === 0 ? styles.stockEmpty : 
                        product.stock < 5 ? styles.stockLow : styles.stockSafe
                      }`}>
                        {product.stock === 0 ? "Habis" : product.stock < 5 ? "Menipis" : "Tersedia"}
                      </span>
                    </td>
                    
                    {/* 6. KELOLA (Tombol Edit & Hapus) */}
                    <td>
                      <div className={styles.actionButtons}>
                        {/* Tombol Edit */}
                        <Link 
                          href={`/admin/products/edit/${product.id}`} 
                          className={styles.btnEdit}
                        >
                          Edit
                        </Link>
                        
                        {/* Tombol Hapus */}
                        <form action={deleteProduct.bind(null, product.id)}>
                          <button 
                            type="submit" 
                            className={styles.btnDelete}
                            // Opsional: Tambahkan confirm JS sederhana jika perlu
                          >
                            Hapus
                          </button>
                        </form>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}