import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  Mail,
  MessageCircle,
  QrCode,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-navy-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Invite people to your meeting
              </h3>
              <p className="text-xs text-slate-400">
                Share this link with anyone you want to join
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Meeting Summary Box */}
          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
              Active Meeting
            </div>
            <div className="text-sm font-bold text-slate-100 truncate">
              {meetingTitle}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Host: <span className="text-slate-300 font-medium">{hostName}</span>
            </div>
          </div>

          {/* Copyable Link */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Shareable Meeting Link
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono truncate select-all">
                {meetingUrl}
              </div>
              <button
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition active:scale-95 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
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
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Quick Share via
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleEmailShare}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold transition"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </button>

              <button
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition"
              >
                <Share2 className="w-4 h-4" />
                <span>More</span>
              </button>
            </div>
          </div>

          {/* Security footnote */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Secured with Jitsi Media Engine • meet.infispark.in</span>
          </div>
        </div>
      </div>
    </div>
  );
}
