import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import DashboaedHeader from "./DashboaedHeader";
import Footer from "../components/Home/Footer";
import CoursesPage from "./DashboardCourses/Couses";
import axios from "axios";

export default function DashboardLayout() {
  
  const handleLogout = async () => {
  try {
    await axios.post(
      "https://educationtraining.runasp.net/api/Account/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch {
    console.log("مشكلة في الـ API لكن هكمل اللوج آوت");
  } finally {
    localStorage.removeItem("token");
    window.location.href = "/login"; 
  }
};

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <DashboaedHeader />

      <div className="flex flex-1">
        <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-8 tracking-wide text-center border-b border-gray-700 pb-3">
              Dashboard
            </h2>

            <nav>
              <ul className="space-y-3">
                <li>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                      }`
                    }
                  >
                    🏠 Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/CoursesPage"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                      }`
                    }
                  >
                    📘 Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/InstructorsPage"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                      }`
                    }
                  >
                    👨‍🏫 Instructors
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 transition text-white py-2 px-4 rounded-lg w-full mt-8">
            Logout
          </button>
        </aside>

        <main className="flex-1 p-8 bg-gray-50">
          <Outlet />
        </main>

      </div>

      <Footer />


    </div>
  );
}
