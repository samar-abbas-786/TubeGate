import prisma from "DB/db.config";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const editor = await prisma.user.findUnique({
      where: {
        id, 
      },
    });

    if (!editor || editor.role !== "editor") {
      return NextResponse.json(
        { message: "Editor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Successfully got the editor",
      editor,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get the editor", error: error.message },
      { status: 500 }
    );
  }
}
