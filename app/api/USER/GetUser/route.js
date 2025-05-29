import prisma from "DB/db.config";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const alluser = await prisma.user.findMany({
      where: {
        role: "user",
      },
    });
    return NextResponse.json({
      message: "Successfully got all user",
      alluser,
    });
  } catch (error) {
    return NextResponse.json({ message: "failed to got all user", error });
  }
}
