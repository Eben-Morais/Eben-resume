import React, { useState, useEffect, useCallback } from 'react';
import BackgroundLayer from './components/BackgroundLayer';
import ForegroundLayer from './components/ForegroundLayer';
import Navbar from './components/Navbar';
import RadialNav from './components/RadialNav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ArrowUp, Check } from 'lucide-react';

// ── Dark mode persistence ─────────────────────────────────────────────────────
function getInitialDarkMode() {
  try {
    const stored = localStorage.getItem('portfolio-dark-mode');
    if (stored !== null) return stored === 'true';
  } catch {}
  return true; // default: dark
}

export default function App() {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [toastMessage, setToastMessage] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Apply class to <html> element and persist preference
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('portfolio-dark-mode', String(darkMode));
    } catch {}
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const handleCopyEmail = useCallback((email) => {
    navigator.clipboard.writeText(email).then(
      () => triggerToast('Email copied to clipboard.'),
      () => triggerToast('Could not copy email automatically.')
    );
  }, []);

  useEffect(() => {
    let ticking = false;
    let lastState = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 500;
          if (shouldShow !== lastState) {
            lastState = shouldShow;
            setShowBackToTop(shouldShow);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* Skip to Main Content (Accessibility) */}
      <a
        href="#about"
        className="fixed top-3 left-3 z-[100] px-4 py-2 text-xs font-medium rounded shadow -translate-y-24 focus:translate-y-0 transition-transform focus-visible:outline-none"
        style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-accent)' }}
      >
        Skip to Content
      </a>

      {/* Layer 1 — Background Plane */}
      <BackgroundLayer darkMode={darkMode} />

      {/* Navigation */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Radial navigation — tablet/desktop only (hidden on mobile via CSS) */}
      <RadialNav />

      {/* Layer 2 — Content Plane */}
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact onCopyEmail={handleCopyEmail} />
      </main>

      {/* Layer 3 — Foreground decorative plane */}
      <ForegroundLayer />

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-medium shadow-2xl animate-fade-in"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-accent)',
            color: 'var(--text-primary)',
          }}
        >
          <Check
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ color: 'var(--accent)' }}
            aria-hidden="true"
          />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-2.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            color: 'var(--text-secondary)',
          }}
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
