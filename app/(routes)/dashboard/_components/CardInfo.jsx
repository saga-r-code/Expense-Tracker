import React, { useEffect } from "react";

const CardInfo = ({ budgets }) => {
  const [totalBudget, setTotalBudget] = React.useState(0);
  const [totalExpenses, setTotalExpenses] = React.useState(0);

  useEffect(() => {
    if (budgets) {
      // totalBudget_ is the sum of all budget amounts
      // it works by calling the reduce method on the budgets array
      // reduce takes a callback function that takes two arguments: the accumulator and the current value
      // the accumulator is the total sum of all the values so far, and the current value is the current element in the array
      // the callback function adds the current value to the accumulator and returns the new total
      // the reduce method returns the final total sum after going through all the elements in the array
      const totalBudget_ = budgets.reduce((acc, curr) => acc + curr.amount, 0);

      // totalExpenses_ is the sum of all the totalSpend values of each budget
      // works in the same way as above
      const totalExpenses_ = budgets.reduce(
        (acc, curr) => acc + curr.totalSpend,
        0
      );
      setTotalBudget(totalBudget_);
      setTotalExpenses(totalExpenses_);
    }
  }, [budgets]);

  const cards = [
    {
      title: "Total Budget",
      value: `₹${totalBudget.toLocaleString()}`,
      bgColor: "from-blue-400 to-blue-600",
      icon: "💰",
      description: "Available budget across all categories",
    },
    {
      title: "Total Expenses",
      value: `₹${totalExpenses.toLocaleString()}`,
      bgColor: "from-purple-400 to-purple-600",
      icon: "💳",
      description: "Total amount spent so far",
    },
    {
      title: "Total Categories",
      value: budgets.length,
      bgColor: "from-emerald-400 to-emerald-600",
      icon: "📊",
      description: "Number of budget categories",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`overflow-hidden bg-gradient-to-br ${card.bgColor} rounded-2xl py-4 px-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
        >
          <div className="">
            <div className="flex items-center justify-between my-4">
              <div className="space-y-2">
                <p className="text-white/90 text-sm font-medium">
                  {card.title}
                </p>
                <h3 className="text-white text-3xl font-bold tracking-tight">
                  {card.value}
                </h3>
                <p className="text-white/70 text-sm">{card.description}</p>
              </div>
              <span className="text-4xl bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                {card.icon}
              </span>
            </div>
          </div>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 bg-white/10 rounded-full blur-2xl transform rotate-45"></div>
        </div>
      ))}
    </div>
  );
};

export default CardInfo;
