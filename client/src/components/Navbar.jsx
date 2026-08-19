import React from 'react';
import { Link } from 'react-router-dom';
import { Video, ShieldCheck, Plus, Users } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0B0F17] border-b border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Video className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-white">
              InfiMeet
            </span>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#1F2937] text-indigo-400 border border-[#374151]">
              Enterprise
            </span>
          </div>
        </Link>

        {/* Center / Right Links & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-400 px-3 py-1.5 rounded-md bg-[#111827] border border-[#1F2937]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>meet.infispark.in</span>
          </div>

          <Link
            to="/join"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white rounded-lg bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] transition"
          >
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>Join Meeting</span>
          </Link>

          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-lg bg-indigo-600 hover:bg-indigo-500 transition active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>New Meeting</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
