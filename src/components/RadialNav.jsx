import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Code2, Briefcase, FolderOpen, GraduationCap, Mail,
} from 'lucide-react';
import { scrollToSection } from '../utils/scroll';

// ── Navigation items matching section IDs ──────────────────────────────────────
const NAV_ITEMS = [
  { label: 'About',      href: '#about',      id: 'about',      Icon: User },
  { label: 'Skills',     href: '#skills',     id: 'skills',     Icon: Code2 },
  { label: 'Experience', href: '#experience', id: 'experience', Icon: Briefcase },
  { label: 'Projects',   href: '#projects',   id: 'projects',   Icon: FolderOpen },
  { label: 'Education',  href: '#education',  id: 'education',  Icon: GraduationCap },
  { label: 'Contact',    href: '#contact',    id: 'contact',    Icon: Mail },
];

// ── Geometry constants ────────────────────────────────────────────────────────
const ITEM_D            = 46;   // px — diameter of each nav circle
const RADIUS_X_FULL     = 138;  // px — 100% horizontal reach into page (expanded)
const RADIUS_X_HALF     = 55;   // px — 50% horizontal reach from edge (resting/collapsed)
const ANCHOR_RIGHT      = 28;   // px — distance from right screen edge to arc base
// At 100%: distance from center of arc to edge = 28 + 138 = 166px
// At 50%:  distance from center of arc to edge = 28 + 55  = 83px (50.0% of 166px)

const N = NAV_ITEMS.length;

function computeRadiusY() {
  if (typeof window === 'undefined') return 300;
  const raw = window.innerHeight / 2 - 88;
  return Math.min(Math.max(raw, 200), 400);
}

function RadialNav() {
  const [radiusY, setRadiusY]             = useState(computeRadiusY);
  const [activeSection, setActiveSection] = useState('');
  const [hovered, setHovered]             = useState(null);
  const [isAreaHovered, setIsAreaHovered] = useState(false);
  const isMountedRef                      = useRef(false);

  // ── 1. Debounced resize listener to recalculate radiusY ───────────────────
  useEffect(() => {
    isMountedRef.current = true;
    let timer;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setRadiusY(computeRadiusY());
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // ── 2. Scroll-spy with IntersectionObserver ───────────────────────────────
  useEffect(() => {
    const sectionElements = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-38% 0px -38% 0px', threshold: 0 }
    );

    sectionElements.forEach((el) => observer.observe(el));

    // Throttled scroll handler via requestAnimationFrame to prevent forced reflows
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < 180) {
            setActiveSection('');
          } else if (
            window.innerHeight + scrollY >=
            document.documentElement.scrollHeight - 60
          ) {
            setActiveSection('contact');
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ── 3. Smooth scroll on click (positions section top 10% below viewport top) ─
  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    setActiveSection(id);
    scrollToSection(id, href);
  };

  // ── 4. Dynamic horizontal radius (50% resting, 100% on mouse over area) ──
  const currentRadiusX = isAreaHovered ? RADIUS_X_FULL : RADIUS_X_HALF;

  // ── 5. Elliptical path for decorative track line ──────────────────────────
  const pathD = useMemo(() => {
    return `M 0 ${-radiusY} A ${currentRadiusX} ${radiusY} 0 0 0 0 ${radiusY}`;
  }, [currentRadiusX, radiusY]);

  return (
    /*
     * Large desktop only (>= 1440px via .radial-nav-container).
     * Pointer-events-none on outer container so page clicks behind are never blocked.
     */
    <aside
      aria-label="Section navigation"
      className="radial-nav-container fixed z-40 pointer-events-none"
      style={{
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 260,
        height: radiusY * 2 + 80,
      }}
    >
      {/* ── Interactive hit zone detecting hover without animating DOM width ── */}
      <div
        className="absolute right-0 top-0 bottom-0 pointer-events-auto"
        style={{
          width: isAreaHovered ? 260 : 110,
        }}
        onMouseEnter={() => setIsAreaHovered(true)}
        onMouseLeave={() => {
          setIsAreaHovered(false);
          setHovered(null);
        }}
      >
        {/* ── Anchor point positioned at right: ANCHOR_RIGHT, top: 50% ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            right: ANCHOR_RIGHT,
            top: '50%',
            width: 0,
            height: 0,
          }}
        >

          {/* ── Subtle orbital guide track ──────────────────────────────────── */}
          <svg
            className="absolute pointer-events-none overflow-visible"
            style={{
              left: 0,
              top: 0,
              width: 1,
              height: 1,
              zIndex: 0,
            }}
            aria-hidden="true"
          >
            <motion.path
              d={pathD}
              fill="none"
              stroke="var(--border-accent)"
              strokeWidth="1.25"
              strokeDasharray="3 5"
              animate={{
                d: pathD,
                opacity: isAreaHovered ? 0.45 : 0.26,
              }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 22,
              }}
            />
          </svg>

          {/* ── Nav items along the elliptical arc ──────────────────────────── */}
          {NAV_ITEMS.map((item, i) => {
            const angleDeg = 90 - (i / (N - 1)) * 180;
            const angleRad = (angleDeg * Math.PI) / 180;

            const x = -currentRadiusX * Math.cos(angleRad);
            const y = -radiusY * Math.sin(angleRad);

            const { Icon }   = item;
            const isActive   = activeSection === item.id;
            const isHov      = hovered === i;

            return (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                aria-label={item.label}
                aria-current={isActive ? 'true' : undefined}
                className="absolute rounded-full flex items-center justify-center focus-visible:outline-none pointer-events-auto group"
                style={{
                  width:      ITEM_D,
                  height:     ITEM_D,
                  left:       -ITEM_D / 2,
                  top:        -ITEM_D / 2,
                  willChange: 'transform',
                }}
                initial={{
                  x: x + 24,
                  y,
                  scale: 0.4,
                  opacity: 0,
                }}
                animate={{
                  x,
                  y,
                  scale: isHov ? 1.18 : isActive ? 1.10 : 1,
                  opacity: 1,
                }}
                transition={{
                  x: { type: 'spring', stiffness: 240, damping: 22 },
                  y: { type: 'spring', stiffness: 240, damping: 22 },
                  scale: { type: 'spring', stiffness: 360, damping: 22 },
                  opacity: {
                    duration: 0.4,
                    delay: isMountedRef.current ? 0 : i * 0.055,
                  },
                }}
              >
                {/* Glass Circle */}
                <div
                  className="w-full h-full rounded-full flex items-center justify-center transition-colors duration-200 relative"
                  style={{
                    background: isActive
                      ? 'var(--bg-elevated)'
                      : 'var(--bg-card)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isActive
                      ? '1.5px solid var(--accent)'
                      : isHov
                      ? '1.5px solid var(--accent)'
                      : '1px solid var(--border)',
                    boxShadow: isHov
                      ? '0 0 24px var(--accent-soft), 0 6px 20px rgba(0,0,0,0.28)'
                      : isActive
                      ? '0 0 16px var(--accent-soft), 0 0 0 2px var(--accent-softer), 0 4px 14px rgba(0,0,0,0.2)'
                      : '0 4px 14px rgba(0,0,0,0.15)',
                  }}
                >
                  <Icon
                    aria-hidden="true"
                    className="w-4 h-4 transition-colors duration-200"
                    style={{
                      color: isHov
                        ? 'var(--accent-violet)'
                        : isActive
                        ? 'var(--accent)'
                        : 'var(--text-muted)',
                    }}
                  />

                  {/* Subtle active pip indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="radialActiveIndicator"
                      className="absolute -bottom-1 w-1.5 h-1.5 rounded-full"
                      style={{
                        background: 'var(--accent)',
                        boxShadow: '0 0 8px var(--accent)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>

                {/* Tooltip Label (slides out to the left on hover) */}
                <AnimatePresence>
                  {isHov && (
                    <motion.span
                      initial={{ opacity: 0, x: 8, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute right-full mr-3 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none select-none flex items-center gap-1.5"
                      style={{
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-accent)',
                        color: 'var(--text-primary)',
                        boxShadow: 'var(--shadow-md)',
                        fontFamily: '"Plus Jakarta Sans", Inter, sans-serif',
                      }}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full inline-block"
                          style={{ background: 'var(--accent)' }}
                        />
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default memo(RadialNav);
