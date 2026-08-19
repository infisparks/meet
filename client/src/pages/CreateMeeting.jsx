import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Video,
  Sparkles,
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
    description: 'Broadcast to large audiences with 40 simulated demo attendees.',
    icon: Presentation,
    badge: 'Demo Mode Ready',
  },
  {
    id: 'team',
    title: 'Team Collaboration',
    description: 'Structured meetings with screen sharing, chat, and attendee management.',
    icon: Users,
    badge: 'High Collaboration',
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
        // Save host name in localStorage for instant pre-fill
        localStorage.setItem('infimeet_user_name', hostName.trim());
        localStorage.setItem('infimeet_user_role', 'host');

        // Navigate to meeting room directly
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
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-brand-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full flex flex-col justify-center">
        {/* Header Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Host a New Meeting</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Create Your Video Space
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Configure your session details. Your room will be generated instantly.
          </p>
        </div>

        {/* Creation Card */}
        <div className="bg-navy-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCreateMeeting} className="space-y-6">
            {/* Host Name Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Your Name (Host) <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                placeholder="e.g. Mudassir"
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition"
                autoFocus
              />
            </div>

            {/* Meeting Title Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Meeting Title
              </label>
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="e.g. Marketing Webinar or Q3 Strategy Review"
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition"
              />
            </div>

            {/* Meeting Type Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Select Meeting Format
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {MEETING_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'bg-indigo-600/15 border-indigo-500 shadow-lg shadow-indigo-600/10 ring-1 ring-indigo-500'
                          : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`} />
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {type.badge}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-white mb-1">
                          {type.title}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2">
                          {type.description}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-indigo-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition transform active:scale-98 disabled:opacity-50"
              >
                <span>{isLoading ? 'Creating Room...' : 'Create & Launch Meeting'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Footnote */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Private & End-to-End Managed
            </span>
            <span className="font-mono text-slate-400">meet.infispark.in</span>
          </div>
        </div>
      </main>
    </div>
  );
}
