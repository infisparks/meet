import { meetingService } from '../services/meetingService.js';
import { store } from '../data/store.js';

export function setupMeetingSocket(io) {
  const meetingNamespace = io.of('/meeting');

  meetingNamespace.on('connection', (socket) => {
    // Join meeting room
    socket.on('meeting:join', ({ meetingId, participantId, name, role }) => {
      if (!meetingId) return;

      socket.join(meetingId);
      store.registerSocket(socket.id, meetingId, participantId);

      // Add to store if not already added
      const joinResult = meetingService.joinMeeting(meetingId, { name, role, participantId });

      if (joinResult) {
        // Broadcast updated participant list to everyone in the room
        meetingNamespace.to(meetingId).emit('meeting:participants-updated', {
          realParticipants: joinResult.realParticipants,
          demoParticipants: joinResult.demoParticipants,
          totalActive: joinResult.totalActive,
          demoEnabled: joinResult.demoEnabled,
          latestJoined: joinResult.participant,
        });
      }
    });

    // Leave meeting
    socket.on('meeting:leave', ({ meetingId, participantId }) => {
      if (!meetingId || !participantId) return;

      socket.leave(meetingId);
      store.removeSocket(socket.id);

      const participantsData = meetingService.leaveMeeting(meetingId, participantId);
      meetingNamespace.to(meetingId).emit('meeting:participants-updated', participantsData);
    });

    // Toggle demo mode from client
    socket.on('meeting:toggle-demo', ({ meetingId, enabled }) => {
      if (!meetingId) return;

      const updatedData = meetingService.toggleDemoMode(meetingId, enabled);
      if (updatedData) {
        meetingNamespace.to(meetingId).emit('meeting:participants-updated', updatedData);
        meetingNamespace.to(meetingId).emit('meeting:demo-mode-updated', {
          demoEnabled: updatedData.demoEnabled,
          totalActive: updatedData.totalActive,
        });
      }
    });

    // Host moderation: Update settings (Screen share lock, Mute lock, etc.)
    socket.on('meeting:update-settings', ({ meetingId, settings }) => {
      if (!meetingId) return;
      const updatedSettings = meetingService.updateSettings(meetingId, settings);
      if (updatedSettings) {
        meetingNamespace.to(meetingId).emit('meeting:settings-updated', updatedSettings);
      }
    });

    // Host moderation: Mute everyone (Audio or Video)
    socket.on('meeting:mute-all', ({ meetingId, mediaType = 'audio' }) => {
      if (!meetingId) return;
      meetingNamespace.to(meetingId).emit('meeting:mute-all-command', { mediaType });
    });

    // Host moderation: Kick participant
    socket.on('meeting:kick-participant', ({ meetingId, participantId }) => {
      if (!meetingId || !participantId) return;
      const updatedParticipants = meetingService.leaveMeeting(meetingId, participantId);
      meetingNamespace.to(meetingId).emit('meeting:participants-updated', updatedParticipants);
      meetingNamespace.to(meetingId).emit('meeting:participant-kicked', { participantId });
    });

    // Broadcast in-room reaction / message / raise hand
    socket.on('meeting:reaction', ({ meetingId, participantName, reaction }) => {
      if (!meetingId) return;
      meetingNamespace.to(meetingId).emit('meeting:reaction-received', {
        participantName,
        reaction,
        timestamp: new Date().toISOString(),
      });
    });

    // Handle abrupt socket disconnection
    socket.on('disconnect', () => {
      const socketInfo = store.removeSocket(socket.id);
      if (socketInfo && socketInfo.meetingId && socketInfo.participantId) {
        const participantsData = meetingService.leaveMeeting(socketInfo.meetingId, socketInfo.participantId);
        meetingNamespace.to(socketInfo.meetingId).emit('meeting:participants-updated', participantsData);
      }
    });
  });

  return meetingNamespace;
}
