import { NextResponse } from "next/server";
import Expense from "@/model/ExpenseSchema";
import connectDB from "@/lib/dbConnnect";

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await connectDB();
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Expense deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await connectDB();
  }
}
