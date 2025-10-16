import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../../hooks/UseRegister";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    username: z
      .string()
      .min(3, "Min 3 characters")
      .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and digits"),
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number")
      .regex(/[^A-Za-z0-9]/, "Must include at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function SignupForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

  const { mutate, isPending, isSuccess, isError, error } = useRegister();

  const passwordValue = watch("password") || "";

  const onSubmit = (values) => {
    const userData = {
      Firstname: values.firstname,
      Lastname: values.lastname,
      username: values.username,
      Email: values.email,
      Password: values.password,
      Confirmpassword: values.confirmPassword,
    };

    mutate(userData, {
      onSuccess: () => {
        reset();
        navigate("/Login");
      },
    });
  };

  const errorMessage =
    error?.response?.data?.title ||
    error?.response?.data?.message ||
    error?.message ||
    null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(2,6,23,0.08)]"
      noValidate
    >
      {/* Full Name */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="firstname" className="mb-1 text-sm font-medium text-slate-700">
            First Name
          </label>
          <input
            id="firstname"
            placeholder="First Name"
            {...register("firstname")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:border-slate-500 focus:ring focus:ring-slate-200"
          />
          {errors.firstname && (
            <p className="mt-1 text-sm text-red-500">{errors.firstname.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastname" className="mb-1 text-sm font-medium text-slate-700">
            Last Name
          </label>
          <input
            id="lastname"
            placeholder="Last Name"
            {...register("lastname")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:border-slate-500 focus:ring focus:ring-slate-200"
          />
          {errors.lastname && (
            <p className="mt-1 text-sm text-red-500">{errors.lastname.message}</p>
          )}
        </div>
      </div>

      {/* Username */}
      <div className="mt-4 flex flex-col">
        <label htmlFor="username" className="mb-1 text-sm font-medium text-slate-700">
          Username
        </label>
        <input
          id="username"
          placeholder="Username"
          {...register("username")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:border-slate-500 focus:ring focus:ring-slate-200"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="mt-4 flex flex-col">
        <label htmlFor="email" className="mb-1 text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email ID"
          {...register("email")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:border-slate-500 focus:ring focus:ring-slate-200"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password + Confirm */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            {...register("password")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:border-slate-500 focus:ring focus:ring-slate-200"
          />

          {/* Password rules feedback */}
          {passwordValue && (
            <ul className="mt-2 text-xs space-y-1">
              <li
                className={`${
                  passwordValue.length >= 8 ? "text-green-600" : "text-gray-500"
                }`}
              >
                • At least 8 characters
              </li>
              <li
                className={`${
                  /[A-Z]/.test(passwordValue) ? "text-green-600" : "text-gray-500"
                }`}
              >
                • One uppercase letter
              </li>
              <li
                className={`${
                  /[a-z]/.test(passwordValue) ? "text-green-600" : "text-gray-500"
                }`}
              >
                • One lowercase letter
              </li>
              <li
                className={`${
                  /[0-9]/.test(passwordValue) ? "text-green-600" : "text-gray-500"
                }`}
              >
                • One number
              </li>
              <li
                className={`${
                  /[^A-Za-z0-9]/.test(passwordValue)
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                • One special character
              </li>
            </ul>
          )}

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="mb-1 text-sm font-medium text-slate-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:border-slate-500 focus:ring focus:ring-slate-200"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || isPending}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
      >
        {isSubmitting || isPending ? "Creating..." : "Create Account"}
        <span aria-hidden className="text-lg">→</span>
      </button>

      {/* Status messages */}
      {isSuccess && (
        <p className="mt-3 text-green-600">
          🎉 Account created successfully! Redirecting...
        </p>
      )}
      {isError && errorMessage && (
        <p className="mt-3 text-red-600">⚠️ {errorMessage}</p>
      )}
    </form>
  );
}
