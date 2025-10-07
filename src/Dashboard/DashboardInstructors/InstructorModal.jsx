import React, { useState, useEffect } from "react";
import { addInstructor, updateInstructor } from "./api";

const InstructorModal = ({ type, instructor, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    image: "",
    jobTitle: "BackendDeveloper",
  });

  useEffect(() => {
    if (type === "edit" && instructor) {
      setFormData(instructor);
    }
  }, [type, instructor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "add") await addInstructor(formData);
    else await updateInstructor(instructor.id, formData);

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          {type === "add" ? "Add Instructor" : "Edit Instructor"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />

          <select
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4"
          >
            <option value="BackendDeveloper">BackendDeveloper</option>
            <option value="FrontendDeveloper">FrontendDeveloper</option>
            <option value="FullstackDeveloper">FullstackDeveloper</option>
            <option value="UIUXDesigner">UIUXDesigner</option>
          </select>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
              {type === "add" ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructorModal;
