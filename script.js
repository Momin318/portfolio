// CURSOR (desktop only)
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
if (cursor && ring && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
    }, 80);
  });
  document.querySelectorAll('a, button, .project-card, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
      ring.style.borderColor = 'rgba(201,168,76,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(201,168,76,0.5)';
    });
  });
}

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

hamburger && hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  navOverlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

function closeMenu() {
  navLinks && navLinks.classList.remove('open');
  hamburger && hamburger.classList.remove('open');
  navOverlay && navOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  const sections = document.querySelectorAll('section, [id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => {
    if (s.id && window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    const t = document.querySelector(href);
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// TYPED.JS
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Typed !== 'undefined') {
    new Typed('.multiple-text', {
      strings: ['Premium Websites', 'Web Applications', 'Digital Experiences', 'High-Converting Pages'],
      typeSpeed: 60, backSpeed: 40, backDelay: 1800, loop: true
    });
  }
});

// MARQUEE FILL
const marqueeItems = ['Web Design','App Development','UI/UX','Fast Delivery','Clean Code','100% Custom','Responsive','Modern Tech','Client-Focused'];
const track = document.getElementById('marqueeTrack');
if (track) {
  const repeated = [...marqueeItems, ...marqueeItems, ...marqueeItems];
  track.innerHTML = repeated.map(t => `<div class="marquee-item">${t}</div>`).join('');
}

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// 3D TILT - HERO
const tiltEl = document.getElementById('heroTilt');
if (tiltEl) {
  tiltEl.addEventListener('mousemove', e => {
    const r = tiltEl.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltEl.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg)`;
  });
  tiltEl.addEventListener('mouseleave', () => {
    tiltEl.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    tiltEl.style.transition = 'transform 0.6s ease';
  });
  tiltEl.addEventListener('mouseenter', () => { tiltEl.style.transition = 'transform 0.1s ease'; });
}

// 3D TILT - CARDS
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-8px) perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.5s ease';
  });
  card.addEventListener('mouseenter', () => { card.style.transition = 'all 0.1s ease'; });
});

// CONTACT SUBMIT
function handleSubmit(btn) {
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#22c55e';
    btn.style.color = '#fff';
  }, 1200);
}

// =================== REVIEW SYSTEM ===================
const REVIEWS_KEY = 'portfolio_reviews';

// Load reviews from localStorage (simulates JSON persistence in a static site)
function getReviews() {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveReviews(reviews) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

function getInitials(name) {
  return name.trim().split(/\s+/).map(w => w[0].toUpperCase()).slice(0, 2).join('');
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  const noMsg = document.getElementById('noReviews');
  if (!grid) return;
  const reviews = getReviews();
  if (reviews.length === 0) {
    grid.innerHTML = '';
    noMsg && (noMsg.style.display = 'block');
    return;
  }
  noMsg && (noMsg.style.display = 'none');
  grid.innerHTML = reviews.slice().reverse().map(r => `
    <div class="review-card">
      <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      <p class="review-text">"${escapeHtml(r.text)}"</p>
      <div class="review-author">
        <div class="review-avatar">${escapeHtml(getInitials(r.name))}</div>
        <div>
          <div class="review-author-name">${escapeHtml(r.name)}</div>
          <div class="review-author-role">${escapeHtml(r.role)}</div>
          <div class="review-date">${formatDate(r.date)}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Star rating selector
let selectedRating = 0;
const starBtns = document.querySelectorAll('.star-btn');
const starValue = document.getElementById('starValue');

starBtns.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    const v = +btn.dataset.val;
    starBtns.forEach(b => b.classList.toggle('active', +b.dataset.val <= v));
  });
  btn.addEventListener('mouseleave', () => {
    starBtns.forEach(b => b.classList.toggle('active', +b.dataset.val <= selectedRating));
  });
  btn.addEventListener('click', () => {
    selectedRating = +btn.dataset.val;
    if (starValue) starValue.textContent = selectedRating + ' / 5';
    starBtns.forEach(b => b.classList.toggle('active', +b.dataset.val <= selectedRating));
  });
});

// Char counter
const reviewTextArea = document.getElementById('reviewText');
const charCount = document.getElementById('charCount');
if (reviewTextArea && charCount) {
  reviewTextArea.addEventListener('input', () => {
    charCount.textContent = reviewTextArea.value.length;
  });
}

function submitReview(btn) {
  const name = document.getElementById('reviewName').value.trim();
  const role = document.getElementById('reviewRole').value.trim();
  const text = reviewTextArea ? reviewTextArea.value.trim() : '';
  const msg = document.getElementById('reviewMsg');

  if (!name) { showMsg(msg, 'Please enter your name.', 'error'); return; }
  if (!role) { showMsg(msg, 'Please enter your role or company.', 'error'); return; }
  if (selectedRating === 0) { showMsg(msg, 'Please select a star rating.', 'error'); return; }
  if (text.length < 10) { showMsg(msg, 'Please write at least 10 characters.', 'error'); return; }

  btn.disabled = true;
  btn.textContent = 'Submitting...';

  const review = {
    id: Date.now(),
    name,
    role,
    rating: selectedRating,
    text,
    date: new Date().toISOString()
  };

  const reviews = getReviews();
  reviews.push(review);
  saveReviews(reviews);
  renderReviews();

  // Reset
  document.getElementById('reviewName').value = '';
  document.getElementById('reviewRole').value = '';
  if (reviewTextArea) reviewTextArea.value = '';
  if (charCount) charCount.textContent = '0';
  selectedRating = 0;
  starBtns.forEach(b => b.classList.remove('active'));
  if (starValue) starValue.textContent = '0 / 5';

  btn.textContent = 'Review Submitted ✓';
  btn.style.background = '#22c55e';
  btn.style.color = '#fff';
  showMsg(msg, 'Thank you for your review!', 'success');

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'Submit Review →';
    btn.style.background = '';
    btn.style.color = '';
    msg.textContent = '';
  }, 3000);
}

function showMsg(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className = 'review-feedback ' + type;
}

// Init reviews on load
document.addEventListener('DOMContentLoaded', renderReviews);
