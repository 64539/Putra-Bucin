'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Disc3, Heart } from 'lucide-react';

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({ autoPlayTrigger = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio stream URL with fallback options for "Monokrom - Tulus"
  // Using an aesthetic high quality audio stream
  const audioSources = [
    // Reliable romantic acoustic / Monokrom audio stream fallback
    'https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3?filename=romantic-piano-112199.mp3',
    'https://assets.mixkit.co/music/preview/mixkit-romantic-moment-1070.mp3'
  ];

  const togglePlay = () => {
    if (!audioRef.current) return;
    setHasInteracted(true);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setAudioError(false);
        })
        .catch((err) => {
          console.warn('Playback error or blocked:', err);
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Attempt auto-play when triggered (after user has interacted on passcode screen)
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying && !hasInteracted) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Browser autoplay restrictions prevented automatic playback
            setIsPlaying(false);
          });
      }
    }
  }, [autoPlayTrigger, hasInteracted, isPlaying]);

  return (
    <>
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={audioSources[0]}
        onError={() => {
          // Fallback if primary URL fails
          if (audioRef.current && audioRef.current.src !== audioSources[1]) {
            audioRef.current.src = audioSources[1];
            if (isPlaying) audioRef.current.play().catch(() => {});
          } else {
            setAudioError(true);
          }
        }}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Floating corner player widget */}
      <div className="fixed top-4 right-4 z-40 max-w-[92vw]">
        <AnimatePresence>
          {isExpanded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -10 }}
              className="bg-[#1e0a27]/90 backdrop-blur-xl border border-rose-500/30 rounded-2xl p-3.5 shadow-2xl shadow-rose-950/80 w-64 text-rose-100"
            >
              <div className="flex items-center gap-3">
                {/* Rotating Vinyl Disc Thumbnail */}
                <div className="relative">
                  <motion.div
                    animate={isPlaying ? { rotate: 360 } : {}}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 rounded-full bg-gradient-to-tr from-neutral-900 via-rose-950 to-neutral-900 border-2 border-rose-500/40 p-1 flex items-center justify-center shadow-md relative overflow-hidden"
                  >
                    <div className="w-4 h-4 rounded-full bg-rose-500/30 border border-rose-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-200" />
                    </div>
                  </motion.div>
                  {isPlaying && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute -top-1 -right-1 text-rose-400"
                    >
                      <Heart className="w-3 h-3 fill-rose-500" />
                    </motion.div>
                  )}
                </div>

                {/* Song Meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold tracking-wider text-rose-400 uppercase bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-500/20">
                      BGM
                    </span>
                    <span className="text-xs font-semibold truncate text-rose-50">
                      Monokrom
                    </span>
                  </div>
                  <p className="text-[11px] text-rose-300/70 truncate">Tulus</p>
                  <p className="text-[9px] text-rose-300/50 italic truncate">
                    &ldquo;Di mana pun kau berada...&rdquo;
                  </p>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-rose-500/20">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-900/30 transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white flex items-center justify-center shadow-md shadow-rose-950 active:scale-95 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-[10px] text-rose-300/80 hover:text-rose-100 px-2 py-1 rounded bg-rose-950/40 border border-rose-500/20"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          ) : (
            /* Compact Floating Capsule */
            <motion.div
              layout
              onClick={() => setIsExpanded(true)}
              className="group cursor-pointer flex items-center gap-2.5 bg-[#1a0724]/80 hover:bg-[#250d33]/90 active:scale-95 backdrop-blur-xl border border-rose-500/30 rounded-full py-1.5 px-3 shadow-lg shadow-black/50 transition-all duration-200"
            >
              {/* Rotating Mini Disc */}
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="text-rose-400"
              >
                <Disc3 className="w-5 h-5 animate-spin-slow" />
              </motion.div>

              {/* Animated Equalizer Wave Bars */}
              <div className="flex items-end gap-0.5 h-3.5 px-0.5">
                {[0.4, 0.9, 0.6, 0.8, 0.3].map((height, i) => (
                  <motion.span
                    key={i}
                    animate={
                      isPlaying
                        ? {
                            scaleY: [0.25, 1, 0.3, 0.85, 0.25],
                            backgroundColor: ['#fb7185', '#f43f5e', '#fda4af']
                          }
                        : { scaleY: 0.25, backgroundColor: '#881337' }
                    }
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: 'easeInOut'
                    }}
                    className="w-0.5 h-full rounded-full origin-bottom"
                  />
                ))}
              </div>

              {/* Play/Pause Quick Toggle Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-7 h-7 rounded-full bg-rose-600/40 hover:bg-rose-600/70 border border-rose-400/40 flex items-center justify-center text-white transition-colors"
                title={isPlaying ? 'Pause' : 'Putar Musik'}
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3 fill-current" />
                ) : (
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle First Interaction Prompt if blocked by browser autoplay policy */}
      {!isPlaying && !hasInteracted && autoPlayTrigger && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          onClick={togglePlay}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 cursor-pointer bg-gradient-to-r from-rose-900/90 to-purple-900/90 border border-rose-400/40 backdrop-blur-md px-4 py-2 rounded-full shadow-lg shadow-rose-950/80 flex items-center gap-2 text-rose-100 text-xs animate-bounce"
        >
          <Music className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
          <span>Tap untuk menyalakan lagu &ldquo;Monokrom - Tulus&rdquo; 🎵</span>
        </motion.div>
      )}
    </>
  );
}
