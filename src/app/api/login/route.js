import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const client = await clientPromise; // Reuse the MongoDB connection
    const db = client.db("InsuranceDb"); // Replace with your database name
    const user = await db
      .collection("AdminUsers")
      .findOne({ UserEmail: email }); // Match the `email` to `UserEmail`

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Hardcoded password comparison for testing purposes
    const hardcodedPassword = "1234"; // Replace with your hardcoded password
    if (password !== hardcodedPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
