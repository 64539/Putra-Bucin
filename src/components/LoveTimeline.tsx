'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Coffee,
  Calendar,
  Stars,
  BookmarkCheck,
  Disc
} from 'lucide-react';
import { TIMELINE_MILESTONES } from '@/data/romanticData';

export default function LoveTimeline() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-rose-300" />;
      case 'coffee':
        return <Coffee className="w-4 h-4 text-amber-300" />;
      case 'ring':
        return <Heart className="w-4 h-4 text-rose-200 fill-rose-500" />;
      case 'heart':
        return <Heart className="w-4 h-4 text-pink-400" />;
      case 'stars':
        return <Stars className="w-4 h-4 text-yellow-300" />;
      default:
        return <Heart className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <section className="w-full my-12 px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <span className="text-[11px] uppercase tracking-widest text-rose-400 font-semibold bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/20 inline-flex items-center gap-1.5">
          <Calendar className="w-3 h-3 text-rose-300" /> Kilas Balik
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-rose-50 mt-2">
          Timeline Cinta Kita
        </h2>
        <p className="text-xs text-rose-300/70 mt-1 max-w-xs mx-auto">
          Setiap detik bersamamu adalah lembaran indah yang tak terlupakan
        </p>
      </motion.div>

      {/* Vertical Timeline Container */}
      <div className="relative max-w-md mx-auto pl-6 sm:pl-8">
        {/* Continuous Glowing Vertical Line */}
        <div className="absolute left-[15px] sm:left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-rose-500/80 via-pink-500/50 to-purple-600/20" />

        <div className="space-y-8">
          {TIMELINE_MILESTONES.map((item, index) => {
            const isAnniversary = item.tag === 'Anniversary';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
                className="relative pl-6 sm:pl-8 group"
              >
                {/* Node Icon on Timeline Line */}
                <div
                  className={`absolute -left-[15px] sm:-left-[19px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isAnniversary
                      ? 'bg-gradient-to-tr from-rose-600 to-pink-500 border-white shadow-lg shadow-rose-900/80 scale-110 animate-pulse'
                      : 'bg-[#1e0a27] border-rose-500/40 shadow-md shadow-black/50 group-hover:border-rose-400'
                  }`}
                >
                  {getIcon(item.iconName)}
                </div>

                {/* Milestone Card */}
                <div
                  className={`p-4 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                    isAnniversary
                      ? 'bg-gradient-to-br from-[#2e0e37]/90 via-[#230b2b]/90 to-[#19061f]/95 border-rose-400/50 shadow-xl shadow-rose-950/60 ring-1 ring-rose-400/30'
                      : 'bg-[#1a0724]/70 border-rose-500/20 hover:border-rose-500/40 shadow-lg shadow-black/40'
                  }`}
                >
                  {/* Top Tag & Date */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                        isAnniversary
                          ? 'bg-rose-500 text-white shadow-sm'
                          : 'bg-rose-950/60 text-rose-300 border border-rose-500/20'
                      }`}
                    >
                      {item.tag}
                    </span>
                    <span className="text-[10px] font-mono text-rose-300/80">
                      {item.date}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className={`font-serif font-bold text-sm sm:text-base ${
                      isAnniversary ? 'text-rose-200' : 'text-rose-100'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-rose-400/80 italic font-medium -mt-0.5 mb-2">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-rose-200/80 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
