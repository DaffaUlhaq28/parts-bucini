"use server";

import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import { join } from "path";

// --- HELPER: UPLOAD FILE ---
async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
  
  // Pastikan folder public/uploads ada
  const path = join(process.cwd(), "public/uploads", fileName);
  await writeFile(path, buffer);
  
  return `/uploads/${fileName}`;
}

// --- 1. CREATE PRODUK (COMPLEX) ---
export async function createProductComplex(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const collectionId = formData.get("collectionId") ? Number(formData.get("collectionId")) : null;

  // Simpan Parent
  const newProduct = await prisma.product.create({
    data: { name, price, description, collectionId },
  });

  // Loop & Simpan Variants
  const keys = Array.from(formData.keys());
  const variantIndices = new Set();
  keys.forEach(key => {
    const match = key.match(/variant_(\d+)_/);
    if (match) variantIndices.add(match[1]);
  });

  for (const index of Array.from(variantIndices)) {
    const colorName = formData.get(`variant_${index}_colorName`) as string;
    const colorHex = formData.get(`variant_${index}_colorHex`) as string;
    const stock = Number(formData.get(`variant_${index}_stock`) || 0);
    const imageFile = formData.get(`variant_${index}_image`) as File;

    const imageUrl = await uploadFile(imageFile);

    if (colorName) {
      await prisma.productVariant.create({
        data: {
          productId: newProduct.id,
          colorName,
          colorHex,
          stock,
          image: imageUrl || "/images/placeholder.png",
        },
      });
    }
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

// --- 2. DELETE PRODUK (INI YANG KAMU CARI) ---
export async function deleteProduct(id: number) {
  try {
    // Karena di schema sudah pakai 'onDelete: Cascade', 
    // varian akan otomatis terhapus saat produk induk dihapus.
    await prisma.product.delete({
      where: { id },
    });
    
    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
    throw new Error("Gagal menghapus produk");
  }
}

// --- 3. UPDATE PRODUK (Info Dasar) ---
export async function updateProduct(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  
  // Update info utama saja dulu
  await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      description
    }
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}