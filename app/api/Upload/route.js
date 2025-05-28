import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(request) {
  const token = request.cookies.get("access-toeknw")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/api/OAuth", request.url));
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: token });

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

}
