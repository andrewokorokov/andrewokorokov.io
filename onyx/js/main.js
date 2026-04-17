/* =====================================================
   ONYX — main.js
   Nav scroll · Drawer · Auth toggle · Lightbox
   ===================================================== */

(function () {
  'use strict';

  /* ── Nav scroll effect ── */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Drawer ── */
  const burger         = document.getElementById('nav-burger');
  const drawerOverlay  = document.getElementById('drawer-overlay');
  const drawer         = document.getElementById('drawer');
  const drawerClose    = document.getElementById('drawer-close');

  function openDrawer() {
    drawerOverlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawerOverlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);

  drawerOverlay?.addEventListener('mousedown', (e) => {
    if (!drawer.contains(e.target)) closeDrawer();
  });

  /* Close drawer on nav link click */
  drawer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeDrawer());
  });

  /* ── Auth state toggle ── */
  function setLoggedIn() {
    document.body.classList.add('logged-in');
    closeDrawer();
  }

  function setGuest() {
    document.body.classList.remove('logged-in');
    closeDrawer();
  }

  document.querySelectorAll('.js-login').forEach(el => el.addEventListener('click', setLoggedIn));
  document.querySelectorAll('.js-join').forEach(el =>  el.addEventListener('click', setLoggedIn));
  document.querySelectorAll('.js-logout').forEach(el => el.addEventListener('click', setGuest));

  /* ── Lightbox ── */
  const lightbox      = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src) {
    if (!lightbox) return;
    const img = lightbox.querySelector('img');
    if (img) img.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }

  lightboxClose?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('mousedown', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeLightbox(); closeDrawer(); }
  });

  /* Play buttons → lightbox */
  document.querySelectorAll('.js-play').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = btn.dataset.src;
      if (src) openLightbox(src);
    });
  });

  /* Video cards (click anywhere on card) */
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.video-thumb img');
      if (img) openLightbox(img.src);
    });
  });

})();
