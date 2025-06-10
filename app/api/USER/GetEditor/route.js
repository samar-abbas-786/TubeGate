import prisma from "DB/db.config";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const alleditor = await prisma.user.findMany({
      where: {
        profession: {
          some: {
            role: "editor",
          },
        },
      },
      include: {
        profession: true,
      },
    });

    let editor = [];
    alleditor.map((e) => {
      let { profession: _,password, ...user } = e;
      editor.push(user);
    });
    return NextResponse.json({
      message: "Successfully got all editor",
      editor,
    });
  } catch (error) {
    return NextResponse.json({ message: "failed to got all editor", error });
  }
}
