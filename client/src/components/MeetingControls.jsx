import React from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MessageSquare,
  Users,
  Hand,
  LayoutGrid,
  Share2,
  PhoneOff,
  Settings
} from 'lucide-react';

export default function MeetingControls({
  isAudioMuted,
  isVideoMuted,
  isScreenSharing,
  isParticipantPanelOpen,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onToggleChat,
  onToggleParticipants,
  onToggleRaiseHand,
  onToggleTileView,
  onOpenShare,
  onLeaveMeeting,
  totalParticipants = 0,
}) {
  return (
    <footer className="h-20 bg-navy-900/95 backdrop-blur-lg border-t border-slate-800/80 px-4 sm:px-8 flex items-center justify-between z-30 shrink-0 select-none">
      {/* Left Group / Quick Status (Hidden on very small screens) */}
      <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-slate-400">meet.infispark.in</span>
      </div>

      {/* Center Main Controls Bar */}
      <div className="flex items-center gap-2 sm:gap-3 mx-auto">
        {/* Microphone Toggle */}
        <button
          onClick={onToggleAudio}
          className={`group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all active:scale-95 ${
            isAudioMuted
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
              : 'bg-slate-800/90 text-slate-100 hover:bg-slate-700/90 border border-slate-700/60'
          }`}
          title={isAudioMuted ? 'Unmute Microphone' : 'Mute Microphone'}
        >
          {isAudioMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-indigo-400" />}
          <span className="text-[9px] mt-0.5 font-medium text-slate-300">
            {isAudioMuted ? 'Unmute' : 'Mute'}
          </span>
        </button>

        {/* Video Camera Toggle */}
        <button
          onClick={onToggleVideo}
          className={`group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all active:scale-95 ${
            isVideoMuted
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
              : 'bg-slate-800/90 text-slate-100 hover:bg-slate-700/90 border border-slate-700/60'
          }`}
          title={isVideoMuted ? 'Start Camera' : 'Stop Camera'}
        >
          {isVideoMuted ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5 text-indigo-400" />}
          <span className="text-[9px] mt-0.5 font-medium text-slate-300">
            {isVideoMuted ? 'Start Video' : 'Stop Video'}
          </span>
        </button>

        {/* Screen Share Toggle */}
        <button
          onClick={onToggleScreenShare}
          className={`group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all active:scale-95 ${
            isScreenSharing
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400'
              : 'bg-slate-800/90 text-slate-100 hover:bg-slate-700/90 border border-slate-700/60'
          }`}
          title={isScreenSharing ? 'Stop Screen Sharing' : 'Share Screen'}
        >
          <MonitorUp className={`w-5 h-5 ${isScreenSharing ? 'text-white animate-bounce' : 'text-slate-300'}`} />
          <span className="text-[9px] mt-0.5 font-medium text-slate-300">
            {isScreenSharing ? 'Sharing' : 'Share'}
          </span>
        </button>

        <div className="h-6 w-px bg-slate-800 hidden sm:block mx-1" />

        {/* In-Meeting Chat Toggle */}
        <button
          onClick={onToggleChat}
          className="group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-slate-800/90 text-slate-100 hover:bg-slate-700/90 border border-slate-700/60 transition-all active:scale-95"
          title="Toggle In-Meeting Chat"
        >
          <MessageSquare className="w-5 h-5 text-slate-300 group-hover:text-indigo-300" />
          <span className="text-[9px] mt-0.5 font-medium text-slate-300">Chat</span>
        </button>

        {/* Raise Hand Toggle */}
        <button
          onClick={onToggleRaiseHand}
          className="hidden sm:flex group relative flex-col items-center justify-center w-12 h-12 rounded-xl bg-slate-800/90 text-slate-100 hover:bg-slate-700/90 border border-slate-700/60 transition-all active:scale-95"
          title="Raise or Lower Hand"
        >
          <Hand className="w-5 h-5 text-slate-300 group-hover:text-amber-400" />
          <span className="text-[9px] mt-0.5 font-medium text-slate-300">Raise Hand</span>
        </button>

        {/* Participants Sidebar Toggle */}
        <button
          onClick={onToggleParticipants}
          className={`group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all active:scale-95 ${
            isParticipantPanelOpen
              ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
              : 'bg-slate-800/90 text-slate-100 hover:bg-slate-700/90 border border-slate-700/60'
          }`}
          title="View Participants"
        >
          <div className="relative">
            <Users className="w-5 h-5 text-slate-300" />
            {totalParticipants > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-indigo-600 text-white rounded-full text-[9px] font-bold">
                {totalParticipants}
              </span>
            )}
          </div>
          <span className="text-[9px] mt-0.5 font-medium text-slate-300">People</span>
        </button>

        {/* Tile View Toggle */}
        <button
          onClick={onToggleTileView}
          className="hidden lg:flex group relative flex-col items-center justify-center w-12 h-12 rounded-xl bg-slate-800/90 text-slate-100 hover:bg-slate-700/90 border border-slate-700/60 transition-all active:scale-95"
          title="Toggle Grid / Speaker View"
        >
          <LayoutGrid className="w-5 h-5 text-slate-300 group-hover:text-indigo-300" />
          <span className="text-[9px] mt-0.5 font-medium text-slate-300">Grid</span>
        </button>
      </div>

      {/* Right Group: Share & Leave */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Share Invite Modal Button */}
        <button
          onClick={onOpenShare}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 text-xs font-semibold transition active:scale-95"
        >
          <Share2 className="w-4 h-4 text-indigo-400" />
          <span>Invite</span>
        </button>

        {/* Leave Meeting (Danger Red) */}
        <button
          onClick={onLeaveMeeting}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-rose-600/25 transition active:scale-95"
          title="Leave Meeting"
        >
          <PhoneOff className="w-4 h-4" />
          <span>Leave</span>
        </button>
      </div>
    </footer>
  );
}
