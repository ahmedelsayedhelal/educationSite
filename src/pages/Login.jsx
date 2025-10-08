// pages/SigninPage.jsx
import React from "react";
import LoginForm from "../components/forms/LoginForm";
export default function Login({
  rightImage = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
      {/* Left: Form */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-3xl">
          <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Sign in to your account
          </h1>

          <LoginForm />

          <div className="mx-1 my-8 flex max-w-2xl items-center gap-4 text-sm font-semibold text-slate-500">
            <span className="h-px flex-1 bg-slate-200" />
            <p className="whitespace-nowrap">Sign in with</p>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              <span className="h-4 w-4 rounded-full" style={{ background: "#1877F2" }} />
              Facebook
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              <span className="relative inline-block h-4 w-4">
                <span className="absolute left-0 top-0 h-2 w-2 rounded-tl-[7px]" style={{ background: "#4285F4" }} />
                <span className="absolute right-0 top-0 h-2 w-2 rounded-tr-[7px]" style={{ background: "#EA4335" }} />
                <span className="absolute bottom-0 left-0 h-2 w-2 rounded-bl-[7px]" style={{ background: "#FBBC05" }} />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-br-[7px]" style={{ background: "#34A853" }} />
              </span>
              Google
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              <span className="relative inline-block h-4 w-4">
                <span className="absolute left-0 top-0 h-3 w-3" style={{ background: "#F25022" }} />
                <span className="absolute right-0 top-0 h-3 w-3" style={{ background: "#7FBA00" }} />
                <span className="absolute bottom-0 left-0 h-3 w-3" style={{ background: "#00A4EF" }} />
                <span className="absolute bottom-0 right-0 h-3 w-3" style={{ background: "#FFB900" }} />
              </span>
              Microsoft
            </button>
          </div>
        </div>
      </div>

      {/* Right: Image */}
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src={rightImage}
          alt="Working on a laptop"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/10" />
      </div>
    </div>
  );
}
