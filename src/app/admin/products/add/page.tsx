import Link from "next/link";
import Sidebar from "../../../../components/admin/sidebar"; // Sidebar Modular
import styles from "../product.module.css"; // CSS Baru (Mundur 1 folder)
import { createProduct } from "../../actions/productAction"; // Mundur 4 level ke src/actions

export default function AddProductPage() {
  return (
    <div className={styles.container}>
      
      {/* 1. Sidebar Modular */}
      <Sidebar activeMenu="Produk" />

      {/* 2. Konten Form */}
      <main className={styles.mainContent}>
        <div className={styles.headerAction}>
          <h1 className={styles.pageTitle}>Tambah Produk Baru</h1>
          <Link href="/admin/products" className={styles.btnBack}>
            &larr; Kembali ke Daftar
          </Link>
        </div>

        <div className={styles.formCard}>
          <form action={createProductComplex}>
            
            {/* Nama Produk */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Nama Produk</label>
              <input 
                type="text" 
                name="name" 
                className={styles.input} 
                placeholder="Contoh: Tas Kulit Satchel Classic" 
                required 
              />
            </div>

            {/* Grid 2 Kolom untuk Harga & Stok */}
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Harga Satuan (Rp)</label>
                <input 
                  type="number" 
                  name="price" 
                  className={styles.input} 
                  placeholder="0" 
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Stok Awal</label>
                <input 
                  type="number" 
                  name="stock" 
                  className={styles.input} 
                  placeholder="0" 
                  required 
                />
              </div>
            </div>

            {/* Varian Warna */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Varian Warna</label>
              <input 
                type="text" 
                name="color" 
                className={styles.input} 
                placeholder="Contoh: Maroon, Saddle Brown, Black" 
                required 
              />
              <p className={styles.helperText}>Jika ada banyak warna, masukkan salah satu warna utama dulu.</p>
            </div>

            {/* Deskripsi */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Deskripsi Lengkap</label>
              <textarea 
                name="description" 
                rows={5} 
                className={styles.textarea} 
                placeholder="Jelaskan spesifikasi, bahan kulit, dan keunggulan produk..." 
                required
              ></textarea>
            </div>

            {/* Upload Foto */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Foto Produk Utama</label>
              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                className={styles.input} 
                required 
              />
              <p className={styles.helperText}>*Format: JPG, PNG. Maksimal ukuran 2MB.</p>
            </div>

            <button type="submit" className={styles.btnSubmit}>
              Simpan & Terbitkan Produk
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}

