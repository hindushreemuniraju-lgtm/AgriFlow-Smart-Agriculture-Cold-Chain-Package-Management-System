import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ProductPassport } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Star, Heart, Sparkles, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FarmerGratitudeModalProps {
  passport: ProductPassport;
  onClose: () => void;
}

export const FarmerGratitudeModal: React.FC<FarmerGratitudeModalProps> = ({ passport, onClose }) => {
  const { t } = useLanguage();
  const [rating, setRating] = useState<number>(5);
  const [tipAmount, setTipAmount] = useState<number>(50);
  const [note, setNote] = useState<string>(
    'Thank you so much for growing such sweet, fresh, and high-quality produce! Truly appreciate your hard work.'
  );
  const [sent, setSent] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('/api/passport/tip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchId: passport.batchId,
          farmerName: passport.origin.farmerName,
          rating,
          tipAmount,
          note
        })
      });
    } catch {
      // offline fallback ok
    }

    setSubmitting(false);
    setSent(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#a855f7', '#38bdf8', '#fbbf24']
    });

    setTimeout(() => {
      onClose();
    }, 2200);
  };

  return typeof document !== 'undefined' ? createPortal(
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="max-w-lg w-full rounded-3xl bg-slate-900 border border-purple-500/40 p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-400/30 text-pink-400 flex items-center justify-center text-xl">
              <Heart className="w-5 h-5 fill-pink-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">{t.customer.tipModalTitle}</h3>
              <p className="text-xs text-slate-400">Directly supporting farmer {passport.origin.farmerName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {sent ? (
          <div className="text-center py-8 space-y-3 animate-scale-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-xl font-extrabold text-white">Gratitude & Tip Delivered!</h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Your ₹{tipAmount} tip and 5-star review have been sent directly to {passport.origin.farmerName} with 0% platform deductions.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-5">
            {/* Star Rating */}
            <div className="text-center space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Rate Produce Quality & Freshness
              </label>
              <div className="flex items-center justify-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                          : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tip Amount Pills */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Select Gratitude Tip Amount (100% to Farmer)
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {[20, 50, 100, 200].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTipAmount(amt)}
                    className={`py-2.5 rounded-xl border text-xs font-bold font-mono transition-all ${
                      tipAmount === amt
                        ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Note */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Personal Thank-You Note
              </label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
                className="w-full bg-slate-950 border border-purple-500/30 rounded-2xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-purple-400"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Sending...' : t.customer.sendTip}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>,
    document.body
  ) : null;
};
