// In-Memory Data Store for InfiMeet
// Designed with a clean interface so DB (e.g. Postgres, MongoDB) can be swapped easily.

class MeetingStore {
  constructor() {
    this.meetings = new Map(); // meetingId -> meeting object
    this.participants = new Map(); // meetingId -> Set/Map of active real participants
    this.sockets = new Map(); // socketId -> { meetingId, participantId }
  }

  // Meeting methods
  saveMeeting(meeting) {
    this.meetings.set(meeting.id, {
      ...meeting,
      createdAt: meeting.createdAt || new Date().toISOString(),
      demoEnabled: meeting.demoEnabled !== undefined ? meeting.demoEnabled : true,
    });
    if (!this.participants.has(meeting.id)) {
      this.participants.set(meeting.id, new Map());
    }
    return this.meetings.get(meeting.id);
  }

  getMeeting(id) {
    return this.meetings.get(id) || null;
  }

  updateMeeting(id, updates) {
    const meeting = this.meetings.get(id);
    if (!meeting) return null;
    const updated = { ...meeting, ...updates };
    this.meetings.set(id, updated);
    return updated;
  }

  // Participant methods
  addParticipant(meetingId, participant) {
    if (!this.participants.has(meetingId)) {
      this.participants.set(meetingId, new Map());
    }
    const meetingParticipants = this.participants.get(meetingId);
    meetingParticipants.set(participant.id, {
      ...participant,
      joinedAt: participant.joinedAt || new Date().toISOString(),
      isRealUser: true,
    });
    return Array.from(meetingParticipants.values());
  }

  removeParticipant(meetingId, participantId) {
    const meetingParticipants = this.participants.get(meetingId);
    if (meetingParticipants) {
      meetingParticipants.delete(participantId);
      return Array.from(meetingParticipants.values());
    }
    return [];
  }

  getRealParticipants(meetingId) {
    const meetingParticipants = this.participants.get(meetingId);
    return meetingParticipants ? Array.from(meetingParticipants.values()) : [];
  }

  // Socket mapping methods
  registerSocket(socketId, meetingId, participantId) {
    this.sockets.set(socketId, { meetingId, participantId });
  }

  getSocketInfo(socketId) {
    return this.sockets.get(socketId) || null;
  }

  removeSocket(socketId) {
    const info = this.sockets.get(socketId);
    this.sockets.delete(socketId);
    return info;
  }
}

export const store = new MeetingStore();
