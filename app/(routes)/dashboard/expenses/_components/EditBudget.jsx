"use client";
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PencilIcon } from "lucide-react";
import { toast, ToastContainer, Slide } from "react-toastify";

const EditBudget = ({ budget, refreshData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [defaultEmoji, setDefaultEmoji] = useState("");
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

  useEffect(() => {
    if (budget) {
      setData({
        name: budget?.name,
        amount: budget?.amount,
      });
      setDefaultEmoji(budget?.emoji);
    }
  }, [budget]);

  const handleUpdateAndSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch(`/api/budget/update?id=${budget?._id}`, {
        method: "PUT",
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
        const data = await response.json();
        toast.info("Budget Updated successfully");
        console.log("budget:-", data);
        setLoading(true);
        setTimeout(() => {
          refreshData(); //for refreshing the data after creating a new budget and passing it to the parent
        }, 1000)
        setIsDialogOpen(false);
      } else {
        alert("Something went wrong");
        setErrorMessage("Failed to Update the budget. Please try again.");
      }
    } catch (error) {
      console.log("please check the error:-", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div
        className="flex gap-3 justify-center items-center bg-gradient-to-r from-[#00BCC6] to-[#0097B2] text-white px-3 py-2 rounded-md shadow-lg hover:bg-gradient-to-r hover:from-[#269ba1] hover:to-[#00a3ac] active:bg-gradient-to-r active:from-[#00BCC6] active:to-[#0097B2] 
              active:shadow-inner active:scale-95 transition-all duration-200"
        onClick={handleDialog}
      >
        <button>Edit</button>
        <PencilIcon />
      </div>

      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 ${
          isDialogOpen ? "block" : "hidden"
        }`}
        onClick={() => {
          handleDialog();
        }}
      />

      {/* Form */}
      <dialog
        open={isDialogOpen}
        className="fixed z-20 top-0 bottom-0 left-0 right-0 p-6 rounded-lg shadow-lg"
      >
        <div className="min-w-[280px] sm:min-w-[500px]">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Updated Budget</h2>

            <button
              onClick={handleDialog}
              className="text-gray-500 hover:text-gray-700"
            >
              <X scale={20} absoluteStrokeWidth={true} strokeWidth={3} />
            </button>
          </div>

          {/* Emoji */}
          <div className="my-3 ">
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
              className={`fixed inset-0 bg-gray-800 bg-opacity-50  ${
                openEmoji ? "block" : "hidden"
              }`}
              onClick={(e) => e.stopPropagation()}
            />
            {openEmoji && (
              <div className="absolute -top-10 left-28 z-10 ">
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setDefaultEmoji(e.emoji);
                    setOpenEmoji(false);
                  }}
                />
              </div>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={handleUpdateAndSubmit}
            className="flex flex-col gap-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Budget Name
              </label>
              <input
                type="text"
                name="name"
                onChange={(e) => setData({ ...data, name: e.target.value })}
                defaultValue={data.name}
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
                defaultValue={data.amount}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#00BCC6] focus:outline-none"
                placeholder="eg. ₹ 1000"
                required
              />
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
            <div className="flex justify-end gap-5 ">
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 t font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                disabled={!data.name || !data.amount || loading}
                type="submit"
                className="px-4 py-2 font-medium text-white bg-[#00BCC6] disabled:scale-100 rounded-md hover:bg-[#00a3ac] disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-95 transition-all duration-300"
              >
                {loading ? "Updating..." : "Update Budget"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
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

export default EditBudget;
