import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma"; 
import Sidebar from "@/components/admin/sidebar"; 
import styles from "./product.module.css"; 
import { deleteProduct } from "../actions/productAction"; 
import { Plus } from "lucide-react"; 

export const dynamic = "force-dynamic";

export default async function ProductListPage() {
  // Update Query: Ambil 'variants' (semua) untuk hitung stok
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { 
      collection: true,
      variants: true // <--- Ganti dari { take: 1 } jadi true (ambil semua)
    } 
  });

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className={styles.container}>
      <Sidebar activeMenu="Produk" />

      <main className={styles.mainContent}>
        <div className={styles.headerAction}>
          <h1 className={styles.pageTitle}>Daftar Produk</h1>
          
          <Link href="/admin/products/add" className={styles.btnAdd}>
            <Plus size={18} />
            Tambah Produk Baru
          </Link>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{width: '100px'}}>Foto</th>
                <th>Info Produk</th>
                <th>Harga</th>
                <th>Total Stok</th> {/* Judul kolom disesuaikan */}
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
                products.map((product) => {
                  // --- HITUNG TOTAL STOK DI SINI ---
                  const totalStock = product.variants.reduce((acc, variant) => acc + variant.stock, 0);

                  return (
                    <tr key={product.id}>
                      {/* 1. FOTO */}
                      <td>
                        <div className={styles.productImageWrapper}>
                          <Image 
                            src={product.image || product.variants[0]?.image || "/images/placeholder.png"} 
                            alt={product.name} 
                            fill
                            style={{objectFit: 'cover'}}
                          />
                        </div>
                      </td>

                      {/* 2. INFO */}
                      <td>
                        <div className={styles.productName}>{product.name}</div>
                        <div className={styles.productId}>
                          {/* Tampilkan jumlah varian warna */}
                          {product.variants.length} Varian Warna • {product.collection ? product.collection.name : "Uncategorized"}
                        </div>
                      </td>

                      {/* 3. HARGA */}
                      <td style={{fontWeight: 600}}>{formatRupiah(product.price)}</td>

                      {/* 4. TOTAL STOK (Pakai variabel hasil hitungan tadi) */}
                      <td style={{fontWeight: 600}}>{totalStock} pcs</td>

                      {/* 5. STATUS (Logika pakai totalStock) */}
                      <td>
                        <span className={`${styles.stockLabel} ${
                          totalStock === 0 ? styles.stockEmpty : 
                          totalStock < 5 ? styles.stockLow : styles.stockSafe
                        }`}>
                          {totalStock === 0 ? "Habis" : totalStock < 5 ? "Menipis" : "Tersedia"}
                        </span>
                      </td>
                      
                      {/* 6. KELOLA */}
                      <td>
                        <div className={styles.actionButtons}>
                          <Link 
                            href={`/admin/products/edit/${product.id}`} 
                            className={styles.btnEdit}
                          >
                            Edit
                          </Link>
                          
                          <form action={deleteProduct.bind(null, product.id)}>
                            <button type="submit" className={styles.btnDelete}>
                              Hapus
                            </button>
                          </form>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}