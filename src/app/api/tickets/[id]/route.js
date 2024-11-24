import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params; // Extract ticket ID from URL
    const { status } = await req.json(); // Get new status from request body

    const client = await clientPromise;
    const db = client.db("InsuranceDb"); // Replace with your database name
    const ticketsCollection = db.collection("TicketDb"); // Replace with your collection name

    // Update the ticket status
    const result = await ticketsCollection.updateOne(
      { _id: new ObjectId(id) }, // Find the ticket by ID
      { $set: { Status: status } } // Update the Status field
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Ticket not found." }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Ticket status updated successfully!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating ticket status:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to update ticket status.",
      }),
      { status: 500 }
    );
  }
}
