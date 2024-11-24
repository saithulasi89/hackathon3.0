import clientPromise from "@/lib/mongodb"; // MongoDB connection helper
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise; // Establish MongoDB connection
    const db = client.db("InsuranceDb"); // Use your database name
    const tickets = await db.collection("TicketDb").find({}).toArray(); // Fetch all tickets

    // Return success response
    return NextResponse.json({ success: true, tickets }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tickets:", error);

    // Return error response
    return NextResponse.json(
      { success: false, message: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
