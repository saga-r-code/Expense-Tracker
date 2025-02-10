import React, { useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

const AddExpenses = ({ budgetId, user, refreshData }) => {
  const [data, setData] = useState({
    expenseName: "",
    expenseAmount: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(data.expenseAmount) || data.expenseAmount <= 0) {
      toast.warning("Please enter a valid expense amount.");
      return;
    }

    try {
      const response = await fetch("/api/expenses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          budget_id: budgetId,
          created_at: user?.primaryEmailAddress.emailAddress,
        }),
      });

      if (response.ok) {
        // const data = await response.json();
        toast.success("Expense added successfully");
        console.log("Expense added successfully");

        setTimeout(() => {
          refreshData();
          
        }, 1000)
      } else {
        toast.error("Failed to add expense");
        console.error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="relative">
      {/* <div className="absolute bg-gradient-to-r from-[#00BCC6] to-[#0097B2] p-20 blur-3xl w-full h-full -z-10"></div> */}
      <div className=" p-6 bg-white border border-gray-100  rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r from-[#00BCC6] to-[#0097B2] text-transparent bg-clip-text">Add Expenses</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="expenseName"
              className="text-sm font-medium text-gray-700"
            >
              Expense Name
            </label>
            <input
              type="text"
              id="expenseName"
              value={data.expenseName}
              required
              placeholder="e.g., Groceries"
              onChange={(e) =>
                setData({ ...data, expenseName: e.target.value })
              }
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00BCC6]"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="expenseAmount"
              className="text-sm font-medium text-gray-700"
            >
              Expense Amount
            </label>
            <input
              type="number"
              id="expenseAmount"
              value={data.expenseAmount}
              required
              placeholder="e.g., 2000"
              onChange={(e) =>
                setData({ ...data, expenseAmount: e.target.value })
              }
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00BCC6]"
            />
          </div>
          <button
            type="submit"
            disabled={!data.expenseName || !data.expenseAmount}
            className="w-full py-2 px-4 bg-[#00BCC6] text-white font-semibold rounded-md hover:bg-[#00a3ac] disabled:scale-100 disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-95 transition-all duration-300"
          >
            Add Expense
          </button>
        </form>
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

export default AddExpenses;
