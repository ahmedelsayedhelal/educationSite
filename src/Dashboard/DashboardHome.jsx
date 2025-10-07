import React from "react";
import { User, Layers, BookOpen } from "lucide-react";
import StatCard from "./StateCard"
import DashboardCharts from "./DashboardCharts"

export default function DashboardHome() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <hr className="border-gray-200" />

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Instructors" value="60" icon={<User size={32} />} />
        <StatCard title="Categories" value="10" icon={<Layers size={32} />} />
        <StatCard title="Courses" value="36" icon={<BookOpen size={32} />} />
      </div>

      {/* Charts Section */}
      <DashboardCharts />
    </div>
  );
}
