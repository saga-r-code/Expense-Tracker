import Link from 'next/link';
import React from 'react'

const BudgetItem = ({budget}) => {
  // Calculate percentage spent
  const percentageSpent = Math.min((budget.totalSpend / budget.amount) * 100, 100);
  
  // Determine progress bar color based on percentage
  const getProgressColor = () => {
   const percentage = Math.min((budget.totalSpend / budget.amount) * 100, 100);
    if (percentage < 50) {
      return "bg-green-500";
    } else if (percentage < 80) {
      return "bg-yellow-500";
    } else {
      return "bg-red-500";
    }
  };

  // Calculate remaining amount
  const remainingAmount = budget.amount - (budget.totalSpend || 0);



  return (
    <div className="w-full ">
      
      <div
        key={budget._id}
        className="p-6 bg-white border  border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
      
        
        {/* Header section */}
        <Link href={`/dashboard/expenses/${budget._id}`}>
        <div className="flex items-center justify-between mb-6 relative">
          <div className="flex items-center gap-4">
            <span className="text-3xl bg-gradient-to-br from-white to-gray-50 border rounded-2xl w-14 h-14 flex items-center justify-center shadow-sm">
              {budget.emoji}
            </span>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{budget.name}</h3>
              <p className="text-sm text-gray-500">Budget Overview</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 mb-6">
          <div className="p-3  bg-blue-50 rounded-xl">
            <p className="text-xs text-blue-600 font-medium mb-1">Total Budget</p>
            <p className="text-lg font-bold text-gray-800">₹{budget.amount.toLocaleString()}</p>
          </div>
          <div className="p-3  bg-green-50 rounded-xl">
            <p className="text-xs text-green-600 font-medium mb-1">Remaining</p>
            <p className="text-lg font-bold text-gray-800">₹{remainingAmount.toLocaleString()}</p>
          </div>
          <div className="p-3  bg-purple-50 rounded-xl">
            <p className="text-xs text-purple-600 font-medium mb-1">Items</p>
            <p className="text-lg font-bold text-gray-800">{budget.totalItem || 0}</p>
          </div>
        </div>

        {/* Progress section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-600">Progress</p>
            <p className="text-sm font-semibold text-gray-800">
            ₹{(budget.totalSpend || 0).toLocaleString()} spent
            </p>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className={`${getProgressColor()} h-3 rounded-full transition-all duration-300 shadow-sm`}
                style={{
                  width: `${percentageSpent}%`,
                }}
              />
            </div>
            <p className="text-xs font-medium text-gray-500 my-3">
              {percentageSpent.toFixed(2)}% of budget used
            </p>
          </div>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default BudgetItem