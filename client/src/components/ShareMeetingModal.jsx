import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  Mail,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';

export default function ShareMeetingModal({
  isOpen,
  onClose,
  meetingId,
  meetingTitle,
  hostName,
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const meetingUrl = `${window.location.origin}/meeting/${meetingId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy meeting url:', err);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Join my InfiMeet Video Meeting: "${meetingTitle}"\n\nMeeting Link: ${meetingUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Invitation to InfiMeet: ${meetingTitle}`);
    const body = encodeURIComponent(
      `Hi,\n\nYou are invited to join the InfiMeet video meeting.\n\nMeeting Title: ${meetingTitle}\nHost: ${hostName}\n\nJoin Meeting: ${meetingUrl}\n\nSee you there!`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `InfiMeet - ${meetingTitle}`,
          text: `Join the meeting hosted by ${hostName}`,
          url: meetingUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share error:', err);
        }
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-fade-in">
      <div className="w-full max-w-md bg-[#111827] border border-[#1F2937] rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#1F2937] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-indigo-600/10 text-indigo-400">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                Invite People
              </h3>
              <p className="text-xs text-slate-400">
                Share this link to invite participants
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-[#1F2937] rounded-md transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Meeting Summary Box */}
          <div className="p-3 bg-[#0B0F17] rounded-lg border border-[#1F2937]">
            <div className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider mb-0.5">
              Active Meeting
            </div>
            <div className="text-xs font-bold text-slate-100 truncate">
              {meetingTitle}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Host: <span className="text-slate-200 font-medium">{hostName}</span>
            </div>
          </div>

          {/* Copyable Link */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Meeting URL
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[#0B0F17] border border-[#374151] rounded-lg px-3 py-2 text-xs text-slate-300 font-mono truncate select-all">
                {meetingUrl}
              </div>
              <button
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition active:scale-95 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Share Buttons */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Quick Share Options
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#0B0F17] hover:bg-[#1F2937] border border-[#1F2937] text-[#25D366] text-xs font-medium transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleEmailShare}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#0B0F17] hover:bg-[#1F2937] border border-[#1F2937] text-slate-200 text-xs font-medium transition"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>Email</span>
              </button>

              <button
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#0B0F17] hover:bg-[#1F2937] border border-[#1F2937] text-slate-200 text-xs font-medium transition"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                <span>More</span>
              </button>
            </div>
          </div>

          {/* Security footnote */}
          <div className="flex items-center gap-1.5 pt-2 border-t border-[#1F2937] text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Infrastructure: meet.infispark.in</span>
          </div>
        </div>
      </div>
    </div>
  );
}
