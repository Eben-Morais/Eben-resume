import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowDownToLine, Sun, Moon } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const navItems = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

function Navbar({ darkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);

  // ── 1. Throttled scroll detection via requestAnimationFrame (zero forced reflows) ──
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPastThreshold = window.scrollY > 20;
          if (isPastThreshold !== scrolledRef.current) {
            scrolledRef.current = isPastThreshold;
            setScrolled(isPastThreshold);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── 2. Decoupled scroll-spy via IntersectionObserver (replaces querySelector + offsetTop) ──
  useEffect(() => {
    const sectionElements = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className="sticky top-0 z-50 w-full transition-colors duration-200"
      style={{
        background: scrolled
          ? 'rgba(15, 15, 23, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand */}
        <a
          href="#top"
          className="flex items-center gap-2.5 group focus-visible:outline-none rounded py-1 px-1.5"
          aria-label="Eben Morais, return to top"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            E
          </div>
          <span
            className="text-sm font-semibold tracking-tight transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            {portfolioData.personal.shortName}
          </span>
        </a>

        {/*
          Desktop nav links are intentionally hidden here on md+ —
          section navigation is handled by the RadialNav component.
          Mobile hamburger drawer (below) provides navigation on small screens.
        */}

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all focus-visible:outline-none"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Sun className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Moon className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>

          {/* CV Download */}
          <a
            href={portfolioData.contact.cvFile}
            download="Eben_Morais_CV.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all focus-visible:outline-none"
            style={{
              background: 'var(--accent-softer)',
              border: '1px solid var(--border-accent)',
              color: 'var(--accent)',
            }}
          >
            <ArrowDownToLine className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all focus-visible:outline-none"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <X className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div className="px-4 py-4">
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
                      style={{
                        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                        background: isActive ? 'var(--accent-softer)' : 'transparent',
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              <div className="pt-3 mt-3" style={{ borderTop: '1px solid var(--border)' }}>
                <a
                  href={portfolioData.contact.cvFile}
                  download="Eben_Morais_CV.pdf"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: 'var(--accent-softer)',
                    border: '1px solid var(--border-accent)',
                    color: 'var(--accent)',
                  }}
                >
                  <ArrowDownToLine className="w-4 h-4" aria-hidden="true" />
                  <span>Download Resume (PDF)</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default memo(Navbar);
