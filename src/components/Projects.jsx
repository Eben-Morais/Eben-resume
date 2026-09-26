import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import {
  ArrowUpRight,
  Cpu, Wifi, Database, LayoutDashboard, Bell, Activity,
  CheckCircle2, UserPlus, Dumbbell, BarChart2,
  Github,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// ── Individual project card ────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0px', '0px'] : ['-10px', '10px']
  );

  const accentColors = [
    { from: '#6366f1', to: '#8b5cf6' },
    { from: '#06b6d4', to: '#6366f1' },
  ];
  const { from, to } = accentColors[index % accentColors.length];

  return (
    <motion.article
      ref={containerRef}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Gradient accent header bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
        aria-hidden="true"
      />

      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left: Project details */}
          <motion.div
            style={{ y, willChange: 'transform' }}
            className={`lg:col-span-5 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} space-y-5`}
          >
            {/* Category + index */}
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-mono font-bold tracking-widest uppercase"
                style={{ color: 'var(--accent)' }}
              >
                {`0${index + 1}`}
              </span>
              <span style={{ color: 'var(--border-strong)' }}>·</span>
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                {project.category}
              </span>
            </div>

            <h3
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{
                fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                color: 'var(--text-primary)',
              }}
            >
              {project.title}
            </h3>

            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.description}
            </p>

            {project.points && project.points.length > 0 && (
              <ul className="space-y-2">
                {project.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: 'var(--accent)', opacity: 0.8 }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tIdx) => (
                <span key={tIdx} className="skill-pill">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action button or note */}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex w-fit"
                aria-label={`View repository for ${project.title} on GitHub (opens in new tab)`}
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span>View Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            ) : project.note ? (
              <div
                className="flex items-center gap-2 text-xs font-mono rounded-lg px-3 py-2"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'var(--text-muted)' }}
                  aria-hidden="true"
                />
                <span>{project.note}</span>
              </div>
            ) : null}
          </motion.div>

          {/* Right: Visual architecture diagram */}
          <div className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
            {index === 0 ? (
              // Vehicle Pollution Monitoring — IoT Flow Diagram
              <div
                className="rounded-xl p-6 sm:p-7 font-mono text-xs"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between pb-4 mb-5 text-xs"
                  style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}
                >
                  <span className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <Activity className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    SYSTEM ARCHITECTURE // IoT FLOW
                  </span>
                  <span>ESP32 + WI-FI</span>
                </div>

                {/* Flow nodes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    { icon: Cpu, label: 'ESP32', sub: 'Sensor Ingestion' },
                    { icon: Wifi, label: 'Wi-Fi Stream', sub: 'Telemetry Push' },
                    { icon: Database, label: 'SQL Database', sub: 'Persistent Storage' },
                    { icon: LayoutDashboard, label: 'Dashboard', sub: 'Analytics View' },
                  ].map(({ icon: Icon, label, sub }, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl flex flex-col items-center justify-center gap-2 text-center"
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                      <span className="font-semibold text-[11px]" style={{ color: 'var(--text-primary)' }}>{label}</span>
                      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{sub}</span>
                    </div>
                  ))}
                </div>

                {/* Arrow connectors */}
                <div
                  className="flex items-center justify-center gap-1 mb-5 text-[10px] tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                  aria-hidden="true"
                >
                  {['INGEST', '→', 'STREAM', '→', 'STORE', '→', 'VISUALIZE'].map((step, i) => (
                    <span
                      key={i}
                      style={{ color: step === '→' ? 'var(--accent)' : 'var(--text-muted)' }}
                    >
                      {step}
                    </span>
                  ))}
                </div>

                {/* Alert logic */}
                <div
                  className="p-3.5 rounded-xl flex items-center gap-3"
                  style={{
                    background: 'var(--accent-softer)',
                    border: '1px solid var(--border-accent)',
                  }}
                >
                  <Bell className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  <span className="leading-relaxed text-[11px] sm:text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Automated owner notification trigger: executes when sensor readings surpass applicable legal emission limits.
                  </span>
                </div>
              </div>
            ) : (
              // Fitness Tracking Website — Module breakdown
              <div
                className="rounded-xl p-6 sm:p-7 font-mono text-xs"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between pb-4 mb-5 text-xs"
                  style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}
                >
                  <span className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    CORE MODULES // USER WORKFLOW
                  </span>
                  <span>WEB APPLICATION</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                  {[
                    { icon: UserPlus, num: '01', title: 'User Registration', desc: 'Account authentication and structured profile creation.' },
                    { icon: Dumbbell, num: '02', title: 'Workout Logging', desc: 'Daily activity recording and exercise logging entries.' },
                    { icon: BarChart2, num: '03', title: 'Progress Reports', desc: 'Periodic review views across ongoing training journeys.' },
                  ].map(({ icon: Icon, num, title, desc }) => (
                    <div
                      key={num}
                      className="p-4 rounded-xl flex flex-col gap-2"
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>MODULE {num}</span>
                      </div>
                      <strong className="block text-sm font-sans" style={{ color: 'var(--text-primary)' }}>
                        {title}
                      </strong>
                      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className="text-[11px] flex items-center justify-between pt-3"
                  style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}
                >
                  <span>FRONTEND STACK: HTML / CSS / JAVASCRIPT</span>
                  <span>OPEN SOURCE REPOSITORY</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </motion.article>
  );
}

const MemoizedProjectCard = memo(ProjectCard);

// ── Main Projects section ──────────────────────────────────────────────────────
function Projects() {
  const projects = portfolioData.projects;
  if (!projects || projects.length === 0) return null;

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="py-24 sm:py-32 relative"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="projects-title"
          eyebrow="04 // Featured Projects"
          title="Projects connecting software with practical user outcomes."
          description="Academic and web builds presenting only CV-documented architecture and verified repositories."
        />

        <div className="space-y-6">
          {projects.map((project, idx) => (
            <MemoizedProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Projects);
