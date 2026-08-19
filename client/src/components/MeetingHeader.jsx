import React from 'react';
import { Video, Users, Share2, Sparkles } from 'lucide-react';

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
    <header className="h-14 bg-[#0B0F17] border-b border-[#1F2937] px-4 sm:px-6 flex items-center justify-between z-30 shrink-0 select-none">
      {/* Left: Brand & Meeting Title */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-white">
            <Video className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline font-bold text-sm text-white">
            InfiMeet
          </span>
        </div>

        <div className="h-4 w-px bg-[#1F2937] hidden sm:block shrink-0" />

        <div className="min-w-0 flex items-center gap-2">
          <h1 className="text-xs sm:text-sm font-semibold text-slate-100 truncate max-w-[150px] sm:max-w-[280px] lg:max-w-[380px]" title={meetingTitle}>
            {meetingTitle || 'Marketing Webinar'}
          </h1>
          
          {/* Solid LIVE badge */}
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#111827] border border-[#1F2937] text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-400 uppercase tracking-wider">LIVE</span>
          </div>
        </div>
      </div>

      {/* Right Controls & Indicators */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Demo Mode Toggle Switch */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#111827] border border-[#1F2937]">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Demo Mode</span>
          </div>
          <button
            type="button"
            onClick={onToggleDemo}
            className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              demoEnabled ? 'bg-indigo-600' : 'bg-slate-700'
            }`}
            title={demoEnabled ? 'Disable 40 demo participants' : 'Enable 40 demo participants'}
          >
            <span
              className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white transition duration-200 ease-in-out ${
                demoEnabled ? 'translate-x-3' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Active Participant Count Badge */}
        <button
          onClick={onOpenParticipants}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition ${
            isParticipantPanelOpen
              ? 'bg-indigo-600 text-white border-indigo-500'
              : 'bg-[#111827] text-slate-200 hover:bg-[#1F2937] border-[#1F2937]'
          }`}
          title="Toggle participants sidebar"
        >
          <Users className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold">{totalActive}</span>
          <span className="hidden sm:inline text-slate-400">Active</span>
        </button>

        {/* Share Button */}
        <button
          onClick={onOpenShare}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition active:scale-98"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Invite</span>
        </button>
      </div>
    </header>
  );
}
