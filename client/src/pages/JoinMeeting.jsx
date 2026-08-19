import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, ArrowRight, ShieldCheck, Users } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function JoinMeeting() {
  const [meetingCode, setMeetingCode] = useState('');
  const [name, setName] = useState(localStorage.getItem('infimeet_user_name') || '');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    if (!meetingCode.trim()) {
      setError('Please provide a meeting code or link');
      return;
    }

    if (name.trim()) {
      localStorage.setItem('infimeet_user_name', name.trim());
    }

    const cleanId = meetingCode.trim().split('/').pop();
    navigate(`/meeting/${cleanId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 selection:bg-indigo-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto w-full flex flex-col justify-center">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Join InfiMeet Session
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enter the meeting code or link shared with you.
          </p>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 shadow-xl">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Meeting Code or Invite Link <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                placeholder="e.g. 3b2e8a... or meeting link"
                className="w-full bg-[#0B0F17] border border-[#374151] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition font-mono"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Your Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name (e.g. Rahul Sharma)"
                className="w-full bg-[#0B0F17] border border-[#374151] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition active:scale-98"
              >
                <span>Proceed to Room</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-5 pt-4 border-t border-[#1F2937] flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>meet.infispark.in</span>
          </div>
        </div>
      </main>
    </div>
  );
}
