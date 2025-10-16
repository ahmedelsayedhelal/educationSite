import React, { useEffect, useState } from "react";
import { getInstructors } from "./api";
import InstructorModal from "./InstructorModal";
import InstructorViewModal from "./InstructorViewModal";
import InstructorDeleteModal from "./InstructorDeleteModal";

const Instructor = () => {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [modalType, setModalType] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = async () => {
    const data = await getInstructors();
    setInstructors(data);
    setTotalItems(data.length);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (type, instructor = null) => {
    setSelectedInstructor(instructor);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedInstructor(null);
    setModalType(null);
    fetchData();
  };

  // Pagination
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInstructors = instructors.slice(startIndex, endIndex);

  const goToPage = (page) => setCurrentPage(page);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Instructors</h2>
        <button
          onClick={() => openModal("add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Add Instructor
        </button>
      </div>

      {/* Items per page + Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Show:</label>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>

        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
        </div>
      </div>

      {/* Table (Responsive scrollable) */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 font-semibold text-gray-700">Name</th>
              <th className="p-3 font-semibold text-gray-700">Job Title</th>
              <th className="p-3 font-semibold text-gray-700">Email</th>
              <th className="p-3 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentInstructors.map((ins) => (
              <tr key={ins.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3">{ins.name}</td>
                <td className="p-3">{ins.jobTitle}</td>
                <td className="p-3">{ins.email}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => openModal("view", ins)}
                    className="text-blue-500 hover:text-blue-700 transition"
                    title="View"
                  >
                    👁️
                  </button>
                  <button
                    onClick={() => openModal("edit", ins)}
                    className="text-green-600 hover:text-green-800 transition"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => openModal("delete", ins)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {instructors.length === 0 && (
          <div className="text-center py-8 text-gray-500">No instructors found</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border text-sm ${currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded border text-sm ${currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border text-sm ${currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {["add", "edit"].includes(modalType) && (
        <InstructorModal
          type={modalType}
          instructor={selectedInstructor}
          onClose={closeModal}
        />
      )}
      {modalType === "view" && (
        <InstructorViewModal instructor={selectedInstructor} onClose={closeModal} />
      )}
      {modalType === "delete" && (
        <InstructorDeleteModal instructor={selectedInstructor} onClose={closeModal} />
      )}
    </div>
  );
};

export default Instructor;
