// PurchaseComplete.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/Cart/Cart.js";

export default function PurchaseComplete() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
    localStorage.removeItem("addedCourses");
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <CheckCircle className="w-32 h-32 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Purchase Complete
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        You will receive a confirmation email soon!
      </p>
      <Link
        to="/"
        className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
