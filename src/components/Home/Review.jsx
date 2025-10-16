import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Review = () => {
  const Reviews = [
    {
      id: 1,
      text: "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.",
      name: "Mazen shera",
      position: "Designer"
    },
    {
      id: 2,
      text: "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.",
      name: "Shehap reda", 
      position: "Designer"
    },
    {
      id: 3,
      text: "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.",
      name: "Ahmed Hany", 
      position: "Designer"
    },
    {
      id: 4,
      text: "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.",
      name: "Ahmed Helal", 
      position: "Designer"
    },
    {
      id: 5,
      text: "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.",
      name: "Jane Doe", 
      position: "Designer"
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; 
  const totalPages = Math.ceil(Reviews.length / pageSize);

  const paginatedData = Reviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">What Our Students Say</h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paginatedData.map((e) => (
            <div key={e.id} className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{e.text}"
              </p>
              <div className="flex items-center">
                <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-gray-600 font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{e.name}</h4>
                  <p className="text-gray-500">{e.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;