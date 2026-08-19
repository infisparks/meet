import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Video,
  Plus,
  Users,
  Shield,
  MonitorUp,
  MessageSquare,
  Sparkles,
  Zap,
  ArrowRight,
  Radio,
  Lock,
  Globe
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Home() {
  const [meetingCode, setMeetingCode] = useState('');
  const navigate = useNavigate();

  const handleJoinByCode = (e) => {
    e.preventDefault();
    if (meetingCode.trim()) {
      // Extract meeting ID if user pasted full URL
      const cleanCode = meetingCode.trim().split('/').pop();
      navigate(`/meeting/${cleanCode}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-brand-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col justify-center">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Next-Gen Video Meetings & Webinars Powered by Jitsi Engine</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Meet without <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-accent-blue bg-clip-text text-transparent">limits.</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Create secure video meetings, collaborate live, share your screen, and connect with your audience. Built for teams, creators, and webinars.
          </p>
        </div>

        {/* Main CTA Action Box */}
        <div className="mt-10 max-w-xl mx-auto w-full">
          <div className="p-3 sm:p-4 rounded-2xl bg-navy-900/90 backdrop-blur-md border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/create"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition transform active:scale-98"
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
                placeholder="Enter meeting code/link"
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
              />
              <button
                type="submit"
                disabled={!meetingCode.trim()}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Radio className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Live Webinars & Meetings</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Host high-definition video conferences and webinars with real-time participant tracking, host moderation, and interactive audience features.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800/80 hover:border-purple-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MonitorUp className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Crystal HD Screen Sharing</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Share your entire screen, specific application windows, or browser tabs with zero latency using our optimized WebRTC infrastructure.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Private & Zero Passwords</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              No complicated passwords or downloads required. Connect instantly via your browser powered by our secure media server at meet.infispark.in.
            </p>
          </div>
        </div>

        {/* Demo Mode Feature Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900/80 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Demo Simulation Included</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Webinar Presentation Ready (40+ Active Demo Participants)
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              Experience what an active webinar room looks like with 40 simulated realistic attendees. Toggle Demo Mode ON or OFF anytime during the meeting!
            </p>
          </div>
          <Link
            to="/create"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition"
          >
            Start Free Demo Meeting
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-slate-300">InfiMeet</span>
            <span>— Commercial Video Conferencing Platform</span>
          </div>
          <div className="text-slate-400">
            Powered by InfiSpark Media Infrastructure • <span className="font-mono text-indigo-400">meet.infispark.in</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
