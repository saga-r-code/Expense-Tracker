import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnnect";
import Expense from "@/model/ExpenseSchema";
import Budget from "@/model/BudgetSchema";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const budgets = await Budget.find({ created_by: email }).sort({
      createdAt: -1,
    });

    if (!budgets || budgets.length === 0) {
      return NextResponse.json(
        { error: "No budgets found for this user" },
        { status: 404 }
      );
    } else {
      const expenses = await Expense.find({
        // The $in operator is used to select documents where the value of a field
        // equals any value in an array. In this case, we are using it to find all
        // expenses associated with any of the budget IDs in the budgets array.
        budget_id: { $in: budgets.map((budget) => budget._id) },
      }).sort({ createdAt: -1 });
      console.log("Expenses:", expenses);
      return NextResponse.json({ expenses: expenses || [] });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
