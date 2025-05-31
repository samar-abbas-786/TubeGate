import prisma from "DB/db.config";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, description, privacyStatus, userId, url } =
      await request.json();

    if (!title || !description || !privacyStatus || !userId || !url) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newContent = await prisma.content.create({
      data: {
        title,
        description,
        privacyStatus,
        url,
        userId,
      },
    });

    return NextResponse.json(
      { success: true, content: newContent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating content:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const video = await prisma.content.findMany({});
  return NextResponse.json({ video });
}
