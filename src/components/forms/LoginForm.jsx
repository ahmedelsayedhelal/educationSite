// components/forms/SigninForm.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import UseLogin from "../../hooks/UseLogin";
import { useNavigate } from "react-router-dom";

const signinSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const fieldBase =
  "h-12 rounded-xl border bg-white px-3 text-[15px] outline-none transition focus:ring-4 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-slate-400 focus:ring-slate-300/40";
const errorText = "mt-1 text-sm text-rose-600";

const getRedirectPathByRole = (role) => {
  switch (role) {
    case 'Admin':
      return '/dashboard'; 
    default:
      return '/'; 
  }
};

export default function SigninForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signinSchema),
  });

  const { mutate, isPending, isError, error, isSuccess } = UseLogin();

  const onSubmit = (values) => {
    console.log("📦 Login Form Values:", values);

    mutate(values, {
      onSuccess: (data) => {
        console.log("✅ Logged in successfully:", data);

        const userRole = localStorage.getItem("userRole");
        const redirectPath = getRedirectPathByRole(userRole);
   

        reset();
        navigate(redirectPath); // ✅ توجيه للصفحة المناسبة حسب الـ role
      },
      onError: (err) => {
        console.error("❌ Login failed:", err.message);
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("✅ Login success effect triggered. Checking role...");
      
      setTimeout(() => {
        const userRole = localStorage.getItem("userRole");
        const redirectPath = getRedirectPathByRole(userRole);
        
        navigate(redirectPath);
      }, 100);
    }
  }, [isSuccess, navigate]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(2,6,23,0.08)]"
    >
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 text-base font-semibold text-slate-900">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className={fieldBase}
          {...register("email")}
        />
        {errors.email && <p className={errorText}>{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="mt-6 flex flex-col">
        <label
          htmlFor="password"
          className="mb-2 text-base font-semibold text-slate-900"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          className={fieldBase}
          {...register("password")}
        />
        {errors.password && <p className={errorText}>{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending || isSubmitting}
        className="mt-6 inline-flex h-12 w-32 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
      >
        {isPending || isSubmitting ? "Signing..." : "Sign In"}
        <span aria-hidden className="text-lg">→</span>
      </button>

      {/* Error Message */}
      {isError && (
        <p className="mt-3 text-sm text-rose-600">
          ❌ {error?.message || "Login failed. Please try again."}
        </p>
      )}

      {/* Success Message */}
      {isSuccess && (
        <p className="mt-3 text-sm text-green-600">
          🎉 Login successful! Redirecting...
        </p>
      )}

    
    </form>
  );
}