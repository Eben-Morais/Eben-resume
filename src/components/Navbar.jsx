import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowDownToLine, Sun, Moon } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { scrollToSection } from '../utils/scroll';

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

  // ── 2. Close mobile drawer on resize to desktop (>= 1000px) ────────────────
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1000) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── 3. Decoupled scroll-spy via IntersectionObserver ───────────────────────
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
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('top', '#top');
          }}
          className="flex items-center gap-2.5 group focus-visible:outline-none rounded py-1 px-1.5"
          aria-label="Eben Morais, return to top"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-105"
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
          Traditional Navigation Links:
          Visible between 1000px and 1440px via .nav-traditional-links class.
          Hidden below 1000px (handled by hamburger drawer)
          Hidden at >= 1440px (handled by RadialNav)
        */}
        <nav
          aria-label="Main navigation"
          className="nav-traditional-links items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.id);
                  scrollToSection(item.id, item.href);
                }}
                className="relative px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none"
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-softer)' : 'transparent',
                  border: isActive ? '1px solid var(--border-accent)' : '1px solid transparent',
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }}
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions (Theme toggle + Resume button, visible >= 1000px) */}
        <div className="nav-desktop-actions items-center gap-3">
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

        {/* Mobile Menu Controls (Theme toggle + Hamburger button, visible < 1000px) */}
        <div className="nav-mobile-controls items-center gap-2">
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

      {/* Mobile Drawer (Overlay dropdown, visible < 1000px when isOpen) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="nav-mobile-drawer absolute top-full left-0 right-0 overflow-hidden shadow-2xl"
            style={{
              background: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6">
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        closeMenu();
                        setActiveSection(item.id);
                        scrollToSection(item.id, item.href);
                      }}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
                      style={{
                        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                        background: isActive ? 'var(--accent-softer)' : 'transparent',
                        border: isActive ? '1px solid var(--border-accent)' : '1px solid transparent',
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: 'var(--accent)' }}
                          aria-hidden="true"
                        />
                      )}
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
