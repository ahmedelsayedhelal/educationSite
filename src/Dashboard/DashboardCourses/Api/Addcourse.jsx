import React, { useState, useEffect } from "react";
import CourseFormStep1 from "../forms/CourseFormStep1";
import CourseFormStep2 from "../forms/CourseFormStep2";
import axios from "axios";
import { checkInstructorExists } from "../Api/Instructorservices.js";



export default function CourseModal({ mode = "add", isOpen, onClose, course, onSaved }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    categoryName: "",
    price: "",
    rating: "",
    instructorName: "",
    image: "",
    description: "",
    lecture: 0,
    level: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (mode === "update" && course) {
        setFormData({
          title: course.title || "",
          categoryName: course.category?.name || course.categoryName || "",
          price: course.price || "",
          rating: course.rating || "",
          instructorName: course.instructorName || "",
          image: course.image || "",
          description: course.description || "",
          lecture: course.lecture || 0,
          level: course.level || 0,
        });
      } else {
        setFormData({
          title: "",
          categoryName: "",
          price: "",
          rating: "",
          instructorName: "",
          image: "",
          description: "",
          lecture: 0,
          level: 0,
        });
      }
      setStep(1);
    }
  }, [isOpen, mode, course]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1) {
      if (!formData.title.trim()) return alert("Title is required");
      if (!formData.categoryName) return alert("Category is required");
      if (!formData.price || Number(formData.price) < 0) return alert("Valid price is required");
    }
    setStep((s) => Math.min(s + 1, 2));
  };

  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

        const levelString = formData.level.toString();


    try {
      // 🔹 الـ payload يكون نفس الـ Add تماماً
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        image: formData.image.trim() || "string",
        lecture: Number(formData.lecture),
        level: levelString, 
        rating: Number(formData.rating) || 0,
        categoryName: formData.categoryName,        // 🔥 نرسل الاسم
        instructorName: formData.instructorName.trim(), // 🔥 نرسل الاسم
      };


      // 🔹 تحقق نهائي من الإنستراكتور
      const instructorExists = await checkInstructorExists(payload.instructorName);
      if (!instructorExists) {
        throw new Error(`Instructor "${payload.instructorName}" not found. Please check the name.`);
      }

      // 🔹 تحقق نهائي من البيانات
      if (!payload.title) throw new Error("Title is required");
      if (!payload.description) throw new Error("Description is required");
      if (!payload.categoryName) throw new Error("Category is required");
      if (!payload.instructorName) throw new Error("Instructor is required");
      if (payload.rating < 0 || payload.rating > 4) throw new Error("Rating must be between 0 and 4");
      if (payload.lecture < 1 || payload.lecture > 1000) throw new Error("Lectures must be between 1 and 1000");
      if (payload.price < 0 || payload.price > 10000) throw new Error("Price must be between 0 and 10000");

      let response;
      
      // 🔹 استخدم الـ API_BASE في كل الـ requests
      if (mode === "add") {
        response = await axios.post(`/api/Courses`, payload);
      } else if (mode === "update") {
        if (!course?.id) throw new Error("Course ID not found");
        // 🔥 الـ ID بيتم إرساله في الـ URL مش في الـ body
        response = await axios.put(`/api/Courses/${course.id}`, payload);
      }

      console.log(" Course saved:", response.data);
      onSaved();
      onClose();
      
    } catch (err) {
      
      
      const errorMessage = err.response?.data?.title?.[0] || 
                          err.response?.data?.message || 
                          err.message || 
                          "Error saving course";
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[500px] max-h-[90vh] overflow-y-auto shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {mode === "add" ? "Add New Course" : "Edit Course"}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <CourseFormStep1 formData={formData} onChange={handleChange} />
          ) : (
            <CourseFormStep2 formData={formData} onChange={handleChange} />
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                disabled={loading}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
              >
                Back
              </button>
            )}
            
            {step < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition ml-auto disabled:opacity-50"
              >
                {loading ? "Saving..." : mode === "add" ? "Add Course" : "Save Changes"}
              </button>
            )}
          </div>
        </form>

        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-xl disabled:opacity-50"
        >
          ✖
        </button>
      </div>
    </div>
  );
}