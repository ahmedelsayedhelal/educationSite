import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  { month: "Sep", deposits: 4000, withdrawals: 2400 },
  { month: "Oct", deposits: 3000, withdrawals: 1398 },
  { month: "Nov", deposits: 2000, withdrawals: 9800 },
  { month: "Dec", deposits: 2780, withdrawals: 3908 },
  { month: "Jan", deposits: 1890, withdrawals: 4800 },
];

const pieData = [
  { name: "Instructors", value: 60, color: "#4F46E5" },
  { name: "Categories", value: 20, color: "#60A5FA" },
  { name: "Courses", value: 20, color: "#93C5FD" },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Wallet Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Wallet</h2>
          <button className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
            This month
          </button>
        </div>

        <p className="text-3xl font-bold text-gray-900">$37.5K</p>
        <p className="text-green-600 text-sm font-medium mb-4">
          Wallet Balance ↑ +2.45%
        </p>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="deposits"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="withdrawals"
              stroke="#60A5FA"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={80}
              innerRadius={40}
              paddingAngle={3}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="flex justify-around mt-4 text-sm">
          {pieData.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-gray-700 font-medium">
                {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
