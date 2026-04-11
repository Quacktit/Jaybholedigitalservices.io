/* ============================================================
   main.js — Shared JavaScript for YourBrand Corporate Site
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Active Nav Link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  /* ── Sticky Nav Shadow on Scroll ── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── Hamburger Menu ── */
  const hamburger = document.querySelector('.hamburger');
  const drawer    = document.querySelector('.nav-drawer');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    drawer?.classList.toggle('open');
  });
  // Close drawer when a link is clicked
  drawer?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
    });
  });
  // Close drawer on outside click
  document.addEventListener('click', (e) => {
    if (drawer?.classList.contains('open') && !drawer.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
    }
  });

  /* ── Back to Top ── */
  document.querySelectorAll('.back-to-top').forEach(btn => {
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  });

  /* ── Cookie Banner ── */
  const banner       = document.querySelector('.cookie-banner');
  const cookieKey    = 'yb_cookie_accepted';
  if (banner && !localStorage.getItem(cookieKey)) {
    setTimeout(() => banner.classList.add('show'), 900);
  }
  document.querySelector('.cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem(cookieKey, '1');
    banner?.classList.remove('show');
  });
  document.querySelector('.cookie-decline')?.addEventListener('click', () => {
    banner?.classList.remove('show');
  });

  /* ── Cookie Float Button — toggle banner ── */
  document.querySelector('.float-cookie')?.addEventListener('click', () => {
    banner?.classList.toggle('show');
  });

  /* ── Scroll-triggered Fade-Up ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.service-card, .catalog-card, .pillar, .team-card, .stat-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  // Mark visible
  document.querySelectorAll('.visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
  // Intersection observer fires after attaching, so handle it properly:
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .catalog-card, .pillar, .team-card, .stat-block').forEach(el => {
    animObserver.observe(el);
  });

  /* ── Contact Form Submit (Demo) ── */
  document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#16a34a';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      e.target.reset();
    }, 3000);
  });

});
