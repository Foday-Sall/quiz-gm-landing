(function qmMotion() {
  'use strict';
  if (window.__qmMotionPolish) return;                                   // idempotent: safe against double-run
  window.__qmMotionPolish = true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // .qm-reveal never applied → content never hidden
  if (!('IntersectionObserver' in window)) return;
  var targets = ['.hero-content', '.hero-visual', '.fcard', '.exam-card', '.step', '.stat', '.sbj', '.section-head'];
  var els = document.querySelectorAll(targets.join(','));
  if (!els.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('qm-in');                             // CSS stagger delay starts from here
        io.unobserve(entry.target);                                      // one-shot: no observer work while reading/scrolling
      }
    });
  }, { threshold: 0.15 });
  els.forEach(function (el) { el.classList.add('qm-reveal'); io.observe(el); });
})();
