'use strict';

/* ---------- Content (edit here) ---------- */
const skills = [
  ['8 Ball Pool', 90], ['Break and Positioning', 80], ['Focus under Pressure', 85],
  ['Gaming and Teamwork', 85], ['Problem Solving', 70], ['HTML', 45], ['CSS', 40], ['JavaScript', 25]
];
const projects = [
  { t: 'Personal Portfolio Website', d: 'My final project. A responsive dark-theme website built with HTML, CSS and JavaScript.', tags: ['HTML', 'CSS', 'JavaScript'], cat: 'web', icon: '🌐', g: ['#0f3a2e', '#3ddc97'], demo: '#home' },
  { t: 'Pool Practice Tracker', d: 'Planned: a page to log practice sessions and track how many racks I win.', tags: ['HTML', 'JavaScript'], cat: 'billiards', icon: '🎱', g: ['#1b1b1b', '#e9c46a'] },
  { t: 'Shot Planner', d: 'Planned: a simple table diagram where I can sketch shot angles before I play.', tags: ['CSS', 'JavaScript'], cat: 'billiards', icon: '🎯', g: ['#0b3d5c', '#5aa9e6'] },
  { t: 'Gaming Schedule Page', d: 'Planned: a one-page schedule so friends know when I am online for games.', tags: ['HTML', 'CSS'], cat: 'games', icon: '🎮', g: ['#2d1b4e', '#b388ff'] },
  { t: 'Match Scoreboard', d: 'Planned: a scoreboard for friendly 8 ball matches that keeps score on screen.', tags: ['JavaScript'], cat: 'games', icon: '🏆', g: ['#4a1d1d', '#ff8a65'] },
  { t: 'Barkada Tournament Site', d: 'Planned: a small site with brackets and results for a local pool tournament.', tags: ['HTML', 'CSS', 'JavaScript'], cat: 'web', icon: '📋', g: ['#1d3a2b', '#a5d6a7'] }
];
const services = [
  ['🎱', 'Practice Partner', 'Friendly 8 ball matches and practice sessions in Bambang, with tips on breaks and position play.'],
  ['🎮', 'Gaming Teammate', 'A reliable, calm teammate for mobile and PC games, online or in person.'],
  ['🌐', 'Simple Websites', 'One-page websites for small shops, teams or events, built with plain HTML and CSS.'],
  ['📝', 'Content Help', 'Short write-ups, captions and announcements for your page or group.']
];
const journey = [
  ['Education', 'Secondary Education', 'Finished secondary school and started exploring what I want to do next.'],
  ['About 5 years ago', 'Started playing 8 ball pool', 'Began playing seriously and learned patience, aim and how to read the table.'],
  ['Now', 'First website', 'Building this portfolio from scratch as my final project and learning HTML, CSS and JavaScript.'],
  ['Next', 'Keep learning', 'Finish the planned projects and earn my first certificate in web development.']
];

/* ---------- Helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- Render sections ---------- */
$('#skillGrid').innerHTML = skills.map(([n, v]) =>
  `<div class="skill glass reveal"><header><span>${n}</span><em>${v}%</em></header><div class="bar" role="progressbar" aria-label="${n}" aria-valuenow="${v}" aria-valuemin="0" aria-valuemax="100"><i data-w="${v}"></i></div></div>`).join('');

$('#projGrid').innerHTML = projects.map(p => {
  const live = p.demo ? `<a class="btn primary sm" href="${p.demo}">Live Demo</a>` : `<span class="btn primary sm" aria-disabled="true">Live Demo</span>`;
  const src = `<span class="btn ghost sm" aria-disabled="true">Source Code</span>`;
  return `<article class="proj glass reveal" data-cat="${p.cat}"><div class="thumb" style="background:linear-gradient(135deg,${p.g[0]},${p.g[1]})" role="img" aria-label="${esc(p.t)} preview"><span aria-hidden="true">${p.icon}</span></div><div class="proj-body"><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p><div class="tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div><div class="proj-btns">${live}${src}</div></div></article>`;
}).join('');

$('#servGrid').innerHTML = services.map(([i, t, d]) =>
  `<article class="serv glass reveal"><span class="ic" aria-hidden="true">${i}</span><h3>${t}</h3><p>${d}</p></article>`).join('');

$('#timeline').innerHTML = journey.map(([w, t, d]) =>
  `<li class="tl glass reveal"><time>${w}</time><h3>${t}</h3><p>${d}</p></li>`).join('');

$('#year').textContent = new Date().getFullYear();

/* ---------- Mobile menu ---------- */
const burger = $('#burger'), menu = $('#menu');
const setMenu = open => { menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); };
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
$$('.menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* ---------- Theme toggle ---------- */
const themeBtn = $('#theme');
const applyTheme = t => { document.documentElement.dataset.theme = t; themeBtn.textContent = t === 'light' ? '☀' : '☾'; themeBtn.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode'); };
let saved = null; try { saved = localStorage.getItem('theme'); } catch (e) { /* storage unavailable */ }
applyTheme(saved || 'dark');
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(next); try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
});

/* ---------- Typing effect ---------- */
const typed = $('#typed'), words = ['8 Ball Pool Player', 'Gamer', 'Future Web Developer'];
let wi = 0, ci = 0, del = false;
(function type() {
  const w = words[wi];
  typed.textContent = w.slice(0, ci += del ? -1 : 1);
  let delay = del ? 45 : 90;
  if (!del && ci === w.length) { del = true; delay = 1400; }
  else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; delay = 350; }
  setTimeout(type, delay);
})();

/* ---------- Scroll reveal, skill bars, counters ---------- */
const countUp = el => {
  const end = +el.dataset.count, start = performance.now();
  const tick = now => { const p = Math.min((now - start) / 1200, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
};
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  en.target.classList.add('in');
  $$('[data-w]', en.target).forEach(b => b.style.width = b.dataset.w + '%');
  $$('[data-count]', en.target).forEach(countUp);
  io.unobserve(en.target);
}), { threshold: .15 });
$$('.reveal').forEach(el => io.observe(el));

/* ---------- Active nav link ---------- */
const links = $$('.menu a');
const spy = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => spy.observe(s));

/* ---------- Project filter ---------- */
$$('.chip').forEach(chip => chip.addEventListener('click', () => {
  $$('.chip').forEach(c => c.classList.remove('active')); chip.classList.add('active');
  $$('.proj').forEach(p => p.classList.toggle('hide', chip.dataset.filter !== 'all' && p.dataset.cat !== chip.dataset.filter));
}));

/* ---------- Back to top ---------- */
const totop = $('#totop');
window.addEventListener('scroll', () => totop.classList.toggle('show', scrollY > 600), { passive: true });
totop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Contact form ---------- */
const form = $('#form'), toast = $('#toast');
const rules = {
  name: v => v.trim().length >= 2 || 'Enter your name (at least 2 characters).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Enter a valid email, like name@example.com.',
  subject: v => v.trim().length >= 3 || 'Enter a subject (at least 3 characters).',
  message: v => v.trim().length >= 10 || 'Write a message of at least 10 characters.'
};
const check = id => {
  const input = $('#' + id), res = rules[id](input.value), ok = res === true;
  input.classList.toggle('invalid', !ok); input.setAttribute('aria-invalid', !ok);
  $('#e-' + id).textContent = ok ? '' : res;
  return ok;
};
Object.keys(rules).forEach(id => $('#' + id).addEventListener('blur', () => check(id)));
form.addEventListener('submit', e => {
  e.preventDefault();
  const results = Object.keys(rules).map(check);
  if (results.includes(false)) { $('.invalid', form)?.focus(); return; }
  form.reset();
  toast.textContent = 'Message sent. Thank you, I will reply soon.';
  toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 4000);
});
