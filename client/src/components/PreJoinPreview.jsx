import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Radio,
  Users,
  ShieldCheck,
  Sparkles,
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

  // Sync video mute toggle with stream
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

  // Sync audio mute toggle with stream
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

    // Stop local preview stream before passing control to Jitsi
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
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center px-4 py-12">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10">
        {/* Meeting Header Info */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 mb-3 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-semibold text-emerald-400 uppercase tracking-wide text-[11px]">
              LIVE MEETING
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-medium">
              👥 {totalActive} {totalActive === 1 ? 'participant' : 'participants'} active
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {meetingTitle || 'Marketing Webinar'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Hosted by <span className="text-indigo-300 font-semibold">{hostName || 'Host'}</span>
          </p>
        </div>

        {/* Main Prejoin Layout: Left Camera Preview, Right Details & Name Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Camera Preview Box */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-navy-900 border border-slate-800 shadow-2xl flex items-center justify-center group">
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
                    className={`w-24 h-24 rounded-full bg-gradient-to-tr ${getAvatarColor(
                      userName || 'Guest'
                    )} flex items-center justify-center text-white text-2xl font-bold shadow-xl`}
                  >
                    {getInitials(userName || 'Guest')}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    Camera is turned off
                  </span>
                </div>
              )}

              {/* Floating Camera / Mic Controls over Preview */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-navy-950/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-800/80 shadow-lg">
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`p-2.5 rounded-xl transition ${
                    isAudioMuted
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-slate-800 text-indigo-400 hover:bg-slate-700'
                  }`}
                  title={isAudioMuted ? 'Unmute' : 'Mute'}
                >
                  {isAudioMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <button
                  type="button"
                  onClick={toggleVideo}
                  className={`p-2.5 rounded-xl transition ${
                    isVideoMuted
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-slate-800 text-indigo-400 hover:bg-slate-700'
                  }`}
                  title={isVideoMuted ? 'Turn on video' : 'Turn off video'}
                >
                  {isVideoMuted ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
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
            <div className="bg-navy-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-1">
                Ready to jump in?
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Enter your display name to join the meeting room.
              </p>

              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Your Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      if (nameError) setNameError('');
                    }}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-950/80 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition"
                    autoFocus
                  />
                  {nameError && (
                    <p className="text-xs text-rose-400 mt-1.5">{nameError}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isJoining}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition transform active:scale-98 disabled:opacity-50"
                  >
                    <span>{isJoining ? 'Connecting...' : 'Join Meeting Now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Encrypted & Secured by InfiMeet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
