"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";

const BudgetLists = () => {
  const { user } = useUser();
  const [budgets, setBudgets] = useState([]);
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
    } catch (error) {
      console.error("Error fetching budgets:", error);
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
    <div className="space-y-10">
      <CreateBudget
        // onBudgetCreated={getBudgetList}
        refreshData={() => getBudgetList()}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {budgets.map((budget) => (
          <BudgetItem key={budget._id} budget={budget} />
        ))}
      </div>

      {budgets.length === 0 && (
        <div className="text-center text-gray-500">
          No budgets created yet
        </div>
      )}
    </div>
  );
};
export default BudgetLists;
