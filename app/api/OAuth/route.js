// app/api/OAuth/route.js
import { google } from "googleapis";

export async function GET(req) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  const scopes = ["https://www.googleapis.com/auth/youtube.upload"];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
  console.log("url", url);

  return Response.redirect(url);
}
