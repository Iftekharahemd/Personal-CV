/* ==========================================================================
   RESUME SCRIPT.JS
   All behaviour is progressive enhancement — the page is fully readable
   and functional with JavaScript disabled.

   Sections:
   1. Typing effect (name only)
   2. Scroll fade-up reveal (IntersectionObserver)
   4. Footer date
   5. Print button
   6. Download resume button
   7. Contrast toggle (utility)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------- */
  /* 1. TYPING EFFECT — runs once on the name only                     */
  /* ---------------------------------------------------------------- */
  (function typingEffect() {
    const el = document.getElementById('typedName');
    if (!el) return;

    const fullText = el.textContent.trim();
    const typingSpeed = 90; // ms per character

    el.textContent = '';

    let i = 0;
    function typeNext() {
      if (i <= fullText.length) {
        el.textContent = fullText.slice(0, i);
        i++;
        setTimeout(typeNext, typingSpeed);
      }
    }
    typeNext();
  })();

  /* ---------------------------------------------------------------- */
  /* 2. SCROLL FADE-UP REVEAL                                           */
  /* ---------------------------------------------------------------- */
  (function fadeUpOnScroll() {
    const items = document.querySelectorAll('.fade-up');
    if (!items.length) return;

    // If IntersectionObserver isn't supported, just show everything.
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => observer.observe(el));
  })();

  /* ---------------------------------------------------------------- */
  /* 4. FOOTER DATE — keeps the "last updated" style date current      */
  /* ---------------------------------------------------------------- */
  (function setFooterDate() {
    const el = document.getElementById('footerDate');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  })();

  /* ---------------------------------------------------------------- */
  /* 5. PRINT BUTTON — triggers the browser's native print dialog      */
  /*    (print styles in style.css handle the A4 layout conversion).   */
  /* ---------------------------------------------------------------- */
  (function setupPrintButton() {
    const btn = document.getElementById('printBtn');
    if (!btn) return;
    btn.addEventListener('click', () => window.print());
  })();

  /* ---------------------------------------------------------------- */
  /* 6. DOWNLOAD RESUME BUTTON                                          */
  /*    Uses the browser's print-to-PDF flow so no external library    */
  /*    or server is required. Replace this with a direct link to a    */
  /*    hosted PDF file if you have one, e.g.:                         */
  /*      <a href="John-Doe-Resume.pdf" download>Download</a>          */
  /* ---------------------------------------------------------------- */
  (function setupDownloadButton() {
    const btn = document.getElementById('downloadBtn');
    if (!btn) return;
    btn.addEventListener('click', () => window.print());
  })();

  /* ---------------------------------------------------------------- */
  /* 7. CONTRAST TOGGLE (small utility, purely cosmetic)                */
  /*    Toggles a class that slightly boosts text contrast for users   */
  /*    who find the default secondary-text tone too low-contrast.     */
  /* ---------------------------------------------------------------- */
  (function setupThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
    });
  })();

});