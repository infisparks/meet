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
  Share2,
  CheckCircle2,
  ShieldAlert
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
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'real' | 'demo'

  if (!isOpen) return null;

  // Filter lists based on search query
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
    <aside className="w-full sm:w-80 lg:w-88 h-full bg-navy-900 border-l border-slate-800 flex flex-col z-20 shadow-2xl transition-all select-none">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-600/10 text-indigo-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-100">Participants</h2>
            <p className="text-xs text-slate-400">
              {totalActive} {totalActive === 1 ? 'person' : 'people'} in room
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
          title="Close panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="p-3 border-b border-slate-800 space-y-2">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search participant..."
            className="w-full bg-slate-950/70 border border-slate-800 focus:border-indigo-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none transition"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800/80 text-[11px] font-medium">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1 rounded-md text-center transition ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({totalActive})
          </button>
          <button
            onClick={() => setActiveTab('real')}
            className={`flex-1 py-1 rounded-md text-center transition ${
              activeTab === 'real'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Active ({realParticipants.length})
          </button>
          {demoEnabled && (
            <button
              onClick={() => setActiveTab('demo')}
              className={`flex-1 py-1 rounded-md text-center transition ${
                activeTab === 'demo'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Demo ({demoParticipants.length})
            </button>
          )}
        </div>
      </div>

      {/* Participant List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-slate-800/40">
        {displayedList.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No participants found matching "{searchQuery}"
          </div>
        ) : (
          displayedList.map((participant) => {
            const isHost = participant.role === 'host';
            const isSelf = participant.id === currentUserId;
            const isDemo = participant.isDemo;

            return (
              <div
                key={participant.id}
                className={`pt-1 flex items-center justify-between px-2.5 py-2 rounded-xl transition hover:bg-slate-800/50 ${
                  isSelf ? 'bg-indigo-950/20 border border-indigo-500/20' : ''
                }`}
              >
                {/* Left: Avatar + Name + Badges */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${getAvatarColor(
                      participant.name
                    )} flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm`}
                  >
                    {getInitials(participant.name)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-200 truncate">
                        {participant.name}
                      </span>
                      {isSelf && (
                        <span className="text-[10px] px-1 py-0.2 bg-indigo-500/20 text-indigo-300 rounded font-medium">
                          You
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 mt-0.5">
                      {isHost ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                          <Crown className="w-2.5 h-2.5" />
                          Host
                        </span>
                      ) : isDemo ? (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-slate-400 font-normal bg-slate-800 px-1.5 py-0.2 rounded border border-slate-700/60">
                          <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
                          Simulated
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Online
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Audio / Video status indicators */}
                <div className="flex items-center gap-1.5 text-slate-400">
                  {participant.isAudioMuted ? (
                    <div className="p-1 text-rose-400 bg-rose-500/10 rounded" title="Muted">
                      <MicOff className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="p-1 text-slate-400 bg-slate-800/80 rounded" title="Mic on">
                      <Mic className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {participant.isVideoMuted ? (
                    <div className="p-1 text-slate-500 bg-slate-800/80 rounded" title="Video off">
                      <VideoOff className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="p-1 text-slate-400 bg-slate-800/80 rounded" title="Video on">
                      <Video className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Share Action */}
      <div className="p-3 border-t border-slate-800 bg-navy-950/50">
        <button
          onClick={onOpenShare}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold transition active:scale-98"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Invite More People</span>
        </button>
      </div>
    </aside>
  );
}
