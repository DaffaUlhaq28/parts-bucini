import Link from "next/link";
import { prisma } from "../../../../lib/prisma"; //
import Sidebar from "../../../../components/admin/sidebar";
import ProductForm from "../../../../components/admin/ProductForm"; // Import Form yang baru kita buat
import styles from "./style.module.css"; 

export const dynamic = "force-dynamic";

export default async function AddProductPage() {
  const collections = await prisma.collection.findMany();

  return (
    <div className={styles.container}>
      <Sidebar activeMenu="Produk" />

      <main className={styles.mainContent}>
        <div className={styles.headerAction}>
          <h1 className={styles.pageTitle}>Tambah Produk Baru</h1>
          <Link href="/admin/products" className={styles.btnBack}>
            &larr; Batal
          </Link>
        </div>

        {/* Kirim styles sebagai props ke ProductForm */}
        <ProductForm collections={collections} styles={styles} />
        
      </main>
    </div>
  );
}