
import React from 'react';
import SignupForm from '../components/forms/SignupForm';
import { useNavigate } from 'react-router-dom';
export default function Register({
  leftImage = 'https://img.uefa.com/imgml/TP/players/2014/2025/cutoff/63706.webp',
})

 { const navigate = useNavigate();
  const handlesuccess = () => {
    navigate('/Login');
  }


  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-50 lg:grid-cols-2">
      {/* Left: Image */}
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src={leftImage}
          alt="Welcome"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/10" />
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[780px]">
          <h1 className="mb-7 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Create Your Account
          </h1>

          {/* هنا حطينا الكمبوننت الجديد */}
          <SignupForm onsuccess={handlesuccess} />

          {/* باقي الجزء بتاع Social Buttons */}
          <div className="mx-1 my-7 flex items-center gap-4 text-sm font-semibold text-slate-500">
            <span className="h-px flex-1 bg-slate-200" />
            <p className="whitespace-nowrap">Sign up with</p>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-50">
              <span className="h-3.5 w-3.5 rounded-full" style={{ background: '#1877F2' }} />
              Facebook
            </button>

            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-50">
              <span className="relative inline-block h-3.5 w-3.5">
                <span className="absolute left-0 top-0 h-1.75 w-1.75 rounded-tl-[7px]" style={{ background: '#4285F4' }} />
                <span className="absolute right-0 top-0 h-1.75 w-1.75 rounded-tr-[7px]" style={{ background: '#EA4335' }} />
                <span className="absolute bottom-0 left-0 h-1.75 w-1.75 rounded-bl-[7px]" style={{ background: '#FBBC05' }} />
                <span className="absolute bottom-0 right-0 h-1.75 w-1.75 rounded-br-[7px]" style={{ background: '#34A853' }} />
              </span>
              Google
            </button>

            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-50">
              <span className="relative inline-block h-3.5 w-3.5">
                <span className="absolute left-0 top-0 h-3 w-3" style={{ background: '#F25022' }} />
                <span className="absolute right-0 top-0 h-3 w-3" style={{ background: '#7FBA00' }} />
                <span className="absolute bottom-0 left-0 h-3 w-3" style={{ background: '#00A4EF' }} />
                <span className="absolute bottom-0 right-0 h-3 w-3" style={{ background: '#FFB900' }} />
              </span>
              Microsoft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
