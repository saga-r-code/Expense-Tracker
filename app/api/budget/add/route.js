//  api/budget/add
import connectDB from "@/lib/dbConnnect.js";
import Budget from "@/model/BudgetSchema.js";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectDB();

  try {
    const { name, amount, emoji, created_by } = await req.json();

    if (!name || !amount || !emoji || !created_by) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const newBudget = new Budget({
      name,
      amount,
      emoji,
      created_by,
    });

    const saveBudget = await newBudget.save();

    return new NextResponse(
      JSON.stringify(
        {
          success: true,
          data: saveBudget,
          message: "Budget created successfully",
        },
        { status: 201 }
      )
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        {
          success: false,
          message: "Failed to create budget",
        },
        { status: 500 }
      )
    );
  }
}
