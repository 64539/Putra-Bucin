'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, Eye, X, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';
import { POLAROID_PHOTOS } from '@/data/romanticData';
import { PolaroidPhoto } from '@/types';

export default function PolaroidGallery() {
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null);

  const toggleReveal = (id: number) => {
    if (!revealedIds.includes(id)) {
      setRevealedIds((prev) => [...prev, id]);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#fb7185', '#e11d48', '#fda4af', '#f43f5e']
      });
    }
  };

  const revealAll = () => {
    setRevealedIds(POLAROID_PHOTOS.map((p) => p.id));
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#fb7185', '#e11d48', '#fda4af', '#f43f5e', '#ffffff']
    });
  };

  return (
    <section className="w-full my-10 px-4">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <span className="text-[11px] uppercase tracking-widest text-rose-400 font-semibold bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/20 inline-flex items-center gap-1.5">
          <Camera className="w-3 h-3 text-rose-300" /> Galeri Polaroid
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-rose-50 mt-2">
          Kenangan Terindah
        </h2>
        <p className="text-xs text-rose-300/70 mt-1 max-w-xs mx-auto">
          Tap setiap kartu misterius untuk membuka foto dan cerita manis kita
        </p>
      </motion.div>

      {/* Grid of Polaroids (2 columns on mobile, 3 on tablet/desktop) */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {POLAROID_PHOTOS.map((photo, index) => {
          const isRevealed = revealedIds.includes(photo.id);

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="perspective-1000"
            >
              <div
                onClick={() => {
                  if (!isRevealed) {
                    toggleReveal(photo.id);
                  } else {
                    setSelectedPhoto(photo);
                  }
                }}
                className={`relative w-full aspect-[4/5] cursor-pointer transition-transform duration-500 transform-style-3d ${
                  photo.rotation
                } hover:scale-105 active:scale-95`}
              >
                {/* BACK OF CARD: Gift Box / Mysterious Wrapped Present */}
                <div
                  className={`absolute inset-0 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-opacity duration-500 backface-hidden bg-gradient-to-br from-[#2b0d36] via-[#1d0825] to-[#14051a] border-2 border-dashed border-rose-500/40 shadow-xl shadow-black/50 ${
                    isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100 z-10'
                  }`}
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-12 h-12 rounded-full bg-rose-600/25 border border-rose-400/40 flex items-center justify-center text-rose-300 mb-2 shadow-inner"
                  >
                    <Gift className="w-6 h-6 text-rose-400" />
                  </motion.div>
                  <span className="text-xs font-semibold text-rose-100">
                    Hadiah #{photo.id}
                  </span>
                  <span className="text-[10px] text-rose-300/60 mt-1">
                    Tap untuk buka 🎁
                  </span>
                </div>

                {/* FRONT OF CARD: Vintage Polaroid Frame */}
                <div
                  className={`absolute inset-0 rounded-xl bg-white p-2.5 pb-4 flex flex-col shadow-2xl border border-neutral-200 transition-opacity duration-500 backface-hidden ${
                    isRevealed ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {/* Photo area with tape effect */}
                  <div className="relative w-full flex-1 rounded overflow-hidden bg-neutral-900">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover filter brightness-[0.97] contrast-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute top-1.5 right-1.5 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] text-white font-mono">
                      {photo.date}
                    </div>
                  </div>

                  {/* Polaroid bottom caption */}
                  <div className="mt-2 text-center px-1">
                    <p className="text-xs font-serif font-bold text-neutral-900 truncate">
                      {photo.title}
                    </p>
                    <p className="text-[9px] font-script text-rose-700 truncate mt-0.5">
                      {photo.caption}
                    </p>
                  </div>

                  {/* Tape decoration at top */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-rose-200/60 backdrop-blur-[1px] rotate-1 shadow-sm rounded-sm" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Button to Reveal All if user wants */}
      {revealedIds.length < POLAROID_PHOTOS.length && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={revealAll}
            className="text-xs text-rose-300/80 hover:text-white underline decoration-rose-500/40 underline-offset-4 flex items-center gap-1.5 mx-auto transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Buka semua kenangan sekaligus</span>
          </button>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xs w-full bg-white rounded-2xl p-4 pb-6 shadow-2xl border border-rose-200"
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 z-10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full aspect-[4/5] rounded-lg overflow-hidden bg-neutral-900 shadow-inner">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-3 text-center">
                <span className="text-[10px] uppercase font-mono tracking-wider text-rose-500 font-semibold">
                  {selectedPhoto.date}
                </span>
                <h4 className="text-base font-serif font-bold text-neutral-900 mt-0.5">
                  {selectedPhoto.title}
                </h4>
                <p className="text-xs text-neutral-600 mt-1 font-serif leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
