import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Video,
  Plus,
  Users,
  Shield,
  MonitorUp,
  MessageSquare,
  Zap,
  ArrowRight,
  Radio,
  Lock,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Home() {
  const [meetingCode, setMeetingCode] = useState('');
  const navigate = useNavigate();

  const handleJoinByCode = (e) => {
    e.preventDefault();
    if (meetingCode.trim()) {
      const cleanCode = meetingCode.trim().split('/').pop();
      navigate(`/meeting/${cleanCode}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 selection:bg-indigo-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col justify-center">
        {/* Top Status Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827] border border-[#1F2937] text-slate-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Enterprise Video Conferencing & Webinars</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Meet without limits.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Create secure video meetings, collaborate live, share your screen, and connect with your audience. Built for teams, creators, and webinars.
          </p>
        </div>

        {/* Main CTA Action Box */}
        <div className="mt-10 max-w-xl mx-auto w-full">
          <div className="p-3 rounded-xl bg-[#111827] border border-[#1F2937] shadow-xl flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/create"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-2.5 px-5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Create Meeting</span>
            </Link>

            <div className="text-xs text-slate-500 font-semibold px-1 hidden sm:block">OR</div>

            {/* Quick Join Input */}
            <form onSubmit={handleJoinByCode} className="w-full sm:w-auto flex-1 flex items-center gap-2">
              <input
                type="text"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                placeholder="Enter meeting ID or link"
                className="w-full bg-[#0B0F17] border border-[#374151] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition"
              />
              <button
                type="submit"
                disabled={!meetingCode.trim()}
                className="py-2 px-3.5 rounded-lg bg-[#1F2937] hover:bg-[#374151] disabled:opacity-40 text-slate-200 text-xs font-semibold border border-[#374151] transition"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-[#111827] border border-[#1F2937] hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 text-indigo-400 flex items-center justify-center mb-3">
              <Radio className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-semibold text-white mb-1.5">Live Webinars & Meetings</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Host high-definition video conferences and webinars with real-time participant tracking, host moderation, and interactive audience features.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#111827] border border-[#1F2937] hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 text-indigo-400 flex items-center justify-center mb-3">
              <MonitorUp className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-semibold text-white mb-1.5">Crystal HD Screen Sharing</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Share your entire screen, specific application windows, or browser tabs with zero latency using our optimized WebRTC infrastructure.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#111827] border border-[#1F2937] hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 text-indigo-400 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-semibold text-white mb-1.5">Private & Zero Passwords</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              No complicated passwords or downloads required. Connect instantly via your browser powered by our secure media server at meet.infispark.in.
            </p>
          </div>
        </div>

        {/* Demo Mode Banner */}
        <div className="mt-8 p-5 rounded-xl bg-[#111827] border border-[#1F2937] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulated Demo Mode Included</span>
            </div>
            <h3 className="text-sm font-bold text-white">
              Presentation Ready with 40 Simulated Active Attendees
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl">
              Experience an active webinar audience with 40 simulated realistic attendees. Toggle Demo Mode ON or OFF anytime during the meeting.
            </p>
          </div>
          <Link
            to="/create"
            className="shrink-0 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
          >
            Start Free Demo Meeting
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1F2937] py-5 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-300">InfiMeet</span>
            <span>— Enterprise Video Conferencing Platform</span>
          </div>
          <div className="text-slate-400">
            Powered by InfiSpark Infrastructure • <span className="font-mono text-indigo-400">meet.infispark.in</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
