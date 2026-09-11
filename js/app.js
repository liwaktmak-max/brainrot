/* ==========================================================================
   BRAINROT ($ROT) — app.js
   Renderiza la página a partir de js/config.js. Sin dependencias.
   ========================================================================== */
(function () {
  'use strict';

  var C = window.BRAINROT_CONFIG;
  if (!C) { console.error('[brainrot] config.js no cargado'); return; }

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------- REVEAL ON SCROLL
     Comprobación propia en lugar de IntersectionObserver: funciona igual en
     navegadores, webviews y capturas headless, y nunca deja contenido oculto. */
  var watchers = [];

  function inViewport(n, margin) {
    var r = n.getBoundingClientRect();
    return r.bottom > 0 && r.top < (window.innerHeight || 0) - (margin || 0);
  }

  function observe(node, cb) {
    if (!node) { cb(); return; }
    watchers.push({ el: node, margin: 80, fn: cb });
    checkWatchers();
  }

  function checkWatchers() {
    for (var i = watchers.length - 1; i >= 0; i--) {
      if (inViewport(watchers[i].el, watchers[i].margin)) { watchers[i].fn(); watchers.splice(i, 1); }
    }
  }

  /* ------------------------------------------------------------ helpers */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function toneClass(tone, prefix) { return tone ? (prefix || 'tone-') + tone : ''; }
  function toneColor(tone) {
    return { pink: 'var(--pink)', green: 'var(--green)', purple: '#A987FF', white: 'var(--white)' }[tone] || 'var(--white)';
  }
  function html(target, markup) { var n = $(target); if (n) n.innerHTML = markup; return n; }
  function head(eyebrow, title, opts) {
    opts = opts || {};
    return '<header class="section__head ' + (opts.center ? 'section__head--center' : '') +
      (opts.row ? ' section__head--row' : '') + ' reveal">' +
      '<div><p class="eyebrow ' + (opts.eyebrowTone ? 'eyebrow--' + opts.eyebrowTone : '') + '">' + esc(eyebrow) + '</p>' +
      '<h2 class="h-xl">' + title + '</h2>' +
      (opts.lead ? '<p class="lead" style="margin-top:18px">' + esc(opts.lead) + '</p>' : '') + '</div>' +
      (opts.aside || '') + '</header>';
  }

  /* ------------------------------------------------- colores + metadatos */
  (function theme() {
    var r = document.documentElement.style;
    Object.keys(C.colors || {}).forEach(function (k) { r.setProperty('--' + k, C.colors[k]); });
    document.documentElement.lang = C.brand.lang || 'en';

    var url = C.brand.url;
    if (url) {
      var abs = function (p) { return url.replace(/\/$/, '') + '/' + String(p).replace(/^\//, ''); };
      var set = function (sel, attr, val) { var n = $(sel); if (n) n.setAttribute(attr, val); };
      set('link[rel="canonical"]', 'href', url);
      set('meta[property="og:url"]', 'content', url);
      set('meta[property="og:image"]', 'content', abs(C.images.og));
      set('meta[name="twitter:image"]', 'content', abs(C.images.og));
    }
  })();

  /* ------------------------------------------------------------- NAV */
  html('#navLinks', C.nav.links.map(function (l) {
    return '<a href="' + esc(l.href) + '">' + esc(l.label) + '</a>';
  }).join(''));

  var navCta = $('#navCta');
  navCta.textContent = C.nav.cta.label;
  navCta.href = C.nav.cta.href;

  var burger = $('#navBurger'), links = $('#navLinks');
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { links.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }
  });
  var nav = $('#nav');
  var onScroll = function () { nav.classList.toggle('is-stuck', window.scrollY > 24); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ------------------------------------------------------------ HERO */
  (function hero() {
    var h = C.hero;
    $('#heroBadge').innerHTML = '<span class="badge__dot"></span>' + esc(h.badge);
    $('#heroTitle').innerHTML =
      h.titleTop.map(function (t) { return '<span class="line">' + esc(t) + '</span>'; }).join('') +
      h.titleBottom.map(function (t) { return '<span class="line line--pink">' + esc(t) + '</span>'; }).join('');
    $('#heroSub').textContent = h.subtitle;
    $('#heroCta1').textContent = h.primaryCta.label;  $('#heroCta1').href = h.primaryCta.href;
    $('#heroCta2').textContent = h.secondaryCta.label; $('#heroCta2').href = h.secondaryCta.href;
    $('#heroStats').innerHTML = h.stats.map(function (s) {
      return '<div><dt>' + esc(s.label) + '</dt><dd class="t-' + esc(s.tone || 'white') + '">' + esc(s.value) + '</dd></div>';
    }).join('');
    $('#stickerTop').textContent = h.stickerTop;
    $('#stickerBottom').textContent = h.stickerBottom;
    $('#scrollHint').firstElementChild.textContent = h.scrollHint;
    var img = $('#heroImg');
    img.src = C.images.mascot;
    img.alt = C.brand.name + ' mascot — a pink cartoon brain wearing a cap';
  })();

  /* ---------------------------------------------------------- TICKER */
  (function ticker() {
    var items = C.ticker.map(function (t) {
      return '<span class="ticker__item ' + (t.tone ? 'ticker__item--' + t.tone : '') + '">' + esc(t.text) + '</span>';
    }).join('');
    html('#ticker', '<div class="ticker__track">' + items + items + '</div>');
  })();

  /* ------------------------------------------------------- 01 STORY */
  (function story() {
    var s = C.story;
    html('#story', '<div class="container">' +
      '<div class="card card--pad story reveal">' +
        '<div>' +
          '<p class="eyebrow">' + esc(s.eyebrow) + '</p>' +
          '<h2 class="h-lg">' + esc(s.titleWhite) + ' <span class="t-green">' + esc(s.titleGreen) + '</span></h2>' +
          '<blockquote class="story__quote">“' + esc(s.quote) + '”</blockquote>' +
          '<p class="lead">' + esc(s.body) + '</p>' +
        '</div>' +
        '<figure class="story__fig">' +
          '<img src="' + esc(C.images.coin) + '" alt="' + esc(C.brand.ticker) + ' meme coin artwork" loading="lazy" decoding="async" width="800" height="600">' +
          '<figcaption class="story__cap">' + esc(s.imageCaption) + '</figcaption>' +
        '</figure>' +
      '</div></div>');
  })();

  /* --------------------------------------------------------- 02 WHY */
  (function why() {
    var w = C.why;
    var cards = w.cards.map(function (c, i) {
      return '<article class="why-card reveal ' + toneClass(c.tone) + '" style="--d:' + (i * 70) + 'ms">' +
        '<div class="why-card__icon" aria-hidden="true">' + c.icon + '</div>' +
        '<p class="why-card__tag t-' + esc(c.tone) + '">' + esc(c.tag) + '</p>' +
        '<p class="why-card__text">' + esc(c.text) + '</p></article>';
    }).join('');
    html('#why', '<div class="container">' +
      head(w.eyebrow, esc(w.titleLine1) + '<br>' + esc(w.titleLine2), { center: true, eyebrowTone: 'green' }) +
      '<div class="grid-4">' + cards + '</div></div>');
  })();

  /* ----------------------------------------------------- 03 UTILITY */
  (function utility() {
    var u = C.utility;
    var items = u.items.map(function (it) {
      return '<div class="utility__item">' +
        '<p class="utility__tag t-' + esc(it.tone) + '">' + esc(it.tag) + '</p>' +
        '<p class="utility__text">' + esc(it.text) + '</p></div>';
    }).join('');
    html('#utility', '<div class="container"><div class="card card--pad reveal">' +
      '<div class="section__head section__head--row" style="margin-bottom:0">' +
        '<div><p class="eyebrow">' + esc(u.eyebrow) + '</p><h2 class="h-lg">' + esc(u.title) + '</h2></div>' +
        '<span class="badge badge--dim">' + esc(u.pill) + '</span>' +
      '</div>' +
      '<div class="utility__grid">' + items + '</div>' +
      '<p class="utility__banner">' + esc(u.bannerWhite) + ' <span class="t-pink">' + esc(u.bannerPink) + '</span></p>' +
      '</div></div>');
  })();

  /* ------------------------------------------------------- 04 CHAOS */
  (function chaos() {
    var c = C.chaos;
    html('#chaos', '<div class="container"><div class="card card--pad chaos reveal">' +
      '<div class="chaos__top">' +
        '<p class="eyebrow" style="margin:0">' + esc(c.eyebrow) + '</p>' +
        '<span class="pill-solid">' + esc(c.pill) + '</span>' +
      '</div>' +
      '<p class="chaos__label">' + esc(c.label) + '</p>' +
      '<p class="chaos__value"><span id="chaosNum">0</span><span class="chaos__suffix">' + esc(c.suffix) + '</span></p>' +
      '<div class="chaos__bar"><div class="chaos__fill" id="chaosFill"></div></div>' +
      '<div class="chaos__scale">' + c.scale.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') + '</div>' +
      '<div class="chaos__pills">' +
        '<span class="badge badge--green chaos__msg" id="chaosMsg"><span class="badge__dot"></span><span>' + esc(c.messages[0]) + '</span></span>' +
        '<span class="badge badge--pink">CHAOS: RISING</span>' +
        '<span class="badge badge--dim">' + esc(c.note) + '</span>' +
      '</div></div></div>');

    var target = Math.max(0, Math.min(100, Number(c.value) || 0));
    var num = $('#chaosNum'), fill = $('#chaosFill'), done = false;

    function run() {
      if (done) return; done = true;
      fill.style.width = target + '%';
      if (REDUCED) { num.textContent = target; return; }
      var t0 = Date.now(), dur = 1600;
      var timer = setInterval(function () {
        var p = Math.min(1, (Date.now() - t0) / dur);
        num.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p >= 1) clearInterval(timer);
      }, 40);
    }
    // Arquitectura preparada para una API real: chaos.endpoint → { value: 0-100 }
    if (c.endpoint) {
      fetch(c.endpoint).then(function (r) { return r.json(); })
        .then(function (d) { if (typeof d.value === 'number') target = Math.max(0, Math.min(100, d.value)); })
        .catch(function () {});
    }
    observe($('#chaos'), run);

    var msg = $('#chaosMsg'), i = 0;
    if (!REDUCED && c.messages.length > 1) {
      setInterval(function () {
        msg.classList.add('is-swapping');
        setTimeout(function () {
          i = (i + 1) % c.messages.length;
          msg.lastElementChild.textContent = c.messages[i];
          msg.classList.remove('is-swapping');
        }, 350);
      }, 3800);
    }
  })();

  /* ------------------------------------------------------ 05 ORACLE */
  (function oracle() {
    var o = C.oracle;
    html('#oracle', '<div class="container"><div class="card card--pad oracle reveal">' +
      '<div class="oracle__head">' +
        '<span class="oracle__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="#09090B"><path d="M12 2a9.5 9.5 0 0 0-9.5 9.5c0 1.9.6 3.6 1.6 5L2.5 22l5.7-1.5A9.5 9.5 0 1 0 12 2zm0 4.4a3 3 0 0 1 3 3c0 1.6-1.9 1.9-2.3 3.2h-1.5c.3-1.9 2.3-2.3 2.3-3.2a1.5 1.5 0 0 0-3 0H9a3 3 0 0 1 3-3zm-.8 8.2h1.6v1.6h-1.6z"/></svg></span>' +
        '<div><p class="eyebrow" style="margin-bottom:6px">' + esc(o.eyebrow) + '</p>' +
        '<h2 class="h-lg" style="font-size:clamp(1.6rem,3.4vw,2.6rem)">' + esc(o.title) + '</h2>' +
        '<p class="lead" style="font-size:13.5px;margin-top:6px">' + esc(o.subtitle) + '</p></div>' +
      '</div>' +
      '<form class="oracle__form" id="oracleForm">' +
        '<input class="oracle__input" id="oracleInput" type="text" maxlength="140" placeholder="' + esc(o.placeholder) + '" aria-label="' + esc(o.title) + '">' +
        '<button class="btn btn--green" type="submit">' + esc(o.button) + '</button>' +
      '</form>' +
      '<div class="oracle__answer" aria-live="polite">' +
        '<p class="oracle__answer-label">' + esc(o.answerLabel) + '</p>' +
        '<p class="oracle__answer-text" id="oracleAnswer">' + esc(o.defaultAnswer) + '</p>' +
      '</div></div></div>');

    var last = -1;
    $('#oracleForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var out = $('#oracleAnswer'), pool = o.answers, n;
      do { n = Math.floor(Math.random() * pool.length); } while (pool.length > 1 && n === last);
      last = n;
      out.classList.add('is-typing');
      setTimeout(function () { out.textContent = pool[n]; out.classList.remove('is-typing'); }, 420);
      $('#oracleInput').value = '';
    });
  })();

  /* ---------------------------------------------------- 06 MEME LAB */
  (function memeLab() {
    var m = C.memeLab;
    var cards = m.cards.map(function (c, i) {
      return '<article class="meme reveal" style="--d:' + (i * 60) + 'ms">' +
        '<div class="meme__art">' +
          '<svg viewBox="0 0 200 200" role="img" aria-label="' + esc(c.title) + '"><use href="#rot-' + esc(c.mascot) + '"></use></svg>' +
          '<span class="meme__tag meme__tag--' + esc(c.tone) + '">' + esc(c.tag) + '</span>' +
        '</div>' +
        '<div class="meme__body">' +
          '<h3 class="meme__title">' + esc(c.title) + '</h3>' +
          '<p class="meme__text">' + esc(c.text) + '</p>' +
          '<button class="meme__share" type="button" data-share="' + esc(c.title) + '">' + esc(m.shareLabel) + '</button>' +
        '</div></article>';
    }).join('');

    html('#memes', '<div class="container">' +
      head(m.eyebrow, esc(m.title), { row: true, aside: '<p class="lead" style="max-width:34ch">' + esc(m.subtitle) + '</p>' }) +
      '<div class="memes">' + cards + '</div></div>');

    $('#memes').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-share]'); if (!btn) return;
      var text = btn.getAttribute('data-share') + ' — ' + m.shareText + ' ' + C.brand.ticker;
      var url = C.brand.url || location.href;
      var reset = function (label) {
        var old = btn.textContent; btn.textContent = label;
        setTimeout(function () { btn.textContent = old; }, 1800);
      };
      if (navigator.share) {
        navigator.share({ title: C.brand.name, text: text, url: url }).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text + ' ' + url).then(function () { reset('COPIED!'); }).catch(function () { reset('COPY IT YOURSELF'); });
      } else { reset('SCREENSHOT IT'); }
    });
  })();

  /* --------------------------------------------------- 07 COMMUNITY */
  (function community() {
    var c = C.community;
    // Un canal sin URL todavía ("#") se muestra como botón, no como enlace muerto.
    var socials = (C.social || []).map(function (s) {
      return (s.url && s.url !== '#')
        ? '<a class="btn btn--ghost" href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.label) + '</a>'
        : '<button class="btn btn--ghost" type="button" data-soon>' + esc(s.label) + '</button>';
    }).join('');
    var stats = c.stats.map(function (s) {
      return '<div class="community__stat"><b style="color:' + toneColor(s.tone) + '">' + esc(s.value) + '</b><span>' + esc(s.label) + '</span></div>';
    }).join('');

    html('#community', '<div class="container"><div class="community reveal">' +
      '<p class="eyebrow eyebrow--purple">' + esc(c.eyebrow) + '</p>' +
      '<h2 class="h-xl">' + esc(c.titleLine1) + '<br>' + esc(c.titleLine2) + '</h2>' +
      '<p class="lead" style="margin:20px auto 0">' + esc(c.subtitle) + '</p>' +
      '<div class="community__socials">' + socials + '</div>' +
      '<div class="community__stats">' + stats + '</div>' +
      '<p class="community__note">' + esc(c.note) + '</p>' +
      '</div></div>');

    $('#community').addEventListener('click', function (e) {
      var b = e.target.closest('[data-soon]'); if (!b || b.dataset.busy) return;
      var old = b.textContent; b.dataset.busy = '1'; b.textContent = 'NOT YET.';
      setTimeout(function () { b.textContent = old; delete b.dataset.busy; }, 1600);
    });
  })();

  /* ------------------------------------------------------- 08 TOKEN */
  (function token() {
    var t = C.token;
    var items = t.allocations.map(function (a, i) {
      return '<div class="token__item reveal" style="--d:' + (i * 70) + 'ms">' +
        '<span class="token__chip" style="background:' + toneColor(a.tone) + '"></span>' +
        '<p class="token__pct" style="color:' + toneColor(a.tone) + '">' + esc(a.percent) + '</p>' +
        '<p class="token__name">' + esc(a.label) + '</p>' +
        '<p class="token__desc">' + esc(a.text) + '</p></div>';
    }).join('');

    html('#token', '<div class="container">' +
      head(t.eyebrow, '<span class="t-pink">' + esc(t.titleSymbol) + '</span>' + esc(t.titleRest), {
        row: true, eyebrowTone: 'green', aside: '<span class="pill-solid">' + esc(t.pill) + '</span>'
      }) +
      '<div class="card card--pad reveal">' +
        '<div class="token__supply">' +
          '<p class="token__supply-label">' + esc(t.supplyLabel) + '</p>' +
          '<p class="token__supply-value">' + esc(t.supply) + ' <span class="t-pink glow-pink">' + esc(C.brand.ticker) + '</span></p>' +
          '<p class="lead" style="margin-inline:auto;font-size:13.5px">' + esc(t.supplyCaption) + '</p>' +
        '</div>' +
        '<div class="token__grid">' + items + '</div>' +
        '<ul class="token__notes">' + t.notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' +
      '</div></div>');
  })();

  /* ----------------------------------------------------- 09 ROADMAP */
  (function roadmap() {
    var r = C.roadmap;
    var items = r.phases.map(function (p, i) {
      return '<li class="roadmap__item reveal" style="--d:' + (i * 60) + 'ms">' +
        '<span class="roadmap__dot" style="background:' + toneColor(p.tone) + ';color:' + toneColor(p.tone) + '"></span>' +
        '<div class="roadmap__card">' +
          '<p class="roadmap__phase" style="color:' + toneColor(p.tone) + '">' + esc(p.phase) + '</p>' +
          '<h3 class="roadmap__title">' + esc(p.title) + '</h3>' +
          '<p class="roadmap__text">' + esc(p.text) + '</p>' +
        '</div></li>';
    }).join('');
    html('#roadmap', '<div class="container">' +
      head(r.eyebrow, esc(r.title), { center: true, eyebrowTone: 'purple' }) +
      '<ul class="roadmap">' + items + '</ul></div>');
  })();

  /* ------------------------------------------------------ 10 LEVELS */
  (function levels() {
    var l = C.levels;
    var items = l.items.map(function (it, i) {
      return '<article class="level reveal" style="--d:' + (i * 60) + 'ms">' +
        '<p class="level__icon" aria-hidden="true">' + it.icon + '</p>' +
        '<p class="level__tag">' + esc(it.tag) + '</p>' +
        '<h3 class="level__name" style="color:' + toneColor(it.tone) + '">' + esc(it.name) + '</h3>' +
        '<p class="level__text">' + esc(it.text) + '</p></article>';
    }).join('');
    html('#levels', '<div class="container">' +
      head(l.eyebrow, esc(l.title), { center: true }) +
      '<div class="levels">' + items + '</div></div>');
  })();

  /* --------------------------------------------------------- 11 FAQ */
  (function faq() {
    var f = C.faq;
    var items = f.items.map(function (it) {
      return '<details class="faq__item">' +
        '<summary class="faq__q">' + esc(it.q) + '<span class="faq__q-icon" aria-hidden="true">+</span></summary>' +
        '<div class="faq__a">' + esc(it.a) + '</div></details>';
    }).join('');
    html('#faq', '<div class="container">' +
      head(f.eyebrow, esc(f.title), { center: true, eyebrowTone: 'green' }) +
      '<div class="faq reveal">' + items + '</div></div>');
  })();

  /* -------------------------------------------------------- FOOTER */
  (function footer() {
    var f = C.footer;
    html('#footer', '<div class="container">' +
      '<a class="footer__brand" href="#hero"><span class="brand__dot"></span>' +
        '<span class="brand__name">' + esc(C.brand.name) + '</span>' +
        '<span class="brand__chip">' + esc(C.brand.ticker) + '</span></a>' +
      '<p class="footer__tagline">' + esc(f.tagline) + '</p>' +
      '<nav class="footer__links">' + f.links.map(function (l) {
        return '<a href="' + esc(l.href) + '">' + esc(l.label) + '</a>';
      }).join('') + (C.social || []).map(function (s) {
        return s.url && s.url !== '#' ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.label) + '</a>' : '';
      }).join('') + '</nav>' +
      '<p class="footer__disclaimer">' + esc(f.disclaimer) + '</p>' +
      '<p class="footer__legal">' + esc(f.legal) + '</p>' +
      '</div>');
  })();

  /* ------ deep link: el contenido se inyecta por JS, así que reposicionamos */
  (function deepLink() {
    if (!location.hash) return;
    var t = document.querySelector(location.hash);
    if (t) { var b = document.documentElement.style.scrollBehavior; document.documentElement.style.scrollBehavior = 'auto'; t.scrollIntoView(); document.documentElement.style.scrollBehavior = b; }
  })();

  (function reveals() {
    var nodes = [].slice.call(document.querySelectorAll('.reveal'));
    if (REDUCED) { nodes.forEach(function (n) { n.classList.add('is-in'); }); return; }
    nodes.forEach(function (n) {
      watchers.push({ el: n, margin: 60, fn: function () { n.classList.add('is-in'); } });
    });

    var queued = false;
    function onChange() {
      if (queued) return;
      queued = true;
      setTimeout(function () { queued = false; checkWatchers(); }, 80);
    }
    window.addEventListener('scroll', onChange, { passive: true });
    window.addEventListener('resize', onChange);
    window.addEventListener('load', onChange);
    checkWatchers();
  })();

})();
