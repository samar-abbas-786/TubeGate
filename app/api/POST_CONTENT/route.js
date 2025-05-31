import { writeFile } from "fs/promises";
import path from "path";
import cloudinary from "utils/cloudinary";
import prisma from "DB/db.config";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

import { IncomingForm } from "formidable";
import fs from "fs";

// disable default body parsing
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm({
        uploadDir: "/tmp",
        keepExtensions: true,
      });

      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { title, description, privacyStatus, userID } = data.fields;
    const videoFile = data.files.file;

    const result = await cloudinary.uploader.upload_large(videoFile.filepath, {
      resource_type: "video",
      folder: "uploads",
    });

    const video = await prisma.content.create({
      data: {
        title,
        description,
        userID,
        privacyStatus,
        publicId: result.public_id,
        // secure_url: result.secure_url,
      },
    });

    return NextResponse.json({ success: true, video });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
