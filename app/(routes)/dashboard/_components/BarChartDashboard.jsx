import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-4 rounded-lg shadow-xl border border-[#0097B2]/20">
        <p className="font-semibold text-[#0097B2]">{label}</p>
        {payload.map((item, index) => (
          <p key={index} className="text-sm font-medium" style={{ color: item.color }}>
            {item.name}: ₹{item.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const BarChartDashboard = ({ budgets }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-[#0097B2]/10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#0097B2]">Budget Overview</h2>
        <div className="px-4 py-2 bg-[#0097B2]/10 rounded-lg">
          <span className="text-sm font-medium text-[#0097B2]">
            {new Date().getFullYear()}
          </span>
        </div>
      </div>
      
      <div className="w-full h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={budgets}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0097B2" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0097B2" stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00C9B7" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00C9B7" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#E5E7EB" 
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#64748B', fontWeight: 'bold'}}
              axisLine={{ stroke: '#E5E7EB'}}
            />
            <YAxis 
              tick={{ fill: '#64748B'}}
              axisLine={{ stroke: '#E5E7EB' }}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '30px',
                letterSpacing: '0.4px',
              }} 
            />
            <Bar 
              dataKey="amount" 
              fill="url(#budgetGradient)" 
              radius={[8, 8, 0, 0]}
              animationDuration={1500}
              name="Budget Amount"
              barSize={50}
            />
            <Bar 
              dataKey="totalSpend" 
              fill="url(#spendGradient)" 
              radius={[8, 8, 0, 0]}
              animationDuration={1500}
              name="Total Spent"
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartDashboard;
