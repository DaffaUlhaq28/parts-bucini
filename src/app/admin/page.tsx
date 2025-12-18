import Image from "next/image";
import Sidebar from "../../components/admin/sidebar"; // Import Sidebar Modular
import styles from "./admin.module.css";

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      
      {/* Panggil Sidebar di sini, set activeMenu ke 'Dashboard' */}
      <Sidebar activeMenu="Dashboard" />

      {/* --- KONTEN KANAN --- */}
      <main className={styles.mainContent}>
        
        {/* Header Section */}
        <header className={styles.topHeader}>
          <div className={styles.brandName}>
            Ringkasan Bisnis
          </div>
          <Image 
            src="/images/bucini-logold-hrz.png" 
            alt="Bucini Logo" 
            width={150} 
            height={60} 
            className={styles.logoImage}
            // Tambahkan placeholder biar kalau gambar error/loading tetep rapi
            style={{ objectFit: 'contain' }}
          /> 
        </header>

        {/* Grid Kartu Dashboard */}
        <div className={styles.dashboardGrid}>
          
          {/* 1. Card Pemasukan */}
          <div className={styles.card}>
            <span className={styles.cardTitle}>Pemasukan Hari Ini</span>
            <span className={styles.cardValue}>Rp 2.500.000</span>
            <span className={`${styles.cardDetail} ${styles.textSuccess}`}>
              +10% dibanding kemarin
            </span>
          </div>

          {/* 2. Card Pesanan */}
          <div className={styles.card}>
            <span className={styles.cardTitle}>Pesanan Baru</span>
            <span className={styles.cardValue}>12</span>
            <span className={styles.cardDetail}>Lihat semua pesanan &rarr;</span>
          </div>

          {/* 3. Card Pelanggan */}
          <div className={styles.card}>
            <span className={styles.cardTitle}>Total Pelanggan</span>
            <span className={styles.cardValue}>1,208</span>
            <span className={styles.cardDetail}>Data pelanggan aktif</span>
          </div>

          {/* 4. Card Produk Terjual */}
          <div className={styles.card}>
            <span className={styles.cardTitle}>Produk Terjual</span>
            <span className={styles.cardValue}>45</span>
            <span className={styles.cardDetail}>Dalam minggu ini</span>
          </div>

          {/* 5. Card Produk Kosong (Warning) */}
          <div className={`${styles.card} ${styles.borderDanger}`}>
            <span className={styles.cardTitle}>Stok Habis / Kosong</span>
            <span className={`${styles.cardValue} ${styles.textDanger}`}>3</span>
            <span className={styles.cardDetail} style={{color: '#dc2626'}}>
              Segera restock &rarr;
            </span>
          </div>

          {/* 6. Card Notifikasi (Wide) */}
          <div className={`${styles.card} ${styles.wideCard}`}>
            <span className={styles.cardTitle}>Notifikasi Terbaru</span>
            <ul style={{ paddingLeft: '20px', marginTop: '10px', color: '#334155', lineHeight: '1.8' }}>
              <li>User <strong>Budi Santoso</strong> baru saja mendaftar.</li>
              <li>Stok produk <strong>"Dompet Kartu"</strong> menipis (sisa 2).</li>
              <li>Pembayaran Invoice <strong>#INV-2025001</strong> telah dikonfirmasi.</li>
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}