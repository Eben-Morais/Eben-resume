/**
 * Smoothly scrolls to a section so that the start of the section
 * lands at the top of the page, exactly 10% of the viewport height below the absolute top.
 *
 * @param {string} id - The section element ID (without '#')
 * @param {string} [href] - Optional href hash to push into window history
 */
export function scrollToSection(id, href) {
  if (typeof window === 'undefined') return;

  if (id === 'top' || id === '' || href === '#top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (href && window.history.pushState) {
      window.history.pushState(null, '', href);
    }
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  // Exact 10% of viewport height below the absolute top of the page
  const offset = window.innerHeight * 0;
  const elementTop = el.getBoundingClientRect().top + window.scrollY;
  const targetScrollY = Math.max(0, elementTop - offset);

  window.scrollTo({
    top: targetScrollY,
    behavior: 'smooth',
  });

  if (href && window.history.pushState) {
    window.history.pushState(null, '', href);
  }
}
