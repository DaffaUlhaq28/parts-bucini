import Link from "next/link";
import Image from "next/image";
import { prisma } from "../../../lib/prisma"; 
import Sidebar from "../../../components/admin/sidebar"; 
import styles from "./product.module.css"; 
import { deleteProduct } from "../actions/productAction"; // Import aksi hapus

export const dynamic = "force-dynamic";

export default async function ProductListPage() {
  let products = [];
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Gagal ambil data produk:", error);
  }

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
            <span>+</span> Tambah Produk Baru
          </Link>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Info Produk</th>
                {/* Kolom Warna Dihapus sesuai request */}
                <th>Harga</th>
                <th>Stok</th>
                <th>Status</th>
                <th style={{textAlign: 'right'}}>Kelola</th> {/* Kolom Baru */}
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{textAlign: 'center', padding: '40px', color: '#64748b'}}>
                    <p>Belum ada produk yang ditambahkan.</p>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.productImageWrapper}>
                        <Image 
                          src={product.image && product.image.startsWith('/') ? product.image : "/images/placeholder.png"} 
                          alt={product.name} 
                          fill
                          style={{objectFit: 'cover'}}
                        />
                      </div>
                    </td>
                    <td>
                      <div className={styles.productName}>{product.name}</div>
                      <div className={styles.productId}>ID: #{product.id}</div>
                    </td>
                    {/* Data Warna dihapus */}
                    <td style={{fontWeight: 600}}>{formatRupiah(product.price)}</td>
                    <td>{product.stock} pcs</td>
                    <td>
                      <span className={`${styles.stockLabel} ${
                        product.stock === 0 ? styles.stockEmpty : 
                        product.stock < 5 ? styles.stockLow : styles.stockSafe
                      }`}>
                        {product.stock === 0 ? "Habis" : product.stock < 5 ? "Menipis" : "Tersedia"}
                      </span>
                    </td>
                    
                    {/* KOLOM KELOLA (KANAN) */}
                    <td style={{textAlign: 'right'}}>
                      <div className={styles.actionButtons}>
                        {/* Tombol Edit */}
                        <Link 
                          href={`/admin/products/edit/${product.id}`} 
                          className={styles.btnEdit}
                        >
                          Edit
                        </Link>
                        
                        {/* Tombol Hapus (Pakai Form Server Action) */}
                        <form action={deleteProduct.bind(null, product.id)} style={{display:'inline'}}>
                          <button 
                            type="submit" 
                            className={styles.btnDelete}
                            // Tambahkan konfirmasi sederhana
                            // Note: Di server component murni, confirm() JS agak tricky, 
                            // tapi tombol submit ini akan langsung trigger action.
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