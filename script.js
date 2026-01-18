const root = document.documentElement;
const nav = document.querySelector('.nav');
const toggle = nav.querySelector('.nav__toggle');
const navLinks = nav.querySelectorAll('.nav__link');
const themeToggle = document.querySelector('[data-theme-toggle]');
const brand = document.querySelector('.nav__brand');

const setNavOpen = (isOpen) => {
  nav.classList.toggle('nav--open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
};

// Toggle on hamburger click
toggle.addEventListener('click', () => {
  const willOpen = !nav.classList.contains('nav--open');
  setNavOpen(willOpen);
});

// Handle nav link clicks (close mobile menu, set active)
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    // Close mobile menu
    setNavOpen(false);

    // Mark active link styling
    navLinks.forEach((lnk) => lnk.classList.remove('is-active'));
    link.classList.add('is-active');
  });
});

// Smooth scroll for CTA buttons or any element with data-scroll
const scrollLinks = document.querySelectorAll('[data-scroll]');
scrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;
    event.preventDefault();
    targetEl.scrollIntoView({ behavior: 'smooth' });
    link.blur();
  });
});

// Ripple-like active feedback on buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.add('is-rippling');
    setTimeout(() => btn.classList.remove('is-rippling'), 220);
  });
});

// Add solid background on scroll
const handleScroll = () => {
  const scrolled = window.scrollY > 12;
  nav.classList.toggle('nav--scrolled', scrolled);
};

handleScroll(); // run on load
window.addEventListener('scroll', handleScroll, { passive: true });

// Theme toggle (light <-> dark)
const getStoredTheme = () => window.localStorage.getItem('theme');
const storeTheme = (theme) => window.localStorage.setItem('theme', theme);

const applyTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  const isDark = theme === 'dark';
  themeToggle?.setAttribute('aria-pressed', String(isDark));
  themeToggle?.setAttribute(
    'aria-label',
    isDark ? 'Switch to light mode' : 'Switch to dark mode'
  );
};

const initTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = getStoredTheme();
  const initialTheme = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);
};

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  storeTheme(next);
});

initTheme();

// Brand text animation: reveal letters one-by-one, then hide from end
const animateBrand = () => {
  if (!brand) return;
  const text = brand.textContent.trim();
  if (!text) return;

  // Build letter spans
  const lettersWrap = document.createElement('span');
  lettersWrap.className = 'nav__brand-letters';

  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.className = 'nav__brand-letter';
    span.textContent = char === ' ' ? '\u00a0' : char;
    lettersWrap.appendChild(span);
  });

  // Replace content with animated letters
  brand.setAttribute('aria-label', text);
  brand.innerHTML = '';
  brand.appendChild(lettersWrap);

  const letters = Array.from(lettersWrap.querySelectorAll('.nav__brand-letter'));
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const runLoop = async () => {
    // Avoid animation if user prefers reduced motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      letters.forEach((l) => l.classList.add('is-visible'));
      return;
    }

    const stepIn = 100; // ms between each letter appearing
    const hold = 1200; // pause when fully visible
    const pause = 600; // pause when cleared

    while (true) {
      for (let i = 0; i < letters.length; i += 1) {
        letters[i].classList.add('is-visible');
        // eslint-disable-next-line no-await-in-loop
        await sleep(stepIn);
      }

      // eslint-disable-next-line no-await-in-loop
      await sleep(hold);

      letters.forEach((l) => l.classList.remove('is-visible'));

      // eslint-disable-next-line no-await-in-loop
      await sleep(pause);
    }
  };

  runLoop();
};

animateBrand();

// Reveal elements on scroll
const initReveal = () => {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsObserver = typeof IntersectionObserver !== 'undefined';

  if (reduceMotion || !supportsObserver) {
    revealEls.forEach((el) => el.classList.add('show'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
};

initReveal();
