import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import Categories from "../../hooks/categories";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Category = () => {
  const { error, isLoading, isError, data } = Categories();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // 👈 4 عناصر بس في الصفحة

  if (isLoading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 font-semibold">
        {error.message}
      </div>
    );
}

  // حساب Pagination
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6">
      {/* العنوان + الأسهم */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* الكروت */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedData.map((cat) => {
          const IconComponent = FaIcons[cat.image] || FaIcons.FaQuestionCircle;
          return (
            <div
              key={cat.id}
              className="p-6 rounded-2xl shadow-md bg-white hover:shadow-lg transition flex flex-col items-center justify-center cursor-pointer"
            >
              {/* الأيقونة */}
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4">
                <IconComponent className="text-3xl text-blue-500" />
              </div>

              {/* الاسم + عدد الكورسات */}
              <p className="text-lg font-semibold text-gray-800">{cat.name}</p>
              <p className="text-sm font-medium text-gray-600">
                {cat.coursesCount} Courses
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
