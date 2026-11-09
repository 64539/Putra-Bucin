'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Delete, Heart, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CORRECT_PIN } from '@/data/romanticData';

interface PasscodeScreenProps {
  onUnlock: () => void;
}

export default function PasscodeScreen({ onUnlock }: PasscodeScreenProps) {
  const [pin, setPin] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);

  // Play subtle synthesized audio clicks for native tactile feel
  const playSound = (freq = 440, type: OscillatorType = 'sine', duration = 0.06) => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // AudioContext might be blocked until user gesture, safe fallback
    }
  };

  const handleKeyPress = (num: string) => {
    if (isSuccess) return;

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(15);
    }
    playSound(520, 'sine', 0.05);

    setPin((prev) => {
      if (prev.length >= 6) return prev;
      const nextPin = prev + num;
      if (nextPin.length === 6) {
        // Trigger validation on next tick
        setTimeout(() => validatePin(nextPin), 50);
      }
      return nextPin;
    });
  };

  const handleDelete = () => {
    if (isSuccess) return;
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
    playSound(320, 'triangle', 0.04);
    setPin((prev) => prev.slice(0, -1));
  };

  const validatePin = (inputPin: string) => {
    if (inputPin === CORRECT_PIN) {
      setIsSuccess(true);
      playSound(784, 'sine', 0.2); // G5 note
      setTimeout(() => playSound(1046, 'sine', 0.35), 150); // C6 note

      // Fire celebratory heart-colored confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#fb7185', '#fda4af', '#f43f5e', '#ffffff']
      });

      // Smooth delay before unlocking
      setTimeout(() => {
        onUnlock();
      }, 950);
    } else {
      setIsError(true);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([40, 60, 40]);
      }
      playSound(180, 'sawtooth', 0.18);

      setTimeout(() => {
        setPin('');
        setIsError(false);
      }, 800);
    }
  };

  // Keyboard accessibility support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isSuccess]);

  const keypadButtons = [
    { num: '1', letters: '' },
    { num: '2', letters: 'ABC' },
    { num: '3', letters: 'DEF' },
    { num: '4', letters: 'GHI' },
    { num: '5', letters: 'JKL' },
    { num: '6', letters: 'MNO' },
    { num: '7', letters: 'PQRS' },
    { num: '8', letters: 'TUV' },
    { num: '9', letters: 'WXYZ' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-10 px-6 bg-gradient-to-b from-[#0e0514] via-[#1a0822] to-[#0a030e] text-white select-none overflow-hidden"
    >
      {/* Decorative blurred lighting background */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="w-full max-w-xs flex flex-col items-center pt-4 z-10">
        <motion.div
          animate={
            isSuccess
              ? { scale: [1, 1.25, 1.1], rotate: [0, -10, 10, 0] }
              : { y: [0, -4, 0] }
          }
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mb-5"
        >
          <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-rose-500 via-pink-400 to-purple-500 shadow-lg shadow-rose-950/60">
            <div className="w-full h-full rounded-full bg-[#1b0a24] flex items-center justify-center overflow-hidden border border-rose-400/30">
              {isSuccess ? (
                <Unlock className="w-8 h-8 text-rose-300 animate-pulse" />
              ) : (
                <Lock className="w-8 h-8 text-rose-400/90" />
              )}
            </div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-1 -right-1 bg-rose-600 text-white p-1 rounded-full border-2 border-[#1a0822]"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
          </motion.div>
        </motion.div>

        <h1 className="text-xl font-semibold tracking-wide text-rose-100 flex items-center gap-1.5 font-serif">
          <span>Khusus Untuk</span>
          <span className="text-rose-400 font-script text-2xl font-bold">Fathiyyah</span>
        </h1>

        <p className="text-xs text-rose-300/70 mt-1 text-center font-sans">
          Masukkan 6-digit passcode rahasia cinta kita
        </p>

        {/* 6 Passcode Indicator Dots with shake animation */}
        <motion.div
          animate={
            isError
              ? { x: [-14, 14, -10, 10, -5, 5, 0] }
              : isSuccess
              ? { scale: [1, 1.08, 1] }
              : {}
          }
          transition={{ duration: 0.45 }}
          className="flex items-center justify-center gap-3.5 my-8"
        >
          {Array.from({ length: 6 }).map((_, i) => {
            const isFilled = i < pin.length;
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  scale: isFilled ? [1, 1.25, 1.1] : 1,
                  backgroundColor: isError
                    ? '#ef4444'
                    : isSuccess
                    ? '#10b981'
                    : isFilled
                    ? '#fb7185'
                    : 'transparent',
                  borderColor: isError
                    ? '#f87171'
                    : isSuccess
                    ? '#34d399'
                    : isFilled
                    ? '#f43f5e'
                    : 'rgba(251, 113, 133, 0.35)',
                  boxShadow: isFilled
                    ? isError
                      ? '0 0 12px rgba(239, 68, 68, 0.7)'
                      : isSuccess
                      ? '0 0 12px rgba(16, 185, 129, 0.7)'
                      : '0 0 12px rgba(244, 63, 94, 0.6)'
                    : 'none'
                }}
                transition={{ duration: 0.2 }}
                className="w-3.5 h-3.5 rounded-full border-2 transition-colors duration-200"
              />
            );
          })}
        </motion.div>

        {/* Status / Error Toast Notice */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isError && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-rose-300 font-medium bg-rose-950/80 px-3 py-1 rounded-full border border-rose-500/30"
              >
                Ups, tanggal jadian kita jangan lupa ya sayang 🥺
              </motion.span>
            )}
            {isSuccess && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-emerald-300 font-medium bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Sandi benar! Membuka cinta...
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Keypad Section (iOS Style) */}
      <div className="w-full max-w-xs z-10">
        <div className="grid grid-cols-3 gap-y-3 gap-x-6 place-items-center">
          {keypadButtons.map((btn) => (
            <button
              key={btn.num}
              type="button"
              onClick={() => handleKeyPress(btn.num)}
              className="w-18 h-18 sm:w-20 sm:h-20 w-[72px] h-[72px] rounded-full bg-white/[0.08] hover:bg-white/[0.14] active:bg-rose-500/30 active:scale-90 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center transition-all duration-150 shadow-sm shadow-black/40 group touch-manipulation"
            >
              <span className="text-2xl sm:text-3xl font-light text-rose-50 group-active:text-white">
                {btn.num}
              </span>
              {btn.letters && (
                <span className="text-[9px] font-semibold tracking-widest text-rose-300/60 -mt-0.5">
                  {btn.letters}
                </span>
              )}
            </button>
          ))}

          {/* Bottom Row: Hint / 0 / Backspace */}
          <button
            type="button"
            onClick={() => setShowHintModal(true)}
            className="w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center text-rose-300/70 hover:text-rose-200 active:scale-95 transition-all touch-manipulation"
            title="Petunjuk"
          >
            <HelpCircle className="w-5 h-5 text-rose-300/80" />
            <span className="text-[10px] mt-0.5 text-rose-300/70">Petunjuk</span>
          </button>

          <button
            type="button"
            onClick={() => handleKeyPress('0')}
            className="w-[72px] h-[72px] rounded-full bg-white/[0.08] hover:bg-white/[0.14] active:bg-rose-500/30 active:scale-90 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center transition-all duration-150 shadow-sm shadow-black/40 touch-manipulation"
          >
            <span className="text-2xl sm:text-3xl font-light text-rose-50">0</span>
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center text-rose-300/80 hover:text-rose-100 active:scale-90 transition-all touch-manipulation"
            title="Hapus"
          >
            {pin.length > 0 ? (
              <Delete className="w-6 h-6 stroke-[1.8]" />
            ) : (
              <span className="text-xs text-rose-400/40">Batal</span>
            )}
          </button>
        </div>
      </div>

      {/* Footer Hint */}
      <div className="z-10 text-center pb-2">
        <button
          onClick={() => setShowHintModal(true)}
          className="text-xs text-rose-300/60 hover:text-rose-200 underline decoration-rose-500/30 underline-offset-4 transition-colors"
        >
          Lupa tanggal jadian kita? Klik di sini
        </button>
      </div>

      {/* Hint Modal Sheet */}
      <AnimatePresence>
        {showHintModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#210c2c] border border-rose-500/30 rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl relative"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 fill-rose-500/40 text-rose-400" />
              </div>
              <h3 className="text-lg font-serif font-bold text-rose-100 mb-2">
                Petunjuk Sandi Rahasia
              </h3>
              <p className="text-xs text-rose-200/80 leading-relaxed mb-4">
                Sandi ini adalah tanggal paling bersejarah untuk kita:
                <br />
                <span className="text-rose-300 font-semibold mt-1 inline-block">
                  Hari Jadian Kita: 22 Agustus 2025
                </span>
                <br />
                <span className="text-xs text-rose-400/90 font-mono mt-1 block">
                  Format: (22-08-25) &rarr; 220825
                </span>
              </p>
              <button
                type="button"
                onClick={() => setShowHintModal(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-xs tracking-wider shadow-md shadow-rose-950 transition-all active:scale-95"
              >
                Aku Mengerti Sayang 🥰
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
