import React from "react";

const InstructorViewModal = ({ instructor, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    <div className="bg-white p-6 rounded-lg w-[400px]">
      <h2 className="text-xl font-bold mb-4">Instructor Details</h2>
      <img
        src={instructor.image}
        alt={instructor.name}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <p><b>Name:</b> {instructor.name}</p>
      <p><b>Email:</b> {instructor.email}</p>
      <p><b>Job Title:</b> {instructor.jobTitle}</p>
      <p><b>Bio:</b> {instructor.bio}</p>
      <div className="flex justify-end mt-4">
        <button onClick={onClose} className="px-3 py-1 bg-blue-600 text-white rounded">
          Close
        </button>
      </div>
    </div>
  </div>
);

export default InstructorViewModal;
