import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Video,
  Users,
  Presentation,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { api } from '../services/api';

const MEETING_TYPES = [
  {
    id: 'instant',
    title: 'Instant Meeting',
    description: 'Quick 1-on-1 or impromptu team sync with instant room launch.',
    icon: Zap,
    badge: 'Quick Launch',
  },
  {
    id: 'webinar',
    title: 'Webinar & Presentation',
    description: 'Broadcast to audiences with 40 simulated demo attendees.',
    icon: Presentation,
    badge: 'Demo Mode Ready',
  },
  {
    id: 'team',
    title: 'Team Collaboration',
    description: 'Structured meetings with screen sharing and chat.',
    icon: Users,
    badge: 'Collaboration',
  },
];

export default function CreateMeeting() {
  const navigate = useNavigate();
  const [hostName, setHostName] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [selectedType, setSelectedType] = useState('webinar');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateMeeting = async (e) => {
    e.preventDefault();
    if (!hostName.trim()) {
      setError('Please provide your name as the host');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const title = meetingTitle.trim() || `${hostName.trim()}'s Meeting`;
      const response = await api.createMeeting({
        title,
        hostName: hostName.trim(),
        type: selectedType,
      });

      if (response.success && response.meeting) {
        localStorage.setItem('infimeet_user_name', hostName.trim());
        localStorage.setItem('infimeet_user_role', 'host');
        navigate(`/meeting/${response.meeting.id}`);
      } else {
        throw new Error('Failed to create meeting room');
      }
    } catch (err) {
      console.error('Create meeting error:', err);
      setError(err.message || 'Server is temporarily unavailable. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 selection:bg-indigo-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full flex flex-col justify-center">
        {/* Header Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Create Meeting Room
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure your session details to generate your video space.
          </p>
        </div>

        {/* Creation Card */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 shadow-xl">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCreateMeeting} className="space-y-5">
            {/* Host Name Field */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Host Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                placeholder="Enter host name (e.g. Mudassir)"
                className="w-full bg-[#0B0F17] border border-[#374151] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
                autoFocus
              />
            </div>

            {/* Meeting Title Field */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Meeting Title
              </label>
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="e.g. Marketing Webinar or Q3 Strategy Sync"
                className="w-full bg-[#0B0F17] border border-[#374151] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
              />
            </div>

            {/* Meeting Type Selection */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Meeting Format
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {MEETING_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-3.5 rounded-lg border text-left flex flex-col justify-between transition ${
                        isSelected
                          ? 'bg-[#1E1B4B] border-indigo-500 ring-1 ring-indigo-500'
                          : 'bg-[#0B0F17] border-[#1F2937] hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`} />
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#111827] text-slate-400 border border-[#1F2937]">
                            {type.badge}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-white mb-0.5">
                          {type.title}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2">
                          {type.description}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="mt-2.5 flex items-center gap-1 text-[10px] font-medium text-indigo-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Selected</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition active:scale-98 disabled:opacity-50"
              >
                <span>{isLoading ? 'Creating Room...' : 'Create & Launch Meeting'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Footnote */}
          <div className="mt-5 pt-4 border-t border-[#1F2937] flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Private & Managed Infrastructure
            </span>
            <span className="font-mono text-slate-400">meet.infispark.in</span>
          </div>
        </div>
      </main>
    </div>
  );
}
