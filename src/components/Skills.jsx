import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { portfolioData } from '../data/portfolioData';
import { Code2, Globe, Server, Database, Cpu, BookOpen } from 'lucide-react';
import { getBentoStagger, getBentoItem } from '../utils/motion';

const categoryIcons = [Code2, Globe, Server, Database, Cpu, BookOpen];

// Bento layout: first 2 cards wider, then 2+2
const cardSizes = [
  'md:col-span-3', // wide
  'md:col-span-3', // wide
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-6',  // full-width last
];

const staggerContainer = getBentoStagger(0.07);

function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const bentoItem = getBentoItem(shouldReduceMotion);

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="py-24 sm:py-32 relative"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="skills-title"
          eyebrow="02 // Technical Matrix"
          title="A practical toolkit for web and software development."
          description="Skills organized by technical discipline — no artificial proficiency percentages."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.04 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4"
        >
          {portfolioData.skills.map((group, idx) => {
            const Icon = categoryIcons[idx] || Code2;
            const colSpan = cardSizes[idx] || 'md:col-span-2';

            return (
              <motion.div
                key={idx}
                variants={bentoItem}
                className={`bento-card ${colSpan}`}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-softer)', border: '1px solid var(--border-accent)' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  </div>
                  <div>
                    <p
                      className="text-[10px] font-mono font-semibold tracking-widest uppercase mb-0.5"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {`0${idx + 1}`}
                    </p>
                    <h3
                      className="text-sm font-semibold leading-tight"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {group.category}
                    </h3>
                  </div>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      className="skill-pill cursor-default"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -1 }}
                      transition={{ duration: 0.15 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Skills);
