import React, { memo } from 'react';
import { portfolioData } from '../data/portfolioData';
import { scrollToSection } from '../utils/scroll';

const footerLinks = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative py-10"
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Gradient top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-violet), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              E
            </div>
            <div>
              <p
                className="text-sm font-semibold leading-tight"
                style={{ color: 'var(--text-primary)', fontFamily: '"Plus Jakarta Sans", Inter, sans-serif' }}
              >
                {portfolioData.personal.name}
              </p>
              <p
                className="text-xs font-mono leading-tight"
                style={{ color: 'var(--text-muted)' }}
              >
                {portfolioData.personal.roles.join(' · ')}
              </p>
            </div>
          </div>

          {/* Navigation links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {footerLinks.map(({ label, href, id }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id, href);
                }}
                className="text-xs font-medium transition-colors focus-visible:outline-none"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p
            className="text-xs font-mono"
            style={{ color: 'var(--text-muted)' }}
          >
            © {currentYear}
          </p>

        </div>

      </div>
    </footer>
  );
}

export default memo(Footer);
