import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CreateMeeting from './pages/CreateMeeting';
import JoinMeeting from './pages/JoinMeeting';
import MeetingRoom from './pages/MeetingRoom';

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 selection:bg-brand-500 selection:text-white font-sans antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateMeeting />} />
        <Route path="/join" element={<JoinMeeting />} />
        <Route path="/meeting/:meetingId" element={<MeetingRoom />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
