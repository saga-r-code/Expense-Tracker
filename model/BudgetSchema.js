import mongoose, { Schema, model } from "mongoose";

const budgetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    emoji: {
      type: String,
      required: true,
    },
    created_by: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);

export default Budget;
