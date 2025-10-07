// src/components/CheckoutContainer.jsx
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CheckoutContainer() {
  const cartItems = useSelector((state) => state.cart.items);

  // جلب الكورسات من الـ API
  const { data: allCourses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get("http://educationtraining.runasp.net/api/Courses");
      return data;
    },
  });

  // فلترة الكورسات اللي في الكارت
  const coursesInCart = useMemo(() => {
    return allCourses.filter((course) => cartItems[course.id]);
  }, [allCourses, cartItems]);

  // الحسابات
  const subtotal = coursesInCart.reduce(
    (sum, course) => sum + (course.price || 0) * (cartItems[course.id] || 1),
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <nav className="flex items-center gap-2">
            <span className="hover:text-gray-700 cursor-default">Details</span>
            <span>›</span>
            <span className="hover:text-gray-700 cursor-default">Shopping Cart</span>
            <span>›</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Checkout Page
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* ✅ Left: Billing + Payment */}
          <section className="lg:col-span-2 space-y-6">
            {/* Country / State */}
            <div className="rounded-xl border border-gray-200 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Country"
                    className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State/Union Territory
                  </label>
                  <input
                    type="text"
                    placeholder="Enter State"
                    className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-xl border border-gray-200">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment Method
                </h2>

                {/* Credit / Debit */}
                <div className="rounded-lg border border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between px-5 py-4">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pay"
                        defaultChecked
                        className="h-4 w-4 accent-gray-900"
                      />
                      <span className="text-gray-900 font-medium">
                        Credit/Debit Card
                      </span>
                    </label>
                    <div className="text-xs font-semibold text-gray-500">
                      VISA • MasterCard
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-gray-200 p-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name of Card
                      </label>
                      <input
                        type="text"
                        placeholder="Name of card"
                        className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          CVC/CVV
                        </label>
                        <input
                          type="text"
                          placeholder="CVC/CVV"
                          className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* PayPal */}
                <div className="mt-4 rounded-lg border border-gray-200">
                  <label className="flex items-center justify-between px-5 py-4">
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pay"
                        className="h-4 w-4 accent-gray-900"
                      />
                      <span className="text-gray-900 font-medium">PayPal</span>
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      PayPal
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* ✅ Right: Dynamic Order Summary */}
          <aside className="lg:col-span-1">
            <div className="rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Order Details
              </h2>

              {coursesInCart.length === 0 ? (
                <div className="mt-4 rounded-lg border border-dashed border-gray-300">
                  <div className="flex items-center justify-center px-4 py-10 text-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        No items in your order yet
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Added courses will appear here.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 divide-y border border-gray-100 rounded-lg">
                  {coursesInCart.map((course) => (
                    <div
                      key={course.id}
                      className="flex justify-between items-center px-4 py-2"
                    >
                      <span className="text-gray-700 text-sm">
                        {course.title}
                      </span>
                      <span className="font-medium text-gray-900 text-sm">
                        ${(course.price * cartItems[course.id]).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="text-gray-900 font-medium">
                    ${subtotal.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Tax (10%)</dt>
                  <dd className="text-gray-900 font-medium">
                    ${tax.toFixed(2)}
                  </dd>
                </div>
                <div className="my-2 h-px bg-gray-200" />
                <div className="flex items-center justify-between">
                  <dt className="text-lg font-semibold text-gray-900">Total</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    ${total.toFixed(2)}
                  </dd>
                </div>
              </dl>
              <Link to ="/purchase-complete">
              <button
                type="button"
                disabled={coursesInCart.length === 0}
                className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-3 text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Confirm Order
              </button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
