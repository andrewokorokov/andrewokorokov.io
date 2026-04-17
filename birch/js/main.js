/* ─── State: login / logout (CSS handles all visibility) ── */
const body = document.body;

function setLoggedIn() {
  body.dataset.state = 'logged-in';
  closeDrawer();
}

function setGuest() {
  body.dataset.state = 'guest';
  closeDrawer();
}

document.getElementById('login-btn')?.addEventListener('click', setLoggedIn);
document.getElementById('join-btn')?.addEventListener('click', setLoggedIn);
document.getElementById('logout-btn')?.addEventListener('click', setGuest);
document.getElementById('drawer-login-btn')?.addEventListener('click', setLoggedIn);
document.getElementById('drawer-join-btn')?.addEventListener('click', setLoggedIn);
document.getElementById('drawer-logout')?.addEventListener('click', setGuest);

/* ─── Drawer ────────────────────────────────────────────── */
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('drawer-overlay');
const burger = document.getElementById('nav-burger');
const drawerClose = document.getElementById('drawer-close');

function openDrawer() {
  drawer.classList.add('open');
  overlay.classList.add('active');
  drawer.removeAttribute('aria-hidden');
}

function closeDrawer() {
  drawer.classList.remove('open');
  overlay.classList.remove('active');
  drawer.setAttribute('aria-hidden', 'true');
}

burger?.addEventListener('click', openDrawer);
drawerClose?.addEventListener('click', closeDrawer);
overlay?.addEventListener('click', closeDrawer);

document.addEventListener('mousedown', e => {
  if (drawer.classList.contains('open') && !drawer.contains(e.target) && !burger.contains(e.target)) {
    closeDrawer();
  }
});

/* ─── Lightbox ──────────────────────────────────────────── */
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('[data-video]').forEach(el => {
  el.addEventListener('click', () => lightbox.classList.add('active'));
});

lightboxClose?.addEventListener('click', () => lightbox.classList.remove('active'));

lightbox?.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    lightbox.classList.remove('active');
    closeDrawer();
  }
});

/* ─── Countdown ─────────────────────────────────────────── */
const streamTarget = new Date('2026-05-05T20:00:00').getTime();

function pad(n) { return String(n).padStart(2, '0'); }

function tick() {
  const diff = streamTarget - Date.now();
  if (diff <= 0) {
    ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '00';
    });
    return;
  }
  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);

  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-mins');
  const sEl = document.getElementById('cd-secs');

  if (dEl) dEl.textContent = pad(days);
  if (hEl) hEl.textContent = pad(hours);
  if (mEl) mEl.textContent = pad(mins);
  if (sEl) sEl.textContent = pad(secs);
}

tick();
setInterval(tick, 1000);

/* ─── X carousel dots ───────────────────────────────────── */
const carousel = document.getElementById('x-carousel');
const dots = document.querySelectorAll('#x-dots .dot');

if (carousel && dots.length) {
  carousel.addEventListener('scroll', () => {
    const idx = Math.round(carousel.scrollLeft / carousel.offsetWidth);
    dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
  }, { passive: true });
}
