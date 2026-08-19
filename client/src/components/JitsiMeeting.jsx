import React, { useRef } from 'react';
import { useJitsi } from '../hooks/useJitsi';
import { Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function JitsiMeeting({
  roomName,
  displayName,
  initialAudioMuted = false,
  initialVideoMuted = false,
  onJoined,
  onLeft,
  onParticipantJoined,
  onParticipantLeft,
  onAudioStatusChange,
  onVideoStatusChange,
  onScreenShareStatusChange,
  controlsRef,
}) {
  const containerRef = useRef(null);

  const {
    isLoaded,
    isJoined,
    isAudioMuted,
    isVideoMuted,
    isScreenSharing,
    error,
    toggleAudio,
    toggleVideo,
    toggleScreenShare,
    toggleChat,
    toggleRaiseHand,
    toggleTileView,
    hangup,
  } = useJitsi({
    containerRef,
    roomName,
    displayName,
    initialAudioMuted,
    initialVideoMuted,
    onJoined,
    onLeft,
    onParticipantJoined,
    onParticipantLeft,
    onAudioStatusChange,
    onVideoStatusChange,
    onScreenShareStatusChange,
  });

  // Expose methods to parent via ref if provided
  if (controlsRef) {
    controlsRef.current = {
      toggleAudio,
      toggleVideo,
      toggleScreenShare,
      toggleChat,
      toggleRaiseHand,
      toggleTileView,
      hangup,
      isAudioMuted,
      isVideoMuted,
      isScreenSharing,
    };
  }

  return (
    <div className="relative w-full h-full bg-[#0b0f19] flex items-center justify-center overflow-hidden">
      {/* Loading state indicator */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-navy-950/90 backdrop-blur-sm text-center p-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-4 animate-pulse">
            <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
          </div>
          <h3 className="text-base font-semibold text-white">
            Connecting to InfiMeet Engine...
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Bridging video stream with meet.infispark.in
          </p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-navy-950/95 text-center p-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mb-4 text-rose-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">
            Connection Interrupted
          </h3>
          <p className="text-xs text-rose-300 mt-1 max-w-md">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl text-white transition"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Custom InfiMeet Watermark / Brand Badge Overlay (fully covers default Jitsi watermark area) */}
      <div className="absolute top-0 left-0 z-10 flex items-center gap-2.5 px-4 py-3.5 rounded-br-2xl bg-[#0b0f19] border-b border-r border-slate-800/80 shadow-2xl pointer-events-none select-none min-w-[180px] min-h-[62px]">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/25 shrink-0">
          <ShieldCheck className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-extrabold tracking-tight text-white">InfiMeet</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/15 px-1.5 py-0.2 rounded border border-indigo-500/20">
              PRO
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">HD Encrypted Stream</p>
        </div>
      </div>

      {/* Jitsi Target DOM Element */}
      <div
        id="jitsi-container"
        ref={containerRef}
        className="w-full h-full rounded-xl overflow-hidden shadow-2xl"
      />
    </div>
  );
}
