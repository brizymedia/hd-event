/* HD기획 홈페이지 — 공통 스크립트 (외부 라이브러리 없음) */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 회사 정보 · 문의 폼 전송처 ----------
     문의 서버(큰길브리지와 함께 쓰는 Apps Script)로 JSON 을 보내면 서버가 16zone@hanmail.net 과 큰길브리지로 메일을 보낸다.
     서버가 「ok」라고 답하지 않으면(또는 주소를 비우면) 휴대폰에서는 문자 앱이 열리고, PC 에서는 내용을 복사해 준다. */
  var FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwvQ4UJRZklRX7bZB6C0s1yZgSvBAMCVccT580L_1BtiVDyh0DIxShCAvN9McZIB0b7FA/exec';
  var SMS_TO = '010-3401-0118';
  var COMPANY = 'HD기획';

  /* ---------- 공지사항 (여기만 고치면 대문에 반영) ---------- */
  var NOTICES = [
    { d: '2026.09.13', t: 'HD기획 홈페이지를 새로 열었습니다.', n: true },
    { d: '2026.09.10', t: '2026년 하반기 체육대회 · 송년회 예약 접수 중입니다.', n: true },
    { d: '2026.09.01', t: '서울 · 광명 · 남양주 지역 행사는 현장 답사를 무료로 도와드립니다.' },
    { d: '2026.08.20', t: '음향 · 조명 · 무대 장비 단독 대여도 가능합니다.' }
  ];

  /* ---------- 포트폴리오 자료 (사진 번호 w1~w19 ↔ 제목) ---------- */
  var WORKS = [
    { i: 13, t: '국회 개방행사 놀이존 운영', o: '관공서 · 대형행사', n: 20000, c: 'big gov', y: '2024' },
    { i: 9, t: '대기업 임직원 페스티벌', o: '기업행사 · 대형행사', n: 18000, c: 'big corp', y: '2026' },
    { i: 8, t: '반도체 기업 가족 대축제', o: '기업행사 · 대형행사', n: 7000, c: 'big corp', y: '2026' },
    { i: 14, t: '대형 워터밤 페스티벌', o: '축제 · 대형행사', n: 0, c: 'big fest', y: '2024' },
    { i: 12, t: '어린이날 기념 행사 총괄', o: '지자체 · 대형행사', n: 5000, c: 'big gov', y: '2024' },
    { i: 11, t: '에어바운스 놀이존 운영', o: '관공서 · 놀이존', n: 0, c: 'gov fest', y: '2026' },
    { i: 16, t: '연구원 송년회', o: '기업행사 · 송년회', n: 0, c: 'corp', y: '2026' },
    { i: 19, t: '공기업 오징어게임 체육대회', o: '기업행사 · 체육대회', n: 0, c: 'corp sport', y: '2026' },
    { i: 2, t: '해외 장관 초청 기공식', o: '의전 · 기공식', n: 0, c: 'cer', y: '2023' },
    { i: 6, t: '건설사 전사 체육대회', o: '기업행사 · 체육대회', n: 0, c: 'corp sport', y: '2026' },
    { i: 7, t: '해외 사원 초청 체육대회', o: '기업행사 · 체육대회', n: 0, c: 'corp sport', y: '2026' },
    { i: 10, t: '소방학교 신입생 체육대회', o: '관공서 · 체육대회', n: 0, c: 'gov sport', y: '2026' },
    { i: 3, t: '시 양성평등대회 총기획', o: '지자체 · 기념식', n: 0, c: 'gov', y: '2023' },
    { i: 15, t: '지자체 송년회 · 음향 · 조명', o: '지자체 · 송년회', n: 0, c: 'gov', y: '2026' },
    { i: 4, t: '교육기관 비대면 행사 20차수', o: '관공서 · 온라인', n: 0, c: 'gov', y: '2024' },
    { i: 1, t: '어린이날 물놀이 대축제', o: '기업행사 · 가족행사', n: 0, c: 'corp fest', y: '2023' },
    { i: 17, t: '가족지원센터 이용자 간담회', o: '관공서 · 간담회', n: 0, c: 'gov', y: '2026' },
    { i: 18, t: '시 읍면동 체육대회 개회식', o: '지자체 · 체육대회', n: 0, c: 'gov sport', y: '2025' },
    { i: 5, t: '어린이 물놀이 축제', o: '가족행사 · 축제', n: 0, c: 'fest', y: '2023' }
  ];
  var IMG = 'assets/img/works/w';
  /* 포트폴리오 페이지는 WORKS + 대표님이 upload.html 로 올린 사진(photos 가지의 photos.json)을 합쳐 보여준다.
     UP_CAT 키 = upload.html 의 사진 칸 slug = 포트폴리오 필터(data-f) */
  var UP_LIST = 'https://raw.githubusercontent.com/brizymedia/hd-event/photos/photos/photos.json';
  var UP_IMG = 'https://cdn.jsdelivr.net/gh/brizymedia/hd-event@photos/';
  var UP_CAT = { corp: '기업행사', sport: '체육대회 · 워크숍', gov: '지자체 · 관공서', fest: '축제 · 놀이존', cer: '기공식 · 의전' };
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function srcOf(w) { return w.u || IMG + w.i + '.webp'; }

  function workCard(w, k) {
    return '<figure data-k="' + k + '" data-c="' + w.c + '">' +
      '<img src="' + srcOf(w) + '" alt="' + esc(w.t) + '" loading="lazy">' +
      (w.n ? '<span class="num">' + w.n.toLocaleString('ko-KR') + '명</span>' : '') +
      '<figcaption><em>' + esc(w.o + (w.y ? ' · ' + w.y : '')) + '</em><b>' + esc(w.t) + '</b></figcaption></figure>';
  }

  /* ---------- 상단 띠 · 모바일 메뉴 · 맨 위로 ---------- */
  var bar = $('#bar'), totop = $('#totop');
  var sections = $$('main section[id]');
  var menuLinks = $$('.bar .menu a');
  function onScroll() {
    var y = window.scrollY;
    if (bar) bar.classList.toggle('stuck', y > 10 && bar.getBoundingClientRect().top <= 0);
    if (totop) totop.classList.toggle('on', y > 700);
    if (!sections.length) return;
    var cur = '';
    sections.forEach(function (s) { if (y + window.innerHeight * .35 >= s.offsetTop) cur = s.id; });
    menuLinks.forEach(function (a) { var h = a.getAttribute('href'); a.classList.toggle('act', h === '#' + cur || h === 'index.html#' + cur); });
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (totop) totop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  var burger = $('#burger'), sheet = $('#sheet');
  function closeSheet() { if (!sheet) return; sheet.classList.remove('on'); if (burger) { burger.classList.remove('x'); burger.setAttribute('aria-expanded', 'false'); } document.body.style.overflow = ''; }
  if (burger && sheet) {
    burger.addEventListener('click', function () {
      var on = sheet.classList.toggle('on'); burger.classList.toggle('x', on); burger.setAttribute('aria-expanded', on);
      document.body.style.overflow = on ? 'hidden' : '';
    });
    $$('a, .x', sheet).forEach(function (a) { a.addEventListener('click', closeSheet); });
  }

  /* ---------- 히어로 슬라이더 ---------- */
  var hero = $('#hero');
  if (hero) {
    var slides = $$('.slide', hero), dots = $('#dots'), cnt = $('#cnt'), cur = 0, timer = null, DUR = 6000;
    slides.forEach(function (s, i) { var b = document.createElement('button'); b.innerHTML = '<i></i>'; b.setAttribute('aria-label', (i + 1) + '번 슬라이드'); b.addEventListener('click', function () { go(i); restart(); }); dots.appendChild(b); });
    var dotBtns = $$('button', dots);
    function go(i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('on', k === cur); });
      dotBtns.forEach(function (d, k) { d.classList.toggle('on', k === cur); });
      cnt.innerHTML = '<b>' + String(cur + 1).padStart(2, '0') + '</b> / ' + String(slides.length).padStart(2, '0');
    }
    function restart() { clearInterval(timer); if (!reduce) timer = setInterval(function () { go(cur + 1); }, DUR); }
    go(0); restart();
    $('#prev').addEventListener('click', function () { go(cur - 1); restart(); });
    $('#next').addEventListener('click', function () { go(cur + 1); restart(); });
    hero.addEventListener('pointerenter', function () { hero.classList.add('paused'); clearInterval(timer); });
    hero.addEventListener('pointerleave', function () { hero.classList.remove('paused'); restart(); });
    var sx = 0;
    hero.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) { go(dx < 0 ? cur + 1 : cur - 1); restart(); } }, { passive: true });
    document.addEventListener('visibilitychange', function () { if (document.hidden) clearInterval(timer); else restart(); });
    // 다음 슬라이드 사진 미리 읽기
    slides.forEach(function (s) { var im = new Image(); im.src = $('.img', s).getAttribute('data-src'); $('.img', s).style.backgroundImage = 'url(' + im.src + ')'; });
  }

  /* ---------- 핵심 가치 탭 ---------- */
  var tabs = $('#vtabs');
  if (tabs) {
    var tb = $$('button', tabs), panes = $$('#vpanes .pane');
    tb.forEach(function (b, i) { b.addEventListener('click', function () { tb.forEach(function (x) { x.classList.remove('on'); }); panes.forEach(function (p) { p.classList.remove('on'); }); b.classList.add('on'); panes[i].classList.add('on'); }); });
  }

  /* ---------- 등장 · 숫자 ---------- */
  // 등장: 화면에 들어온 요소에 .in (관찰자가 못 도는 환경을 위해 스크롤 검사도 같이 둔다)
  var revealEls = $$('.reveal');
  function checkReveal() {
    var h = window.innerHeight;
    revealEls = revealEls.filter(function (el) { if (el.getBoundingClientRect().top < h * .95) { el.classList.add('in'); return false; } return true; });
  }
  window.addEventListener('scroll', checkReveal, { passive: true }); window.addEventListener('resize', checkReveal); window.addEventListener('load', checkReveal);
  checkReveal(); setTimeout(checkReveal, 600); setTimeout(checkReveal, 2000);
  var cio = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return; cio.unobserve(e.target);
      var el = e.target, to = +el.getAttribute('data-count'), t0 = null, dur = 1500;
      if (reduce) { el.textContent = to.toLocaleString('ko-KR'); return; }
      (function step(ts) { if (!t0) t0 = ts; var k = Math.min(1, (ts - t0) / dur); k = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(to * k).toLocaleString('ko-KR'); if (k < 1) requestAnimationFrame(step); })(performance.now());
    });
  }, { threshold: .5 });
  $$('[data-count]').forEach(function (el) { cio.observe(el); });

  /* ---------- 갤러리 (대문 9장 · 포트폴리오 전체) ---------- */
  var gal = $('#gal'), pf = $('#pfGrid'), list = [], figs = [];
  function applyFilter() {
    var act = $('#filters .act'), f = act ? act.getAttribute('data-f') : 'all';
    figs.forEach(function (fg) { fg.classList.toggle('hide', f !== 'all' && fg.getAttribute('data-c').split(' ').indexOf(f) < 0); });
  }
  if (gal) { list = WORKS.slice(0, 9); gal.innerHTML = list.map(workCard).join(''); figs = $$('figure', gal); }
  if (pf) {
    list = WORKS.slice(); pf.innerHTML = list.map(workCard).join(''); figs = $$('figure', pf);
    fetch(UP_LIST + '?t=' + Math.floor(Date.now() / 300000), { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
      if (!j || !j.photos || !j.photos.length) return;
      var up = j.photos.filter(function (x) { return x && x.path; }).map(function (x) {
        return { u: UP_IMG + x.path.split('/').map(encodeURIComponent).join('/'), t: x.event || '행사 현장', o: [UP_CAT[x.cat] || '현장', x.place].filter(Boolean).join(' · '), y: (x.date || '').replace(/-/g, '.'), c: x.cat || 'etc', n: 0 };
      });
      list = up.concat(WORKS); pf.innerHTML = list.map(workCard).join(''); figs = $$('figure', pf); applyFilter();
    }).catch(function () {});
  }
  var grid = gal || pf;
  var lb = $('#lb');
  if (grid && lb) {
    var lbImg = $('#lbImg'), lbT = $('#lbTitle'), lbM = $('#lbMeta'), lbK = 0;
    function visible() { return figs.filter(function (f) { return !f.classList.contains('hide'); }).map(function (f) { return +f.getAttribute('data-k'); }); }
    function openLb(k) { var w = list[k]; lbK = k; lbImg.src = srcOf(w); lbImg.alt = w.t; lbT.textContent = w.t; lbM.textContent = w.o + (w.y ? ' · ' + w.y : '') + (w.n ? ' · ' + w.n.toLocaleString('ko-KR') + '명' : ''); lb.classList.add('on'); document.body.style.overflow = 'hidden'; }
    function closeLb() { lb.classList.remove('on'); document.body.style.overflow = ''; }
    function stepLb(d) { var v = visible(), i = v.indexOf(lbK); openLb(v[(i + d + v.length) % v.length]); }
    grid.addEventListener('click', function (e) { var f = e.target.closest('figure'); if (f) openLb(+f.getAttribute('data-k')); });
    $('#lbX').addEventListener('click', closeLb); $('#lbPrev').addEventListener('click', function () { stepLb(-1); }); $('#lbNext').addEventListener('click', function () { stepLb(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) { if (!lb.classList.contains('on')) return; if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowLeft') stepLb(-1); if (e.key === 'ArrowRight') stepLb(1); });
    var filters = $('#filters');
    if (filters) filters.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      $$('button', filters).forEach(function (x) { x.classList.remove('act'); }); b.classList.add('act');
      applyFilter();
    });
  }

  /* ---------- 현장 영상 ---------- */
  var player = $('#player');
  if (player) {
    var v = $('video', player), ov = $('.ov', player), stop = $('.stop', player);
    var vw = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
    v.src = vw < 900 ? v.getAttribute('data-src-sm') : v.getAttribute('data-src');
    ov.addEventListener('click', function () { v.muted = false; v.play(); });
    stop.addEventListener('click', function () { v.pause(); });
    v.addEventListener('play', function () { player.classList.add('playing'); });
    v.addEventListener('pause', function () { player.classList.remove('playing'); });
    v.addEventListener('ended', function () { player.classList.remove('playing'); v.currentTime = 0; });
    v.addEventListener('click', function () { if (!v.paused) v.pause(); });
  }

  /* ---------- 공지사항 ---------- */
  var nl = $('#noticeList');
  if (nl) nl.innerHTML = NOTICES.length ? NOTICES.slice(0, 5).map(function (n) { return '<li><b>' + n.t + (n.n ? '<span class="new">NEW</span>' : '') + '</b><small>' + n.d + '</small></li>'; }).join('') : '<li class="empty">등록된 공지가 없습니다.</li>';

  /* ---------- 문의 폼 ---------- */
  var form = $('#quoteForm');
  if (form) {
    var done = $('#formDone');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.elements.website && form.elements.website.value) return; // 스팸 봇 함정
      var d = {}; ['name', 'tel', 'org', 'type', 'date', 'people', 'msg'].forEach(function (k) { d[k] = form.elements[k].value.trim(); });
      if (!d.name || !d.tel) { alert('담당자 이름과 연락처는 꼭 적어 주세요.'); (d.name ? form.elements.tel : form.elements.name).focus(); return; }
      if (!$('#fAgree').checked) { alert('개인정보 수집·이용에 동의해 주세요.'); return; }
      var text = '[' + COMPANY + ' 견적문의]\n담당자: ' + d.name + '\n연락처: ' + d.tel + '\n기관: ' + (d.org || '-') + '\n유형: ' + d.type + '\n예정일: ' + (d.date || '-') + '\n인원: ' + (d.people || '-') + '\n내용: ' + (d.msg || '-');
      function local() {
        var ios = /iPhone|iPad/i.test(navigator.userAgent), mobile = ios || /Android/i.test(navigator.userAgent);
        if (mobile) { location.href = 'sms:' + SMS_TO + (ios ? '&' : '?') + 'body=' + encodeURIComponent(text); done.classList.add('on'); return; }
        if (navigator.clipboard) navigator.clipboard.writeText(text).catch(function () {});
        done.classList.add('on');
        $('p', done).innerHTML = '문의 내용을 복사해 두었습니다.<br><b>' + SMS_TO + '</b> 로 문자 · 전화 주시면 바로 상담됩니다.';
      }
      if (!FORM_ENDPOINT) { local(); return; }
      /* 문의 서버 → 대표님 메일 + 큰길브리지 메일. 서버가 「ok」라고 답할 때만 보낸 것으로 친다 */
      d.at = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }); d.page = location.href; d.service = '[' + COMPANY + '] ' + (d.type || '행사') + ' 문의';
      d.message = text; d.phone = d.tel; d.website = '';
      if (d.org) d.name = d.name + ' (' + d.org + ')';
      var btn = $('button[type=submit]', form); if (btn) btn.disabled = true;
      fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(d) })
        .then(function (r) { return r.json(); })
        .then(function (j) { if (j && j.ok) done.classList.add('on'); else local(); })
        .catch(local)
        .then(function () { if (btn) btn.disabled = false; });
    });
  }
})();
