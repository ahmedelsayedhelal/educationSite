import React from "react";

export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
      <div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-gray-500">{title}</p>
      </div>
      <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
        {icon}
      </div>
    </div>
  );
}
