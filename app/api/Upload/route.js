import { NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "fs";

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

  try {
    const res = await youtube.videos.insert({
      part: "snippet,status",
      requestBody: {
        snippet: {
          title: "My Test Video",
          description: "Uploaded using Google API and access token",
        },
        status: {
          privacyStatus: "private", // or "public" / "unlisted"
        },
      },
      media: {
        body: fs.createReadStream(
          "C:/Users/HP/Videos/Screen Recordings/yt-test.mp4" // Ensure this path is correct on your server
        ),
      },
    });

    console.log("✅ Video uploaded:", res.data);

    return NextResponse.json({
      message: "Video uploaded successfully",
      videoId: res.data.id,
    });
  } catch (error) {
    console.error("❌ Upload failed:", error.response?.data || error.message);

    return NextResponse.json(
      {
        error: "Upload failed",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
