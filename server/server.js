import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createMeetingRouter } from './routes/meetings.js';
import { setupMeetingSocket } from './socket/meetingSocket.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for dev/testing ease
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json());

// Initialize Socket.IO with CORS
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  pingTimeout: 30000,
  pingInterval: 10000,
});

// Setup WebSockets
setupMeetingSocket(io);

// Mount API Routes
app.use('/api/meetings', createMeetingRouter(io));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'InfiMeet',
    version: '1.0.0',
    jitsiDomain: process.env.JITSI_DOMAIN || 'meet.infispark.in',
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend build in production / Docker
const publicPath = path.join(__dirname, 'public');
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

// Start HTTP & WebSocket Server
server.listen(PORT, () => {
  console.log(`===========================================`);
  console.log(`🚀 InfiMeet Backend Server running on http://localhost:${PORT}`);
  console.log(`🌐 Configured Jitsi Domain: ${process.env.JITSI_DOMAIN || 'meet.infispark.in'}`);
  console.log(`👥 Demo Participants: ${process.env.DEMO_PARTICIPANTS_ENABLED !== 'false' ? 'ENABLED (40)' : 'DISABLED'}`);
  console.log(`===========================================`);
});
