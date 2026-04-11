// =============================================
// NEXACORE — Main JavaScript
// =============================================

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  if (backTop) backTop.classList.toggle('show', window.scrollY > 400);
});

// Mobile menu toggle
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Cookie banner
window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('cookieAccepted')) {
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'flex';
  }
});
function acceptCookie() {
  localStorage.setItem('cookieAccepted', '1');
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.style.display = 'none';
}
function declineCookie() {
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.style.display = 'none';
}

// Portfolio filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.port-item').forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#4ade80';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// Newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.querySelector('button').addEventListener('click', () => {
    const input = newsletterForm.querySelector('input');
    if (input.value) {
      newsletterForm.innerHTML = '<p style="color:#4ade80;font-weight:600">✓ Thank you for subscribing!</p>';
    }
  });
}

// Animate on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .testi-card, .blog-card, .team-card, .pricing-card, .service-block, .port-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
