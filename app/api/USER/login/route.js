import prisma from "DB/db.config";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const isUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!isUser) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    if (isUser.password !== password) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }
    const { password: _, ...user } = isUser;

    return NextResponse.json(
      { message: "Login Successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
