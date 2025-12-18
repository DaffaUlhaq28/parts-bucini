import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user, items, total } = body;

    console.log("Menerima Data Checkout:", { userEmail: user.email, totalItem: items.length });

    // 1. Pastikan User Ada (Upsert = Update jika ada, Create jika belum)
    const customer = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phone: user.phone,
      },
      create: {
        email: user.email,
        password: "user123", // Password default
        firstName: user.firstName,
        lastName: user.lastName || "",
        address: user.address,
        phone: user.phone,
      },
    });

    // 2. Simpan Pesanan
    const newOrder = await prisma.order.create({
      data: {
        invoice: `INV-${Date.now()}`, 
        totalAmount: total,
        status: "SUCCESS",
        paymentMethod: "Midtrans Simulator",
        userId: customer.id,
        items: {
          create: items.map((item: any) => {
            // PERBAIKAN DI SINI: Gunakan 'item.price' atau 'item.basePrice'
            // Kita bersihkan string "Rp 1.450.000" menjadi angka murni 1450000
            const priceString = item.price || item.basePrice || "0";
            const priceNumber = parseInt(priceString.toString().replace(/[^0-9]/g, ""));

            return {
              productName: item.name,
              color: item.colorName || "Default",
              price: priceNumber,
              quantity: item.quantity,
              image: item.image,
            };
          }),
        },
      },
    });

    console.log("Order Berhasil Dibuat:", newOrder.invoice);
    return NextResponse.json({ success: true, orderId: newOrder.invoice });

  } catch (error) {
    // Lihat error detailnya di Terminal VS Code Anda
    console.error("Gagal Checkout (Detail Error):", error);
    return NextResponse.json({ success: false, error: "Terjadi kesalahan pada server database." }, { status: 500 });
  }
}