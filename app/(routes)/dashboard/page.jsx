"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budget/_components/BudgetItem";
import Link from "next/link";
import ExpensesTableList from "./expenses/_components/ExpensesTableList";
import { ArrowRight } from "lucide-react";

const Dashboard = () => {
  const { user } = useUser();
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBudgetList = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const response = await fetch(
        `/api/budget/fetch?email=${user.primaryEmailAddress.emailAddress}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch budgets");
      }

      const data = await response.json();
      setBudgets(data.budgets);
      console.log("budgets:-", data.budgets);
      getAllExpenses();
    } catch (error) {
      console.error("Error fetching budgets:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllExpenses = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const response = await fetch(
        `/api/expenses/fetchallexpenses?email=${user.primaryEmailAddress.emailAddress}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Expenses");
      }

      const data = await response.json();
      console.log("Expenses:-", data.expenses);
      setExpenses(data.expenses);
    } catch (error) {
      console.error("Error fetching Expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-8 w-3/5 sm:w-full">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#3ec0c7] to-[#038298] bg-clip-text text-transparent">
            Welcome back, {user?.fullName}! 👋
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mt-3 max-w-2xl">
            Track your expenses and manage your budget efficiently with our
            intuitive dashboard. your spending with ease.
          </p>
        </div>
        <CardInfo budgets={budgets} />
        {/* chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          <div>
            <BarChartDashboard budgets={budgets} />
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-5 text-[#0097B2]">
              <h2 className="text-2xl font-bold  ">Your Latest Budgets</h2>
              <Link
                href="/dashboard/budget"
                className=" underline underline-offset-2"
              >
                View ({budgets.length})
              </Link>
            </div>
            <div className=" flex flex-col gap-5">
              {budgets.slice(0, 2).map((budget) => (
                <BudgetItem key={budget._id} budget={budget} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <h1 className="text-3xl font-extrabold tracking-wide mb-8 text-[#0097B2]">
              Latest Expenses
            </h1>
            <Link href="/dashboard/expenses" className="flex underline underline-offset-2 items-center gap-1 text-[#0097B2] mr-10">View All <ArrowRight /></Link>
          </div>
          <div className="bg-gradient-to-r from-[#0097B2] to-[#3ec0c7] rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 w-[100%]">
            <ExpensesTableList
              expenses={expenses}
              refreshData={() => getAllExpenses()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
