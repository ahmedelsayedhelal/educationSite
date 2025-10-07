import React from "react";

export default function CourseFormStep1({ formData, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Course Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Category</label>
        <select
          name="categoryName"
          value={formData.categoryName}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
           <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="Fullstack">Fullstack</option>
            <option value="UX/UI Design">UX/UI Design</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Price ($)</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
