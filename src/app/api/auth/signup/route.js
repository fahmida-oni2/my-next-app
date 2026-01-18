import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();


    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { message: "Password does not meet security requirements" },
        { status: 400 }
      );
    }

    const db = await getDb();

 
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 422 });
    }

    const result = await db.collection("users").insertOne({
      name,
      email,
      password,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "User created successfully", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup API Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}