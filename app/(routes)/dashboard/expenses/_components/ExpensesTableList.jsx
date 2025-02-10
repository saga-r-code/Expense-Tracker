import { Trash2 } from "lucide-react";
import React from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

const ExpensesTableList = ({ expenses, refreshData }) => {
  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`/api/expenses/deletebyid?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Expense deleted successfully");

        refreshData();
      } else {
        console.error("Failed to delete expense");
        toast.error("Failed to delete expense");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full overflow-x-auto bg-white  rounded-2xl shadow-lg">
      <table  className="w-full table-auto ">
        <thead>
          <tr className="bg-gray-50 border-b text-lg font-bold tracking-wide">
            <th className="px-6 py-4 text-left text-gray-700">Name</th>
            <th className="px-6 py-4 text-left text-gray-700">Amount</th>
            <th className="px-6 py-4 text-left text-gray-700">Date</th>
            <th className="px-6 py-4 text-right text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {expenses.map((expense) => (
            <tr
              key={expense._id}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="px-6 py-4">
                <div className="  text-gray-900">{expense.name}</div>
              </td>
              <td className="px-6 py-4">
                <div className="  text-[#00BCC6]">₹{expense.amount}</div>
              </td>
              <td className="px-6 py-4">
                <div className=" text-gray-600">
                  {new Date(expense.createdAt).toLocaleDateString("en-GB")}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  className="p-2 hover:bg-red-100 rounded-full transition-all duration-300 active:scale-95"
                  onClick={() => {
                    deleteExpense(expense._id);
                  }}
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {expenses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 ">No expenses added yet</p>
        </div>
      )}
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

export default ExpensesTableList;
