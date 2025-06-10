import prisma from "DB/db.config";
import { NextResponse } from "next/server";

// POST: Save profession for a user
export async function POST(Request) {
  try {
    const { user_id, role } = await Request.json();

    const isUserExist = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!isUserExist) {
      return NextResponse.json({ message: "No user exists" }, { status: 404 });
    }

    const savedProfession = await prisma.profession.create({
      data: {
        user_id,
        role,
      },
    });

    return NextResponse.json({ message: "Profession saved", savedProfession });
  } catch (err) {
    return NextResponse.json(
      { message: "Error saving profession", error: err },
      { status: 500 }
    );
  }
}

export async function GET(Request, { params }) {
  const user_id = await params.user_id;
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  if (!isUserExist) {
    return NextResponse.json({ message: "No user exist" });
  }
  const getProfession = await prisma.profession.find({
    where: {
      user_id: user_id,
    },
  });
  return NextResponse.json({
    message: "getProfession profession",
    getProfession,
  });
}
