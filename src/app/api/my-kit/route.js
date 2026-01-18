import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  
  const db = await getDb();
  const result = await db.collection("kit-collection").find({ creator_email: email }).toArray();
  
  return NextResponse.json(result);
}