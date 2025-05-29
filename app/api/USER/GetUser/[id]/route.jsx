import prisma from "DB/db.config";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user || user.role !== "user") {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Successfully got the user",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get the user", error: error.message },
      { status: 500 }
    );
  }
}
