'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RefreshCw, X, MessageCircleHeart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LOVE_QUOTES } from '@/data/romanticData';
import { LoveQuote } from '@/types';

export default function MessageJar() {
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [currentQuote, setCurrentQuote] = useState<LoveQuote | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const shakeJar = () => {
    if (isShaking) return;
    setIsShaking(true);

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([30, 40, 30]);
    }

    // Pick a random quote
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * LOVE_QUOTES.length);
      setCurrentQuote(LOVE_QUOTES[randomIndex]);
      setCount((prev) => prev + 1);
      setIsShaking(false);
      setIsModalOpen(true);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fda4af', '#fb7185', '#e11d48', '#f43f5e', '#ffd1dc']
      });
    }, 700);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'sweet':
        return 'Alasan Manis 🍯';
      case 'deep':
        return 'Dari Lubuk Hati 🤍';
      case 'humorous':
        return 'Gombalan Sayang 🤭';
      case 'promise':
        return 'Janji Setia 💍';
      default:
        return 'Pesan Cinta ❤️';
    }
  };

  return (
    <section className="w-full my-12 px-4 pb-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <span className="text-[11px] uppercase tracking-widest text-rose-400 font-semibold bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/20 inline-flex items-center gap-1.5">
          <MessageCircleHeart className="w-3 h-3 text-rose-300" /> Toples Cinta
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-rose-50 mt-2">
          Kocok Toples Cinta
        </h2>
        <p className="text-xs text-rose-300/70 mt-1 max-w-xs mx-auto">
          Berisi ratusan alasan kenapa Putra begitu mencintai Fathiyyah
        </p>
      </motion.div>

      {/* 3D Glass Jar Display */}
      <div className="flex flex-col items-center justify-center max-w-xs mx-auto">
        <motion.div
          animate={
            isShaking
              ? {
                  rotate: [-8, 8, -6, 6, -3, 3, 0],
                  y: [0, -10, 2, -6, 0],
                  scale: [1, 1.05, 0.98, 1.02, 1]
                }
              : { y: [0, -4, 0] }
          }
          transition={
            isShaking
              ? { duration: 0.7, ease: 'easeInOut' }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          onClick={shakeJar}
          className="relative w-44 h-56 cursor-pointer group"
        >
          {/* Jar Lid */}
          <div className="w-28 h-6 bg-gradient-to-r from-rose-900 via-rose-700 to-rose-900 rounded-t-lg mx-auto border border-rose-400/50 shadow-md relative z-20">
            <div className="w-24 h-1.5 bg-rose-400/40 rounded-full mx-auto mt-1" />
          </div>

          {/* Jar Neck */}
          <div className="w-24 h-3 bg-white/10 backdrop-blur-md mx-auto border-x border-rose-300/30 relative z-10" />

          {/* Jar Glass Body */}
          <div className="relative w-full h-44 rounded-b-3xl rounded-t-xl bg-gradient-to-b from-white/15 via-white/5 to-rose-900/20 backdrop-blur-md border-2 border-rose-400/40 shadow-2xl shadow-rose-950/70 overflow-hidden flex flex-col items-center justify-center p-3">
            {/* Glowing highlight reflection */}
            <div className="absolute top-2 left-3 w-3 h-28 bg-white/20 rounded-full blur-[1px] pointer-events-none transform -rotate-6" />

            {/* Floating Origami Paper Stars / Hearts inside */}
            <div className="relative w-full h-full">
              {['💖', '⭐', '💌', '🌸', '✨', '💕', '🌷', '🤍'].map((item, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: isShaking ? [0, -25, 10, -15, 0] : [0, -6, 0],
                    rotate: isShaking ? [0, 180, -90, 0] : [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: isShaking ? 0.7 : 2.5 + (i % 3),
                    repeat: isShaking ? 0 : Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut'
                  }}
                  className="absolute select-none text-base filter drop-shadow(0 0 4px rgba(244,63,94,0.6))"
                  style={{
                    left: `${15 + (i * 22) % 65}%`,
                    top: `${20 + (i * 18) % 60}%`
                  }}
                >
                  {item}
                </motion.span>
              ))}
            </div>

            {/* Label on the Jar */}
            <div className="absolute z-20 bg-[#250d30]/90 border border-rose-400/40 px-3 py-1.5 rounded-lg shadow-md text-center max-w-[85%]">
              <span className="text-[10px] font-script text-rose-300 font-bold tracking-wide">
                Alasan Mencintaimu
              </span>
              <p className="text-[8px] text-rose-200/70 font-mono">
                {count > 0 ? `${count} dibuka` : 'Kocok aku!'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Shake Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={shakeJar}
          disabled={isShaking}
          className="mt-6 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-xs sm:text-sm py-3 px-6 rounded-full shadow-lg shadow-rose-950 flex items-center gap-2 border border-rose-400/30 transition-all cursor-pointer"
        >
          <Sparkles className={`w-4 h-4 text-rose-200 ${isShaking ? 'animate-spin' : ''}`} />
          <span>{isShaking ? 'Mengocok Toples...' : 'Kocok Toples Cinta 🫙✨'}</span>
        </motion.button>
      </div>

      {/* Revealed Note Modal */}
      <AnimatePresence>
        {isModalOpen && currentQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30, rotate: -3 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.85, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xs w-full bg-gradient-to-br from-[#fffdfa] via-[#fff8f5] to-[#fdf2f4] text-neutral-800 rounded-3xl p-6 shadow-2xl border-2 border-rose-200 text-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 flex items-center justify-center transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Decorative paper fold corner */}
              <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-rose-200 to-transparent pointer-events-none" />

              {/* Emoji icon */}
              <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-2xl mx-auto mb-3 shadow-inner">
                {currentQuote.emoji}
              </div>

              {/* Category Pill */}
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-100/70 px-2.5 py-0.5 rounded-full inline-block mb-3">
                {getCategoryLabel(currentQuote.category)}
              </span>

              {/* The Romantic Quote */}
              <p className="text-sm font-serif italic text-neutral-800 leading-relaxed px-2">
                &ldquo;{currentQuote.quote}&rdquo;
              </p>

              {/* Sender footnote */}
              <div className="mt-4 pt-3 border-t border-rose-200/70 text-right">
                <span className="text-xs font-script font-bold text-rose-600">
                  Untuk Fathiyyah, dari Putra 💕
                </span>
              </div>

              {/* Action: Shake Again */}
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setTimeout(() => shakeJar(), 200);
                }}
                className="w-full mt-4 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-xs shadow-md shadow-rose-950 flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Kocok Lagi!</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
