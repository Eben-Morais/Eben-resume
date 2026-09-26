// ─── Shared viewport config (no negative margins — they cause missed triggers) ──
// `amount: 0.06` triggers when just 6% of the element enters view,
// which catches fast scrolls that a fixed pixel margin would miss.
export const VIEWPORT = { once: true, amount: 0.06 };
export const VIEWPORT_TIGHT = { once: true, amount: 0.03 };

// ─── Core scroll reveal ───────────────────────────────────────────────────────
export const getScrollReveal = (shouldReduceMotion) => ({
  initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
  whileInView: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
});

// ─── Stagger containers ───────────────────────────────────────────────────────
export const getStaggerContainer = (stagger = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger },
  },
});

export const getBentoStagger = (stagger = 0.065) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  },
});

// ─── Stagger items ─────────────────────────────────────────────────────────────
export const getStaggerItem = (shouldReduceMotion) => ({
  hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
});

export const getBentoItem = (shouldReduceMotion) => ({
  hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
});

// ─── Slide-in variants ────────────────────────────────────────────────────────
export const getSlideInLeft = (shouldReduceMotion, delay = 0) => ({
  initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export const getSlideInRight = (shouldReduceMotion, delay = 0) => ({
  initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

// ─── Timeline node animation ──────────────────────────────────────────────────
export const getTimelineNodeAnimate = (shouldReduceMotion) => ({
  initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: VIEWPORT_TIGHT,
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
});

// ─── Card hover ───────────────────────────────────────────────────────────────
export const getCardHoverProps = (shouldReduceMotion) => {
  if (shouldReduceMotion) return {};
  return {
    whileHover: { scale: 1.015, y: -3 },
    transition: { duration: 0.2, ease: 'easeOut' },
  };
};

// ─── Float animation for decorative elements ──────────────────────────────────
export const getFloatAnimation = (shouldReduceMotion, delay = 0) => ({
  animate: shouldReduceMotion
    ? {}
    : {
        y: [0, -10, 0],
        transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay },
      },
});
