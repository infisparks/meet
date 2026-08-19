import React, { useState } from 'react';
import {
  Users,
  X,
  Crown,
  Search,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Sparkles,
  Share2
} from 'lucide-react';
import { getInitials, getAvatarColor } from '../utils/demoParticipants';

export default function ParticipantPanel({
  isOpen,
  onClose,
  realParticipants = [],
  demoParticipants = [],
  totalActive = 0,
  demoEnabled = true,
  currentUserId,
  onOpenShare,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  if (!isOpen) return null;

  const query = searchQuery.toLowerCase().trim();

  const filteredReal = realParticipants.filter((p) =>
    p.name.toLowerCase().includes(query)
  );

  const filteredDemo = demoParticipants.filter((p) =>
    p.name.toLowerCase().includes(query)
  );

  const displayedList =
    activeTab === 'real'
      ? filteredReal
      : activeTab === 'demo'
      ? filteredDemo
      : [...filteredReal, ...filteredDemo];

  return (
    <aside className="w-full sm:w-80 h-full bg-[#0F172A] border-l border-[#1E293B] flex flex-col z-20 select-none">
      {/* Header */}
      <div className="p-3.5 border-b border-[#1E293B] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-400" />
          <div>
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Participants</h2>
            <p className="text-[11px] text-slate-400">
              {totalActive} {totalActive === 1 ? 'person' : 'people'} in room
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-200 hover:bg-[#1E293B] rounded-md transition"
          title="Close panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="p-2.5 border-b border-[#1E293B] space-y-2">
        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search participant..."
            className="w-full bg-[#0B0F17] border border-[#374151] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none transition"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 bg-[#0B0F17] p-1 rounded-lg border border-[#1E293B] text-[11px]">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1 rounded text-center transition ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({totalActive})
          </button>
          <button
            onClick={() => setActiveTab('real')}
            className={`flex-1 py-1 rounded text-center transition ${
              activeTab === 'real'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Active ({realParticipants.length})
          </button>
          {demoEnabled && (
            <button
              onClick={() => setActiveTab('demo')}
              className={`flex-1 py-1 rounded text-center transition ${
                activeTab === 'demo'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Demo ({demoParticipants.length})
            </button>
          )}
        </div>
      </div>

      {/* Participant List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {displayedList.length === 0 ? (
          <div className="py-10 text-center text-xs text-slate-500">
            No participants found
          </div>
        ) : (
          displayedList.map((participant) => {
            const isHost = participant.role === 'host';
            const isSelf = participant.id === currentUserId;
            const isDemo = participant.isDemo;

            return (
              <div
                key={participant.id}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg transition hover:bg-[#1E293B]/70 ${
                  isSelf ? 'bg-[#1E1B4B]/40 border border-indigo-500/30' : 'bg-[#111827]'
                }`}
              >
                {/* Left: Avatar + Name + Badges */}
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-md ${getAvatarColor(
                      participant.name
                    )} flex items-center justify-center text-white font-bold text-[11px] shrink-0`}
                  >
                    {getInitials(participant.name)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-200 truncate">
                        {participant.name}
                      </span>
                      {isSelf && (
                        <span className="text-[9px] px-1 bg-indigo-500/20 text-indigo-300 rounded font-medium">
                          You
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 mt-0.5">
                      {isHost ? (
                        <span className="inline-flex items-center gap-1 text-[9px] text-amber-400 font-semibold bg-amber-500/10 px-1 py-0.2 rounded border border-amber-500/20">
                          <Crown className="w-2.5 h-2.5" />
                          Host
                        </span>
                      ) : isDemo ? (
                        <span className="inline-flex items-center gap-0.5 text-[9px] text-slate-400 bg-[#1F2937] px-1 py-0.2 rounded">
                          <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
                          Simulated
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Online
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Audio / Video status indicators */}
                <div className="flex items-center gap-1 text-slate-400">
                  {participant.isAudioMuted ? (
                    <div className="p-1 text-rose-400 bg-rose-500/10 rounded" title="Muted">
                      <MicOff className="w-3 h-3" />
                    </div>
                  ) : (
                    <div className="p-1 text-slate-400 bg-[#1F2937] rounded" title="Mic on">
                      <Mic className="w-3 h-3" />
                    </div>
                  )}

                  {participant.isVideoMuted ? (
                    <div className="p-1 text-slate-500 bg-[#1F2937] rounded" title="Video off">
                      <VideoOff className="w-3 h-3" />
                    </div>
                  ) : (
                    <div className="p-1 text-slate-400 bg-[#1F2937] rounded" title="Video on">
                      <Video className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Share Action */}
      <div className="p-2.5 border-t border-[#1E293B] bg-[#0B0F17]">
        <button
          onClick={onOpenShare}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#111827] hover:bg-[#1E293B] border border-[#1E293B] text-slate-200 text-xs font-semibold transition active:scale-98"
        >
          <Share2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Invite More People</span>
        </button>
      </div>
    </aside>
  );
}
