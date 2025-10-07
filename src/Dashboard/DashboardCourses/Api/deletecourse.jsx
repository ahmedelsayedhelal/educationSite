import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";

export default function DeleteCourseModal({ isOpen, onClose, course }) {
  const queryClient = useQueryClient();

  const deleteCourse = useMutation({
    mutationFn: async () =>
      await axios.delete(`/api/Courses/${course.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
      onClose();
    },
  });

  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <Trash2 className="text-red-600" size={36} />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Are you sure you want to delete this course?
        </h2>
        <p className="text-gray-600 mb-6 font-medium">
          {course.title}
        </p>
        <div className="flex justify-center space-x-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button
            onClick={() => deleteCourse.mutate()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
