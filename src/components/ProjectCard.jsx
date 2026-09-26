import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Info } from 'lucide-react';
import { getCardHoverProps } from '../utils/motion';

export default function ProjectCard({ project }) {
  const shouldReduceMotion = useReducedMotion();
  const hoverProps = getCardHoverProps(shouldReduceMotion);

  return (
    <motion.article
      {...hoverProps}
      className="glass-surface-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full"
    >
      <div>
        {/* Category & Title */}
        {project.category && (
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-400 mb-2">
            {project.category}
          </p>
        )}
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight mb-3">
          {project.title}
        </h3>

        {/* Project Description */}
        {project.description && (
          <p className="text-zinc-300 text-sm leading-relaxed mb-4">
            {project.description}
          </p>
        )}

        {/* Bullet Points */}
        {project.points && project.points.length > 0 && (
          <ul className="space-y-2 mb-6 text-xs sm:text-sm text-zinc-400">
            {project.points.map((point, pIdx) => (
              <li key={pIdx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400/80 mt-1.5 flex-shrink-0" aria-hidden="true" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/60 mb-5">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Note if links omitted */}
        {project.note && !project.github && !project.demo && (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-800/40 border border-zinc-800/60 text-xs text-zinc-400">
            <Info className="w-4 h-4 text-zinc-500 flex-shrink-0" aria-hidden="true" />
            <span>{project.note}</span>
          </div>
        )}

        {/* Project Links (Strictly rendered only if present) */}
        {(project.github || project.demo) && (
          <div className="flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-medium border border-zinc-700/50 hover:border-teal-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                aria-label={`View repository for ${project.title} on GitHub (opens in new tab)`}
              >
                <Github className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
                <span>View repository</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-zinc-950 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                aria-label={`Live demo for ${project.title} (opens in new tab)`}
              >
                <span>Live demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
