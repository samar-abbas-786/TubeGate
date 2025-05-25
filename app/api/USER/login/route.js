import prisma from "DB/db.config";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {email,password}=await request.json();
  try {
    const isUser=await prisma.user.findUnique(email);
    if(!isUser){
        return NextResponse.json({message:"user does not exist"});
        
    }

    
  } catch (error) {
    
  }
    
}