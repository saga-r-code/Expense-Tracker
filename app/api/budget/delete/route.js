import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnnect";
import Budget from "@/model/BudgetSchema";
import Expense from "@/model/ExpenseSchema";
import { isValidObjectId } from "mongoose";

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log("Budget _id received:", id);

  // Validate that the provided id is a valid ObjectId (for the _id field)
  if (!id || !isValidObjectId(id)) {
    return NextResponse.json(
      { error: "A valid ID is required (must be a valid ObjectId)" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    // Delete the budget document using its _id
    const budget = await Budget.findByIdAndDelete(id);
    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    // Use the budget's UUID (stored in the custom "id" field) to delete related expenses
    await Expense.deleteMany({ budget_id: id });

    return NextResponse.json(
      { message: "Budget and related expenses deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting budget:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
