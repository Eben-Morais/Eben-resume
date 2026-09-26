import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { portfolioData } from '../data/portfolioData';
import { MapPin, GraduationCap, Star, Globe } from 'lucide-react';

const factIcons = {
  Location: MapPin,
  Education: GraduationCap,
  Honors: Star,
  'Current CGPA': Star,
  'Primary focus': Globe,
  Languages: Globe,
};

function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="py-24 sm:py-32 relative"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="about-title"
          eyebrow="01 // About"
          title="Learning across the stack, one practical build at a time."
          description="A grounded introduction for engineering teams, hiring managers, and collaborators."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Biography */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.06 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {portfolioData.personal.bio.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: idx === 0 ? 'var(--text-secondary)' : 'var(--text-muted)', lineHeight: '1.85' }}
              >
                {paragraph}
              </p>
            ))}

            {/* Highlights row */}
            <div className="flex flex-wrap gap-3 pt-4">
              {portfolioData.personal.highlights.map((h, idx) => (
                <div
                  key={idx}
                  className="flex items-baseline gap-1.5 px-4 py-2 rounded-lg"
                  style={{
                    background: 'var(--accent-softer)',
                    border: '1px solid var(--border-accent)',
                  }}
                >
                  <span
                    className="text-lg font-bold"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                      color: 'var(--accent)',
                    }}
                  >
                    {h.value}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {h.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Specification card */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.06 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div
              className="rounded-2xl p-6 sm:p-7"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              {/* Card header */}
              <div
                className="flex items-center gap-2 pb-4 mb-4 text-xs font-mono font-semibold tracking-widest uppercase"
                style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--accent)' }}
                  aria-hidden="true"
                />
                CANDIDATE PROFILE
              </div>

              <dl className="space-y-0">
                {portfolioData.personal.facts.map((fact, idx) => {
                  const Icon = factIcons[fact.label];
                  return (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-4 py-3"
                      style={{
                        borderBottom: idx < portfolioData.personal.facts.length - 1 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <dt
                        className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase flex-shrink-0"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {Icon && <Icon className="w-3 h-3" aria-hidden="true" style={{ color: 'var(--accent)', opacity: 0.7 }} />}
                        {fact.label}
                      </dt>
                      <dd
                        className="text-sm font-medium text-right"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {fact.value}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default memo(About);
