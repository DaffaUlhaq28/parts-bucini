"use server";

import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import { join } from "path";

// --- HELPER: UPLOAD IMAGE ---
async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
  const path = join(process.cwd(), "public/uploads", fileName);
  await writeFile(path, buffer);
  return `/uploads/${fileName}`;
}

// --- 1. CREATE PRODUCT (Updated) ---
export async function createProductComplex(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const collectionId = formData.get("collectionId") ? Number(formData.get("collectionId")) : null;

  // Simpan Produk Dasar
  const newProduct = await prisma.product.create({
    data: { name, price, description, collectionId },
  });

  // Proses Varian
  const entries = Array.from(formData.entries());
  const variantIndices = new Set<number>();
  entries.forEach(([key]) => {
    if (key.startsWith("variant_")) {
      const parts = key.split("_");
      if (parts[1]) variantIndices.add(Number(parts[1]));
    }
  });

  let firstImage = null; // Untuk cover default

  for (const index of variantIndices) {
    const colorName = formData.get(`variant_${index}_colorName`) as string;
    const colorHex = formData.get(`variant_${index}_colorHex`) as string;
    const stock = Number(formData.get(`variant_${index}_stock`));
    const imageFile = formData.get(`variant_${index}_image`) as File;

    let imageUrl = await uploadFile(imageFile);

    // Ambil gambar varian pertama sebagai default cover
    if (!firstImage && imageUrl) firstImage = imageUrl;

    if (colorName) {
      await prisma.productVariant.create({
        data: {
          productId: newProduct.id,
          colorName,
          colorHex: colorHex || "#000000",
          stock,
          image: imageUrl,
        },
      });
    }
  }

  // Update Product dengan gambar pertama
  if (firstImage) {
    await prisma.product.update({
      where: { id: newProduct.id },
      data: { image: firstImage }
    });
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

// --- 2. SET MAIN IMAGE (Fitur Baru) ---
export async function setMainImage(productId: number, imageUrl: string) {
  await prisma.product.update({
    where: { id: productId },
    data: { image: imageUrl }
  });
  revalidatePath(`/admin/products/edit/${productId}`);
  revalidatePath("/admin/products");
}

// --- 3. UPDATE PRODUCT INFO ---
export async function updateProduct(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const collectionId = formData.get("collectionId") ? Number(formData.get("collectionId")) : null;

  await prisma.product.update({
    where: { id },
    data: { name, price, description, collectionId },
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

// --- DELETE ---
export async function deleteProduct(id: number) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}