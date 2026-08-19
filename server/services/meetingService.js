import { v4 as uuidv4 } from 'uuid';
import { store } from '../data/store.js';
import { getDemoParticipants } from '../utils/demoParticipants.js';

const DEMO_ENABLED_DEFAULT = process.env.DEMO_PARTICIPANTS_ENABLED !== 'false';
const DEMO_COUNT = parseInt(process.env.DEMO_PARTICIPANTS_COUNT || '40', 10);

export const meetingService = {
  /**
   * Create a new meeting
   */
  createMeeting({ title, hostName, type = 'instant' }) {
    const meetingId = uuidv4();
    // Generate clean secure Jitsi room name (e.g. infimeet-8f92kd71-xxxx)
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const roomName = `infimeet-${randomSuffix}`;

    const hostParticipant = {
      id: uuidv4(),
      name: hostName || 'Host',
      role: 'host',
      joinedAt: new Date().toISOString(),
      isRealUser: true,
    };

    const newMeeting = {
      id: meetingId,
      roomName,
      title: title || 'InfiMeet Video Conference',
      hostName: hostName || 'Host',
      hostId: hostParticipant.id,
      type, // 'instant' | 'webinar' | 'team'
      demoEnabled: DEMO_ENABLED_DEFAULT,
      createdAt: new Date().toISOString(),
    };

    store.saveMeeting(newMeeting);
    store.addParticipant(meetingId, hostParticipant);

    return {
      ...newMeeting,
      hostParticipant,
      jitsiDomain: process.env.JITSI_DOMAIN || 'meet.infispark.in',
      jitsiUrl: process.env.JITSI_URL || 'https://meet.infispark.in',
    };
  },

  /**
   * Get meeting by ID
   */
  getMeeting(id) {
    const meeting = store.getMeeting(id);
    if (!meeting) return null;

    const participantsData = this.getParticipants(id);
    return {
      ...meeting,
      jitsiDomain: process.env.JITSI_DOMAIN || 'meet.infispark.in',
      jitsiUrl: process.env.JITSI_URL || 'https://meet.infispark.in',
      ...participantsData,
    };
  },

  /**
   * Join a participant to a meeting
   */
  joinMeeting(meetingId, { name, role = 'participant', participantId }) {
    const meeting = store.getMeeting(meetingId);
    if (!meeting) return null;

    const id = participantId || uuidv4();
    const isHost = meeting.hostName.toLowerCase() === (name || '').toLowerCase() || role === 'host';

    const participant = {
      id,
      name: name || 'Guest User',
      role: isHost ? 'host' : 'participant',
      joinedAt: new Date().toISOString(),
      isRealUser: true,
    };

    store.addParticipant(meetingId, participant);
    const participantsData = this.getParticipants(meetingId);

    return {
      meeting: {
        ...meeting,
        jitsiDomain: process.env.JITSI_DOMAIN || 'meet.infispark.in',
        jitsiUrl: process.env.JITSI_URL || 'https://meet.infispark.in',
      },
      participant,
      ...participantsData,
    };
  },

  /**
   * Remove a participant
   */
  leaveMeeting(meetingId, participantId) {
    store.removeParticipant(meetingId, participantId);
    return this.getParticipants(meetingId);
  },

  /**
   * Get all participants (Real + Demo) and counts
   */
  getParticipants(meetingId) {
    const meeting = store.getMeeting(meetingId);
    if (!meeting) return { realParticipants: [], demoParticipants: [], totalActive: 0 };

    const realParticipants = store.getRealParticipants(meetingId);
    const demoEnabled = meeting.demoEnabled;
    const demoParticipants = demoEnabled ? getDemoParticipants(DEMO_COUNT) : [];

    const totalActive = realParticipants.length + demoParticipants.length;

    return {
      realParticipants,
      demoParticipants,
      totalActive,
      demoEnabled,
    };
  },

  /**
   * Toggle demo mode for a meeting
   */
  toggleDemoMode(meetingId, enabled) {
    const meeting = store.getMeeting(meetingId);
    if (!meeting) return null;

    const newDemoState = enabled !== undefined ? Boolean(enabled) : !meeting.demoEnabled;
    store.updateMeeting(meetingId, { demoEnabled: newDemoState });

    return this.getParticipants(meetingId);
  },
};
