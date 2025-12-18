"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import styles from "../../app/admin/product.module.css";
import { Menu, X } from "lucide-react";

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      {/* Tombol Hamburger (Cuma muncul di Mobile) */}
      <button 
        className={styles.mobileMenuBtn} 
        style={{position: 'absolute', top: '20px', left: '20px', zIndex: 60}}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar dengan Logika Toggle Class */}
      <div className={`${styles.sidebarWrapper} ${isOpen ? styles.sidebarOpen : ''}`}>
        <Sidebar activeMenu="Produk" />
      </div>

      {/* Konten Utama */}
      {children}
      
      {/* Overlay Gelap pas menu kebuka */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40
          }} 
        />
      )}
    </div>
  );
}