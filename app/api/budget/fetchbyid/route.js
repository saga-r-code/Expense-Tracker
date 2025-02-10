import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnnect";
import Budget from "@/model/BudgetSchema";
import mongoose from "mongoose";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const email = searchParams.get("email");

  console.log("ID from URL:", id); // Log the ID

  // Check if both id and email are provided
  if (!id || !email) {
    return NextResponse.json(
      { error: "Both ID and Email are required" },
      { status: 400 }
    );
  }

  // Ensure id is a valid ObjectId string (24 characters)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid ID format" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    // Convert id to ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    const budgets = await Budget.aggregate([
      { 
        $match: { 
          created_by: email,
          _id: objectId 
        } 
      },
      {
        $lookup: {
          from: "expenses",
          localField: "_id",
          foreignField: "budget_id",
          as: "expenses"
        }
      },
      {
        $addFields: {
          totalSpend: { $sum: "$expenses.amount" },
          totalItem: { $size: "$expenses" }
        }
      }
    ]);

    if (!budgets || budgets.length === 0) {
      return NextResponse.json(
        { error: "Budget not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ budget: budgets[0] });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to fetch budget details" },
      { status: 500 }
    );
  }
}
