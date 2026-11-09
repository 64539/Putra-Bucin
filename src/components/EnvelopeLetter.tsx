'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, ChevronDown, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LETTER_CONTENT } from '@/data/romanticData';

export default function EnvelopeLetter() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Heart confetti explosion when opening the romantic envelope
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#ffffff']
      });
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center my-8 py-4">
      {/* Section Title & Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 px-4"
      >
        <span className="text-[11px] uppercase tracking-widest text-rose-400 font-semibold bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-rose-300" /> Surat Rahasia
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-rose-50 mt-2">
          Surat Cinta Untukmu
        </h2>
        <p className="text-xs text-rose-300/70 mt-1 max-w-xs mx-auto">
          Sepucuk surat yang kutulis khusus untuk bidadari tercantik, Fathiyyah
        </p>
      </motion.div>

      {/* 3D Envelope Container */}
      <div className="relative w-72 sm:w-80 h-52 perspective-1000 flex items-center justify-center">
        {/* Pulsing Hint when closed */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-12 z-30"
            >
              <motion.button
                onClick={handleEnvelopeClick}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-lg shadow-rose-950/80 flex items-center gap-2 border border-rose-300/30"
              >
                <span>Tap untuk membuka</span>
                <span className="text-sm">💌</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Letter that slides out */}
        <motion.div
          animate={
            isOpen
              ? {
                  y: -110,
                  scale: 1,
                  zIndex: 25,
                  transition: {
                    type: 'spring',
                    stiffness: 90,
                    damping: 14,
                    delay: 0.35
                  }
                }
              : { y: 0, scale: 0.92, zIndex: 5 }
          }
          onClick={handleEnvelopeClick}
          className={`absolute w-64 sm:w-72 h-44 rounded-xl bg-gradient-to-br from-[#fffdfa] via-[#fff9f6] to-[#fef0f2] text-neutral-800 p-4 shadow-xl border border-rose-200 cursor-pointer overflow-hidden transition-all duration-300 ${
            isOpen ? 'hover:scale-[1.02] ring-2 ring-rose-400/50' : ''
          }`}
        >
          {/* Decorative stationery corner flourishes */}
          <div className="absolute top-2 left-2 text-rose-300/60 text-xs">❦</div>
          <div className="absolute top-2 right-2 text-rose-300/60 text-xs">❦</div>

          {/* Letter Peek Header */}
          <div className="border-b border-rose-200/70 pb-1.5 mb-2 flex items-center justify-between">
            <span className="text-xs font-serif font-bold text-rose-900 tracking-wide">
              Dear {LETTER_CONTENT.recipient}
            </span>
            <span className="text-[10px] text-rose-800/60 font-mono">
              22.08.2025
            </span>
          </div>

          {/* Excerpt */}
          <p className="text-[11px] leading-relaxed text-neutral-700 font-serif line-clamp-4 italic">
            &ldquo;{LETTER_CONTENT.paragraphs[0]}&rdquo;
          </p>

          <div className="mt-2 flex items-center justify-between text-[10px] text-rose-600 font-medium">
            <span>{LETTER_CONTENT.sender}</span>
            <span className="underline decoration-rose-400 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Baca Selengkapnya &rarr;
            </span>
          </div>
        </motion.div>

        {/* Envelope Shell */}
        <div
          onClick={handleEnvelopeClick}
          className="relative w-full h-full cursor-pointer z-10"
        >
          {/* Envelope Back Wall */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2e0e37] to-[#1d0824] rounded-2xl border border-rose-500/30 shadow-2xl shadow-rose-950/60" />

          {/* Envelope Flap (Top Triangular Fold with 3D Flip) */}
          <motion.div
            animate={
              isOpen
                ? {
                    rotateX: -175,
                    zIndex: 0,
                    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
                  }
                : {
                    rotateX: 0,
                    zIndex: 30,
                    transition: { duration: 0.5 }
                  }
            }
            style={{ transformOrigin: 'top center' }}
            className="absolute top-0 left-0 right-0 h-28 transform-style-3d pointer-events-none"
          >
            {/* Triangular Flap SVG / Shape */}
            <svg
              className="w-full h-full drop-shadow-md"
              viewBox="0 0 320 110"
              preserveAspectRatio="none"
            >
              <polygon
                points="0,0 320,0 160,105"
                className="fill-[#3b1248] stroke-rose-400/30 stroke-1"
              />
            </svg>

            {/* Wax Seal with Heart icon */}
            <motion.div
              animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="absolute left-1/2 -translate-x-1/2 top-[80px] w-11 h-11 rounded-full bg-gradient-to-tr from-rose-700 via-red-600 to-rose-500 border-2 border-rose-300 shadow-md shadow-rose-950 flex items-center justify-center pointer-events-auto"
            >
              <Heart className="w-5 h-5 text-rose-100 fill-rose-100/90" />
            </motion.div>
          </motion.div>

          {/* Envelope Front Pocket (Left & Right & Bottom Folds) */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-20">
            <svg
              className="w-full h-full"
              viewBox="0 0 320 208"
              preserveAspectRatio="none"
            >
              {/* Bottom fold */}
              <polygon
                points="0,208 320,208 160,110"
                className="fill-[#2a0c33] stroke-rose-500/20 stroke-1"
              />
              {/* Left fold */}
              <polygon
                points="0,0 0,208 150,115"
                className="fill-[#240a2c]/90 stroke-rose-500/15 stroke-1"
              />
              {/* Right fold */}
              <polygon
                points="320,0 320,208 170,115"
                className="fill-[#240a2c]/90 stroke-rose-500/15 stroke-1"
              />
            </svg>

            {/* Cute bottom tag on the envelope */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest text-rose-400/60 font-semibold">
              Special Delivery for Fathiyyah
            </div>
          </div>
        </div>
      </div>

      {/* Action button below envelope when opened */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-14"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-medium px-5 py-2.5 rounded-full shadow-lg shadow-rose-950 flex items-center gap-2 active:scale-95 transition-all"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Buka & Baca Surat Penuh</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Reading Modal for Fathiyyah */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[85vh] flex flex-col bg-gradient-to-b from-[#fffbf8] via-[#fff8f5] to-[#fef0f2] text-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-rose-200 overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 flex items-center justify-center transition-colors active:scale-90"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Watermark / Background heart */}
              <div className="absolute right-4 bottom-4 text-rose-100/60 pointer-events-none -z-0">
                <Heart className="w-44 h-44 fill-current" />
              </div>

              {/* Header */}
              <div className="border-b border-rose-200/80 pb-4 mb-5 z-10">
                <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Surat Dari Hati
                </div>
                <h3 className="text-2xl font-serif font-bold text-rose-950 mt-1">
                  Untuk {LETTER_CONTENT.recipient}
                </h3>
                <p className="text-xs text-rose-800/70 font-mono mt-0.5">
                  {LETTER_CONTENT.date}
                </p>
              </div>

              {/* Scrollable Letter Body */}
              <div className="overflow-y-auto pr-1 space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed font-serif z-10 max-h-[50vh]">
                {LETTER_CONTENT.paragraphs.map((p, idx) => (
                  <p key={idx} className="indent-4">
                    {p}
                  </p>
                ))}
              </div>

              {/* Footer / Signature */}
              <div className="border-t border-rose-200/80 pt-4 mt-5 z-10 flex flex-col items-end">
                <p className="text-xs text-rose-800/70 italic font-serif">
                  {LETTER_CONTENT.closing}
                </p>
                <p className="text-lg font-script font-bold text-rose-600 mt-0.5">
                  {LETTER_CONTENT.sender}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
