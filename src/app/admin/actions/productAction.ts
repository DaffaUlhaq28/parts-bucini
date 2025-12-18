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

// --- FUNGSI UTAMA: CREATE PRODUCT + VARIANTS ---
export async function createProductComplex(formData: FormData) {
  // 1. Ambil Data Produk Utama
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const collectionId = formData.get("collectionId") ? Number(formData.get("collectionId")) : null;

  // 2. Simpan Produk Induk dulu ke Database
  const newProduct = await prisma.product.create({
    data: {
      name,
      price,
      description,
      collectionId,
    },
  });

  // 3. Proses Varian (Looping data dinamis dari form)
  // Kita akan mencari key seperti: variant_0_colorName, variant_0_image, dst.
  const entries = Array.from(formData.entries());
  
  // Cari index varian yang ada (karena user bisa hapus varian ditengah, index mungkin lompat)
  const variantIndices = new Set<number>();
  entries.forEach(([key]) => {
    if (key.startsWith("variant_")) {
      const parts = key.split("_"); // ["variant", "0", "colorName"]
      if (parts[1]) variantIndices.add(Number(parts[1]));
    }
  });

  // Loop setiap index varian yang ditemukan
  for (const index of variantIndices) {
    const colorName = formData.get(`variant_${index}_colorName`) as string;
    const colorHex = formData.get(`variant_${index}_colorHex`) as string;
    const stock = Number(formData.get(`variant_${index}_stock`));
    const imageFile = formData.get(`variant_${index}_image`) as File;

    // Upload gambar varian
    let imageUrl = await uploadFile(imageFile);

    // Simpan Varian ke Database
    if (colorName && colorHex) {
      await prisma.productVariant.create({
        data: {
          productId: newProduct.id,
          colorName,
          colorHex,
          stock,
          image: imageUrl,
        },
      });
    }
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

// ... fungsi deleteProduct dan updateProduct biarkan tetap ada ...
export async function deleteProduct(id: number) {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
}