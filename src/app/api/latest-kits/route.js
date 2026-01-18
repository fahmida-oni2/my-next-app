import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getDb();
    const result = await db.collection("kit-collection")
      .find()
      .sort({ created_date: -1 }) 
      .limit(6)
      .toArray();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch latest kits" }, { status: 500 });
  }
}