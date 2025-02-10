// api/expenses/fetchexpenses
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/dbConnnect";
import Expense from "@/model/ExpenseSchema";

export async function GET(request) {
  console.log("Fetching expenses...");
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    console.log("Received ID:", id);

    if (!id) {
      console.log("ID is required");
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Validate and convert to ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`Invalid ObjectId: ${id}`);
      return NextResponse.json({ error: "Invalid ObjectId" }, { status: 400 });
    }

    // Find expenses for the budget with the provided id
    const expenses = await Expense.find({
      budget_id: new mongoose.Types.ObjectId(id),
    }).sort({ createdAt: -1 });

    console.log("Expenses:", expenses);

    // Always return expenses array (empty if none found) with 200 status
    return NextResponse.json({ expenses: expenses || [] });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

