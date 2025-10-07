// components/forms/CourseFormStep2.jsx
import React, { useState, useEffect } from "react";
import { checkInstructorExists } from "../Api/Instructorservices";

export default function CourseFormStep2({ formData, onChange }) {
  const [instructorStatus, setInstructorStatus] = useState(null); // 'exists', 'not_found', 'checking'

  // تحقق من الإنستراكتور لما يتغير الاسم
  useEffect(() => {
    const checkInstructor = async () => {
      if (formData.instructorName && formData.instructorName.length > 2) {
        setInstructorStatus('checking');

        const exists = await checkInstructorExists(formData.instructorName);

        if (exists) {
          setInstructorStatus('exists');
        } else {
          setInstructorStatus('not_found');
        }
      } else {
        setInstructorStatus(null);
      }
    };

    // تحقق بعد ما يوقف الكتابة لمدة نصف ثانية
    const timer = setTimeout(checkInstructor, 500);
    return () => clearTimeout(timer);
  }, [formData.instructorName]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Instructor Name</label>
        <input
          name="instructorName"
          value={formData.instructorName}
          onChange={onChange}
          placeholder="Enter instructor name"
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* رسالة حالة الإنستراكتور */}
        {instructorStatus === 'checking' && (
          <p className="mt-1 text-sm text-blue-600">🔍 Checking instructor...</p>
        )}
        {instructorStatus === 'exists' && (
          <p className="mt-1 text-sm text-green-600">✅ Instructor exists</p>
        )}
        {instructorStatus === 'not_found' && (
          <p className="mt-1 text-sm text-amber-600">⚠️ Instructor not found</p>
        )}
      </div>

      {/* باقي الحقول كما هي */}
      <div>
        <label className="block font-semibold mb-1">Rating (0-4)</label>
        <input
          name="rating"
          type="number"
          step="1"
          min="0"
          max="4"
          value={formData.rating}
          onChange={onChange}
          placeholder="0.0 - 4.0"
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Number of Lectures</label>
        <input
          name="lecture"
          type="number"
          min="1"
          max="1000"
          value={formData.lecture}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Level</label>
        <select
          name="level"
          value={formData.level}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value={0}>AllLevels</option>
          <option value={1}>Beginner</option>
          <option value={2}>Intermediate</option>
          <option value={3}>Advanced</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Image URL</label>
        <input
          name="image"
          value={formData.image}
          onChange={onChange}
          placeholder="Enter image URL (optional)"
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Enter course description"
          rows={3}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );
}