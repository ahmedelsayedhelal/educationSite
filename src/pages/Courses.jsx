import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const fetchCourses = async () => {
  const { data } = await axios.get("http://educationtraining.runasp.net/api/Courses");
  return data;
};

const CoursesPage = () => {
  const [filters, setFilters] = useState({
    rating: null,
    category: null,
    maxPrice: 1000,
  });

  const [sortBy, setSortBy] = useState("latest"); // 🆕 حالة السورت

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  if (isLoading) return <p>Loading...</p>;

  // 🟢 الفلترة
  let filteredCourses = courses.filter((course) => {
    const byRating = filters.rating ? course.rating >= filters.rating : true;
    const byCategory = filters.category ? course.categoryName === filters.category : true;
    const byPrice = course.price <= filters.maxPrice;

    return byRating && byCategory && byPrice;
  });

  // 🟢 السورت
  filteredCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "lowToHigh":
        return a.price - b.price;
      case "highToLow":
        return b.price - a.price;
      case "topRated":
        return b.rating - a.rating;
      case "latest":
      default:
        return b.id - a.id; // 👈 اعتبرنا id هو الترتيب الأحدث
    }
  });

  return (
    <div className="flex bg-gray-50 min-h-screen p-6">
      {/* Sidebar للفلاتر */}
      <aside className="w-1/4 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-bold mb-4">Filter</h2>

        {/* Rating */}
        <h3 className="font-semibold mb-2">Rating</h3>
        {[5, 4, 3].map((r) => (
          <label key={r} className="block mb-1 text-gray-700">
            <input
              type="radio"
              name="rating"
              onChange={() => setFilters((f) => ({ ...f, rating: r }))}
              className="mr-2"
            />
            {r} Stars & up
          </label>
        ))}

        {/* Category */}
        <h3 className="font-semibold mt-4 mb-2">Category</h3>
        {["Frontend", "Backend", "Fullstack", "UX/UI Design"].map((cat) => (
          <label key={cat} className="block mb-1 text-gray-700">
            <input
              type="radio"
              name="category"
              onChange={() => setFilters((f) => ({ ...f, category: cat }))}
              className="mr-2"
            />
            {cat}
          </label>
        ))}

        {/* Price */}
        <h3 className="font-semibold mt-4 mb-2">Price</h3>
        <input
          type="range"
          min={0}
          max={1000}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))
          }
          className="w-full accent-blue-500"
        />
        <p className="text-gray-600 mt-1">Up to ${filters.maxPrice}</p>
      </aside>

      {/* الكورسات */}
      <main className="w-3/4 ml-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">All Development Courses</h1>
          <select
            className="border rounded-lg px-3 py-2 shadow-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)} // 🆕 تغيير السورت
          >
            <option value="latest">The latest</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="topRated">Top Rated</option>
          </select>
        </div>

        {/* Courses Grid */}
        <Link to="/CoureseDetails/id">

        <div className="grid grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border rounded-xl shadow hover:shadow-lg transition p-3"
            >

              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <span className="text-sm text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded">
                {course.categoryName}
              </span>
              <h2 className="font-bold text-lg mt-2">{course.title}</h2>
              <div className="flex items-center text-yellow-500 mt-1">
                ⭐ {course.rating}
              </div>
              <p className="text-gray-700 font-semibold mt-1">${course.price}</p>
            </div>
          ))}
        </div>
        </Link>
      </main>
    </div>
  );
};

export default CoursesPage;
