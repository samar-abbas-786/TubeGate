import prisma from "DB/db.config";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = await request.json();
  try {
    const isUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!isUser) {
      return NextResponse.json({ message: "user does not exist" });
    }
    if (isUser.password != password) {
      return NextResponse.json({ message: "Incorrect password" });
    }
    return NextResponse.json({ message: "Login Successfully", isUser });
  } catch (error) {}
}
