import React from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MonitorOff,
  MessageSquare,
  Users,
  Hand,
  LayoutGrid,
  Share2,
  PhoneOff,
  Lock
} from 'lucide-react';

export default function MeetingControls({
  isAudioMuted,
  isVideoMuted,
  isScreenSharing,
  isParticipantPanelOpen,
  isHost = false,
  settings = {},
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
  const isScreenShareDisabled = settings.lockScreenShare && !isHost;
  const isAudioDisabled = settings.lockAudio && !isHost && isAudioMuted;

  return (
    <footer className="h-16 bg-[#0B0F17] border-t border-[#1F2937] px-4 sm:px-6 flex items-center justify-between z-30 shrink-0 select-none">
      {/* Left Quick Status */}
      <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="font-mono text-[11px] text-slate-400">meet.infispark.in</span>
        {isHost && (
          <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            Host
          </span>
        )}
      </div>

      {/* Center Main Controls Bar */}
      <div className="flex items-center gap-2 sm:gap-2.5 mx-auto">
        {/* Microphone Toggle */}
        <button
          onClick={() => {
            if (isAudioDisabled) {
              alert('Microphone is locked by the host.');
              return;
            }
            onToggleAudio();
          }}
          className={`flex flex-col items-center justify-center w-11 h-11 rounded-lg transition active:scale-95 ${
            isAudioMuted
              ? 'bg-rose-600/20 text-rose-400 border border-rose-600/40 hover:bg-rose-600/30'
              : 'bg-[#111827] text-slate-200 hover:bg-[#1F2937] border border-[#1F2937]'
          }`}
          title={isAudioDisabled ? 'Muted by Host' : isAudioMuted ? 'Unmute' : 'Mute'}
        >
          {isAudioMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-indigo-400" />}
          <span className="text-[9px] font-medium mt-0.5">
            {isAudioMuted ? 'Unmute' : 'Mute'}
          </span>
        </button>

        {/* Video Camera Toggle */}
        <button
          onClick={onToggleVideo}
          className={`flex flex-col items-center justify-center w-11 h-11 rounded-lg transition active:scale-95 ${
            isVideoMuted
              ? 'bg-rose-600/20 text-rose-400 border border-rose-600/40 hover:bg-rose-600/30'
              : 'bg-[#111827] text-slate-200 hover:bg-[#1F2937] border border-[#1F2937]'
          }`}
          title={isVideoMuted ? 'Start Video' : 'Stop Video'}
        >
          {isVideoMuted ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4 text-indigo-400" />}
          <span className="text-[9px] font-medium mt-0.5">
            {isVideoMuted ? 'Start' : 'Stop'}
          </span>
        </button>

        {/* Screen Share Toggle (Disabled if locked for non-hosts) */}
        <button
          onClick={() => {
            if (isScreenShareDisabled) {
              alert('Screen sharing is locked by the host.');
              return;
            }
            onToggleScreenShare();
          }}
          disabled={isScreenShareDisabled}
          className={`relative flex flex-col items-center justify-center w-11 h-11 rounded-lg transition active:scale-95 ${
            isScreenShareDisabled
              ? 'bg-[#0B0F17] text-slate-600 border border-[#1F2937] cursor-not-allowed opacity-60'
              : isScreenSharing
              ? 'bg-indigo-600 text-white border border-indigo-500'
              : 'bg-[#111827] text-slate-200 hover:bg-[#1F2937] border border-[#1F2937]'
          }`}
          title={isScreenShareDisabled ? 'Screen sharing is locked by the host' : isScreenSharing ? 'Stop Screen Share' : 'Share Screen'}
        >
          {isScreenShareDisabled ? (
            <MonitorOff className="w-4 h-4 text-slate-500" />
          ) : (
            <MonitorUp className="w-4 h-4" />
          )}
          <span className="text-[9px] font-medium mt-0.5">
            {isScreenShareDisabled ? 'Locked' : isScreenSharing ? 'Sharing' : 'Share'}
          </span>
        </button>

        <div className="h-5 w-px bg-[#1F2937] hidden sm:block mx-1" />

        {/* In-Meeting Chat Toggle */}
        <button
          onClick={onToggleChat}
          className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-[#111827] text-slate-200 hover:bg-[#1F2937] border border-[#1F2937] transition active:scale-95"
          title="In-Meeting Chat"
        >
          <MessageSquare className="w-4 h-4 text-slate-300" />
          <span className="text-[9px] font-medium mt-0.5">Chat</span>
        </button>

        {/* Raise Hand Toggle */}
        <button
          onClick={onToggleRaiseHand}
          className="hidden sm:flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-[#111827] text-slate-200 hover:bg-[#1F2937] border border-[#1F2937] transition active:scale-95"
          title="Raise Hand"
        >
          <Hand className="w-4 h-4 text-slate-300" />
          <span className="text-[9px] font-medium mt-0.5">Hand</span>
        </button>

        {/* Participants Sidebar Toggle */}
        <button
          onClick={onToggleParticipants}
          className={`flex flex-col items-center justify-center w-11 h-11 rounded-lg transition active:scale-95 ${
            isParticipantPanelOpen
              ? 'bg-indigo-600 text-white border border-indigo-500'
              : 'bg-[#111827] text-slate-200 hover:bg-[#1F2937] border border-[#1F2937]'
          }`}
          title="View Participants & Moderation"
        >
          <div className="relative">
            <Users className="w-4 h-4" />
            {totalParticipants > 0 && (
              <span className="absolute -top-1 -right-2 px-1 bg-indigo-500 text-white rounded-full text-[8px] font-bold">
                {totalParticipants}
              </span>
            )}
          </div>
          <span className="text-[9px] font-medium mt-0.5">People</span>
        </button>

        {/* Tile View Toggle */}
        <button
          onClick={onToggleTileView}
          className="hidden lg:flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-[#111827] text-slate-200 hover:bg-[#1F2937] border border-[#1F2937] transition active:scale-95"
          title="Toggle Grid View"
        >
          <LayoutGrid className="w-4 h-4 text-slate-300" />
          <span className="text-[9px] font-medium mt-0.5">Grid</span>
        </button>
      </div>

      {/* Right Group: Share & Leave */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenShare}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-slate-200 text-xs font-semibold transition active:scale-95"
        >
          <Share2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Invite</span>
        </button>

        {/* Leave Meeting (Solid Red) */}
        <button
          onClick={onLeaveMeeting}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition active:scale-95"
          title="Leave Meeting"
        >
          <PhoneOff className="w-3.5 h-3.5" />
          <span>Leave</span>
        </button>
      </div>
    </footer>
  );
}
