import React from 'react';
import { Video, Users, Share2, Shield, Radio, Sparkles } from 'lucide-react';

export default function MeetingHeader({
  meetingTitle,
  totalActive = 0,
  demoEnabled = true,
  onToggleDemo,
  onOpenShare,
  onOpenParticipants,
  isParticipantPanelOpen,
}) {
  return (
    <header className="h-16 bg-navy-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between z-30 shrink-0 select-none">
      {/* Left: Brand & Meeting Title */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Video className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:inline font-bold text-base tracking-tight text-white">
            InfiMeet
          </span>
        </div>

        <div className="h-4 w-px bg-slate-800 hidden sm:block shrink-0" />

        <div className="min-w-0 flex items-center gap-2">
          <h1 className="text-sm sm:text-base font-semibold text-slate-100 truncate max-w-[150px] sm:max-w-[280px] lg:max-w-[380px]" title={meetingTitle}>
            {meetingTitle || 'Marketing Webinar'}
          </h1>
          
          {/* Pulsing LIVE badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="text-[11px] uppercase tracking-wider">LIVE</span>
          </div>
        </div>
      </div>

      {/* Right Controls & Indicators */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Demo Mode Toggle Switch */}
        <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Demo Mode</span>
          </div>
          <button
            type="button"
            onClick={onToggleDemo}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              demoEnabled ? 'bg-indigo-600' : 'bg-slate-700'
            }`}
            title={demoEnabled ? 'Disable 40 simulated demo participants' : 'Enable 40 simulated demo participants'}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                demoEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
          {demoEnabled && (
            <span className="text-[10px] text-indigo-400 font-medium bg-indigo-500/10 px-1.5 py-0.5 rounded">
              +40 Simulated
            </span>
          )}
        </div>

        {/* Active Participant Count Badge (Clickable to toggle panel) */}
        <button
          onClick={onOpenParticipants}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition ${
            isParticipantPanelOpen
              ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 shadow-inner'
              : 'bg-slate-800/80 text-slate-200 hover:bg-slate-800 border-slate-700/60'
          }`}
          title="Toggle participants sidebar"
        >
          <Users className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold">{totalActive}</span>
          <span className="hidden sm:inline text-slate-400 text-xs">Active</span>
        </button>

        {/* Share Button */}
        <button
          onClick={onOpenShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-indigo-600/20 transition active:scale-95"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Invite</span>
        </button>
      </div>
    </header>
  );
}
