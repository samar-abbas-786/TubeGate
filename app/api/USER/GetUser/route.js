import prisma from "DB/db.config";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const alluser = await prisma.user.findMany({
      where: {
        profession: {
          some: {
            role: "user",
          },
        },
      },
      include: {
        profession: true,
      },
    });

    let userlist = [];
    if (alluser.length == 0) {
      return NextResponse.json({ message: "No User Found" });
    }
    alluser.map((e) => {
      let { password: _, profession, ...user } = e;
      userlist.push(user);
    });
    return NextResponse.json({
      message: "Successfully got all user",
      userlist,
    });
  } catch (error) {
    return NextResponse.json({ message: "failed to got all user", error });
  }
}
