import React from "react";

export default function ViewCourseModal({ isOpen, onClose, course }) {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-[600px] rounded-2xl shadow-lg overflow-hidden relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✖
        </button>

        {/* Header Image */}
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-56 object-cover"
        />

        {/* Details */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{course.title}</h2>
          <p className="text-sm text-gray-500 mb-4">
            Category:{" "}
            <span className="text-blue-600 font-medium">
              {course.categoryName}
            </span>
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-600 text-sm">Instructor</p>
              <p className="font-semibold text-gray-800">
                {course.instructorName || "Unknown"}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Level</p>
              <p className="font-semibold text-gray-800">
                {course.level || "Beginner"}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Price</p>
              <p className="font-semibold text-gray-800">${course.price}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Rating</p>
              <p className="font-semibold text-yellow-500">⭐ {course.rating}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-600 text-sm mb-1">Description</p>
            <p className="text-gray-700 leading-relaxed">
              {course.description || "No description available."}
            </p>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
