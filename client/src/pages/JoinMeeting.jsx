import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, ArrowRight, ShieldCheck, Sparkles, Users } from 'lucide-react';
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

    // Save name if provided
    if (name.trim()) {
      localStorage.setItem('infimeet_user_name', name.trim());
    }

    // Parse meeting ID
    const cleanId = meetingCode.trim().split('/').pop();
    navigate(`/meeting/${cleanId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-brand-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto w-full flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Join Existing Session</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Join InfiMeet Meeting
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enter the meeting ID or full invite link shared with you.
          </p>
        </div>

        <div className="bg-navy-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Meeting Code or Invite Link <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                placeholder="e.g. 3b2e8a... or http://localhost:5173/meeting/..."
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition font-mono"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Your Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition transform active:scale-98"
              >
                <span>Proceed to Room</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>meet.infispark.in</span>
          </div>
        </div>
      </main>
    </div>
  );
}
