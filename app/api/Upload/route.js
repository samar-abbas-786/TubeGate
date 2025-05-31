import { NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "fs";
import https from "https";
import path from "path";
import os from "os";

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          return reject(
            new Error(`Failed to get '${url}' (${response.statusCode})`)
          );
        }
        response.pipe(file);
        file.on("finish", () => {
          file.close(resolve); // close stream before resolve
        });
      })
      .on("error", (err) => {
        fs.unlink(dest, () => reject(err));
      });
  });
}

export async function POST(request) {
  const token = request.cookies.get("access-token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/api/OAuth", request.url));
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: token });

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });
  const { title, description, privacyStatus, url } = await request.json();

  // Use unique temp file name for concurrency safety
  const tempFilePath = path.join(os.tmpdir(), `upload-video-${Date.now()}.mp4`);

  try {
    await downloadFile(url, tempFilePath);

    const res = await youtube.videos.insert({
      part: "snippet,status",
      requestBody: {
        snippet: { title, description },
        status: { privacyStatus },
      },
      media: {
        body: fs.createReadStream(tempFilePath),
      },
    });

    await fs.promises.unlink(tempFilePath);

    return NextResponse.json({
      message: "Video uploaded successfully",
      videoId: res.data.id,
    });
  } catch (error) {
    console.error("Upload failed:", error);

    // Try to cleanup temp file if exists
    try {
      await fs.promises.unlink(tempFilePath);
    } catch (_) {}

    return NextResponse.json(
      { error: "Upload failed", details: error.message || error },
      { status: 500 }
    );
  }
}
