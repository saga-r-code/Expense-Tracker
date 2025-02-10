// /api/budget/checkbudget
import connectDB from "@/lib/dbConnnect";
import Budget from "@/model/BudgetSchema";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const searchParams = new URL(req.url).searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    await connectDB();

    const budget = await Budget.findOne({
      created_by: email,
    });

    if (budget) {
      return NextResponse.json({ budget });
    } else {
      return NextResponse.json({ message: "Budget not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
