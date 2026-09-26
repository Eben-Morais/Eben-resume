import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { portfolioData } from '../data/portfolioData';
import { Check, Award, GraduationCap } from 'lucide-react';
import { getBentoStagger, getBentoItem } from '../utils/motion';

const stagger = getBentoStagger(0.1);

function Education() {
  const shouldReduceMotion = useReducedMotion();
  const item = getBentoItem(shouldReduceMotion);

  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="py-24 sm:py-32 relative"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="education-title"
          eyebrow="05 // Credentials"
          title="A Computer Engineering foundation with AI/ML honors."
          description="Academic qualifications alongside verified certifications in algorithms, security, and AI."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Academic Background */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.06 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            {/* Section label */}
            <div
              className="flex items-center gap-2.5 mb-6 pb-4 text-xs font-mono font-semibold tracking-widest uppercase"
              style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              <GraduationCap className="w-3.5 h-3.5" style={{ color: 'var(--accent)', opacity: 0.8 }} aria-hidden="true" />
              Academic Background
            </div>

            {/* Timeline-style education list */}
            <div className="relative pl-5 border-l-2" style={{ borderColor: 'var(--border-accent)', opacity: 1 }}>
              <div className="space-y-8">
                {portfolioData.education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.04 }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    {/* Node dot */}
                    <div
                      className="absolute -left-[25px] top-1.5 w-3.5 h-3.5 rounded-full border-2"
                      style={{ background: 'var(--bg-base)', borderColor: 'var(--accent)' }}
                      aria-hidden="true"
                    />

                    <div
                      className="rounded-xl p-5 transition-all duration-300"
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-accent)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >
                      <div
                        className="flex items-center justify-between gap-2 mb-2 text-xs font-mono"
                      >
                        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{edu.period}</span>
                        {edu.score && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px]"
                            style={{
                              background: 'var(--accent-softer)',
                              border: '1px solid var(--border-accent)',
                              color: 'var(--accent)',
                            }}
                          >
                            {edu.score}
                          </span>
                        )}
                      </div>

                      <h4
                        className="text-base font-bold tracking-tight mb-1"
                        style={{
                          fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {edu.degree}
                      </h4>
                      <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                        {edu.institution}
                      </p>

                      {edu.honors && (
                        <div
                          className="inline-flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded-full"
                          style={{
                            background: 'var(--accent-softer)',
                            color: 'var(--accent)',
                          }}
                        >
                          <Award className="w-3 h-3" aria-hidden="true" />
                          Honors: {edu.honors}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Certifications */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.06 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div
              className="flex items-center gap-2.5 mb-6 pb-4 text-xs font-mono font-semibold tracking-widest uppercase"
              style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              <Award className="w-3.5 h-3.5" style={{ color: 'var(--accent)', opacity: 0.8 }} aria-hidden="true" />
              Technical Certifications
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.04 }}
              className="space-y-3"
            >
              {portfolioData.certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  variants={item}
                  className="rounded-xl p-5 flex items-start gap-4 transition-all duration-300"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-accent)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Check badge */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-softer)', border: '1px solid var(--border-accent)' }}
                  >
                    <Check className="w-4 h-4" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <span
                        className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: 'var(--accent-softer)',
                          color: 'var(--accent)',
                        }}
                      >
                        {cert.issuer}
                      </span>
                      <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                        {cert.date}
                      </span>
                    </div>
                    <h4
                      className="text-sm font-semibold mb-0.5"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {cert.name}
                    </h4>
                    <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                      {cert.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default memo(Education);
