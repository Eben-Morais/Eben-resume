import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { portfolioData } from '../data/portfolioData';
import { getTimelineNodeAnimate } from '../utils/motion';

function Experience() {
  const experiences = portfolioData.experience;
  const shouldReduceMotion = useReducedMotion();
  const nodeAnimate = getTimelineNodeAnimate(shouldReduceMotion);

  if (!experiences || experiences.length === 0) return null;

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="py-24 sm:py-32 relative"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="experience-title"
          eyebrow="03 // Experience"
          title="Industrial training across backend and front-end development."
          description="Practical exposure presented without overstating entry-level responsibilities."
        />

        {/* Timeline */}
        <div className="relative">
          {/* Timeline rail */}
          <div
            className="absolute left-[11px] sm:left-[15px] top-0 bottom-0 w-[2px] rounded-full"
            style={{
              background: 'linear-gradient(to bottom, var(--accent) 0%, var(--accent-violet) 40%, transparent 100%)',
              opacity: 0.35,
            }}
            aria-hidden="true"
          />

          <div className="space-y-8">
            {experiences.map((entry, idx) => (
              <div key={idx} className="flex gap-6 sm:gap-8">

                {/* Node */}
                <div className="flex flex-col items-center flex-shrink-0 pt-6">
                  <motion.div
                    {...nodeAnimate}
                    className="relative z-10"
                    aria-hidden="true"
                  >
                    {/* Outer pulsing ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'var(--accent)',
                        opacity: 0.25,
                      }}
                      animate={shouldReduceMotion ? {} : {
                        scale: [1, 1.7, 1],
                        opacity: [0.25, 0, 0.25],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: idx * 0.5,
                      }}
                    />
                    {/* Inner dot */}
                    <div
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center"
                      style={{
                        background: 'var(--bg-base)',
                        borderColor: 'var(--accent)',
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--accent)' }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Content card */}
                <motion.article
                  initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.06 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 pb-8"
                >
                  <div
                    className="rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                  >
                    {/* Period badge + type */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold"
                        style={{
                          background: 'var(--accent-softer)',
                          border: '1px solid var(--border-accent)',
                          color: 'var(--accent)',
                        }}
                      >
                        {entry.period}
                      </span>
                      {entry.type && (
                        <span
                          className="text-xs font-mono"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {entry.type}
                        </span>
                      )}
                      {entry.location && (
                        <span
                          className="text-xs font-mono"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          · {entry.location}
                        </span>
                      )}
                    </div>

                    {/* Role & Company */}
                    <h3
                      className="text-xl sm:text-2xl font-bold tracking-tight mb-1"
                      style={{
                        fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {entry.role}
                    </h3>
                    <p
                      className="text-sm font-medium mb-5"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {entry.company}
                    </p>

                    {/* Responsibilities */}
                    {entry.responsibilities && entry.responsibilities.length > 0 && (
                      <ul className="space-y-2.5 mb-5">
                        {entry.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-3">
                            <span
                              className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: 'var(--accent)', opacity: 0.7 }}
                              aria-hidden="true"
                            />
                            <span
                              className="text-sm leading-relaxed"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              {resp}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech tags */}
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="skill-pill text-[11px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default memo(Experience);
