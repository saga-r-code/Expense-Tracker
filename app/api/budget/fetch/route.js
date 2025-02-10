// /api/budget/fetch
import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnnect";
import Budget from "@/model/BudgetSchema";
import Expense from "@/model/ExpenseSchema";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get("email");

	if (!email) {
		return NextResponse.json({ error: "Email is required" }, { status: 400 });
	}

	try {
		await connectDB();

		// First get all budgets for the user
		const budgets = await Budget.find({ created_by: email }).sort({ createdAt: -1});
		// console.log("budgets:-", budgets);

		// Get expense totals for each budget
		const budgetsWithTotals = await Promise.all(
			budgets.map(async (budget) => {
				const expenses = await Expense.aggregate([
					{ $match: { budget_id: budget._id } },
					{
						$group: {
							_id: null,
							totalSpend: { $sum: "$amount" },
							totalItem: { $sum: 1 }
						}
					}
				]);

				const { totalSpend = 0, totalItem = 0 } = expenses[0] || {};

				return {
					...budget.toObject(),
					totalSpend,
					totalItem
				};
			})
		);

		return NextResponse.json({ budgets: budgetsWithTotals });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to fetch budgets" },
			{ status: 500 }
		);
	}
}


