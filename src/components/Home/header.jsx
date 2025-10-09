import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getcarttotalquantity } from "../../store/Cart/Cart.js";
import { useCurrentUser } from "../../hooks/Usenav.js";
import axios from "axios";

const Header = () => {
  const totalQuantity = useSelector(getcarttotalquantity); 
  const { data: user, refetch } = useCurrentUser();

  const handleLogout = async () => {
    try {
      await axios.post("https://educationtraining.runasp.net/api/Account/logout", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
    } catch  {
      console.log("");
    } finally {
      localStorage.removeItem("token");
      
      refetch();
      
      window.location.href = "/";
    }
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
       <Link to="/"><div className="flex items-center gap-2">
          <span className="font-bold text-xl text-gray-800">Byway</span>
        </div></Link>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-6">
          <input
            type="text"
            placeholder="Search courses"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700">
          <Link to="/Courses" className="hover:text-blue-600">
            Courses
          </Link>
        </nav>

        {user ? (
          <div className="flex items-center gap-6">
            {/* Cart */}
            <Link
              to="/Shoppinglist"
              className="relative flex items-center gap-1 text-gray-700 hover:text-blue-600"
            >
              <FaShoppingCart size={20} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
              <span>Cart</span>
            </Link>

            {/* User Info */}
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Welcome, {user.username || user.email}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/Login">
              <button className="text-gray-700 hover:text-blue-600">
                Log In
              </button>
            </Link>
            <Link to="/Register">
              <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;