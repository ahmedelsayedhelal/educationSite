import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/Cart/Cart.js";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaStar,
  FaFacebookF,
  FaGithub,
  FaGoogle,
  FaTwitter,
  FaMicrosoft,
} from "react-icons/fa";
import InstructorImg from "../images/instructor.png";
import PlayIcon from "../icons/play.svg";
import ReviewIcon from "../icons/review.svg";
import StudentIcon from "../icons/student.svg";

const fetchCourseById = async (id) => {
  const { data } = await axios.get(`https://educationtraining.runasp.net/api/Courses/${id}`);
  return data;
};

const fetchAllCourses = async () => {
  const { data } = await axios.get("https://educationtraining.runasp.net/api/Courses");
  return data;
};

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const addedCourses = JSON.parse(localStorage.getItem("addedCourses")) || [];
    if (addedCourses.includes(id)) setIsAddedToCart(true);
  }, [id]);

  const isUserLoggedIn = () => !!localStorage.getItem("token");

  const handleAddToCart = () => {
    if (!isUserLoggedIn()) {
      toast.error("Please login to add courses to cart");
      navigate("/login");
      return;
    }

    const addedCourses = JSON.parse(localStorage.getItem("addedCourses")) || [];

    if (!addedCourses.includes(id)) {
      dispatch(addToCart(id));
      addedCourses.push(id);
      localStorage.setItem("addedCourses", JSON.stringify(addedCourses));
      setIsAddedToCart(true);
      toast.success("✅ Course added to cart!");
    } else {
      toast("This course is already in your cart 🛒");
    }
  };

  const handleBuyNow = () => {
    if (!isUserLoggedIn()) {
      toast.error("Please login to purchase courses");
      navigate("/login");
      return;
    }
    navigate("/Shoppinglist");
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["course", id],
    queryFn: () => fetchCourseById(id),
    enabled: !!id,
  });

  const { data: allCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchAllCourses,
  });

  if (!id) return <p>No course ID provided</p>;
  if (isLoading) return <p>Loading course details...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="text-gray-500 text-sm mb-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        &gt;{" "}
        <Link to="/courses" className="hover:underline">
          Courses
        </Link>{" "}
        &gt; <span className="text-gray-700">{data.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
          <div className="flex items-center mb-4 text-yellow-500">
            {Array.from({ length: data.rating }).map((_, i) => (
              <FaStar key={i} />
            ))}
            <span className="text-gray-500 ml-2">
              | {data.totalhours} Total Hours • {data.level}
            </span>
          </div>

          <p className="mb-2 text-gray-700">
            Created by{" "}
            <span className="font-semibold">{data.instructorName}</span>
          </p>
          <p className="inline-flex items-center gap-2 text-gray-500 mb-4">
            <span className="bg-gray-200 px-2 py-1 rounded">
              {data.categoryName}
            </span>
          </p>

          {/* Tabs */}
          <div className="border-b mb-4">
            {["description", "instructor", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 -mb-px font-medium border-b-2 ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="text-gray-700 space-y-4">
            {activeTab === "description" && (
              <>
                <h2 className="text-xl font-semibold mb-2">Course Description</h2>
                <p>{data.description}</p>
              </>
            )}

            {activeTab === "instructor" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Instructor</h2>
                <div className="flex items-center gap-4">
                  <img
                    src={InstructorImg}
                    alt={data.instructorName}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-semibold">{data.instructorName}</p>
                    <p className="text-gray-500">UX/UI Instructor</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Ahmed Helal is a professional UX/UI designer with years of
                  experience in the field. His teaching focuses on clarity and
                  hands-on design practices.
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Learner Reviews</h2>
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0 border p-4 rounded-lg shadow-md self-start">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <p className="text-2xl font-bold mb-4">${data.price}</p>

          <button
            onClick={handleAddToCart}
            disabled={isAddedToCart}
            className={`w-full py-2 rounded mb-2 transition ${
              isAddedToCart
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isAddedToCart ? "Added to Cart" : "Add To Cart"}
          </button>

          <button
            onClick={handleBuyNow}
            className="w-full border border-black py-2 rounded hover:bg-gray-100"
          >
            Buy Now
          </button>

          <div className="mt-6">
            <p className="font-semibold mb-2">Share</p>
            <div className="flex gap-3">
              <FaFacebookF className="cursor-pointer hover:text-blue-600" />
              <FaGithub className="cursor-pointer hover:text-gray-700" />
              <FaGoogle className="cursor-pointer hover:text-red-500" />
              <FaTwitter className="cursor-pointer hover:text-blue-400" />
              <FaMicrosoft className="cursor-pointer hover:text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* More Courses Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">More Courses Like This</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allCourses
            ?.filter((course) => course.id !== data.id)
            .slice(0, 4)
            .map((course) => (
              <div
                key={course.id}
                className="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition bg-white"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-base truncate">{course.title}</h3>
                  <p className="text-sm text-gray-500">By {course.instructorName}</p>
                  <div className="flex items-center text-yellow-500 text-sm">
                    {Array.from({ length: course.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-lg font-bold text-gray-900">${course.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
