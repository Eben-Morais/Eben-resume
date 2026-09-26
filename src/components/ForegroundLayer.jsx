import React, { memo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

function ForegroundLayer() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const foregroundY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0px', '0px'] : ['0px', '-45px']
  );

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      <motion.div
        style={{ y: foregroundY, willChange: 'transform' }}
        className="relative w-full h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 hidden xl:block"
      >
        {/* Corner accent — top right */}
        <div
          className="absolute top-28 -right-8 w-6 h-6 border-t border-r"
          style={{ borderColor: 'var(--border)' }}
        />

        {/* Monospace depth marker — mid left */}
        <div
          className="absolute top-[35%] -left-12 flex items-center gap-2 -rotate-90 origin-left text-[10px] font-mono tracking-widest uppercase"
          style={{ color: 'var(--text-faint)', opacity: 0.5 }}
        >
          <span className="w-4 h-[1px]" style={{ background: 'var(--border)' }} />
          <span>SYS.INDEX</span>
        </div>

        {/* Corner accent — lower left */}
        <div
          className="absolute top-[68%] -left-8 w-6 h-6 border-b border-l"
          style={{ borderColor: 'var(--border)' }}
        />
      </motion.div>
    </div>
  );
}

export default memo(ForegroundLayer);
