import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Building, MapPin } from 'lucide-react';
import { getCardHoverProps } from '../utils/motion';

export default function ExperienceCard({ entry }) {
  const shouldReduceMotion = useReducedMotion();
  const hoverProps = getCardHoverProps(shouldReduceMotion);

  return (
    <motion.article
      {...hoverProps}
      className="glass-surface-hover rounded-2xl p-6 sm:p-7 relative transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
        <h3 className="text-lg sm:text-xl font-bold text-zinc-100 tracking-tight">
          {entry.role}
        </h3>
        {entry.period && (
          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-md w-fit">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            {entry.period}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 mb-4 font-medium">
        <span className="inline-flex items-center gap-1.5 text-zinc-300">
          <Building className="w-3.5 h-3.5 text-teal-400/80" aria-hidden="true" />
          {entry.company}
        </span>
        {entry.location && (
          <span className="inline-flex items-center gap-1 text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
            {entry.location}
          </span>
        )}
        {entry.type && (
          <span className="text-zinc-500">
            • {entry.type}
          </span>
        )}
      </div>

      {entry.responsibilities && entry.responsibilities.length > 0 && (
        <ul className="space-y-2 mb-5 text-sm text-zinc-300">
          {entry.responsibilities.map((resp, rIdx) => (
            <li key={rIdx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400/70 mt-2 flex-shrink-0" aria-hidden="true" />
              <span className="leading-relaxed">{resp}</span>
            </li>
          ))}
        </ul>
      )}

      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/60">
          {entry.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-zinc-800/50 text-zinc-400 border border-zinc-750"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}
