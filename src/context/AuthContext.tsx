"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Tipe Data User Lengkap (Sesuai permintaan Anda)
type UserData = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  district: string; // Kecamatan
  city: string;     // Kota/Kab
  province: string;
  postalCode: string;
  phone: string;
} | null;

type AuthContextType = {
  isLoggedIn: boolean;
  user: UserData; // Data user disimpan di sini
  login: (data: UserData) => void; // Login sekarang butuh data
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData>(null);

  // Fungsi Login sekarang menerima data form
  const login = (data: UserData) => {
    setUser(data);       // Simpan data alamat
    setIsLoggedIn(true); // Ubah status jadi login
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}