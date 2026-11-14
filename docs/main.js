/* TKYSOFT — interactions (GSAP + ScrollTrigger + Lenis + Swiper) */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const lerp = (a, b, t) => a + (b - a) * t;
  const body = document.body;
  const hasGsap = !!window.gsap && !!window.ScrollTrigger;

  /* ───────────────── DOM prep ───────────────── */
  // inline the logo so each copy can animate on its own
  const symbol = $('#tk-mark');
  $$('[data-inline-mark]').forEach(svg => { svg.innerHTML = symbol.innerHTML; });

  // split text into characters
  $$('.split').forEach(el => {
    el.innerHTML = [...el.textContent].map(c => c === ' ' ? '<span class="ch sp"> </span>' : `<span class="ch">${c}</span>`).join('');
  });
  // wrap characters for scroll "ink fill" (keeps <em>/<br>)
  const T = k => (window.TKY_I18N ? window.TKY_I18N.t(k) : k);
  const curLang = () => (window.TKY_I18N ? window.TKY_I18N.lang : 'ja');
  const wrapFill = el => {
    const walk = n => [...n.childNodes].forEach(c => {
      if (c.nodeType === 3) {
        const f = document.createDocumentFragment();
        [...c.textContent].forEach(ch => { const s = document.createElement('span'); s.className = 'fc'; s.textContent = ch; f.appendChild(s); });
        c.replaceWith(f);
      } else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c);
    });
    walk(el);
  };
  $$('[data-fill]').forEach(wrapFill);
  // nav roll text
  $$('.nav a span[data-text]').forEach(s => { const t = s.dataset.text; s.innerHTML = `<i>${t}</i><i aria-hidden="true">${t}</i>`; });
  // section line fill
  $$('.sec-line').forEach(l => l.appendChild(document.createElement('i')));

  /* ───────────────── Circuit canvas ───────────────── */
  class Circuit {
    constructor(canvas, opt) {
      this.c = canvas; this.ctx = canvas.getContext('2d'); this.o = opt;
      this.mouse = { x: -9999, y: -9999 };
      this.running = false; this.visible = true; this.t0 = 0; this.pulses = [];
      this.sprite = this.makeSprite();
      this.resize();
      let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => this.resize(), 200); });
      canvas.parentElement.addEventListener('pointermove', e => {
        const r = canvas.getBoundingClientRect(); this.mouse.x = e.clientX - r.left; this.mouse.y = e.clientY - r.top;
      });
      canvas.parentElement.addEventListener('pointerleave', () => { this.mouse.x = this.mouse.y = -9999; });
      new IntersectionObserver(([en]) => { this.visible = en.isIntersecting; if (this.visible && this.running) this.loop(); }).observe(canvas);
    }
    makeSprite() {
      const s = document.createElement('canvas'); s.width = s.height = 48;
      const g = s.getContext('2d'); const gr = g.createRadialGradient(24, 24, 0, 24, 24, 24);
      gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.18, this.o.glow(1)); gr.addColorStop(.5, this.o.glow(.35)); gr.addColorStop(1, this.o.glow(0));
      g.fillStyle = gr; g.fillRect(0, 0, 48, 48); return s;
    }
    resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const r = this.c.getBoundingClientRect();
      if (!r.width) return;
      this.w = r.width; this.h = r.height; this.dpr = dpr;
      this.c.width = r.width * dpr; this.c.height = r.height * dpr;
      this.build();
    }
    build() {
      const { w, h } = this; const rnd = (a, b) => a + Math.random() * (b - a);
      const hole = this.o.hole(this.c);
      const traces = []; const mobile = w < 720;
      const per = Math.round(Math.min(34, Math.max(12, h / (mobile ? 30 : 24))));
      for (const side of [-1, 1]) {
        const x0 = side < 0 ? -4 : w + 4;
        const xEnd = hole.cx + side * hole.rx;
        const span = Math.abs(xEnd - x0);
        for (let k = 0; k < per; k++) {
          const isBus = Math.random() < .62;
          const ex = isBus ? xEnd + side * rnd(0, 26) : x0 - side * span * rnd(.25, .7);
          let ty, y0;
          if (isBus) { ty = lerp(hole.top, hole.bottom, (k + Math.random() * .5) / per); y0 = ty + rnd(-1, 1) * Math.min(h * .48, span * .55); }
          else { y0 = rnd(h * .03, h * .97); ty = y0 + rnd(-1, 1) * span * .3; }
          const avail = Math.abs(ex - x0) * .6;
          const dy = Math.max(-avail, Math.min(avail, ty - y0)); ty = y0 + dy;
          const run1 = (Math.abs(ex - x0) - Math.abs(dy)) * rnd(.15, .85);
          const x1 = x0 - side * run1, x2 = x1 - side * Math.abs(dy);
          traces.push(this.mk([[x0, y0], [x1, y0], [x2, ty], [ex, ty]], { node: !isBus || Math.random() < .55, r: rnd(3, mobile ? 5 : 6.5), bus: isBus }));
          if (Math.random() < .35) {
            const bx = lerp(x0, x1, rnd(.2, .8)); const dir = Math.random() < .5 ? -1 : 1; const d = rnd(14, 46); const run = rnd(10, 40);
            traces.push(this.mk([[bx, y0], [bx - side * d, y0 + dir * d], [bx - side * (d + run), y0 + dir * d]], { node: true, r: rnd(2.5, 4.5), stub: true }));
          }
        }
      }
      this.dashes = Array.from({ length: mobile ? 6 : 14 }, () => {
        const side = Math.random() < .5 ? -1 : 1;
        return { x: side < 0 ? rnd(w * .04, Math.max(w * .05, hole.cx - hole.rx - 60)) : rnd(Math.min(w * .95, hole.cx + hole.rx + 60), w * .96), y: rnd(h * .08, h * .92), n: 2 + (Math.random() * 3 | 0) };
      });
      this.traces = traces.sort((a, b) => a.delay - b.delay);
    }
    mk(pts, extra) {
      let len = 0; const seg = [];
      for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); len += l; }
      return { pts, seg, len, delay: Math.random() * 900 + (extra.stub ? 600 : 0), dur: 900 + Math.random() * 900, glow: 0, ...extra };
    }
    pointAt(tr, d) {
      for (let i = 0; i < tr.seg.length; i++) {
        if (d <= tr.seg[i]) { const t = d / tr.seg[i]; const a = tr.pts[i], b = tr.pts[i + 1]; return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)]; }
        d -= tr.seg[i];
      }
      return tr.pts[tr.pts.length - 1];
    }
    nearMouse(tr) {
      const { x, y } = this.mouse; if (x < -999) return 0; let m = 1e9;
      for (let i = 1; i < tr.pts.length; i++) {
        const [ax, ay] = tr.pts[i - 1], [bx, by] = tr.pts[i]; const vx = bx - ax, vy = by - ay;
        const t = Math.max(0, Math.min(1, ((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy || 1)));
        m = Math.min(m, Math.hypot(ax + vx * t - x, ay + vy * t - y));
      }
      return Math.max(0, 1 - m / 120);
    }
    start(delay = 0) {
      if (this.running) return; this.running = true;
      setTimeout(() => { this.t0 = performance.now(); if (reduce) this.t0 -= 1e5; this.loop(); }, delay);
    }
    loop() {
      if (this.raf || !this.visible) return;
      const step = now => { this.raf = 0; this.frame(now); if (this.visible && !reduce) this.raf = requestAnimationFrame(step); };
      this.raf = requestAnimationFrame(step);
    }
    frame(now) {
      const { ctx, dpr, o } = this; if (!this.traces) return; const el = now - this.t0;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, this.w, this.h);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      for (const tr of this.traces) {
        const p = Math.max(0, Math.min(1, (el - tr.delay) / tr.dur)); if (!p) continue;
        const draw = tr.len * (1 - Math.pow(1 - p, 3));
        tr.glow = lerp(tr.glow, this.nearMouse(tr), .12);
        ctx.strokeStyle = o.line(tr.bus ? .55 + tr.glow * .45 : .38 + tr.glow * .6);
        ctx.lineWidth = (tr.bus ? 1.5 : 1.2) + tr.glow * 1.2;
        ctx.beginPath(); ctx.moveTo(tr.pts[0][0], tr.pts[0][1]);
        let d = draw;
        for (let i = 0; i < tr.seg.length; i++) {
          const b = tr.pts[i + 1];
          if (d >= tr.seg[i]) { ctx.lineTo(b[0], b[1]); d -= tr.seg[i]; }
          else { const q = this.pointAt(tr, draw); ctx.lineTo(q[0], q[1]); break; }
        }
        ctx.stroke();
        if (tr.node && p >= 1) {
          const [x, y] = tr.pts[tr.pts.length - 1]; const s = Math.min(1, (el - tr.delay - tr.dur) / 300);
          ctx.beginPath(); ctx.arc(x, y, tr.r * s * (1 + tr.glow * .4), 0, 7);
          ctx.fillStyle = o.bg; ctx.fill(); ctx.lineWidth = 1.6 + tr.r * .25; ctx.strokeStyle = o.line(.75 + tr.glow * .25); ctx.stroke();
        }
      }
      ctx.fillStyle = o.line(.5);
      if (el > 1200) for (const ds of this.dashes) for (let i = 0; i < ds.n; i++) ctx.fillRect(ds.x + i * 7, ds.y, 4, 2);
      if (el > 1600) {
        if (this.pulses.length < (this.w < 720 ? 10 : 22) && Math.random() < .14) {
          const pool = this.traces.filter(t => !t.stub); const tr = pool[Math.random() * pool.length | 0];
          if (tr) this.pulses.push({ tr, d: 0, v: 1.6 + Math.random() * 2.6 });
        }
        ctx.globalCompositeOperation = o.blend;
        for (let i = this.pulses.length - 1; i >= 0; i--) {
          const pu = this.pulses[i]; pu.d += pu.v * (1 + pu.tr.glow * 2);
          if (pu.d > pu.tr.len) { this.pulses.splice(i, 1); continue; }
          for (let k = 0; k < 6; k++) {
            const [x, y] = this.pointAt(pu.tr, Math.max(0, pu.d - k * 5)); const s = 22 - k * 3;
            ctx.globalAlpha = 1 - k / 6; ctx.drawImage(this.sprite, x - s / 2, y - s / 2, s, s);
          }
        }
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
      }
    }
  }

  const heroCircuit = new Circuit($('.hero__circuit'), {
    bg: '#f4f2ee', blend: 'source-over',
    line: a => `rgba(232,53,43,${a})`, glow: a => `rgba(232,53,43,${a})`,
    hole: c => {
      const r = $('.hero__center').getBoundingClientRect(), p = c.getBoundingClientRect(), lg = $('.hero__logo').getBoundingClientRect();
      return { cx: r.left - p.left + r.width / 2, rx: Math.max(lg.width * .78, r.width / 2) + 16, top: lg.top - p.top + lg.height * .1, bottom: r.bottom - p.top - 10 };
    }
  });
  const contactCircuit = new Circuit($('.contact__circuit'), {
    bg: '#0f1e3d', blend: 'lighter',
    line: a => `rgba(255,110,100,${Math.min(1, a * .85)})`, glow: a => `rgba(255,70,60,${a})`,
    hole: c => {
      const r = $('.contact__inner').getBoundingClientRect(), p = c.getBoundingClientRect();
      return { cx: r.left - p.left + r.width / 2, rx: Math.min(r.width / 2, p.width * .36) + 10, top: r.top - p.top + 20, bottom: r.bottom - p.top - 20 };
    }
  });

  /* ───────────────── Movies (YouTube / TikTok) ───────────────── */
  const media = window.TKY_MEDIA || { channels: {}, videos: [] };
  const GAME_IMG = {
    'supernova': ['assets/games/supernova-1.jpg', true],
    'palette bullet': ['assets/games/palettebullet-1.jpg', true],
    'brawlerone': ['assets/games/brawlerone-1.jpg', false],
  };
  const parseVideo = v => {
    const u = v.url || '';
    let m = u.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/);
    if (m) {
      const shorts = /\/shorts\//.test(u);
      return { ...v, platform: 'youtube', id: m[1], vertical: shorts, thumb: v.thumb || `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg`,
        embed: `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&playsinline=1&rel=0` };
    }
    m = u.match(/tiktok\.com\/.*\/video\/(\d+)/);
    if (m) {
      const g = GAME_IMG[(v.game || '').toLowerCase()];
      return { ...v, platform: 'tiktok', id: m[1], vertical: true, thumb: v.thumb || (g ? g[0] : 'assets/ogp.jpg'),
        embed: `https://www.tiktok.com/player/v1/${m[1]}?autoplay=1&rel=0` };
    }
    return null;
  };
  const allVideos = (media.videos || []).map(parseVideo).filter(Boolean);
  // lang: "ja" などを付けた動画はその言語のときだけ出す（その言語の動画がなければ "en" のものを出す）
  const videosFor = lang => {
    const has = allVideos.some(v => v.lang === lang);
    return allVideos.filter(v => !v.lang || v.lang === lang || (!has && v.lang === 'en'));
  };
  let videos = videosFor(curLang());
  const esc = s => String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const PLAT = { youtube: ['i-yt', 'YouTube'], tiktok: ['i-tt', 'TikTok'] };
  const slideHTML = v => `
    <div class="swiper-slide vslide${v.vertical ? ' is-vertical' : ''}${v.soon ? ' is-soon' : ''}" ${v.embed ? `data-embed="${esc(v.embed)}"` : ''} data-cursor="${v.soon ? 'SOON' : 'PLAY'}">
      <img src="${esc(v.thumb)}" alt="" loading="lazy">
      <span class="vslide__badge">${v.soon ? 'COMING SOON' : `<svg><use href="#${PLAT[v.platform][0]}"/></svg>${PLAT[v.platform][1]}`}</span>
      <span class="vslide__play"></span>
      <div class="vslide__meta"><span class="mono">${esc(v.game || 'TKYSOFT')}</span><b>${esc(v.title || '')}</b></div>
    </div>`;
  const placeholders = () => [
    { soon: true, vertical: true, thumb: 'assets/games/palettebullet-1.jpg', game: 'Palette Bullet', title: T('ph1') },
    { soon: true, vertical: true, thumb: 'assets/games/palettebullet-2.jpg', game: 'Palette Bullet', title: T('ph2') },
    { soon: true, vertical: false, thumb: 'assets/games/brawlerone-1.jpg', game: 'BrawlerOne', title: T('ph3') },
    { soon: true, vertical: true, thumb: 'assets/games/supernova-1.jpg', game: 'SUPERNOVA', title: T('ph4') },
  ];
  let curFilter = 'all';
  const listFor = f => {
    const l = f === 'all' ? videos : videos.filter(v => v.platform === f);
    if (!l.length) return placeholders();
    // 「すべて」のときは、まだ動画のないゲームの「公開予定」カードを後ろに残す
    if (f !== 'all') return l;
    const have = new Set(l.map(v => (v.game || '').toLowerCase()));
    return [...l, ...placeholders().filter(p => !have.has(p.game.toLowerCase()))];
  };
  const wrapper = $('.movies__swiper .swiper-wrapper');
  wrapper.innerHTML = listFor('all').map(slideHTML).join('');

  // channel buttons
  const ch = media.channels || {};
  const chanBtn = (k, cls, label) => `<a class="chan chan--${cls}" href="${esc(ch[k])}" target="_blank" rel="noopener"><svg><use href="#${PLAT[k][0]}"/></svg>${label}</a>`;
  const ftBtn = k => `<a href="${esc(ch[k])}" target="_blank" rel="noopener" aria-label="${PLAT[k][1]}"><svg><use href="#${PLAT[k][0]}"/></svg></a>`;
  ['youtube', 'tiktok'].forEach(k => {
    if (!ch[k]) return;
    $('.movies__channels').insertAdjacentHTML('beforeend', chanBtn(k, k === 'youtube' ? 'yt' : 'tt', k === 'youtube' ? `<span data-i18n="chanYt">${T('chanYt')}</span>` : 'TikTok'));
    $('.footer__social').insertAdjacentHTML('beforeend', ftBtn(k));
  });

  let swiper = null;
  const stopVideos = () => $$('.vslide.is-playing').forEach(s => { s.querySelector('iframe')?.remove(); s.classList.remove('is-playing'); });
  if (window.Swiper) {
    swiper = new Swiper('.movies__swiper', {
      slidesPerView: 'auto', centeredSlides: true, spaceBetween: 28, grabCursor: true, speed: 900,
      initialSlide: 0, effect: 'coverflow',
      coverflowEffect: { rotate: 0, stretch: 0, depth: 160, modifier: 1, scale: .9, slideShadows: false },
      keyboard: { enabled: true }, mousewheel: { forceToAxis: true },
      navigation: { prevEl: '.movies__prev', nextEl: '.movies__next' },
      pagination: { el: '.movies__pager', type: 'fraction', formatFractionCurrent: n => String(n).padStart(2, '0'), formatFractionTotal: n => String(n).padStart(2, '0') },
      on: { slideChange: stopVideos },
    });
  }
  wrapper.addEventListener('click', e => {
    const s = e.target.closest('.vslide'); if (!s || s.classList.contains('is-soon') || s.classList.contains('is-playing')) return;
    const idx = [...wrapper.children].indexOf(s);
    if (swiper && idx !== swiper.activeIndex) { swiper.slideTo(idx); return; }
    stopVideos();
    s.insertAdjacentHTML('beforeend', `<iframe src="${s.dataset.embed}" title="Video player" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`);
    s.classList.add('is-playing');
  });
  const tabs = $('.movies__tabs');
  const renderSlides = () => {
    stopVideos();
    if (swiper) { swiper.removeAllSlides(); swiper.appendSlide(listFor(curFilter).map(slideHTML)); swiper.slideTo(0, 0); }
    else wrapper.innerHTML = listFor(curFilter).map(slideHTML).join('');
  };
  const setupTabs = () => {
    tabs.hidden = !videos.length;
    $$('button', tabs).forEach(b => { b.hidden = b.dataset.filter !== 'all' && !videos.some(v => v.platform === b.dataset.filter); });
    if (!videos.length || $(`[data-filter="${curFilter}"]`, tabs).hidden) curFilter = 'all';
    $$('button', tabs).forEach(x => x.classList.toggle('is-on', x.dataset.filter === curFilter));
  };
  $$('button', tabs).forEach(b => b.addEventListener('click', () => { curFilter = b.dataset.filter; setupTabs(); renderSlides(); }));
  setupTabs();

  /* ───────────────── Language change ───────────────── */
  const fillTweens = new Map();
  function makeFill(el) {
    return gsap.fromTo($$('.fc', el), { opacity: .1 }, { opacity: 1, stagger: .05, ease: 'none', scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: 1 } });
  }
  document.addEventListener('tky:lang', () => {
    $$('[data-fill]').forEach(el => {
      wrapFill(el);
      const old = fillTweens.get(el);
      if (old) { if (old.scrollTrigger) old.scrollTrigger.kill(); old.kill(); }
      if (window.gsap && window.ScrollTrigger && !reduce) fillTweens.set(el, makeFill(el));
    });
    videos = videosFor(curLang());
    setupTabs(); renderSlides();
    if (window.ScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  /* ───────────────── Header / menu ───────────────── */
  const header = $('.header'), burger = $('.burger');
  burger.addEventListener('click', () => { const open = body.classList.toggle('nav-open'); burger.setAttribute('aria-expanded', open); });
  $$('.nav a').forEach(a => a.addEventListener('click', () => { body.classList.remove('nav-open'); burger.setAttribute('aria-expanded', false); }));

  /* ───────────────── No GSAP fallback ───────────────── */
  if (!hasGsap) {
    $('.loader').remove(); body.classList.remove('is-loading'); body.classList.add('is-ready');
    heroCircuit.start(0); contactCircuit.start(0);
    addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 40), { passive: true });
    $$('[data-count]').forEach(n => n.textContent = n.dataset.count + (n.dataset.suffix || ''));
    $$('.card__ico path').forEach(p => p.style.strokeDashoffset = 0);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ───────────────── Lenis smooth scroll ───────────────── */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ lerp: .09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const target = a.getAttribute('href') === '#top' ? 0 : $(a.getAttribute('href')); if (target === null) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { duration: 1.6 }); else (target === 0 ? scrollTo({ top: 0, behavior: 'smooth' }) : target.scrollIntoView({ behavior: 'smooth' }));
  });

  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: self => {
      const y = self.scroll();
      header.classList.toggle('is-scrolled', y > 40);
      header.classList.toggle('is-hidden', y > 500 && self.direction === 1 && !body.classList.contains('nav-open'));
    }
  });
  gsap.to('.progress span', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });

  /* ───────────────── Logo draw helper ───────────────── */
  const drawMark = (svg, tl, at) => {
    const outer = $$('.mk-outer .mk-p', svg), inner = $$('.mk-inner .mk-p', svg), nodes = $$('.mk-n', svg);
    [...outer, ...inner].forEach(p => { const l = p.getTotalLength() + 1; gsap.set(p, { strokeDasharray: l, strokeDashoffset: l }); });
    gsap.set(nodes, { scale: 0, transformOrigin: '50% 50%' });
    tl.to(outer, { strokeDashoffset: 0, duration: .9, stagger: .07, ease: 'power3.inOut' }, at)
      .to(inner, { strokeDashoffset: 0, duration: .8, stagger: .07, ease: 'power3.inOut' }, `<+.25`)
      .to(nodes, { scale: 1, duration: .7, stagger: .08, ease: 'back.out(2.4)' }, `<+.15`);
  };

  /* ───────────────── Loader → Hero intro ───────────────── */
  const loaderTl = gsap.timeline();
  drawMark($('.loader__mark'), loaderTl, 0);
  const cnt = { v: 0 };
  loaderTl.to(cnt, { v: 100, duration: reduce ? .01 : 1.8, ease: 'power2.inOut', onUpdate: () => $('.loader__num').textContent = String(Math.round(cnt.v)).padStart(3, '0') }, 0)
    .to('.loader__bar span', { scaleX: 1, duration: reduce ? .01 : 1.8, ease: 'power2.inOut' }, 0);
  if (reduce) loaderTl.progress(1);

  const fontsReady = Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 2500))]);
  Promise.all([fontsReady, new Promise(r => loaderTl.eventCallback('onComplete', r))]).then(intro);

  function intro() {
    heroCircuit.resize();
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.to('.loader__mark, .loader__row, .loader__bar', { y: -30, opacity: 0, duration: .5, stagger: .05, ease: 'power2.in' })
      .to('.loader', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=.15')
      .add(() => { body.classList.add('is-ready'); body.classList.remove('is-loading'); $('.loader').remove(); lenis && lenis.start(); }, '>')
      .add(() => heroCircuit.start(0), '-=.7');
    drawMark($('.hero__mark'), tl, '-=.55');
    tl.from('.hero__logo', { scale: .6, rotate: -20, duration: 1.6 }, '<')
      .from('.hero__title .ch', { yPercent: 120, rotateX: -90, opacity: 0, stagger: .06, duration: 1.2 }, '-=1.4')
      .fromTo('.reveal-line', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, stagger: .12, ease: 'expo.inOut' }, '-=1')
      .from('.header', { yPercent: -100, opacity: 0, duration: 1 }, '-=.9')
      .from('.hero__news', { opacity: 0, y: 24, scale: .9, duration: 1 }, '-=.8')
      .from('.hero__meta, .scroll-cue', { opacity: 0, y: 20, duration: .8, stagger: .1 }, '-=.7');
  }

  if (reduce) { $$('[data-count]').forEach(n => n.textContent = n.dataset.count + (n.dataset.suffix || '')); $$('.card__ico path').forEach(p => p.style.strokeDashoffset = 0); contactCircuit.start(0); return; }

  /* ───────────────── Hero scroll-out ───────────────── */
  const heroST = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('.hero__center', { yPercent: 35, scale: .86, opacity: 0, ease: 'none', scrollTrigger: heroST });
  gsap.to('.hero__circuit', { scale: 1.3, opacity: .15, ease: 'none', scrollTrigger: { ...heroST } });

  /* ───────────────── Marquee (scroll-velocity driven) ───────────────── */
  const mTrack = $('.marquee__track'); let mx = 0, boost = 0, mdir = 1;
  const skew = gsap.quickTo('.marquee', 'skewX', { duration: .5, ease: 'power3' });
  gsap.ticker.add((t, dt) => {
    const half = mTrack.scrollWidth / 2; boost = lerp(boost, 0, .06);
    mx -= (1 + boost) * mdir * dt * .06;
    if (mx <= -half) mx += half; if (mx > 0) mx -= half;
    gsap.set(mTrack, { x: mx });
  });
  ScrollTrigger.create({
    trigger: '.marquee', start: 'top bottom', end: 'bottom top',
    onUpdate: self => { const v = self.getVelocity(); mdir = self.direction; boost = Math.min(Math.abs(v) / 120, 18); skew(gsap.utils.clamp(-8, 8, v / -250)); }
  });
  addEventListener('scrollend', () => skew(0));

  /* ───────────────── Generic reveals ───────────────── */
  $$('.sec-line i').forEach(i => gsap.to(i, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: i, start: 'top 90%', end: 'top 45%', scrub: 1 } }));
  $$('[data-fill]').forEach(el => fillTweens.set(el, makeFill(el)));
  $$('[data-rise]').forEach(el => gsap.from(el, { y: 50, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));
  $$('.works__title, .movies__title, .contact__title').forEach(t => gsap.from($$('.ch', t), {
    yPercent: 115, rotate: 6, duration: 1.2, stagger: .035, ease: 'expo.out', scrollTrigger: { trigger: t, start: 'top 88%' }
  }));
  $$('.works__title .amp').forEach(a => gsap.from(a, { scale: 0, rotate: -180, duration: 1.2, ease: 'back.out(2)', scrollTrigger: { trigger: a, start: 'top 88%' } }));

  // stats + counters
  gsap.from('.stat', { y: 70, opacity: 0, duration: 1.2, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: '.stats', start: 'top 88%' } });
  $$('[data-count]').forEach(n => {
    const o = { v: 0 }, to = +n.dataset.count, suf = n.dataset.suffix || '';
    gsap.to(o, { v: to, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: n, start: 'top 90%' }, onUpdate: () => n.textContent = Math.round(o.v) + suf });
  });

  /* ───────────────── Works ───────────────── */
  const works = $('.works'), track = $('.works__track');
  const cards = $$('.work', track);
  const mm = gsap.matchMedia();
  mm.add('(min-width: 981px)', () => {
    works.classList.add('is-horizontal');
    const dist = () => track.scrollWidth - innerWidth;
    const cur = $('.works__cur'), bar = $('.works__bar i');
    const hTween = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: works, pin: true, start: 'top top', end: () => '+=' + dist(), scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: self => {
          gsap.set(bar, { scaleX: self.progress });
          const mid = innerWidth / 2; let idx = 0;
          cards.forEach((c, i) => { const r = c.getBoundingClientRect(); if (r.left < mid) idx = i; });
          cur.textContent = String(idx + 1).padStart(2, '0');
        }
      }
    });
    cards.forEach((card, i) => {
      const ca = { trigger: card, containerAnimation: hTween, scrub: true };
      if (i === 0) {   // first card is already on screen when the pin starts
        gsap.from(card, { x: 200, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: works, start: 'top 70%' } });
        gsap.fromTo($$('.phone img', card), { clipPath: 'inset(100% 0 0 0 round 30px)' }, { clipPath: 'inset(0% 0 0 0 round 30px)', duration: 1.4, stagger: .15, ease: 'expo.inOut', scrollTrigger: { trigger: works, start: 'top 55%' } });
        return;
      }
      gsap.fromTo(card,{ scale: .86, rotate: 2.5, opacity: .4 }, { scale: 1, rotate: 0, opacity: 1, ease: 'none', scrollTrigger: { ...ca, start: 'left right', end: 'center center' } });
      gsap.from(card.querySelector('.work__info'), { xPercent: 30, opacity: 0, ease: 'none', scrollTrigger: { ...ca, start: 'left 85%', end: 'center 55%' } });
      gsap.fromTo(card.querySelector('.work__visual'), { xPercent: 22, yPercent: 8 }, { xPercent: -8, yPercent: -2, ease: 'none', scrollTrigger: { ...ca, start: 'left right', end: 'right left' } });
      gsap.fromTo($$('.phone img, .tablet img', card), { clipPath: 'inset(100% 0 0 0 round 30px)' }, { clipPath: 'inset(0% 0 0 0 round 30px)', stagger: .15, ease: 'none', scrollTrigger: { ...ca, start: 'left 90%', end: 'left 30%' } });
      gsap.from(card.querySelector('.work__index'), { yPercent: 100, ease: 'none', scrollTrigger: { ...ca, start: 'left 70%', end: 'center center' } });
    });
    gsap.from('.work-end > *', { y: 60, opacity: 0, stagger: .1, ease: 'none', scrollTrigger: { trigger: '.work-end', containerAnimation: hTween, start: 'left 90%', end: 'center 60%', scrub: true } });
    return () => { works.classList.remove('is-horizontal'); gsap.set(track, { clearProps: 'x' }); };
  });
  mm.add('(max-width: 980px)', () => {
    cards.forEach(card => {
      gsap.from(card, { y: 120, opacity: 0, scale: .94, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 88%' } });
      gsap.fromTo(card.querySelector('.work__visual'), { yPercent: 10 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo($$('.phone img, .tablet img', card), { clipPath: 'inset(100% 0 0 0 round 24px)' }, { clipPath: 'inset(0% 0 0 0 round 24px)', duration: 1.4, stagger: .15, ease: 'expo.inOut', scrollTrigger: { trigger: card, start: 'top 75%' } });
    });
  });

  /* ───────────────── Movies entrance ───────────────── */
  gsap.from('.movies__swiper', { xPercent: 30, opacity: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.movies__swiper', start: 'top 88%' } });
  gsap.from('.movies__nav', { y: 30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.movies__nav', start: 'top 95%' } });

  /* ───────────────── Craft ───────────────── */
  gsap.from('.card', { y: 120, rotateX: -30, opacity: 0, duration: 1.3, stagger: .14, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.craft__grid', start: 'top 85%' } });
  gsap.to('.card__ico path', { strokeDashoffset: 0, duration: 1.6, stagger: .14, ease: 'power3.inOut', scrollTrigger: { trigger: '.craft__grid', start: 'top 80%' } });
  gsap.from('.stack span', { scale: 0, opacity: 0, duration: .8, stagger: .04, ease: 'back.out(2)', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.stack', start: 'top 92%' } });

  /* ───────────────── Contact ───────────────── */
  ScrollTrigger.create({ trigger: '.contact', start: 'top 70%', once: true, onEnter: () => { contactCircuit.resize(); contactCircuit.start(0); } });
  gsap.from('.contact__mail', { scale: .6, opacity: 0, duration: 1.2, ease: 'elastic.out(1,.6)', scrollTrigger: { trigger: '.contact__mail', start: 'top 92%' } });
  gsap.fromTo('.contact__inner', { yPercent: 12 }, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: true } });

  addEventListener('load', () => ScrollTrigger.refresh());

  if (!fine) return;

  /* ───────────────── Tilt / spotlight ───────────────── */
  $$('[data-tilt]').forEach(el => {
    const host = el.closest('.work') || el.closest('.hero');
    const rx = gsap.quickTo(el, 'rotationX', { duration: .8, ease: 'power3' }), ry = gsap.quickTo(el, 'rotationY', { duration: .8, ease: 'power3' });
    gsap.set(el, { transformPerspective: 1000 });
    host.addEventListener('pointermove', e => {
      const r = host.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      ry(x * 16); rx(-y * 12);
      if (host.classList.contains('work')) { host.style.setProperty('--mx', (x + .5) * 100 + '%'); host.style.setProperty('--my', (y + .5) * 100 + '%'); }
    });
    host.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });

  /* ───────────────── Magnetic ───────────────── */
  $$('[data-magnet]').forEach(el => {
    const qx = gsap.quickTo(el, 'x', { duration: .6, ease: 'elastic.out(1,.4)' }), qy = gsap.quickTo(el, 'y', { duration: .6, ease: 'elastic.out(1,.4)' });
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * .3); qy((e.clientY - r.top - r.height / 2) * .4); });
    el.addEventListener('pointerleave', () => { qx(0); qy(0); });
  });

  /* ───────────────── Cursor ───────────────── */
  const cur = $('.cursor'), ring = $('.cursor__ring'), dot = $('.cursor__dot'), label = $('.cursor__label');
  gsap.set([ring, dot], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
  const rX = gsap.quickTo(ring, 'x', { duration: .45, ease: 'power3' }), rY = gsap.quickTo(ring, 'y', { duration: .45, ease: 'power3' });
  addEventListener('pointermove', e => { gsap.set(dot, { x: e.clientX, y: e.clientY }); rX(e.clientX); rY(e.clientY); });
  document.addEventListener('pointerover', e => {
    const lab = e.target.closest('[data-cursor]');
    const drag = !lab && e.target.closest('.movies__swiper');
    cur.classList.toggle('has-label', !!(lab || drag));
    label.textContent = lab ? lab.dataset.cursor : drag ? 'DRAG' : '';
    cur.classList.toggle('is-hover', !lab && !drag && !!e.target.closest('a,button'));
  });
})();
