import Link from "next/link";
import Image from "next/image";
import { prisma } from "../../../../../lib/prisma"; 
import Sidebar from "../../../../../components/admin/sidebar";
import styles from "../../add/style.module.css"; // Pakai CSS Produk yang sama
import { updateProduct, setMainImage } from "../../../actions/productAction"; // Action update
import { CheckCircle, Star } from "lucide-react";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Ambil produk BESERTA varian-nya
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: { variants: true, collection: true }
  });
  
  const collections = await prisma.collection.findMany();

  if (!product) return <div>Produk tidak ditemukan</div>;

  return (
    <div className={styles.container}>
      <Sidebar activeMenu="Produk" />

      <main className={styles.mainContent}>
        <div className={styles.headerAction}>
          <h1 className={styles.pageTitle}>Edit Produk</h1>
          <Link href="/admin/products" className={styles.btnBack}>&larr; Kembali</Link>
        </div>

        {/* --- FORM EDIT INFO UTAMA --- */}
        <div className={styles.formCard}>
          <form action={updateProduct}>
            <input type="hidden" name="id" value={product.id} />
            
            <h3 className="text-lg font-bold mb-4 border-b pb-2">Informasi Utama</h3>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Nama Produk</label>
              <input type="text" name="name" defaultValue={product.name} className={styles.input} required />
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Harga</label>
                <input type="number" name="price" defaultValue={product.price} className={styles.input} required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Koleksi</label>
                <select name="collectionId" defaultValue={product.collectionId || ""} className={styles.input}>
                  <option value="">-- Tidak ada --</option>
                  {collections.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Deskripsi</label>
              <textarea name="description" rows={4} defaultValue={product.description} className={styles.textarea} required></textarea>
            </div>

            <button type="submit" className={styles.btnSubmit}>Simpan Perubahan Info</button>
          </form>
        </div>

        {/* --- BAGIAN ATUR FOTO / VARIAN --- */}
        <div className={styles.formCard} style={{marginTop: '30px'}}>
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Kelola Foto & Varian</h3>
          <p className="mb-4 text-sm text-gray-500">Klik tombol bintang untuk menjadikan foto sebagai Cover Utama Produk.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.variants.map((variant) => (
              <div key={variant.id} className="border p-4 rounded-lg flex gap-4 items-center bg-gray-50">
                {/* Foto */}
                <div className="relative w-20 h-20 bg-white rounded border overflow-hidden flex-shrink-0">
                  <Image 
                    src={variant.image || "/placeholder.png"} 
                    alt={variant.colorName} 
                    fill 
                    style={{objectFit: 'cover'}} 
                  />
                </div>

                {/* Info Varian */}
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{variant.colorName}</p>
                  <p className="text-sm text-gray-500">Stok: {variant.stock}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-4 h-4 rounded-full border shadow-sm" style={{background: variant.colorHex}}></span>
                    <span className="text-xs text-gray-400">{variant.colorHex}</span>
                  </div>
                </div>

                {/* Tombol SET MAIN IMAGE */}
                <form action={setMainImage.bind(null, product.id, variant.image!)}>
                   {product.image === variant.image ? (
                     <button disabled className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-bold flex items-center gap-1">
                       <CheckCircle size={14}/> Utama
                     </button>
                   ) : (
                     <button type="submit" className="bg-white border border-gray-300 hover:bg-yellow-50 text-gray-600 px-3 py-1 rounded text-xs font-bold flex items-center gap-1 transition">
                       <Star size={14}/> Set Utama
                     </button>
                   )}
                </form>
              </div>
            ))}
          </div>
          
          {product.variants.length === 0 && (
            <div className="text-center py-8 text-gray-400">Belum ada varian.</div>
          )}
        </div>

      </main>
    </div>
  );
}