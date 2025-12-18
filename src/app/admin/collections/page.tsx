import Link from "next/link";
import Image from "next/image";
import { prisma } from "../../../lib/prisma"; 
import Sidebar from "../../../components/admin/sidebar"; 
import styles from "./collections.module.css"; 
import { deleteCollection } from "../actions/collectionAction"; 
import { Plus, FolderOpen } from "lucide-react"; 

export const dynamic = "force-dynamic";

export default async function CollectionListPage() {
  // Ambil data koleksi + hitung jumlah produk di dalamnya
  const collections = await prisma.collection.findMany({
    include: {
      _count: {
        select: { products: true } // Hitung produk
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.container}>
      <Sidebar activeMenu="Koleksi" />

      <main className={styles.mainContent}>
        
        {/* Header */}
        <div className={styles.headerAction}>
          <h1 className={styles.pageTitle}>Daftar Koleksi</h1>
          <Link href="/admin/collections/add" className={styles.btnAdd}>
            <Plus size={18} />
            Buat Koleksi
          </Link>
        </div>

        {/* Tabel */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{width: '120px'}}>Cover</th>
                <th>Nama Koleksi</th>
                <th>Jumlah Produk</th>
                <th style={{width: '150px'}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {collections.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{textAlign: 'center', padding: '60px', color: '#94a3b8'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'10px'}}>
                      <FolderOpen size={40} />
                      <p>Belum ada koleksi.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                collections.map((item) => (
                  <tr key={item.id}>
                    {/* Foto */}
                    <td>
                      <div className={styles.imageWrapper}>
                        {item.image ? (
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill
                            style={{objectFit: 'cover'}}
                          />
                        ) : (
                          <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'#cbd5e1'}}>
                            <FolderOpen size={20}/>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Nama */}
                    <td>
                      <div className={styles.collectionName}>{item.name}</div>
                      <div className={styles.slugText}>/{item.slug}</div>
                    </td>

                    {/* Jumlah Produk */}
                    <td>
                      <span style={{fontWeight: 600, padding: '4px 10px', background: '#f1f5f9', borderRadius: '20px', fontSize: '0.85rem'}}>
                        {item._count.products} Item
                      </span>
                    </td>

                    {/* Tombol Aksi */}
                    <td>
                      <div className={styles.actionButtons}>
                        <Link href={`/admin/collections/edit/${item.id}`} className={styles.btnEdit}>
                          Edit
                        </Link>
                        
                        <form action={deleteCollection.bind(null, item.id)}>
                          <button type="submit" className={styles.btnDelete}>
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