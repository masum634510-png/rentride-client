"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20 px-4 bg-[var(--color-bg-dark)]">
      <div className="text-center relative z-10">
        <div className="text-7xl md:text-8xl mb-4 animate-[drive_2s_ease-in-out_infinite_alternate] inline-block">🚗</div>
        <div className="font-outfit text-8xl md:text-[10rem] font-black bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-500 bg-clip-text text-transparent leading-none mb-4 drop-shadow-xl">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-3">Oops! Road Ends Here</h1>
        <p className="text-[var(--color-text-muted)] max-w-[400px] mx-auto mb-8 text-base leading-relaxed">
          The page you're looking for has taken a wrong turn. Let's get you back on track!
        </p>
        <Link href="/" className="btn btn-primary btn-lg inline-flex shadow-[0_10px_30px_rgba(99,102,241,0.3)]">
          Back to Home 🏠
        </Link>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-[var(--color-bg-card)] border-t-2 border-[var(--color-border)] flex items-center justify-center gap-12 overflow-hidden">
        <div className="w-16 h-1.5 bg-amber-500/50 rounded-full animate-[roadMove_1s_linear_infinite]" />
        <div className="w-16 h-1.5 bg-amber-500/50 rounded-full animate-[roadMove_1s_linear_infinite] delay-[330ms]" />
        <div className="w-16 h-1.5 bg-amber-500/50 rounded-full animate-[roadMove_1s_linear_infinite] delay-[660ms]" />
      </div>

      <style jsx>{`
        @keyframes drive {
          from { transform: translateX(-20px) rotate(-5deg); }
          to { transform: translateX(20px) rotate(5deg); }
        }
        @keyframes roadMove {
          0% { transform: translateX(100px); }
          100% { transform: translateX(-200px); }
        }
      `}</style>
    </div>
  );
}
