

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  const sections = document.querySelectorAll('section, [id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => {
    if (s.id && window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
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
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

// 3D TILT ON HERO IMAGE
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
  tiltEl.addEventListener('mouseenter', () => {
    tiltEl.style.transition = 'transform 0.1s ease';
  });
}

// 3D TILT ON PROJECT CARDS
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
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.1s ease';
  });
});

// SUBMIT HANDLER
function handleSubmit(btn) {
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#22c55e';
    btn.style.color = '#fff';
  }, 1200);
}
