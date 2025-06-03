import prisma from "DB/db.config";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, password, role } = await request.json();
  console.log("registration", name);
  if (!name || !email || !password) {
    return NextResponse.json(
      { messgage: "all fields required" },
      { status: 500 }
    );
  }
  try {
    const newuser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password,
      },
    });
    const { password: _, ...user } = newuser;
    return NextResponse.json({
      message: "new user created successfully",
      user,
    });
  } catch (e) {
    console.log("error on create user", e);
    return NextResponse.json({ message: "Error occured on create user" });
  }
}

export async function GET(request) {
  const user = await prisma.user.findMany({});
  return NextResponse.json({
    message: " successfully",
    user,
  });
}
