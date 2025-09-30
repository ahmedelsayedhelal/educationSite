import React from "react";
import Courses from "../../hooks/Courses";
import { Link } from "react-router-dom";
import Stars from "../education/Stars";



const Course = () => {
  const { error, data, isLoading, isError } = Courses();

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

  // 🟢 أول 4 كورسات بس
  const displayedCourses = data.slice(0, 4);

  return (
    <div className="p-6">
      {/* العنوان + See All */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>

        <Link
            to="/Courses"
          className="text-blue-600 font-medium hover:underline"
        >
          See All
        </Link>
      </div>

      {/* الكروت */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedCourses.map((course) => {
          return (
            <div
              key={course.id}
              className="p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition cursor-pointer flex flex-col"
            >
              {/* الصورة */}
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              {/* الاسم */}
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {course.instructorName}
              </h2>
               
                 <h2 className="text-lg font-bold text-gray-800 mb-2">
                <Stars rating={course.rating} />
              </h2>

                
              {/* الوصف */}
              <p className="text-sm text-gray-600 flex-1">{course.description}</p>

              {/* السعر */}
              <p className="mt-3 text-blue-600 font-semibold text-lg">
                ${course.price}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Course;

