
import mongoose, {Schema} from "mongoose";

const expenseSchema = new Schema(
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
      budget_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget",
        required: true,
      },
      created_at: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const Expense = mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
  
  export default Expense;