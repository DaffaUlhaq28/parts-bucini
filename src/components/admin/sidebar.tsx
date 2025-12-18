import Link from "next/link";
import styles from "./sidebar.module.css";

// Tipe data props biar autocomplete jalan
type SidebarProps = {
  activeMenu?: "Dashboard" | "Produk" | "Koleksi" | "Pesanan" | "Keluar";
};

export default function Sidebar({ activeMenu }: SidebarProps) {
  // Menu sesuai permintaan (Ditambah Dashboard biar bisa balik ke home)
  const menus = [
    { label: "Dashboard", href: "/admin" },
    { label: "Produk", href: "/admin/products" },
    { label: "Koleksi", href: "/admin/collections" },
    { label: "Pesanan", href: "/admin/orders" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>BUCINI ADMIN</div>
      
      <nav className={styles.menuList}>
        {menus.map((menu) => (
          <Link
            key={menu.label}
            href={menu.href}
            className={`${styles.menuItem} ${
              activeMenu === menu.label ? styles.active : ""
            }`}
          >
            {menu.label}
          </Link>
        ))}

        {/* Tombol Keluar (Manual Link) */}
        <Link 
          href="/logout" 
          className={`${styles.menuItem} ${styles.menuItemLogout}`}
        >
          Keluar
        </Link>
      </nav>
    </aside>
  );
}