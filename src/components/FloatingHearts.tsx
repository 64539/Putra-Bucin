'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  symbol: string;
}

export default function FloatingHearts() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate gentle romantic ambient particles
    const symbols = ['❤️', '✨', '🌸', '💖', '💕', '⭐'];
    const items: Particle[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      size: Math.random() * 14 + 10, // 10px to 24px
      duration: Math.random() * 10 + 12, // 12s to 22s
      delay: Math.random() * 8,
      opacity: Math.random() * 0.45 + 0.15,
      symbol: symbols[Math.floor(Math.random() * symbols.length)]
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-900/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute top-3/4 left-1/3 w-80 h-80 bg-purple-900/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-pink-900/15 rounded-full blur-2xl pointer-events-none" />

      {/* Floating gentle particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none will-change-transform"
          style={{
            left: `${p.x}%`,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            filter: 'drop-shadow(0 0 6px rgba(244,63,94,0.4))'
          }}
        >
          {p.symbol}
        </span>
      ))}

      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.6;
          }
          85% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
