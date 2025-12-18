import Link from "next/link";
import Image from "next/image";
import { prisma } from "../../../../../lib/prisma"; 
import Sidebar from "../../../../../components/admin/sidebar";
import styles from "../../product.module.css"; // Pakai CSS Produk yang sama
import { updateProduct } from "../../../actions/productAction"; // Action update

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Ambil ID dari URL
  const { id } = await params;
  
  // 2. Cari data produk lama di DB
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) }
  });

  if (!product) return <div>Produk tidak ditemukan</div>;

  return (
    <div className={styles.container}>
      <Sidebar activeMenu="Produk" />

      <main className={styles.mainContent}>
        <div className={styles.headerAction}>
          <h1 className={styles.pageTitle}>Edit Produk</h1>
          <Link href="/admin/products" className={styles.btnBack}>
            &larr; Batal & Kembali
          </Link>
        </div>

        <div className={styles.formCard}>
          {/* Action mengarah ke fungsi updateProduct */}
          <form action={updateProduct}>
            
            {/* ID Tersembunyi (Penting buat tahu mana yg diedit) */}
            <input type="hidden" name="id" value={product.id} />

            {/* Nama */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Nama Produk</label>
              <input 
                type="text" 
                name="name" 
                defaultValue={product.name} // Isi data lama
                className={styles.input} 
                required 
              />
            </div>

            {/* Harga & Stok */}
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Harga Satuan (Rp)</label>
                <input 
                  type="number" 
                  name="price" 
                  defaultValue={product.price} 
                  className={styles.input} 
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Stok</label>
                <input 
                  type="number" 
                  name="stock" 
                  defaultValue={product.stock}
                  className={styles.input} 
                  required 
                />
              </div>
            </div>

            {/* Warna */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Varian Warna</label>
              <input 
                type="text" 
                name="color" 
                defaultValue={product.color}
                className={styles.input} 
                required 
              />
            </div>

            {/* Deskripsi */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Deskripsi</label>
              <textarea 
                name="description" 
                rows={5} 
                defaultValue={product.description}
                className={styles.textarea} 
                required
              ></textarea>
            </div>

            {/* Gambar (Opsional saat Edit) */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Foto Produk (Biarkan kosong jika tidak diganti)</label>
              
              {/* Preview Gambar Lama */}
              {product.image && (
                <div style={{marginBottom: '10px'}}>
                  <p style={{fontSize:'0.8rem', color:'#64748b', marginBottom:'4px'}}>Foto Saat Ini:</p>
                  <Image src={product.image} alt="Current" width={80} height={80} style={{borderRadius:'4px', objectFit:'cover'}} />
                </div>
              )}

              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                className={styles.input} 
              />
            </div>

            <button type="submit" className={styles.btnSubmit}>
              Update Perubahan
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}