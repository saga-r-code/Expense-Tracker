//  api/budget/update/:id
import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnnect";
import Budget from "@/model/BudgetSchema";

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const { name, amount, emoji, created_by } = body;

    if (!name || !amount || !emoji || !created_by) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const budget = await Budget.findByIdAndUpdate(
      id,
      { name, amount, emoji, created_by },
      { new: true }
    );

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    } else {
      return NextResponse.json(
        { message: "Budget updated successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error Updating budget:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
