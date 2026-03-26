'use strict';

// ============================================================
//  Vivek Kumar Singh Portfolio — script.js (Modern Redesign)
// ============================================================

/* ---- AOS (Animate On Scroll) ---- */
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
});

/* ---- Typed.js — sidebar title ---- */
if (document.querySelector('#typed-title')) {
  new Typed('#typed-title', {
    strings: ['CSE Student', 'Web Developer', 'ML Enthusiast', 'DSA Problem Solver'],
    typeSpeed: 55,
    backSpeed: 35,
    backDelay: 1800,
    loop: true,
    showCursor: true,
    cursorChar: '|',
  });
}

/* ---- Particles.js ---- */
if (typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: { value: 55, density: { enable: true, value_area: 900 } },
      color: { value: '#6366f1' },
      shape: { type: 'circle' },
      opacity: { value: 0.25, random: true, anim: { enable: true, speed: 0.6, opacity_min: 0.05, sync: false } },
      size: { value: 2, random: true },
      line_linked: { enable: true, distance: 140, color: '#6366f1', opacity: 0.1, width: 1 },
      move: { enable: true, speed: 0.8, direction: 'none', random: true, straight: false, out_mode: 'out' },
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: false }, resize: true },
      modes: { grab: { distance: 160, line_linked: { opacity: 0.3 } } },
    },
    retina_detect: true,
  });
}

/* ---- Cursor Glow Effect ---- */
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  });
}

/* ---- Navbar scroll shadow ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 30px rgba(0,0,0,0.5)'
      : 'none';
  }
}, { passive: true });

/* ---- Mobile sidebar toggle ---- */
const menuToggle = document.getElementById('menuToggle');
const sidebar    = document.getElementById('sidebar');

if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

/* ---- Page Navigation ---- */
const navBtns = document.querySelectorAll('[data-nav-link]');
const pages   = document.querySelectorAll('[data-page]');

navBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    const target = this.textContent.toLowerCase();

    pages.forEach((page) => {
      page.classList.toggle('active', page.dataset.page === target);
    });

    navBtns.forEach((b) => b.classList.remove('active'));
    this.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Animate skill bars when Resume tab is opened
    if (target === 'resume') animateSkillBars();

    // Refresh AOS on tab switch
    setTimeout(() => AOS.refresh(), 100);
  });
});

/* ---- Skill Bar Animation ---- */
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach((fill) => {
    const width = fill.dataset.width || '0';
    fill.style.width = '0';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.width = width + '%';
      });
    });
  });
}

// Animate on first load if About is already selected (resume can be triggered later)
// Trigger on load if resume tab is active by default
if (document.querySelector('[data-page="resume"].active')) {
  animateSkillBars();
}

/* ---- Project Filter ---- */
const filterBtns  = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');
const selectBox   = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectVal   = document.querySelector('[data-selecct-value]');

function filterProjects(value) {
  filterItems.forEach((item) => {
    const match = value === 'all' || item.dataset.category === value;
    item.classList.toggle('active', match);

    // Subtle re-entry animation
    if (match) {
      item.style.animation = 'none';
      item.offsetHeight; // reflow
      item.style.animation = '';
    }
  });
}

let activeFilterBtn = filterBtns[0];
filterBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    const val = this.textContent.toLowerCase();
    if (selectVal) selectVal.textContent = this.textContent;
    filterProjects(val);
    activeFilterBtn?.classList.remove('active');
    this.classList.add('active');
    activeFilterBtn = this;
  });
});

// Mobile select dropdown
if (selectBox) {
  selectBox.addEventListener('click', function (e) {
    e.stopPropagation();
    this.closest('.filter-select-box').classList.toggle('active');
  });

  document.addEventListener('click', () => {
    document.querySelector('.filter-select-box')?.classList.remove('active');
  });
}

selectItems.forEach((item) => {
  item.addEventListener('click', function () {
    const val = this.textContent.toLowerCase();
    if (selectVal) selectVal.textContent = this.textContent;
    filterProjects(val);
    this.closest('.filter-select-box')?.classList.remove('active');
    filterBtns.forEach((b) => {
      b.classList.toggle('active', b.textContent.toLowerCase() === val);
    });
  });
});