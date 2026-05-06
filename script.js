/* =========================================================
   INTERNATIONAL SECURITY — script.js
   ========================================================= */

(() => {
  'use strict';

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navMoreToggle = document.getElementById('navMoreToggle');
  const navItemMore = navMoreToggle ? navMoreToggle.closest('.nav-item-more') : null;
  const navLinks = mainNav ? mainNav.querySelectorAll('a') : [];

  const closeMoreMenu = () => {
    if (!navItemMore || !navMoreToggle) return;
    navItemMore.classList.remove('is-open');
    navMoreToggle.setAttribute('aria-expanded', 'false');
  };

  const closeNav = () => {
    if (!mainNav || !navToggle) return;
    mainNav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    closeMoreMenu();
  };

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
      if (!isOpen) closeMoreMenu();
    });

    navLinks.forEach(a => a.addEventListener('click', closeNav));
  }

  if (navMoreToggle && navItemMore) {
    navMoreToggle.addEventListener('click', () => {
      const isOpen = navItemMore.classList.toggle('is-open');
      navMoreToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!navItemMore.classList.contains('is-open')) return;
      if (!navItemMore.contains(e.target)) closeMoreMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMoreMenu();
    });
  }

  /* Close on resize up */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1020) closeNav();
  });

  /* ---------- Scroll-spy (active link) ---------- */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const linkMap = new Map();
  navLinks.forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) linkMap.set(href.slice(1), a);
  });

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => a.classList.remove('is-active'));
        const active = linkMap.get(id);
        if (active) active.classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => spy.observe(s));

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.section-head, .pillar-card, .service-card, .system-card, .why-card, ' +
    '.project-card, .tip-card, .contact-form, .contact-list li, ' +
    '.cta-panel, .testimonial, .clients-strip, .about-stats, .hero-trust'
  );
  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger cards within a group
    if (el.matches('.pillar-card, .service-card, .system-card, .why-card, .project-card, .tip-card, .contact-list li')) {
      const group = Array.from(el.parentElement.children);
      const index = group.indexOf(el);
      el.style.transitionDelay = `${Math.min(index * 80, 480)}ms`;
    }
  });

  const revealer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  revealTargets.forEach(el => revealer.observe(el));

  /* ---------- Stat counter ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('sq-AL');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('sq-AL');
    };
    requestAnimationFrame(step);
  };

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => countObserver.observe(el));

  /* ---------- Contact form (demo) ---------- */
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic required check
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = 'var(--red)';
          setTimeout(() => field.style.borderColor = '', 1800);
        }
      });
      if (!valid) return;

      // Simulate submission — in production, POST to backend / service
      success.hidden = false;
      form.reset();
      setTimeout(() => { success.hidden = true; }, 6000);
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
