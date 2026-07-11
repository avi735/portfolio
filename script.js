/* =====================================================
   PORTFOLIO JAVASCRIPT
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- PRELOADER ----
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloader-fill');
  let fillWidth = 0;
  const fillInterval = setInterval(() => {
    fillWidth += Math.random() * 18 + 8;
    if (fillWidth >= 100) {
      fillWidth = 100;
      clearInterval(fillInterval);
      setTimeout(() => preloader.classList.add('hidden'), 300);
    }
    preloaderFill.style.width = fillWidth + '%';
  }, 120);

  // Also hide preloader on window load
  window.addEventListener('load', () => {
    clearInterval(fillInterval);
    preloaderFill.style.width = '100%';
    setTimeout(() => preloader.classList.add('hidden'), 400);
  });

  // ---- SCROLL PROGRESS BAR ----
  const scrollProgress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }, { passive: true });

  // ---- NAVBAR SCROLL BEHAVIOR ----
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Scrolled state
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link highlight
    updateActiveNavLink();
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- ACTIVE NAV LINKS ----
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    hamburger.style.transform = isOpen ? 'rotate(90deg)' : '';
  });

  // ---- SMOOTH NAV LINK SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;
        const top = target.offsetTop - navH;
        window.scrollTo({ top, behavior: 'smooth' });
        // Close mobile menu
        navLinks.classList.remove('open');
        hamburger.style.transform = '';
      }
    });
  });

  // ---- HERO TYPING EFFECT ----
  const typedCmd = document.getElementById('typed-cmd');
  const commands = [
    'build --platform scalable',
    'automate --everything',
    'integrate --ai gemini',
    'deploy --zero-downtime',
  ];
  let cmdIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingDelay = 80;

  function typeLoop() {
    const current = commands[cmdIdx];

    if (!isDeleting) {
      typedCmd.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        typingDelay = 2200;
      } else {
        typingDelay = 75;
      }
    } else {
      typedCmd.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        cmdIdx = (cmdIdx + 1) % commands.length;
        typingDelay = 400;
      } else {
        typingDelay = 38;
      }
    }

    setTimeout(typeLoop, typingDelay);
  }

  setTimeout(typeLoop, 1000);

  // ---- HERO PARTICLES ----
  const particlesContainer = document.getElementById('hero-particles');
  const colors = ['#22d3ee', '#818cf8', '#a78bfa', '#4ade80'];

  function spawnParticle() {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 4;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      bottom: -10px;
      box-shadow: 0 0 ${size * 2}px ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    particlesContainer.appendChild(p);

    setTimeout(() => p.remove(), (duration + delay) * 1000);
  }

  // Spawn particles periodically
  for (let i = 0; i < 15; i++) setTimeout(spawnParticle, i * 600);
  setInterval(spawnParticle, 1200);

  // ---- COUNTER ANIMATION ----
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    const heroSection = document.getElementById('home');
    const heroRect = heroSection.getBoundingClientRect();
    if (heroRect.top < window.innerHeight) {
      countersStarted = true;
      statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 16);
      });
    }
  }

  window.addEventListener('scroll', startCounters, { passive: true });
  setTimeout(startCounters, 500);

  // ---- SCROLL REVEAL ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Add reveal class to key elements
  const revealSelectors = [
    '.about-grid > *',
    '.timeline-card',
    '.edu-degree-card',
    '.cert-card',
    '.skill-category',
    '.project-card',
    '.contact-grid > *',
    '.tech-cloud',
  ];

  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  });

  // ---- SKILL BAR ANIMATION ----
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => barObserver.observe(bar));

  // ---- CONTACT FORM ----
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
      el.style.borderColor = '';
    });
  }

  function setError(fieldId, errorId, msg) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field && error) {
      field.style.borderColor = 'var(--accent-red)';
      error.textContent = msg;
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    let valid = true;

    if (!name) { setError('contact-name', 'name-error', 'Name is required.'); valid = false; }
    if (!email) { setError('contact-email', 'email-error', 'Email is required.'); valid = false; }
    else if (!validateEmail(email)) { setError('contact-email', 'email-error', 'Please enter a valid email.'); valid = false; }
    if (!subject) { setError('contact-subject', 'subject-error', 'Subject is required.'); valid = false; }
    if (!message || message.length < 10) { setError('contact-message', 'message-error', 'Message must be at least 10 characters.'); valid = false; }

    if (!valid) return;

    // Show loading
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    btnText.textContent = 'Sending...';
    btnIcon.style.display = 'none';
    btnLoader.style.display = 'flex';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        formSuccess.style.display = 'flex';
        setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
      } else {
        const data = await response.json();
        const errMsg = data.errors ? data.errors.map(e => e.message).join(', ') : 'Submission failed. Please try emailing me directly.';
        setError('contact-message', 'message-error', errMsg);
      }
    } catch (err) {
      setError('contact-message', 'message-error', 'Network error. Please try emailing me directly at avi620nash@gmail.com');
    }

    btnText.textContent = 'Send Message';
    btnIcon.style.display = 'flex';
    btnLoader.style.display = 'none';
    submitBtn.disabled = false;
  });

  // ---- FOOTER YEAR ----
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- PROJECT CARD TILT EFFECT ----
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ---- CURSOR GLOW EFFECT ----
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(34, 211, 238, 0.04) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.1s, top 0.1s;
    left: -9999px;
    top: -9999px;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });

  // ---- SECTION TRANSITION OBSERVER ----
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.05 });

  sections.forEach(s => sectionObserver.observe(s));

  // ---- FACT CARDS STAGGER ----
  document.querySelectorAll('.fact-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 100}ms`;
  });

  // ---- INITIALIZE ----
  updateActiveNavLink();
  console.log('%c Portfolio Loaded 🚀', 'color: #22d3ee; font-size: 1.2rem; font-weight: bold; font-family: JetBrains Mono;');
});
