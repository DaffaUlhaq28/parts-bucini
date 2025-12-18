"use client";

import { useState } from "react";
import styles from "../app/admin/product.module.css";
import Link from "next/link";
import { Plus, Trash2, Upload } from "lucide-react";
import { createProductComplex } from "../../app/admin/actions/productAction"; // Import Action Baru

type Collection = {
  id: number;
  name: string;
};

export default function ProductForm({ collections }: { collections: Collection[] }) {
  // State untuk Varian Dinamis
  const [variants, setVariants] = useState([{ id: 0 }]); // Mulai dengan 1 varian kosong

  const addVariant = () => {
    setVariants([...variants, { id: Date.now() }]);
  };

  const removeVariant = (id: number) => {
    if (variants.length === 1) return; // Sisakan minimal 1
    setVariants(variants.filter((v) => v.id !== id));
  };

  return (
    <form action={createProductComplex}>
      
      {/* BAGIAN 1: INFO UTAMA */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Nama Produk</label>
        <input type="text" name="name" className={styles.input} placeholder="Contoh: Classic Satchel" required />
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Harga (Rp)</label>
          <input type="number" name="price" className={styles.input} placeholder="0" required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Kategori / Koleksi</label>
          <select name="collectionId" className={styles.select} required>
            <option value="">-- Pilih Koleksi --</option>
            {collections.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {collections.length === 0 && (
            <p className={styles.helperText}>
              Koleksi kosong. <Link href="/admin/collections/add" className="text-blue-600 underline">Buat koleksi baru</Link> dulu.
            </p>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Deskripsi</label>
        <textarea name="description" rows={4} className={styles.textarea} placeholder="Detail produk..." required></textarea>
      </div>

      <hr style={{margin: '30px 0', borderColor: '#e2e8f0'}} />

      {/* BAGIAN 2: VARIAN WARNA & GAMBAR (DINAMIS) */}
      <div className={styles.formGroup}>
        <label className={styles.label} style={{marginBottom:'15px'}}>Varian Warna & Foto</label>
        
        {variants.map((variant, index) => (
          <div key={variant.id} className={styles.variantCard}>
            <div className={styles.variantHeader}>
              <span>Varian #{index + 1}</span>
              {variants.length > 1 && (
                <button type="button" onClick={() => removeVariant(variant.id)} className={styles.btnRemoveVariant}>
                  <Trash2 size={16} /> Hapus
                </button>
              )}
            </div>

            <div className={styles.formGrid}>
              {/* Nama Warna */}
              <div>
                <label className={styles.label} style={{fontSize:'0.8rem'}}>Nama Warna</label>
                <input 
                  type="text" 
                  name={`variant_${index}_colorName`} 
                  className={styles.input} 
                  placeholder="Contoh: Maroon" 
                  required 
                />
              </div>

              {/* Hex Color Picker */}
              <div>
                <label className={styles.label} style={{fontSize:'0.8rem'}}>Kode Warna (Hex)</label>
                <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                   <input 
                      type="color" 
                      name={`variant_${index}_colorHex`}
                      defaultValue="#000000"
                      style={{width: '50px', height:'40px', padding:0, border:'none', cursor:'pointer'}} 
                   />
                   <span style={{fontSize:'0.8rem', color:'#64748b'}}>Pilih Warna</span>
                </div>
              </div>

              {/* Stok */}
              <div>
                <label className={styles.label} style={{fontSize:'0.8rem'}}>Stok</label>
                <input 
                  type="number" 
                  name={`variant_${index}_stock`} 
                  className={styles.input} 
                  placeholder="0" 
                  required 
                />
              </div>

              {/* Upload Foto */}
              <div>
                <label className={styles.label} style={{fontSize:'0.8rem'}}>Foto Varian</label>
                <input 
                  type="file" 
                  name={`variant_${index}_image`} 
                  accept="image/*" 
                  className={styles.input} 
                  required 
                />
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={addVariant} className={styles.btnAddVariant}>
          <Plus size={18} style={{display:'inline', verticalAlign:'middle'}} /> Tambah Varian Warna Lain
        </button>
      </div>

      <button type="submit" className={styles.btnSubmit}>
        Simpan Semua Produk
      </button>

    </form>
  );
}