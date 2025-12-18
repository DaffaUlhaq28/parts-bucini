"use server";

import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import { join } from "path";

// --- Helper: Upload Image (Copy dari productAction) ---
async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
  const path = join(process.cwd(), "public/uploads", fileName);
  await writeFile(path, buffer);
  return `/uploads/${fileName}`;
}

// --- Helper: Generate Slug ---
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// --- ACTION: CREATE COLLECTION ---
export async function createCollection(formData: FormData) {
  const name = formData.get("name") as string;
  const imageFile = formData.get("image") as File;

  // 1. Upload Foto
  const imageUrl = await uploadFile(imageFile);

  // 2. Buat Slug Otomatis (Contoh: "Tas Pria" -> "tas-pria")
  let slug = generateSlug(name);
  
  // Cek apakah slug sudah ada, jika ya tambahkan timestamp biar unik
  const existing = await prisma.collection.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  // 3. Simpan ke DB
  await prisma.collection.create({
    data: {
      name,
      slug,
      image: imageUrl,
    },
  });

  revalidatePath("/admin/collections");
  redirect("/admin/collections");
}

// --- ACTION: DELETE COLLECTION ---
export async function deleteCollection(id: number) {
  await prisma.collection.delete({
    where: { id },
  });
  revalidatePath("/admin/collections");
}