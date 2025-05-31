import prisma from "DB/db.config";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.redirect(new URL("/Login", request.url));
    }

    const contentPostedToMe = await prisma.content.findMany({
      where: { userId },
    });

    if (contentPostedToMe.length === 0) {
      return NextResponse.json(
        { message: "No Content Available" },
        { status: 200 }
      );
    }

    return NextResponse.json({
      message: "Successfully got the content shared to me",
      contentPostedToMe,
    });
  } catch (error) {
    console.error("Error in getting content shared to me:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
