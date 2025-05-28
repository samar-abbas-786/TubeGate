// app/api/AuthHandler/route.js
import { google } from "googleapis";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log("Tokens:", tokens);

    const cookie = serialize("access-toekn", tokens.access_token, {
      maxAge: 60 * 60,
      httpOnly: true,
      path: "/",
    });
    const response = NextResponse.json({ message: "Token set" });

    response.headers.append("Set-Cookie", cookie);
    return response;
  } catch (error) {
    console.error("OAuth Error:", error);
    return NextResponse.json(
      { error: "Failed to exchange code" },
      { status: 500 }
    );
  }
}
