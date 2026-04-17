/* ═══════════════════════════════════════════════════════════════════════
   CARMINE — main.js
   ═══════════════════════════════════════════════════════════════════════ */

// ─── STATE TOGGLE ────────────────────────────────────────────────────────
const body = document.body;

document.querySelectorAll('[data-action="login"], [data-action="join"]').forEach(el => {
  el.addEventListener('click', () => {
    body.classList.remove('state-guest');
    body.classList.add('state-logged');
    closeDrawer();
  });
});

document.querySelectorAll('[data-action="logout"]').forEach(el => {
  el.addEventListener('click', () => {
    body.classList.remove('state-logged');
    body.classList.add('state-guest');
    closeDrawer();
  });
});

// ─── DRAWER ──────────────────────────────────────────────────────────────
const drawerOverlay = document.getElementById('drawer-overlay');

function openDrawer() {
  drawerOverlay.classList.add('open');
  body.style.overflow = 'hidden';
}

function closeDrawer() {
  drawerOverlay.classList.remove('open');
  body.style.overflow = '';
}

document.getElementById('nav-burger').addEventListener('click', openDrawer);
document.getElementById('drawer-close').addEventListener('click', closeDrawer);

document.getElementById('drawer-backdrop').addEventListener('mousedown', e => {
  if (e.target === e.currentTarget) closeDrawer();
});

// ─── COUNTDOWN ───────────────────────────────────────────────────────────
(function initCountdown() {
  const daysEl  = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl  = document.getElementById('cd-mins');
  const secsEl  = document.getElementById('cd-secs');

  if (!daysEl) return;

  const target = new Date();
  target.setDate(target.getDate() + 7);
  target.setHours(20, 0, 0, 0);

  const pad = n => String(n).padStart(2, '0');

  function tick() {
    const diff = target - Date.now();

    if (diff <= 0) {
      daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = '00';
      return;
    }

    daysEl.textContent  = pad(Math.floor(diff / 86400000));
    hoursEl.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    minsEl.textContent  = pad(Math.floor((diff % 3600000) / 60000));
    secsEl.textContent  = pad(Math.floor((diff % 60000) / 1000));
  }

  tick();
  setInterval(tick, 1000);
})();

// ─── X POSTS CAROUSEL (MOBILE) ───────────────────────────────────────────
(function initCarousel() {
  const track = document.getElementById('x-carousel-track');
  const dots  = document.querySelectorAll('.x-dot');

  if (!track || !dots.length) return;

  function updateDots() {
    const index = Math.round(track.scrollLeft / track.clientWidth);
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  track.addEventListener('scroll', updateDots, { passive: true });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
    });
  });
})();

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(el => observer.observe(el));
})();

// ─── LIGHTBOX ────────────────────────────────────────────────────────────
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightbox) return;

  function openLightbox() {
    lightbox.classList.add('open');
    body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    body.style.overflow = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', openLightbox);
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('mousedown', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
})();
