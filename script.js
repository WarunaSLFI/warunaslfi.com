const root = document.documentElement;
const nav = document.querySelector('.nav');
const toggle = nav.querySelector('.nav__toggle');
const navLinks = nav.querySelectorAll('.nav__link');

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
let isScrolling = false;
const handleScroll = () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      const scrolled = window.scrollY > 12;
      nav.classList.toggle('nav--scrolled', scrolled);
      isScrolling = false;
    });
    isScrolling = true;
  }
};

handleScroll(); // run on load
window.addEventListener('scroll', handleScroll, { passive: true });



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

// Skills filters and progress animation
const initSkills = () => {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const rows = skillsSection.querySelectorAll('.skill-row');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateRow = (row) => {
    const fill = row.querySelector('.skill-row__fill');
    const target = Number(row.dataset.progress || 0);
    if (!fill) return;
    fill.style.width = `${target}%`;
  };

  if (reduceMotion) {
    rows.forEach(animateRow);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateRow(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35, rootMargin: '0px 0px -10% 0px' }
  );

  rows.forEach((row) => observer.observe(row));
};

initSkills();

// Projects filters and reveal fill
const initProjects = () => {
  const projectsSection = document.getElementById('projects');
  if (!projectsSection) return;

  const filters = projectsSection.querySelectorAll('.projects__filter');
  const cards = projectsSection.querySelectorAll('.project-card');

  const setFilter = (value) => {
    cards.forEach((card) => {
      const cats = (card.dataset.projectCategory || '').split(' ');
      const show = value === 'all' || cats.includes(value);
      card.toggleAttribute('hidden', !show);
    });
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      setFilter(btn.dataset.projectFilter || 'all');
    });
  });
};

initProjects();

// Footer: year + back to top
const initFooter = () => {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const toTop = document.querySelector('.footer__top');
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

initFooter();

const EMAILJS_SERVICE_ID = 'service_8cpq8tb';
const EMAILJS_TEMPLATE_ID = 'template_ob9xocb';
const EMAILJS_PUBLIC_KEY = 'X34kXRHs5TYDUd7P4'; // EmailJS public key

// Contact form validation + send via EmailJS
const initContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successEl = form.querySelector('.contact__success');
  const submitBtn = form.querySelector('.contact__submit');
  const fields = Array.from(form.querySelectorAll('input, textarea'));

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setError = (input, message = '') => {
    const field = input.closest('.contact__field');
    const errorEl = field?.querySelector('.field__error');
    if (errorEl) errorEl.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  };

  const clearErrors = () => {
    fields.forEach((field) => setError(field, ''));
  };

  const validate = () => {
    let isValid = true;
    const name = form.elements.name;
    const email = form.elements.email;
    const subject = form.elements.subject;
    const message = form.elements.message;

    if (!name.value.trim()) {
      setError(name, 'Please enter your name.');
      isValid = false;
    } else {
      setError(name, '');
    }

    if (!email.value.trim()) {
      setError(email, 'Email is required.');
      isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      setError(email, 'Enter a valid email address.');
      isValid = false;
    } else {
      setError(email, '');
    }

    if (!message.value.trim()) {
      setError(message, 'Tell me a bit about the project.');
      isValid = false;
    } else {
      setError(message, '');
    }

    return isValid;
  };

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      if (field.value.trim()) {
        setError(field, '');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    successEl.textContent = '';
    successEl.style.color = '#16a34a';
    submitBtn.disabled = true;
    submitBtn.classList.add('is-loading');

    const resetButton = () => {
      submitBtn.disabled = false;
      submitBtn.classList.remove('is-loading');
    };

    const payload = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      title: (subject?.value || '').trim() || 'Portfolio Contact',
      message: form.elements.message.value.trim(),
    };

    const canSend =
      window.emailjs &&
      EMAILJS_PUBLIC_KEY &&
      !EMAILJS_PUBLIC_KEY.includes('YOUR_PUBLIC_KEY');

    if (!canSend) {
      resetButton();
      successEl.style.color = '#ef4444';
      successEl.textContent = 'Email sending not configured. Please add your EmailJS public key.';
      return;
    }

    emailjs.init(EMAILJS_PUBLIC_KEY);
    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload)
      .then(() => {
        resetButton();
        form.reset();
        clearErrors();
        successEl.style.color = '#16a34a';
        successEl.textContent = 'Message sent! I will reply shortly.';
      })
      .catch(() => {
        resetButton();
        successEl.style.color = '#ef4444';
        successEl.textContent = 'Something went wrong. Please try again.';
      });
  });
};

initContactForm();
