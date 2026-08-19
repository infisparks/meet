import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Users,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { getInitials, getAvatarColor } from '../utils/demoParticipants';

export default function PreJoinPreview({
  meetingTitle,
  hostName,
  totalActive = 0,
  initialName = '',
  onJoin,
  isJoining = false,
}) {
  const [userName, setUserName] = useState(initialName || '');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [nameError, setNameError] = useState('');

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // Initialize media stream for prejoin preview
  useEffect(() => {
    let active = true;

    async function startMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (err) {
        console.warn('Camera/Mic permission not granted or available:', err);
        setHasCameraPermission(false);
        setIsVideoMuted(true);
      }
    }

    startMedia();

    return () => {
      active = false;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleVideo = () => {
    if (mediaStreamRef.current) {
      const videoTrack = mediaStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoMuted(!videoTrack.enabled);
      }
    } else {
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const toggleAudio = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioMuted(!audioTrack.enabled);
      }
    } else {
      setIsAudioMuted(!isAudioMuted);
    }
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      setNameError('Please enter your name before joining');
      return;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    onJoin({
      name: userName.trim(),
      isAudioMuted,
      isVideoMuted,
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-4xl relative z-10">
        {/* Meeting Header Info */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-xs text-slate-300 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-emerald-400 uppercase tracking-wide text-[11px]">
              LIVE MEETING
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-medium">
              {totalActive} {totalActive === 1 ? 'participant' : 'participants'} active
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {meetingTitle || 'Marketing Webinar'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Hosted by <span className="text-slate-200 font-medium">{hostName || 'Host'}</span>
          </p>
        </div>

        {/* Main Prejoin Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Camera Preview Box */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#111827] border border-[#1F2937] shadow-xl flex items-center justify-center">
              {/* Local video stream */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover transform -scale-x-100 ${
                  isVideoMuted || !hasCameraPermission ? 'hidden' : 'block'
                }`}
              />

              {/* Avatar placeholder when camera is off */}
              {(isVideoMuted || !hasCameraPermission) && (
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`w-20 h-20 rounded-full ${getAvatarColor(
                      userName || 'Guest'
                    )} flex items-center justify-center text-white text-xl font-bold`}
                  >
                    {getInitials(userName || 'Guest')}
                  </div>
                  <span className="text-xs text-slate-400">
                    Camera is turned off
                  </span>
                </div>
              )}

              {/* Floating Camera / Mic Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-[#0B0F17]/90 px-3.5 py-1.5 rounded-xl border border-[#374151] shadow-md">
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`p-2 rounded-lg transition ${
                    isAudioMuted
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-[#1F2937] text-slate-200 hover:bg-[#374151]'
                  }`}
                  title={isAudioMuted ? 'Unmute' : 'Mute'}
                >
                  {isAudioMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={toggleVideo}
                  className={`p-2 rounded-lg transition ${
                    isVideoMuted
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-[#1F2937] text-slate-200 hover:bg-[#374151]'
                  }`}
                  title={isVideoMuted ? 'Turn on video' : 'Turn off video'}
                >
                  {isVideoMuted ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Hardware Status Hints */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
              <span>{isVideoMuted ? '● Video Off' : '● Video Ready'}</span>
              <span>{isAudioMuted ? '● Mic Muted' : '● Mic Active'}</span>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 shadow-xl">
              <h2 className="text-base font-bold text-white mb-1">
                Ready to join?
              </h2>
              <p className="text-xs text-slate-400 mb-5">
                Enter your name to proceed into the conference.
              </p>

              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      if (nameError) setNameError('');
                    }}
                    placeholder="Enter display name"
                    className="w-full bg-[#0B0F17] border border-[#374151] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
                    autoFocus
                  />
                  {nameError && (
                    <p className="text-xs text-rose-400 mt-1">{nameError}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isJoining}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition active:scale-98 disabled:opacity-50"
                  >
                    <span>{isJoining ? 'Connecting...' : 'Join Meeting Now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <div className="mt-5 pt-4 border-t border-[#1F2937] flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by InfiMeet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
