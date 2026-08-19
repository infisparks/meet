import React from 'react';
import { Link } from 'react-router-dom';
import { Video, ShieldCheck, Sparkles, Plus, Users } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-navy-950/80 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Video className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
                InfiMeet
              </span>
              <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                PRO
              </span>
            </div>
          </div>
        </Link>

        {/* Center / Right Links & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-400 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>meet.infispark.in</span>
          </div>

          <Link
            to="/join"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 border border-slate-700/50 transition"
          >
            <Users className="w-4 h-4 text-indigo-400" />
            Join Meeting
          </Link>

          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Meeting</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
