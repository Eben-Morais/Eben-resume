import React, { memo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

function BackgroundLayer({ darkMode }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const orb1Y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0px', '0px'] : ['0px', '80px']
  );
  const orb2Y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0px', '0px'] : ['0px', '120px']
  );
  const orb3Y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0px', '0px'] : ['0px', '-60px']
  );

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── Mesh gradient base ─────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(139,92,246,0.06) 0%, transparent 50%), var(--bg-base)'
            : 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(79,70,229,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(124,58,237,0.04) 0%, transparent 50%), var(--bg-base)',
        }}
      />

      {/* ── Primary ambient orb — top left (GPU promoted via will-change) ── */}
      <motion.div
        style={{ y: orb1Y, willChange: 'transform' }}
        className="absolute -top-48 -left-48 rounded-full"
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.08, 1],
                opacity: [0.55, 0.75, 0.55],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div
          className="w-[42rem] h-[42rem] rounded-full blur-[100px]"
          style={{
            background: darkMode
              ? 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.06) 60%, transparent 100%)'
              : 'radial-gradient(circle, rgba(79,70,229,0.1) 0%, rgba(124,58,237,0.04) 60%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* ── Secondary ambient orb — bottom right (GPU promoted via will-change) ── */}
      <motion.div
        style={{ y: orb2Y, willChange: 'transform' }}
        className="absolute -bottom-48 -right-48 rounded-full"
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        aria-hidden="true"
      >
        <div
          className="w-[38rem] h-[38rem] rounded-full blur-[120px]"
          style={{
            background: darkMode
              ? 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, rgba(99,102,241,0.04) 60%, transparent 100%)'
              : 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, rgba(79,70,229,0.03) 60%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* ── Tertiary orb — mid-page accent (GPU promoted via will-change) ── */}
      <motion.div
        style={{ y: orb3Y, willChange: 'transform' }}
        className="absolute top-[35%] left-[55%] -translate-x-1/2 rounded-full"
        aria-hidden="true"
      >
        <div
          className="w-[28rem] h-[28rem] rounded-full blur-[140px]"
          style={{
            background: darkMode
              ? 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(79,70,229,0.04) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* ── Subtle dot grid pattern ─────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle, ${darkMode ? '#818cf8' : '#4f46e5'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Vertical layout guide rails ─────────────────────────────── */}
      <div className="absolute inset-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between pointer-events-none">
        <div
          className="w-[1px] h-full opacity-[0.06]"
          style={{ background: `linear-gradient(to bottom, transparent 0%, ${darkMode ? '#818cf8' : '#4f46e5'} 30%, ${darkMode ? '#818cf8' : '#4f46e5'} 70%, transparent 100%)` }}
        />
        <div
          className="w-[1px] h-full opacity-[0.06]"
          style={{ background: `linear-gradient(to bottom, transparent 0%, ${darkMode ? '#818cf8' : '#4f46e5'} 30%, ${darkMode ? '#818cf8' : '#4f46e5'} 70%, transparent 100%)` }}
        />
      </div>
    </div>
  );
}

export default memo(BackgroundLayer);
