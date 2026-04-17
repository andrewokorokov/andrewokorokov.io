/* ─── STATE ───────────────────────────────────────────────────── */
let isLoggedIn = false;

/* ─── AUTH TOGGLE ─────────────────────────────────────────────── */
function setLoggedIn(state) {
	isLoggedIn = state;
	document.body.classList.toggle('loggedin', state);
	document.body.classList.toggle('guest', !state);
}

const loginBtn  = document.getElementById('login-btn');
const joinBtn   = document.getElementById('join-btn');
const logoutBtn = document.getElementById('logout-btn');
const drawerLoginBtn  = document.getElementById('drawer-login-btn');
const drawerJoinBtn   = document.getElementById('drawer-join-btn');
const drawerLogoutBtn = document.getElementById('drawer-logout-btn');

if (loginBtn)  loginBtn.addEventListener('click',  () => setLoggedIn(true));
if (joinBtn)   joinBtn.addEventListener('click',   () => setLoggedIn(true));
if (logoutBtn) logoutBtn.addEventListener('click', () => setLoggedIn(false));

if (drawerLoginBtn)  drawerLoginBtn.addEventListener('click',  () => { setLoggedIn(true);  closeDrawer(); });
if (drawerJoinBtn)   drawerJoinBtn.addEventListener('click',   () => { setLoggedIn(true);  closeDrawer(); });
if (drawerLogoutBtn) drawerLogoutBtn.addEventListener('click', () => { setLoggedIn(false); closeDrawer(); });

// Init guest state
setLoggedIn(false);

/* ─── MOBILE DRAWER ───────────────────────────────────────────── */
const drawer        = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const burgerBtn     = document.getElementById('burger-btn');
const drawerCloseBtn = document.getElementById('drawer-close');

function openDrawer() {
	drawer.classList.add('open');
	drawerOverlay.classList.add('visible');
	document.body.style.overflow = 'hidden';
}

function closeDrawer() {
	drawer.classList.remove('open');
	drawerOverlay.classList.remove('visible');
	document.body.style.overflow = '';
}

if (burgerBtn)     burgerBtn.addEventListener('click', openDrawer);
if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

/* ─── MORE DROPDOWN ───────────────────────────────────────────── */
const moreBtn      = document.querySelector('.more-btn');
const moreDropdown = document.querySelector('.more-dropdown');

if (moreBtn && moreDropdown) {
	moreBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		moreDropdown.classList.toggle('visible');
	});
	document.addEventListener('click', () => {
		moreDropdown.classList.remove('visible');
	});
}

/* ─── HERO VIDEO LIGHTBOX ─────────────────────────────────────── */
const lightbox      = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox() {
	if (!lightbox) return;
	lightbox.classList.add('visible');
	document.body.style.overflow = 'hidden';
}

function closeLightbox() {
	if (!lightbox) return;
	lightbox.classList.remove('visible');
	document.body.style.overflow = '';
}

const playHero = document.getElementById('play-hero');
if (playHero) playHero.addEventListener('click', openLightbox);
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
	lightbox.addEventListener('click', (e) => {
		if (e.target === lightbox) closeLightbox();
	});
}

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		closeLightbox();
		closeDrawer();
	}
});

/* ─── COUNTDOWN TIMER ─────────────────────────────────────────── */
const countdownTarget = new Date('2026-04-19T21:00:00');

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
	const diff = countdownTarget - new Date();

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

	const daysEl  = document.getElementById('cd-days');
	const hoursEl = document.getElementById('cd-hours');
	const minsEl  = document.getElementById('cd-mins');
	const secsEl  = document.getElementById('cd-secs');

	if (daysEl)  daysEl.textContent  = pad(days);
	if (hoursEl) hoursEl.textContent = pad(hours);
	if (minsEl)  minsEl.textContent  = pad(mins);
	if (secsEl)  secsEl.textContent  = pad(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ─── X POSTS CAROUSEL (MOBILE) ──────────────────────────────── */
function initXCarousel() {
	const xPosts = document.getElementById('x-posts');
	const xDots  = document.getElementById('x-dots');
	if (!xPosts || !xDots) return;

	const cards = xPosts.querySelectorAll('.x-card');
	if (cards.length === 0) return;

	// Build dots
	xDots.innerHTML = '';
	cards.forEach((_, i) => {
		const dot = document.createElement('button');
		dot.className = 'x-dot' + (i === 0 ? ' active' : '');
		dot.setAttribute('aria-label', `Post ${i + 1}`);
		dot.addEventListener('click', () => {
			cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
		});
		xDots.appendChild(dot);
	});

	const dots = xDots.querySelectorAll('.x-dot');

	// IntersectionObserver to track active card
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const idx = Array.from(cards).indexOf(entry.target);
				dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
			}
		});
	}, { root: xPosts, threshold: 0.5 });

	cards.forEach(card => observer.observe(card));
}

initXCarousel();
