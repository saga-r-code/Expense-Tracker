"use client";
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { X } from "lucide-react";
import { Slide, toast, ToastContainer } from "react-toastify";
import React, { useState } from "react";

const CreateBudget = ({ refreshData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [defaultEmoji, setDefaultEmoji] = useState("😊");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [data, setData] = useState({
    name: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useUser();

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch("/api/budget/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          emoji: defaultEmoji,
          created_by: user?.primaryEmailAddress.emailAddress,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Budget created successfully");
        console.log("budget:-", responseData);
        refreshData();
        setIsDialogOpen(false);
        setData({
          name: "",
          amount: "",
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Failed to create the budget. Please try again."
        );
        toast.error(errorData.message);
      }
    } catch (error) {
      console.log("please check the error:-", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      toast.error(errorData.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="flex justify-between items-center flex-wrap gap-5">
        <h1 className="text-3xl font-extrabold tracking-wide">My Budgets</h1>
        <button
          onClick={handleDialog}
          className="bg-[#00BCC6] font-semibold tracking-wide hover:bg-[#00a3ac] text-white px-4 py-2 rounded-md"
        >
          + New Budget
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 ${
          isDialogOpen ? "block" : "hidden"
        }`}
        onClick={handleDialog}
      />
      <dialog
        open={isDialogOpen}
        className="fixed z-20 top-0 bottom-0 left-0 right-0 p-6 rounded-lg shadow-lg"
      >
        <div className="min-w-[280px] sm:min-w-[500px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Create New Budget</h2>
            <button
              onClick={handleDialog}
              className="text-gray-500 hover:text-gray-700"
            >
              <X scale={20} absoluteStrokeWidth={true} strokeWidth={3} />
            </button>
          </div>

          <div className="my-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenEmoji(!openEmoji);
              }}
              className={`text-2xl relative z-20 ${
                openEmoji ? "bg-slate-300" : ""
              } border border-[#00BCC6] rounded-md px-2 py-1`}
            >
              {defaultEmoji}
            </button>

            <div
              className={`fixed inset-0 bg-gray-800 bg-opacity-50 ${
                openEmoji ? "block" : "hidden"
              }`}
              onClick={(e) => e.stopPropagation()}
            />
            {openEmoji && (
              <div className="absolute -top-10 left-28 z-10">
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setDefaultEmoji(e.emoji);
                    setOpenEmoji(false);
                  }}
                />
              </div>
            )}
          </div>

          <form onSubmit={hanldeSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Budget Name
              </label>
              <input
                type="text"
                name="name"
                onChange={(e) => setData({ ...data, name: e.target.value })}
                value={data.name}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#00BCC6] focus:outline-none"
                placeholder="Enter budget name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                onChange={(e) => setData({ ...data, amount: e.target.value })}
                value={data.amount}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#00BCC6] focus:outline-none"
                placeholder="eg. ₹ 1000"
                required
              />
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
            <div className="flex justify-end gap-5">
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                disabled={!data.name || !data.amount || loading}
                type="submit"
                className="px-4 py-2 font-medium text-white bg-[#00BCC6] disabled:scale-100 rounded-md hover:bg-[#00a3ac] disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-95 transition-all duration-300"
              >
                {loading ? "Creating..." : "Create Budget"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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

export default CreateBudget;
