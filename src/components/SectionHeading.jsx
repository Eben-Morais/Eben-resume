import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function SectionHeading({ eyebrow, title, description, id }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14 sm:mb-16 lg:mb-20"
    >
      {eyebrow && (
        <div
          className="flex items-center gap-2.5 mb-4 text-xs font-mono font-semibold tracking-widest uppercase"
          style={{ color: 'var(--accent)' }}
        >
          <span
            className="w-6 h-[1px]"
            style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }}
            aria-hidden="true"
          />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2
        id={id}
        className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]"
        style={{
          fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif',
          background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent) 120%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          className="text-sm sm:text-base max-w-2xl mt-4 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </p>
      )}

      {/* Decorative accent rule */}
      <div className="flex items-center gap-3 mt-7" aria-hidden="true">
        <div
          className="h-[2px] w-10 rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-violet))' }}
        />
        <div
          className="h-[1px] w-6 rounded-full"
          style={{ background: 'var(--border-strong)', opacity: 0.5 }}
        />
      </div>
    </motion.header>
  );
}

export default memo(SectionHeading);
