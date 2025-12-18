import Link from "next/link";
import Sidebar from "../../../../components/admin/sidebar";
import styles from "./style.module.css";
import { createCollection } from "../../actions/collectionAction";
import { Image as ImageIcon } from "lucide-react";

export default function AddCollectionPage() {
  return (
    <div className={styles.container}>
      <Sidebar activeMenu="Koleksi" />

      <main className={styles.mainContent}>
        
        <div className={styles.headerAction}>
          <h1 className={styles.pageTitle}>Buat Koleksi Baru</h1>
          <Link href="/admin/collections" className={styles.btnBack}>
            &larr; Batal
          </Link>
        </div>

        <div className={styles.formCard}>
          <form action={createCollection}>
            
            {/* Nama Koleksi */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Nama Koleksi</label>
              <input 
                type="text" 
                name="name" 
                className={styles.input} 
                placeholder="Contoh: Dompet Pria, Tas Wanita" 
                required 
              />
            </div>

            {/* Foto Sampul */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Foto Sampul Koleksi</label>
              <div className={styles.uploadArea}>
                <ImageIcon size={32} style={{color:'#94a3b8', marginBottom:'10px'}} />
                <input 
                  type="file" 
                  name="image" 
                  accept="image/*" 
                  style={{width:'100%', fontSize:'0.9rem'}}
                />
                {/* UBAH TEKS DI SINI */}
                <p style={{fontSize:'0.8rem', color:'#64748b', marginTop:'5px'}}>
                  Disarankan rasio 1:1 (Persegi)
                </p>
              </div>
            </div>

            <button type="submit" className={styles.btnSubmit}>
              Simpan Koleksi
            </button>

          </form>
        </div>

      </main>
    </div>
  );
}