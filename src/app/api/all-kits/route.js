import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/all-kits
export async function GET() {
  const db = await getDb();
  const result = await db.collection("kit-collection").find().toArray();
  return NextResponse.json(result);
}

// POST /api/all-kits
export async function POST(req) {
  const db = await getDb();
  const data = await req.json();
  const result = await db.collection("kit-collection").insertOne(data);
  return NextResponse.json({
    success: true,
    insertedId: result.insertedId,
  });
}