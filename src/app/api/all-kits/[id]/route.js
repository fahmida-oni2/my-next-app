import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET /api/all-kits/[id]
export async function GET(req, { params }) {
  const { id } = await params; 
  const db = await getDb();
  
  try {
    const result = await db.collection("kit-collection").findOne({ _id: new ObjectId(id) });
    
    if (!result) {
      return NextResponse.json({ success: false, message: "Kit not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
  }
}

// PUT /api/all-kits/[id]
export async function PUT(req, { params }) {
  const { id } = await params;
  const data = await req.json();
  const db = await getDb();

  delete data._id; 

  const result = await db.collection("kit-collection").updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
  
  return NextResponse.json(result);
}

// DELETE /api/all-kits/[id]
export async function DELETE(req, { params }) {
  const { id } = await params;
  const db = await getDb();
  
  const result = await db.collection("kit-collection").deleteOne({ 
    _id: new ObjectId(id) 
  });
  
  return NextResponse.json(result);
}