import React from "react";
import { User, Layers, BookOpen } from "lucide-react";
import StatCard from "./StateCard";
import DashboardCharts from "./DashboardCharts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "https://educationtraining.runasp.net/api", 
});

export default function DashboardHome() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardCounts"],
    queryFn: async () => {
      const [instructorsRes, categoriesRes, coursesRes] = await Promise.all([
        api.get("/Instructor"),
        api.get("/Categories"),
        api.get("/Courses"),
      ]);
      return {
        instructors: instructorsRes.data.length,
        categories: categoriesRes.data.length,
        courses: coursesRes.data.length,
      };
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading data...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">Failed to load data.</p>
      </div>
    );

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <hr className="border-gray-200" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Instructors"
          value={data.instructors}
          icon={<User size={32} />}
        />
        <StatCard
          title="Categories"
          value={data.categories}
          icon={<Layers size={32} />}
        />
        <StatCard
          title="Courses"
          value={data.courses}
          icon={<BookOpen size={32} />}
        />
      </div>

      <DashboardCharts />
    </div>
  );
}
