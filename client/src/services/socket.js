import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL !== undefined && import.meta.env.VITE_SOCKET_URL !== ''
  ? import.meta.env.VITE_SOCKET_URL
  : (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5001');

let socketInstance = null;

export const getMeetingSocket = () => {
  if (!socketInstance) {
    socketInstance = io(`${SOCKET_URL}/meeting`, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socketInstance;
};

export const disconnectMeetingSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};
