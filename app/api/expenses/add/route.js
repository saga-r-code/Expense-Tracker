import { NextResponse } from "next/server";
import Expense from "@/model/ExpenseSchema";
import connectDB from "@/lib/dbConnnect";

export async function POST(req, res) {
  await connectDB();

  try {
    const { expenseName, expenseAmount, budget_id, created_at } =
      await req.json();

    if (!expenseName || !expenseAmount) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const newExpense = new Expense({
      name: expenseName,
      amount: expenseAmount,
      budget_id,
      created_at,
    });

    const saveExpense = await newExpense.save();

    return NextResponse.json(
      {
        success: true,
        data: saveExpense,
        message: "Expense created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
