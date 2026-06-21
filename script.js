/* ===========================
   NAVBAR — scroll & mobile
=========================== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navBackdrop = document.getElementById('navBackdrop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

function openMenu() {
  navLinks.classList.add('open');
  hamburger.classList.add('open');
  navBackdrop.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  navBackdrop.classList.remove('show');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
});

navBackdrop.addEventListener('click', closeMenu);

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ===========================
   SMOOTH SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===========================
   REVEAL ON SCROLL
=========================== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

/* ===========================
   SKILL BARS — animate when visible
=========================== */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ===========================
   CONTACT FORM
=========================== */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMsg = document.getElementById('formMsg');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const message = document.getElementById('fmessage').value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = 'Please fill in all required fields.';
      formMsg.className = 'form-msg error';
      return;
    }

    // Basic email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formMsg.textContent = 'Please enter a valid email address.';
      formMsg.className = 'form-msg error';
      return;
    }

    // Simulate send (replace with Formspree or EmailJS in production)
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
      formMsg.textContent = 'Message sent! I\'ll get back to you within 24 hours.';
      formMsg.className = 'form-msg success';
      form.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        formMsg.textContent = '';
        formMsg.className = 'form-msg';
      }, 5000);
    }, 1200);
  });
}

/* ===========================
   ACTIVE NAV LINK ON SCROLL
=========================== */
const sections = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.id;
    }
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
}, { passive: true });