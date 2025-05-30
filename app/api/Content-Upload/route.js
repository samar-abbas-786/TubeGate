import prisma from "DB/db.config";
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const { title, description, userId, privacyStatus, file } =
      await request.json();
    if (!title || !description || !userId || !privacyStatus || !file) {
      return NextResponse.json(
        { message: "all field required" },
        { status: 500 }
      );
    }
    const content = await prisma.content.create({
      title,
      description,
      privacyStatus,
      userId,
      file,
    });
    if (!content) {
      return NextResponse.json(
        { message: "No Content Posted to DB" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Succesfully Uploaded to DB and Cloudinary" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Content Uploading");
    return NextResponse.json(
      { message: "Error in Posting Content to DB || Cloudinary" },
      { status: 400 }
    );
  }
}
