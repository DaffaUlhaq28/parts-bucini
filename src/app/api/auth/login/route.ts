import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "Email tidak terdaftar." }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ success: false, error: "Password salah." }, { status: 401 });
    }

    const { password: _, ...userData } = user;
    return NextResponse.json({ success: true, data: userData });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}