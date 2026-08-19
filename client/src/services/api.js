const API_BASE = import.meta.env.VITE_API_URL !== undefined && import.meta.env.VITE_API_URL !== ''
  ? import.meta.env.VITE_API_URL
  : (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5001');

export const api = {
  /**
   * Create a new meeting
   */
  async createMeeting({ title, hostName, type }) {
    const res = await fetch(`${API_BASE}/api/meetings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, hostName, type }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create meeting');
    }
    return res.json();
  },

  /**
   * Get meeting details
   */
  async getMeeting(id) {
    const res = await fetch(`${API_BASE}/api/meetings/${id}`);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Meeting not found');
    }
    return res.json();
  },

  /**
   * Join meeting
   */
  async joinMeeting(id, { name, role, participantId }) {
    const res = await fetch(`${API_BASE}/api/meetings/${id}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role, participantId }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to join meeting');
    }
    return res.json();
  },

  /**
   * Leave meeting
   */
  async leaveMeeting(id, participantId) {
    const res = await fetch(`${API_BASE}/api/meetings/${id}/leave`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participantId }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to leave meeting');
    }
    return res.json();
  },

  /**
   * Toggle demo mode
   */
  async toggleDemoMode(id, enabled) {
    const res = await fetch(`${API_BASE}/api/meetings/${id}/toggle-demo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to toggle demo mode');
    }
    return res.json();
  }
};
