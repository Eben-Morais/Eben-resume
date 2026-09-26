import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDownToLine, Mail, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { scrollToSection } from '../utils/scroll';

const stats = [
  { value: `${portfolioData.experience.length}`, label: 'Industrial Traineeships' },
  { value: `${portfolioData.projects.length}`, label: 'Engineered Projects' },
  { value: `${portfolioData.certifications.length}`, label: 'Certifications' },
  { value: '2026', label: 'B.E. Graduation' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative pt-24 pb-28 sm:pt-32 sm:pb-36 lg:pt-40 lg:pb-44 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* Availability Badge */}
          <motion.div variants={itemVariants} className="mb-10">
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-medium"
              style={{
                background: 'var(--accent-softer)',
                border: '1px solid var(--border-accent)',
                color: 'var(--accent)',
              }}
            >
              <span
                className="relative flex w-2 h-2"
              >
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ background: 'var(--accent)' }}
                />
                <span
                  className="relative inline-flex rounded-full w-2 h-2"
                  style={{ background: 'var(--accent)' }}
                />
              </span>
              <span>{portfolioData.personal.availability}</span>
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.0] mb-5"
              style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif' }}
            >
              <span style={{ color: 'var(--text-primary)' }}>Eben Artizio </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-violet) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 300,
                }}
              >
                Morais
              </span>
            </h1>

            {/* Roles */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {portfolioData.personal.roles.map((role, idx) => (
                <React.Fragment key={role}>
                  <span
                    className="font-mono text-sm sm:text-base font-medium"
                    style={{ color: 'var(--accent)' }}
                  >
                    {role}
                  </span>
                  {idx < portfolioData.personal.roles.length - 1 && (
                    <span
                      className="text-sm"
                      aria-hidden="true"
                      style={{ color: 'var(--text-faint)' }}
                    >
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed mb-12"
            style={{ color: 'var(--text-secondary)' }}
          >
            {portfolioData.personal.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 mb-24 sm:mb-28"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects', '#projects');
              }}
              className="btn-primary"
              style={{ fontFamily: 'inherit' }}
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href={portfolioData.contact.cvFile}
              download="Eben_Morais_CV.pdf"
              className="btn-secondary"
            >
              <ArrowDownToLine className="w-4 h-4" aria-hidden="true" />
              <span>Download CV</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all"
              style={{ color: 'var(--text-muted)' }}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Contact</span>
            </a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="glass-card rounded-xl p-5 flex flex-col"
              >
                <span
                  className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-1"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                    background: 'linear-gradient(135deg, var(--text-primary), var(--accent))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {item.value}
                </span>
                <span
                  className="text-xs font-mono uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default memo(Hero);
