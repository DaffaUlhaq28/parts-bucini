"use server";

import { prisma } from "../../../lib/prisma"; // Path naik 3 level ke src/lib
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, unlink } from "fs/promises"; // Tambah unlink buat hapus file lama (opsional)
import { join } from "path";

// --- HELPER: UPLOAD IMAGE ---
async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  // Nama file unik: timestamp-namafile
  const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
  const path = join(process.cwd(), "public/uploads", fileName);
  
  await writeFile(path, buffer);
  return `/uploads/${fileName}`;
}

// --- 1. CREATE PRODUCT ---
export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const description = formData.get("description") as string;
  const color = formData.get("color") as string;
  const imageFile = formData.get("image") as File;

  // Upload gambar
  let imageUrl = await uploadFile(imageFile);
  
  // Fallback kalau upload gagal/kosong
  if (!imageUrl) imageUrl = "/images/product-placeholder.png";

  await prisma.product.create({
    data: {
      name,
      price,
      stock,
      description,
      color,
      image: imageUrl,
    },
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

// --- 2. DELETE PRODUCT (Fitur yang kamu cari) ---
export async function deleteProduct(id: number) {
  try {
    await prisma.product.delete({
      where: { id },
    });

    // Refresh halaman biar produknya langsung hilang
    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
    // Opsional: throw error biar user tau
  }
}

// --- 3. UPDATE PRODUCT ---
export async function updateProduct(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const description = formData.get("description") as string;
  const color = formData.get("color") as string;
  const imageFile = formData.get("image") as File;

  // Siapkan data yang mau diupdate
  const dataToUpdate: any = {
    name,
    price,
    stock,
    description,
    color,
  };

  // Cek kalau admin upload gambar baru
  if (imageFile && imageFile.size > 0) {
    const newImageUrl = await uploadFile(imageFile);
    if (newImageUrl) {
      dataToUpdate.image = newImageUrl;
    }
  }

  await prisma.product.update({
    where: { id },
    data: dataToUpdate,
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}