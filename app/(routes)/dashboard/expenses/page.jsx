"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import ExpensesTableList from "./_components/ExpensesTableList";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-4 rounded-lg shadow-xl border border-[#0097B2]/20">
        <p className="font-semibold text-[#0097B2]">
          {new Date(label).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        {payload.map((item, index) => (
          <div
            key={index}
            className="text-sm font-medium"
            style={{ color: item.color }}
          >
            <p>Amount: ₹{item.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const page = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

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
      // Format the expenses data for the chartz
      setExpenses(data.expenses);
    } catch (error) {
      console.error("Error fetching Expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getAllExpenses();
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
    <div className="w-3/5 sm:w-full ">
      <h1 className="text-3xl font-extrabold tracking-wide mb-8 ">
        All Expenses
      </h1>

      <div className="w-full h-[400px] bg-white p-4 rounded-xl shadow-lg overflow-scroll">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={expenses}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="createdAt"
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
              stroke="#666"
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
              stroke="#666"
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
                letterSpacing: "0.4px",
                fontSize: "16px",
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              name="Expense Amount"
              stroke="#0097B2"
              strokeWidth={2.5}
              dot={{ fill: "#0097B2", r: 4 }}
              activeDot={{
                r: 6,
                fill: "#0097B2",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center my-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Total Expenses: $
          {expenses
            .reduce((total, expense) => total + expense.amount, 0)
            .toLocaleString()}
        </h1>
      </div>

      <div>
        <ExpensesTableList
          expenses={expenses}
          refreshData={() => getAllExpenses()}
        />
      </div>
    </div>
  );
};

export default page;
