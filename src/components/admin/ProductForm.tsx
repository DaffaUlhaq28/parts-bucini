"use client";

import { useState } from "react";
// Hapus import style lama di sini, kita pakai props
import Link from "next/link";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { createProductComplex } from "../../app/admin/actions/productAction";

type Collection = {
  id: number;
  name: string;
};

// Tambahkan prop 'styles' (tipe any agar fleksibel untuk CSS Module)
export default function ProductForm({ collections, styles }: { collections: Collection[], styles: any }) {
  
  const [variants, setVariants] = useState([{ id: 0 }]); 

  const addVariant = () => {
    setVariants([...variants, { id: Date.now() }]);
  };

  const removeVariant = (id: number) => {
    if (variants.length === 1) return; 
    setVariants(variants.filter((v) => v.id !== id));
  };

  return (
    <form action={createProductComplex} className={styles.formCard}>
      
      {/* BAGIAN 1: INFO UMUM */}
      <h3 className={styles.label} style={{fontSize: '1.2rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px'}}>
        Informasi Dasar
      </h3>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>Nama Produk</label>
        <input type="text" name="name" className={styles.input} placeholder="Contoh: Classic Cambridge Satchel" required />
      </div>

      <div className={styles.formGrid}>
        <div>
          <label className={styles.label}>Harga (Rp)</label>
          <input type="number" name="price" className={styles.input} placeholder="0" required />
        </div>

        <div>
          <label className={styles.label}>Kategori / Koleksi</label>
          <select name="collectionId" className={styles.select} required>
            <option value="">-- Pilih Koleksi --</option>
            {collections.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {collections.length === 0 && (
            <p className={styles.helperText}>
              <Link href="/admin/collections/add" className="text-blue-600 underline">Buat koleksi baru</Link>
            </p>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Deskripsi Lengkap</label>
        <textarea name="description" rows={5} className={styles.textarea} placeholder="Jelaskan detail bahan, ukuran, dan fitur..." required></textarea>
      </div>

      {/* BAGIAN 2: VARIAN WARNA & GAMBAR */}
      <div style={{marginTop: '40px'}}>
        <h3 className={styles.label} style={{fontSize: '1.2rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px'}}>
          Varian Warna & Stok
        </h3>

        {variants.map((variant, index) => (
          <div key={variant.id} className={styles.variantCard}>
            <div className={styles.variantHeader}>
              <span>Varian #{index + 1}</span>
              {variants.length > 1 && (
                <button type="button" onClick={() => removeVariant(variant.id)} className={styles.btnRemoveVariant}>
                  <Trash2 size={14} /> Hapus
                </button>
              )}
            </div>

            <div className={styles.formGrid}>
              {/* Kiri: Info Warna & Stok */}
              <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                <div>
                  <label className={styles.label}>Nama Warna</label>
                  <input type="text" name={`variant_${index}_colorName`} className={styles.input} placeholder="Cth: Saddle Brown" required />
                </div>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                   <div>
                      <label className={styles.label}>Palet (Hex)</label>
                      <div style={{display:'flex', alignItems:'center', gap:'10px', height:'48px', border:'1px solid #cbd5e1', borderRadius:'10px', padding:'0 10px', background:'#f8fafc'}}>
                        <input 
                          type="color" 
                          name={`variant_${index}_colorHex`} 
                          defaultValue="#8B4513"
                          style={{width:'30px', height:'30px', border:'none', background:'none', cursor:'pointer'}}
                        />
                        <span style={{fontSize:'0.8rem', color:'#64748b'}}>Pilih</span>
                      </div>
                   </div>
                   <div>
                      <label className={styles.label}>Stok Awal</label>
                      <input type="number" name={`variant_${index}_stock`} className={styles.input} placeholder="0" required />
                   </div>
                </div>
              </div>

              {/* Kanan: Upload Foto */}
              <div>
                <label className={styles.label}>Foto Varian Ini</label>
                <div style={{
                    border: '2px dashed #cbd5e1', 
                    borderRadius: '10px', 
                    padding: '20px', 
                    textAlign: 'center',
                    backgroundColor: '#f8fafc',
                    height: '135px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                  <ImageIcon size={24} style={{color:'#94a3b8', marginBottom:'8px'}} />
                  <input 
                    type="file" 
                    name={`variant_${index}_image`} 
                    accept="image/*" 
                    style={{fontSize: '0.8rem', width: '100%'}}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={addVariant} className={styles.btnAddVariant}>
          <Plus size={18} /> Tambah Varian Lain
        </button>
      </div>

      <button type="submit" className={styles.btnSubmit}>
        Simpan & Terbitkan Produk
      </button>

    </form>
  );
}