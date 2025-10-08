import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import DeleteCourseModal from "./Api/deletecourse";
import ViewCourseModal from "./Api/viewcourse";
import CourseModal from "./Api/Addcourse";
const fetchCourses = async () => {
  const { data } = await axios.get("https://educationtraining.runasp.net/api/Courses");
  return data;
};

const CoursesPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseMode, setCourseMode] = useState("add"); // "add" أو "update"

  const queryClient = useQueryClient();
  const refreshCourses = () => queryClient.invalidateQueries(["courses"]);

  const [filters, setFilters] = useState({ category: "All" });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500">
        Loading courses...
      </div>
    );

  // 🔹 الفلترة
  let filtered = courses.filter((course) => {
    const byCategory =
      filters.category === "All" || course.categoryName === filters.category;
    const bySearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return byCategory && bySearch;
  });

  // 🔹 الباجينيشن
  const totalPages = Math.ceil(filtered.length / coursesPerPage);
  const start = (currentPage - 1) * coursesPerPage;
  const paginated = filtered.slice(start, start + coursesPerPage);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setCourseMode("add");
              setIsCourseModalOpen(true);
              setSelectedCourse(null);
            }}
            className="bg-gray-900 text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-800 transition"
          >
            Add Course
          </button>
          <select
            className="bg-white border px-4 py-2 rounded-xl shadow-sm text-gray-700"
            value={filters.category}
            onChange={(e) =>
              setFilters((f) => ({ ...f, category: e.target.value }))
            }
          >
            <option>All</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Fullstack</option>
            <option>UX/UI Design</option>
          </select>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search for Courses"
              className="border pl-9 pr-3 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="p-2 border rounded-xl hover:bg-gray-100 transition">
            <SlidersHorizontal className="text-gray-600" size={18} />
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
                {course.categoryName}
              </span>
              <h2 className="font-bold text-lg mt-2 text-gray-800">{course.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                By {course.instructorName || "Unknown"}
              </p>
              <div className="flex items-center text-yellow-500 text-sm mt-2">
                ⭐ {course.rating || 4.5}
              </div>
              <p className="font-semibold text-gray-800 mt-2">${course.price}</p>

              {/* Actions */}
              <div className="flex items-center space-x-3 mt-4">
                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setIsCourseModalOpen(true);
                    setCourseMode("update");
                  }}
                  className="p-2 rounded-xl border hover:bg-green-50 transition"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setIsDeleteModalOpen(true);
                  }}
                  className="p-2 rounded-xl border hover:bg-red-50 transition"
                >
                  🗑️
                </button>
                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setIsViewOpen(true);
                  }}
                  className="p-2 rounded-xl border hover:bg-blue-50 transition"
                >
                  👁️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-xl border ${
              currentPage === i + 1
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* ✅ Modals */}
      <CourseModal
        mode={courseMode} // "add" أو "update"
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        course={selectedCourse}
        onSaved={refreshCourses}
      />

      <DeleteCourseModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        course={selectedCourse}
      />
      <ViewCourseModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        course={selectedCourse}
      />
    </div>
  );
};

export default CoursesPage;
