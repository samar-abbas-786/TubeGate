import prisma from "DB/db.config";
import { NextResponse } from "next/server";

// Route Handler for: /api/editor/[id]
export async function GET(request, { params }) {
  try {
    const id = params.id; // or const { id } = params;

    const editor = await prisma.user.findUnique({
      where: { id },
    });

    if (!editor || editor.role !== "editor") {
      return NextResponse.json(
        { message: "Editor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Successfully got the editor",
        editor,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to get the editor",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
