import express from 'express';
import { meetingService } from '../services/meetingService.js';

export function createMeetingRouter(io) {
  const router = express.Router();

  /**
   * POST /api/meetings
   * Create a new meeting room
   */
  router.post('/', (req, res) => {
    try {
      const { title, hostName, type } = req.body;
      if (!hostName || hostName.trim() === '') {
        return res.status(400).json({ error: 'Host name is required' });
      }

      const meeting = meetingService.createMeeting({
        title: title?.trim() || 'InfiMeet Video Conference',
        hostName: hostName.trim(),
        type: type || 'instant',
      });

      return res.status(201).json({
        success: true,
        meeting,
      });
    } catch (err) {
      console.error('Error creating meeting:', err);
      return res.status(500).json({ error: 'Failed to create meeting' });
    }
  });

  /**
   * GET /api/meetings/:id
   * Get meeting details and active participant stats
   */
  router.get('/:id', (req, res) => {
    try {
      const { id } = req.params;
      const meeting = meetingService.getMeeting(id);

      if (!meeting) {
        return res.status(404).json({ error: 'Meeting not found' });
      }

      return res.json({
        success: true,
        meeting,
      });
    } catch (err) {
      console.error('Error fetching meeting:', err);
      return res.status(500).json({ error: 'Failed to fetch meeting' });
    }
  });

  /**
   * POST /api/meetings/:id/join
   * Register a user joining the meeting
   */
  router.post('/:id/join', (req, res) => {
    try {
      const { id } = req.params;
      const { name, role, participantId } = req.body;

      if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Participant name is required' });
      }

      const joinResult = meetingService.joinMeeting(id, {
        name: name.trim(),
        role: role || 'participant',
        participantId,
      });

      if (!joinResult) {
        return res.status(404).json({ error: 'Meeting not found' });
      }

      // Notify socket clients
      if (io) {
        io.of('/meeting').to(id).emit('meeting:participants-updated', {
          realParticipants: joinResult.realParticipants,
          demoParticipants: joinResult.demoParticipants,
          totalActive: joinResult.totalActive,
          demoEnabled: joinResult.demoEnabled,
          latestJoined: joinResult.participant,
        });
      }

      return res.json({
        success: true,
        ...joinResult,
      });
    } catch (err) {
      console.error('Error joining meeting:', err);
      return res.status(500).json({ error: 'Failed to join meeting' });
    }
  });

  /**
   * POST /api/meetings/:id/leave
   * Handle user leaving
   */
  router.post('/:id/leave', (req, res) => {
    try {
      const { id } = req.params;
      const { participantId } = req.body;

      if (!participantId) {
        return res.status(400).json({ error: 'Participant ID is required' });
      }

      const participantsData = meetingService.leaveMeeting(id, participantId);

      // Notify socket clients
      if (io) {
        io.of('/meeting').to(id).emit('meeting:participants-updated', participantsData);
      }

      return res.json({
        success: true,
        ...participantsData,
      });
    } catch (err) {
      console.error('Error leaving meeting:', err);
      return res.status(500).json({ error: 'Failed to process leave request' });
    }
  });

  /**
   * GET /api/meetings/:id/participants
   * Return real + demo participants list and total count
   */
  router.get('/:id/participants', (req, res) => {
    try {
      const { id } = req.params;
      const participantsData = meetingService.getParticipants(id);

      return res.json({
        success: true,
        ...participantsData,
      });
    } catch (err) {
      console.error('Error fetching participants:', err);
      return res.status(500).json({ error: 'Failed to fetch participants' });
    }
  });

  /**
   * POST /api/meetings/:id/toggle-demo
   * Live toggle demo mode for testing/demo
   */
  router.post('/:id/toggle-demo', (req, res) => {
    try {
      const { id } = req.params;
      const { enabled } = req.body;

      const updatedData = meetingService.toggleDemoMode(id, enabled);
      if (!updatedData) {
        return res.status(404).json({ error: 'Meeting not found' });
      }

      if (io) {
        io.of('/meeting').to(id).emit('meeting:participants-updated', updatedData);
        io.of('/meeting').to(id).emit('meeting:demo-mode-updated', {
          demoEnabled: updatedData.demoEnabled,
          totalActive: updatedData.totalActive,
        });
      }

      return res.json({
        success: true,
        ...updatedData,
      });
    } catch (err) {
      console.error('Error toggling demo mode:', err);
      return res.status(500).json({ error: 'Failed to toggle demo mode' });
    }
  });

  return router;
}
