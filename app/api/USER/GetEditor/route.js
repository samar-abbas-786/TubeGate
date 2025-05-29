import prisma from "DB/db.config";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const alleditor = await prisma.user.findMany({
      where: {
        role: "editor",
      },
    });
    return NextResponse.json({
      message: "Successfully got all editor",
      alleditor,
    });
  } catch (error) {
    return NextResponse.json({ message: "failed to got all editor", error });
  }
}
