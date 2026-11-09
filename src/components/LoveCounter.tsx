'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Clock, CalendarHeart } from 'lucide-react';
import { ANNIVERSARY_DATE } from '@/data/romanticData';

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export default function LoveCounter() {
  const [time, setTime] = useState<TimeElapsed>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: true
  });

  useEffect(() => {
    const calculateTime = () => {
      const anniversary = new Date(ANNIVERSARY_DATE).getTime();
      const now = new Date().getTime();
      const difference = Math.abs(now - anniversary);
      const isPassed = now >= anniversary;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds, isPassed });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeCards = [
    { label: 'Hari', value: time.days },
    { label: 'Jam', value: time.hours },
    { label: 'Menit', value: time.minutes },
    { label: 'Detik', value: time.seconds }
  ];

  return (
    <section className="w-full my-8 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-[#240b2e]/80 via-[#1a0724]/90 to-[#120419]/95 border border-rose-500/30 backdrop-blur-xl shadow-2xl shadow-rose-950/60 text-center relative overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-[10px] uppercase tracking-wider font-semibold mb-2">
            <CalendarHeart className="w-3.5 h-3.5 text-rose-400" />
            <span>22 Agustus 2025</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-rose-50 flex items-center justify-center gap-2">
            <span>Telah Bersama Selama</span>
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-rose-500 inline-block"
            >
              ❤️
            </motion.span>
          </h3>

          <p className="text-xs text-rose-300/70 mt-1 mb-5">
            Setiap detik yang terlewati adalah anugerah terindah
          </p>

          {/* 4 Counter Digit Blocks */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {timeCards.map((card, i) => (
              <div
                key={card.label}
                className="bg-[#2e0e37]/70 border border-rose-500/25 rounded-2xl py-3 px-1 sm:px-2 flex flex-col items-center justify-center shadow-lg shadow-black/40"
              >
                <span className="text-xl sm:text-2xl font-bold font-mono text-rose-100 tracking-tight">
                  {String(card.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-rose-300/70 uppercase tracking-widest font-semibold mt-1">
                  {card.label}
                </span>
              </div>
            ))}
          </div>

          {/* Subtext Quote */}
          <div className="mt-4 pt-3 border-t border-rose-500/20 flex items-center justify-center gap-1.5 text-xs text-rose-300/80 italic font-serif">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>&ldquo;Dan cinta ini akan terus bertambah selamanya, dan selamat ulang tahun yang ke-14 cintaku.&rdquo;</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
