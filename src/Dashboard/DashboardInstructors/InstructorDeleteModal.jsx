import React from "react";
import { deleteInstructor } from "./api";

const InstructorDeleteModal = ({ instructor, onClose }) => {
  const handleDelete = async () => {
    await deleteInstructor(instructor.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-[350px] text-center">
        <h2 className="text-lg font-bold mb-4">Delete Instructor</h2>
        <p>Are you sure you want to delete <b>{instructor.name}</b>?</p>
        <div className="flex justify-center gap-3 mt-5">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleDelete} className="px-3 py-1 bg-red-600 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorDeleteModal;
