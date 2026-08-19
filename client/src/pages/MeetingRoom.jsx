import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { getMeetingSocket, disconnectMeetingSocket } from '../services/socket';
import MeetingHeader from '../components/MeetingHeader';
import MeetingControls from '../components/MeetingControls';
import ParticipantPanel from '../components/ParticipantPanel';
import ShareMeetingModal from '../components/ShareMeetingModal';
import PreJoinPreview from '../components/PreJoinPreview';
import JitsiMeeting from '../components/JitsiMeeting';
import { Loader2, AlertCircle, Home as HomeIcon } from 'lucide-react';

export default function MeetingRoom() {
  const { meetingId } = useParams();
  const navigate = useNavigate();

  // Meeting states
  const [meeting, setMeeting] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // In-room status
  const [hasEnteredRoom, setHasEnteredRoom] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [initialMediaConfig, setInitialMediaConfig] = useState({
    isAudioMuted: false,
    isVideoMuted: false,
  });

  // Real-time participant state
  const [realParticipants, setRealParticipants] = useState([]);
  const [demoParticipants, setDemoParticipants] = useState([]);
  const [totalActive, setTotalActive] = useState(0);
  const [demoEnabled, setDemoEnabled] = useState(true);

  // UI state
  const [isParticipantPanelOpen, setIsParticipantPanelOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const controlsRef = useRef(null);

  // 1. Fetch meeting info on mount
  useEffect(() => {
    let isMounted = true;

    async function loadMeeting() {
      try {
        setIsLoading(true);
        const data = await api.getMeeting(meetingId);
        if (!isMounted) return;

        if (data.success && data.meeting) {
          setMeeting(data.meeting);
          setRealParticipants(data.meeting.realParticipants || []);
          setDemoParticipants(data.meeting.demoParticipants || []);
          setTotalActive(data.meeting.totalActive || 0);
          setDemoEnabled(data.meeting.demoEnabled !== false);
        } else {
          setFetchError('Meeting not found or has concluded.');
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching meeting:', err);
          setFetchError(err.message || 'Could not load meeting details.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadMeeting();

    return () => {
      isMounted = false;
    };
  }, [meetingId]);

  // 2. Setup Socket.IO connection once entered room
  useEffect(() => {
    if (!hasEnteredRoom || !currentUser || !meetingId) return;

    const socket = getMeetingSocket();
    if (!socket.connected) {
      socket.connect();
    }

    // Emit join event
    socket.emit('meeting:join', {
      meetingId,
      participantId: currentUser.id,
      name: currentUser.name,
      role: currentUser.role,
    });

    // Listen for participant updates
    socket.on('meeting:participants-updated', (data) => {
      if (data.realParticipants) setRealParticipants(data.realParticipants);
      if (data.demoParticipants) setDemoParticipants(data.demoParticipants);
      if (data.totalActive !== undefined) setTotalActive(data.totalActive);
      if (data.demoEnabled !== undefined) setDemoEnabled(data.demoEnabled);
    });

    socket.on('meeting:demo-mode-updated', (data) => {
      setDemoEnabled(data.demoEnabled);
      if (data.totalActive !== undefined) setTotalActive(data.totalActive);
    });

    return () => {
      socket.off('meeting:participants-updated');
      socket.off('meeting:demo-mode-updated');
    };
  }, [hasEnteredRoom, currentUser, meetingId]);

  // Handle Join from PreJoin Preview
  const handleJoinRoom = async ({ name, isAudioMuted: audioMuted, isVideoMuted: videoMuted }) => {
    try {
      const storedRole = localStorage.getItem('infimeet_user_role') || 'participant';
      const response = await api.joinMeeting(meetingId, {
        name,
        role: storedRole,
      });

      if (response.success) {
        setCurrentUser(response.participant);
        setRealParticipants(response.realParticipants || []);
        setDemoParticipants(response.demoParticipants || []);
        setTotalActive(response.totalActive || 0);
        setDemoEnabled(response.demoEnabled !== false);

        setInitialMediaConfig({
          isAudioMuted: audioMuted,
          isVideoMuted: videoMuted,
        });
        setIsAudioMuted(audioMuted);
        setIsVideoMuted(videoMuted);

        setHasEnteredRoom(true);
      }
    } catch (err) {
      console.error('Failed to join room:', err);
      alert('Failed to connect to the meeting. Please try again.');
    }
  };

  // Toggle Demo Mode
  const handleToggleDemoMode = async () => {
    try {
      const nextState = !demoEnabled;
      const socket = getMeetingSocket();
      socket.emit('meeting:toggle-demo', {
        meetingId,
        enabled: nextState,
      });
      // Optimistic update
      setDemoEnabled(nextState);
    } catch (err) {
      console.error('Error toggling demo mode:', err);
    }
  };

  // Leave Meeting
  const handleLeaveMeeting = async () => {
    if (window.confirm('Are you sure you want to leave this meeting?')) {
      try {
        if (currentUser) {
          const socket = getMeetingSocket();
          socket.emit('meeting:leave', {
            meetingId,
            participantId: currentUser.id,
          });
          await api.leaveMeeting(meetingId, currentUser.id);
        }
      } catch (err) {
        console.warn('Error during leave API call:', err);
      } finally {
        disconnectMeetingSocket();
        navigate('/');
      }
    }
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-300">Loading meeting room...</p>
      </div>
    );
  }

  // Error / Meeting Not Found Screen
  if (fetchError || !meeting) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4 text-rose-400">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-100 mb-2">Meeting Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6">
          {fetchError || "The meeting link you followed is invalid or has expired."}
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition"
        >
          <HomeIcon className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>
    );
  }

  // Pre-join Preview Stage
  if (!hasEnteredRoom) {
    return (
      <PreJoinPreview
        meetingTitle={meeting.title}
        hostName={meeting.hostName}
        totalActive={totalActive}
        initialName={localStorage.getItem('infimeet_user_name') || ''}
        onJoin={handleJoinRoom}
      />
    );
  }

  // Active Meeting Room UI
  return (
    <div className="h-screen w-screen flex flex-col bg-navy-950 text-slate-100 overflow-hidden select-none">
      {/* 1. Meeting Top Header */}
      <MeetingHeader
        meetingTitle={meeting.title}
        totalActive={totalActive}
        demoEnabled={demoEnabled}
        onToggleDemo={handleToggleDemoMode}
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenParticipants={() => setIsParticipantPanelOpen(!isParticipantPanelOpen)}
        isParticipantPanelOpen={isParticipantPanelOpen}
      />

      {/* 2. Main Middle Workspace: Video Feed + Collapsible Drawer */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Jitsi Video Canvas */}
        <div className="flex-1 h-full bg-[#070b14] relative overflow-hidden">
          <JitsiMeeting
            roomName={meeting.roomName}
            displayName={currentUser?.name || 'InfiMeet User'}
            initialAudioMuted={initialMediaConfig.isAudioMuted}
            initialVideoMuted={initialMediaConfig.isVideoMuted}
            controlsRef={controlsRef}
            onAudioStatusChange={(muted) => setIsAudioMuted(muted)}
            onVideoStatusChange={(muted) => setIsVideoMuted(muted)}
            onScreenShareStatusChange={(sharing) => setIsScreenSharing(sharing)}
            onLeft={handleLeaveMeeting}
          />
        </div>

        {/* Participant Panel Sidebar/Drawer */}
        {isParticipantPanelOpen && (
          <ParticipantPanel
            isOpen={isParticipantPanelOpen}
            onClose={() => setIsParticipantPanelOpen(false)}
            realParticipants={realParticipants}
            demoParticipants={demoParticipants}
            totalActive={totalActive}
            demoEnabled={demoEnabled}
            currentUserId={currentUser?.id}
            onOpenShare={() => setIsShareModalOpen(true)}
          />
        )}
      </div>

      {/* 3. Bottom Controls Bar */}
      <MeetingControls
        isAudioMuted={isAudioMuted}
        isVideoMuted={isVideoMuted}
        isScreenSharing={isScreenSharing}
        isParticipantPanelOpen={isParticipantPanelOpen}
        totalParticipants={totalActive}
        onToggleAudio={() => controlsRef.current?.toggleAudio()}
        onToggleVideo={() => controlsRef.current?.toggleVideo()}
        onToggleScreenShare={() => controlsRef.current?.toggleScreenShare()}
        onToggleChat={() => controlsRef.current?.toggleChat()}
        onToggleRaiseHand={() => controlsRef.current?.toggleRaiseHand()}
        onToggleTileView={() => controlsRef.current?.toggleTileView()}
        onToggleParticipants={() => setIsParticipantPanelOpen(!isParticipantPanelOpen)}
        onOpenShare={() => setIsShareModalOpen(true)}
        onLeaveMeeting={handleLeaveMeeting}
      />

      {/* 4. Share Meeting Invite Modal */}
      <ShareMeetingModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        meetingId={meeting.id}
        meetingTitle={meeting.title}
        hostName={meeting.hostName}
      />
    </div>
  );
}
