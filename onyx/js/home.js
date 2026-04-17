/* =====================================================
   ONYX — home.js
   Countdown timer · X posts carousel dots
   ===================================================== */

(function () {
  'use strict';

  /* ── Countdown timer ── */
  const streamDate = new Date('2026-05-10T20:00:00');

  const elDays = document.getElementById('cd-days');
  const elHrs  = document.getElementById('cd-hours');
  const elMins = document.getElementById('cd-mins');
  const elSecs = document.getElementById('cd-secs');

  function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

  function updateCountdown() {
    const diff = streamDate - Date.now();

    if (diff <= 0) {
      [elDays, elHrs, elMins, elSecs].forEach(el => { if (el) el.textContent = '00'; });
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hrs  = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000)  / 60000);
    const secs = Math.floor((diff % 60000)    / 1000);

    if (elDays) elDays.textContent = pad(days);
    if (elHrs)  elHrs.textContent  = pad(hrs);
    if (elMins) elMins.textContent = pad(mins);
    if (elSecs) elSecs.textContent = pad(secs);
  }

  if (elDays || elHrs || elMins || elSecs) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ── X Posts carousel dots (mobile) ── */
  const xPosts = document.getElementById('x-posts');
  const dots   = document.querySelectorAll('.x-dot');

  if (xPosts && dots.length) {
    /* Set initial active */
    dots[0]?.classList.add('active');

    xPosts.addEventListener('scroll', () => {
      const index = Math.round(xPosts.scrollLeft / xPosts.offsetWidth);
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }, { passive: true });
  }

})();
