'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PasscodeScreen from '@/components/PasscodeScreen';
import MusicPlayer from '@/components/MusicPlayer';
import EnvelopeLetter from '@/components/EnvelopeLetter';
import PolaroidGallery from '@/components/PolaroidGallery';
import LoveTimeline from '@/components/LoveTimeline';
import MessageJar from '@/components/MessageJar';
import LoveCounter from '@/components/LoveCounter';
import FloatingHearts from '@/components/FloatingHearts';
import { Heart, Lock, Sparkles, ChevronDown } from 'lucide-react';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState<boolean>(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setAutoPlayAudio(true);
  };

  const handleLockAgain = () => {
    setIsUnlocked(false);
    setAutoPlayAudio(false);
  };

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-[#0b040e] via-[#14061a] to-[#08020a] text-rose-50 flex flex-col items-center justify-start overflow-x-hidden">
      {/* Ambient Floating Hearts & Bokeh in Background */}
      <FloatingHearts />

      {/* PASSCODE LOCK SCREEN OVERLAY */}
      <AnimatePresence mode="wait">
        {!isUnlocked && (
          <PasscodeScreen key="lock-screen" onUnlock={handleUnlock} />
        )}
      </AnimatePresence>

      {/* UNLOCKED MAIN APP CONTENT */}
      {isUnlocked && (
        <motion.div
          key="main-content"
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full flex flex-col items-center"
        >
          {/* Persistent Floating BGM Player */}
          <MusicPlayer autoPlayTrigger={autoPlayAudio} />

          {/* Mobile-first centered container */}
          <div className="w-full max-w-md min-h-screen flex flex-col items-center px-4 pt-6 pb-20 relative">
            {/* Top Romantic App Bar */}
            <header className="w-full flex items-center justify-between py-2 px-1 mb-4 border-b border-rose-500/15">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-300">
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-400" />
                </div>
                <div>
                  <h1 className="text-sm font-serif font-bold text-rose-100 flex items-center gap-1">
                    <span>Putra</span>
                    <span className="text-rose-500">&amp;</span>
                    <span className="text-rose-300 font-script text-base">Fathiyyah</span>
                  </h1>
                  <p className="text-[10px] text-rose-400/70 font-mono -mt-0.5">
                    Anniversary 22.08.2025 &bull; 14th Birthday 🎂
                  </p>
                </div>
              </div>

              {/* Lock app button */}
              <button
                type="button"
                onClick={handleLockAgain}
                className="p-2 rounded-full text-rose-400/60 hover:text-rose-200 hover:bg-rose-950/40 transition-colors"
                title="Kunci Kembali"
              >
                <Lock className="w-4 h-4" />
              </button>
            </header>

            {/* Hero Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full text-center my-4"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Happy Anniversary &amp; 14th Birthday, Cantikku! 🎂</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-300">
                Untuk Fathiyyah
              </h2>
              <p className="text-xs sm:text-sm text-rose-300/80 font-serif italic mt-2 max-w-xs mx-auto leading-relaxed">
                &ldquo;Di mana pun kau berada, kau selalu ada di hatiku. Terima kasih sudah menjadi rumah terbaik untuk cintaku.&rdquo;
              </p>

              {/* Scroll down indicator */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-4 flex flex-col items-center justify-center text-rose-400/50 text-[10px]"
              >
                <span>Gulir ke bawah</span>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.div>

            {/* SECTION 1: THE 3D ENVELOPE & LETTER REVEAL */}
            <EnvelopeLetter />

            {/* SECTION 2: LIVE LOVE COUNTER */}
            <LoveCounter />

            {/* SECTION 3: POLAROID GALLERY REVEAL */}
            <PolaroidGallery />

            {/* SECTION 4: TIMELINE CINTA */}
            <LoveTimeline />

            {/* SECTION 5: MESSAGE JAR (KOCOK TOPLES) */}
            <MessageJar />

            {/* Romantic Footer */}
            <footer className="w-full pt-8 pb-12 mt-6 border-t border-rose-500/20 text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-rose-600/20 border border-rose-500/30 flex items-center justify-center mx-auto mb-3"
              >
                <Heart className="w-5 h-5 fill-rose-500 text-rose-400" />
              </motion.div>
              <p className="text-sm font-serif font-bold text-rose-100">
                Dibuat dengan segenap cinta oleh Putra
              </p>
              <p className="text-xs text-rose-400 font-script text-base mt-0.5">
                Khusus dipersembahkan untuk Fathiyyah
              </p>
              <p className="text-[10px] text-rose-400/50 font-mono mt-2">
                22.08.2025 &bull; Selamanya Milik Kita
              </p>
            </footer>
          </div>
        </motion.div>
      )}
    </main>
  );
}
