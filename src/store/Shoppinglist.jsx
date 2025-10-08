import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getcarttotalquantity, removeFromCart } from "../store/Cart/Cart.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CartContainer() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector(getcarttotalquantity);

  const { data: allCourses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get("https://educationtraining.runasp.net/api/Courses");
      return data;
    },
  });

  const coursesInCart = useMemo(() => {
    return allCourses.filter((course) => cartItems[course.id]);
  }, [allCourses, cartItems]);

  const totalPrice = coursesInCart.reduce((sum, course) => {
    return sum + (course.price || 0) * (cartItems[course.id] || 1);
  }, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>

        <p className="mt-2 text-gray-500">
          {totalQuantity} {totalQuantity === 1 ? "Course" : "Courses"} in cart
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200">
              {coursesInCart.length === 0 ? (
                <div className="flex items-center justify-center py-20 px-6">
                  <div className="text-center">
                    <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                    <p className="mt-1 text-sm text-gray-500">Added courses will appear here.</p>
                  </div>
                </div>
              ) : (
                <div className="divide-y">
                  {coursesInCart.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <p className="text-gray-500 text-sm">{course.instructorName}</p>
                          <p className="text-gray-700 mt-1">
                            Quantity: {cartItems[course.id]}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-gray-900 font-semibold mb-2">
                          ${(course.price * cartItems[course.id]).toFixed(2)}
                        </p>
                        <button
                          onClick={() => dispatch(removeFromCart(course.id))}
                          className="text-red-500 text-sm hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Order Summary */}
          <aside className="lg:col-span-1">
            <div className="rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="text-gray-900 font-medium">${totalPrice.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Tax (10%)</dt>
                  <dd className="text-gray-900 font-medium">
                    ${(totalPrice * 0.1).toFixed(2)}
                  </dd>
                </div>
                <div className="my-2 h-px bg-gray-200" />
                <div className="flex items-center justify-between">
                  <dt className="text-lg font-semibold text-gray-900">Total</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    ${(totalPrice * 1.1).toFixed(2)}
                  </dd>
                </div>
              </dl>

              <Link to="/Checkout">
                <button
                  type="button"
                  disabled={coursesInCart.length === 0}
                  className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-3 text-white transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
