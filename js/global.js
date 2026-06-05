/* ============================================================
   DHARMA CONSULTING — GLOBAL JAVASCRIPT
   Handles: Nav, Mobile Menu, Scroll Reveal, Counters, Particles
   ============================================================ */

(function () {
  'use strict';

  /* ── NAVIGATION ── */
  function initNav() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    // Scroll behavior
    function updateNav() {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    // Active link
    const links = nav.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.replace(/\/$/, '');
    links.forEach(link => {
      const href = link.getAttribute('href').replace(/\/$/, '');
      if (href === currentPath || (currentPath === '' && href === '/') || (currentPath.endsWith('index.html') && href === '/')) {
        link.classList.add('active');
      } else if (href !== '/' && href !== '/index.html' && currentPath.startsWith(href)) {
        link.classList.add('active');
      }
    });
  }

  /* ── MOBILE MENU ── */
  function initMobileMenu() {
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-close');
    if (!hamburger || !mobileMenu) return;

    function openMenu() {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ── SCROLL REVEAL ── */
  function initScrollReveal() {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
  }

  /* ── ANIMATED COUNTERS ── */
  function animateCounter(el, target, duration) {
    duration = duration || 2200;
    let startTime = null;
    const suffix = el.dataset.suffix || '';

    function step(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateCounter(el, parseInt(el.dataset.target), 2200);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
  }

  /* ── PARTICLE CANVAS ── */
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    const COUNT = 65;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticle() {
      const duration = 8000 + Math.random() * 10000;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 1 + Math.random() * 1.5,
        baseOpacity: 0.35 + Math.random() * 0.25,
        duration: duration,
        startTime: performance.now() - Math.random() * duration,
        driftX: (Math.random() - 0.5) * 18,
        driftY: -10 - Math.random() * 20,
      };
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < COUNT; i++) particles.push(createParticle());
    }

    function draw(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        const elapsed = (now - p.startTime) % p.duration;
        const t = elapsed / p.duration;
        const cycle = Math.sin(t * Math.PI * 2);
        const opacity = p.baseOpacity + cycle * 0.15;
        const x = p.x + cycle * p.driftX;
        const y = p.y + cycle * p.driftY;

        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,194,255,${Math.max(0, Math.min(1, opacity))})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
      resize();
      particles = particles.map(p => ({
        ...p,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      }));
    });

    init();
    requestAnimationFrame(draw);
  }

  /* ── FAQ ACCORDION ── */
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item.open').forEach(openItem => {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = '0';
        });

        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* ── HERO H1 CHAR REVEAL ── */
  function initHeroReveal() {
    const heroWords = document.querySelectorAll('.hero-word-reveal');
    heroWords.forEach((word, i) => {
      word.style.animationDelay = (0.4 + i * 0.15) + 's';
      word.style.animationFillMode = 'both';
      word.style.animation = `charReveal 0.6s cubic-bezier(0.22,1,0.36,1) ${(0.4 + i * 0.15)}s both`;
    });
  }

  /* ── FILE UPLOAD DRAG DROP ── */
  function initFileUpload() {
    const zones = document.querySelectorAll('.file-upload-zone');
    zones.forEach(zone => {
      const input = zone.querySelector('input[type="file"]');
      const filename = zone.querySelector('.file-upload-filename');

      if (!input) return;

      input.addEventListener('change', () => {
        if (input.files && input.files[0] && filename) {
          filename.textContent = '✓ ' + input.files[0].name;
          filename.style.display = 'block';
        }
      });

      zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('drag-over');
      });

      zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
      });

      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        if (e.dataTransfer.files.length) {
          input.files = e.dataTransfer.files;
          if (filename) {
            filename.textContent = '✓ ' + e.dataTransfer.files[0].name;
            filename.style.display = 'block';
          }
        }
      });
    });
  }

  /* ── CHARACTER COUNTER FOR TEXTAREA ── */
  function initCharCounters() {
    document.querySelectorAll('textarea[data-min-chars]').forEach(textarea => {
      const counter = textarea.closest('.form-group')?.querySelector('.char-counter');
      if (!counter) return;
      const min = parseInt(textarea.dataset.minChars) || 200;

      function update() {
        const len = textarea.value.length;
        counter.textContent = `${len} characters${len < min ? ` (minimum ${min} recommended)` : ' ✓'}`;
        counter.style.color = len >= min ? 'var(--success)' : 'var(--text-muted)';
      }

      textarea.addEventListener('input', update);
      update();
    });
  }

  /* ── FORM VALIDATION ── */
  function initForms() {
    const form = document.getElementById('application-form');
    if (!form) return;

    function showError(input, msg) {
      input.classList.add('error');
      const err = input.closest('.form-group')?.querySelector('.form-error');
      if (err) { err.textContent = msg; err.classList.add('show'); }
    }

    function clearError(input) {
      input.classList.remove('error');
      const err = input.closest('.form-group')?.querySelector('.form-error');
      if (err) { err.textContent = ''; err.classList.remove('show'); }
    }

    // Blur validation
    form.querySelectorAll('.input-field').forEach(input => {
      input.addEventListener('blur', () => {
        if (input.required && !input.value.trim()) {
          showError(input, 'This field is required.');
        } else if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          showError(input, 'Please enter a valid email address.');
        } else {
          clearError(input);
        }
      });

      input.addEventListener('input', () => clearError(input));
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      // Validate required text fields
      form.querySelectorAll('.input-field[required]').forEach(input => {
        if (!input.value.trim()) {
          showError(input, 'This field is required.');
          valid = false;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          showError(input, 'Please enter a valid email address.');
          valid = false;
        }
      });

      // Validate file
      const fileInput = form.querySelector('input[type="file"][required]');
      if (fileInput) {
        if (!fileInput.files || !fileInput.files[0]) {
          const err = fileInput.closest('.form-group')?.querySelector('.form-error');
          if (err) { err.textContent = 'Please upload your CV/Resume.'; err.classList.add('show'); }
          valid = false;
        } else {
          const file = fileInput.files[0];
          const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
          if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
            const err = fileInput.closest('.form-group')?.querySelector('.form-error');
            if (err) { err.textContent = 'Please upload a PDF, DOC, or DOCX file.'; err.classList.add('show'); }
            valid = false;
          } else if (file.size > 5 * 1024 * 1024) {
            const err = fileInput.closest('.form-group')?.querySelector('.form-error');
            if (err) { err.textContent = 'File size must be under 5MB.'; err.classList.add('show'); }
            valid = false;
          }
        }
      }

      // Validate textarea min chars
      const textarea = form.querySelector('textarea[data-min-chars]');
      if (textarea && textarea.value.length < 200) {
        const err = textarea.closest('.form-group')?.querySelector('.form-error');
        if (err) { err.textContent = 'Please write at least 200 characters.'; err.classList.add('show'); }
        valid = false;
      }

      // Validate checkbox
      const checkbox = form.querySelector('input[type="checkbox"][required]');
      if (checkbox && !checkbox.checked) {
        const err = checkbox.closest('.form-group')?.querySelector('.form-error');
        if (err) { err.textContent = 'Please confirm your consent to proceed.'; err.classList.add('show'); }
        valid = false;
      }

      if (!valid) return;

      // Show success
      const formWrapper = document.getElementById('form-wrapper');
      const successCard = document.getElementById('success-card');
      if (formWrapper && successCard) {
        formWrapper.style.display = 'none';
        successCard.style.display = 'block';
      }
    });
  }

  /* ── CONTACT FORM ── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        const wrapper = document.getElementById('contact-form-wrapper');
        const success = document.getElementById('contact-success');
        if (wrapper && success) {
          wrapper.style.display = 'none';
          success.style.display = 'block';
        }
      }, 1000);
    });
  }

  /* ── JOB TITLE FROM URL ── */
  function initJobTitle() {
    const el = document.getElementById('dynamic-job-title');
    const elMeta = document.getElementById('dynamic-job-meta');
    if (!el) return;

    const path = window.location.pathname;
    const slug = path.split('/').pop().replace(/\.html$/, '');

    const titles = {
      'regulatory-affairs-consultant': 'Regulatory Affairs Consultant',
      'quality-consultant-mes': 'Quality Consultant — MES Implementation',
    };

    const title = titles[slug] || 'Open Position';
    el.textContent = 'Apply — ' + title;
    if (elMeta) elMeta.textContent = title;

    // Update page title
    document.title = 'Apply — ' + title + ' | Dharma Consulting';
  }

  /* ── PROCESS LINE ANIMATION ── */
  function initProcessLines() {
    const lines = document.querySelectorAll('.process-connector');
    if (!lines.length) return;

    const lineObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'slideRight 1.2s cubic-bezier(0.22,1,0.36,1) forwards';
          lineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    lines.forEach(l => {
      l.style.width = '0';
      l.style.opacity = '0';
      lineObserver.observe(l);
    });

    // Override to show
    document.querySelectorAll('.process-connector').forEach(l => {
      l.style.width = '';
      l.style.opacity = '';
    });
  }

  /* ── INIT ALL ── */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initMobileMenu();
    initScrollReveal();
    initCounters();
    initParticles();
    initFAQ();
    initHeroReveal();
    initFileUpload();
    initCharCounters();
    initForms();
    initContactForm();
    initJobTitle();
    initProcessLines();
  });

})();
