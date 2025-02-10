"use client";
import { useUser } from "@clerk/nextjs";
import React, { use, useEffect, useState } from "react";
import BudgetItem from "../../budget/_components/BudgetItem";
import AddExpenses from "../_components/AddExpenses";
import ExpensesTableList from "../_components/ExpensesTableList";
import { ArrowLeft, Trash2Icon } from "lucide-react";
import EditBudget from "../_components/EditBudget";
import { Slide, toast, ToastContainer } from "react-toastify";

const Expenses = ({ params }) => {
  const { id } = use(params); // Directly accessing the id from params
  const { user } = useUser();
  const [budget, setBudget] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log("id:-", id);  // This should log the correct id

  useEffect(() => {
    if (user && id) {
      getBudgetInfo();
    }
  }, [id, user]);

  // Function to fetch budget information by ID and email
  const getBudgetInfo = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/budget/fetchbyid?id=${id}&email=${user?.primaryEmailAddress.emailAddress}`
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch budget");
      }
      console.log("budget:-", data.budget);
      setBudget(data.budget);
      getExpenses(); // Call getExpenses() after fetching budget
    } catch (error) {
      console.error("Error fetching budgets:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // fetching the expenses as per the budget id
  const getExpenses = async () => {
    try {
      const response = await fetch(`/api/expenses/fetchexpenses?id=${id}`);
      console.log("Response from getExpenses", response);

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "No expenses found"
            : "Failed to fetch expenses"
        );
      }

      const data = await response.json();
      console.log("expenses data:-", data);
      setExpenses(data.expenses || []); // Ensure we always set an array
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError(error.message);
      setExpenses([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Deleting the budget
  const deleteBudget = async (id) => {
    if (!id) {
      console.error("ID is required to delete a budget");
      return;
    }

    try {
      const response = await fetch(`/api/budget/delete?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Budget deleted successfully:", data);
        toast.error("Budget deleted successfully");
        setLoading(true);
        setTimeout(() => {
          window.location.href = "/dashboard/budget";
        }, 1000);
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete budget");
      }
    } catch (error) {
      console.error("Error deleting budget:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Check if loading, error, or budget is null
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading budget details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">No budget found</div>
      </div>
    );
  }

  return (
    <div className="relative  min-h-screen w-3/5 md:w-full ">
      <div className="flex flex-col justify-center  gap-10 py-10">
        <div className="flex flex-col gap-5 items-center justify-center sm:justify-between sm:gap-0 sm:flex-row w-fit sm:w-full">
          <div className="flex justify-center items-center gap-3 ">
            <ArrowLeft
              strokeWidth={2.5}
              color="#0097B2"
              className="cursor-pointer"
              onClick={() => (window.location.href = "/dashboard/budget")}
            />
            <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-[#00BCC6] to-[#0097B2] text-transparent bg-clip-text">
              My Expenses
            </h1>
          </div>
          <div className="flex justify-center items-center gap-5 ">
            {/* Edit Button */}
            <EditBudget budget={budget} refreshData={() => getBudgetInfo()} />
            {/* // Delete Button */}
            <div
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this budget?")
                ) {
                  deleteBudget(budget._id);
                }
              }}
              className="flex gap-3 justify-center items-center bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md shadow-lg hover:from-red-600 hover:to-red-700 active:bg-gradient-to-r active:from-red-500 active:to-red-600 
             active:shadow-inner active:scale-95 transition-all duration-200"
            >
              <button>Delete</button>
              <Trash2Icon />
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <BudgetItem budget={budget} />
          <AddExpenses
            budgetId={id}
            user={user}
            refreshData={() => getBudgetInfo()}
          />
        </div>
        <h1 className="text-2xl bg-gradient-to-r from-[#00BCC6] to-[#0097B2] text-transparent bg-clip-text sm:text-3xl font-extrabold tracking-wide">
          Latest Expenses
        </h1>
        <div className=" bg-red-50">
          <ExpensesTableList
            expenses={expenses}
            refreshData={() => getBudgetInfo()}
          />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </div>
  );
};

export default Expenses;
