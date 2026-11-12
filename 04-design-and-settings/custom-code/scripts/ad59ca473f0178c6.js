
(function () {
  var CREATIVES = [
    { type: 'img',   src: 'https://bucket.copyfy.io/ai-generated/product-launch-ads/12d6e90d-14a2-4c9f-8b89-4d880c19d6e1.png' },
    { type: 'img',   src: 'https://bucket.copyfy.io/ai-generated/product-launch-ads/7398afe0-bdb6-4816-8629-3589f717b545.png' },
    { type: 'video', src: 'https://bucket.copyfy.io/ai-generated/ai-video-creation-0b6187d5-9b0f-4b9d-b465-038e3f19ddb1-0.mp4' },
    { type: 'video', src: 'https://bucket.copyfy.io/ai-generated/ai-video-creation-615b9481-ad03-4390-8008-69c7d72764c5-0.mp4' },
    { type: 'img',   src: 'https://bucket.copyfy.io/ai-generated/chatbot-creatives/24835595-7bd3-4d91-b171-5a6a5b2c0e45.png' },
    { type: 'img',   src: 'https://bucket.copyfy.io/ai-generated/chatbot-creatives/e3027d29-9002-4d8a-8010-8eb33f2f7dec.png' },
    { type: 'img',   src: 'https://bucket.copyfy.io/ai-generated/ai-creation-b15162f8-0e9a-4c3d-85f8-9496c2d20d69-0.png' }
  ];
  var TEXT = 'Create ads for my brand';
  var TARGET_X = 296.15;
  var TARGET_Y = 220.13;
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function buildVideo(src) {
    var video = document.createElement('video');
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.loop = true;
    video.autoplay = true;
    video.setAttribute('autoplay', '');
    video.preload = 'auto';
    video.src = src;
    return video;
  }
  function buildImg(src) {
    var img = document.createElement('img');
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = src;
    return img;
  }
  function initInstance(root) {
    if (root.getAttribute('data-cfads-ready') === '1') return;
    root.setAttribute('data-cfads-ready', '1');
    var track = root.querySelector('.cfads-track');
    var typed = root.querySelector('.cfads-typed');
    var cursor = root.querySelector('.cfads-cursor');
    var videos = [];
    var i, j, tile, photo, media, c;
    for (j = 0; j < 2; j++) {
      for (i = 0; i < CREATIVES.length; i++) {
        c = CREATIVES[i];
        tile = document.createElement('div');
        tile.className = 'cfads-tile';
        photo = document.createElement('div');
        photo.className = 'cfads-photo';
        if (c.type === 'video') {
          media = buildVideo(c.src);
          videos.push(media);
        } else {
          media = buildImg(c.src);
        }
        photo.appendChild(media);
        tile.appendChild(photo);
        track.appendChild(tile);
      }
    }
    function tryPlayAll() {
      videos.forEach(function (v) {
        var p; try { p = v.play(); } catch (e) { return; }
        if (p && typeof p.catch === 'function') p.catch(function () {});
      });
    }
    function pauseAll() {
      videos.forEach(function (v) { try { v.pause(); } catch (e) {} });
    }
    var isVisible = true;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          isVisible = entry.isIntersecting;
          if (isVisible) tryPlayAll(); else pauseAll();
        });
      }, { threshold: 0.05 });
      io.observe(root);
    }
    tryPlayAll();
    function kickOnce() {
      if (isVisible) tryPlayAll();
      document.removeEventListener('click', kickOnce);
      document.removeEventListener('touchstart', kickOnce);
      document.removeEventListener('scroll', kickOnce);
    }
    document.addEventListener('click', kickOnce, { passive: true });
    document.addEventListener('touchstart', kickOnce, { passive: true });
    document.addEventListener('scroll', kickOnce, { passive: true });
    function setCursor(tx, ty, sc, withTransition) {
      cursor.style.transition = withTransition
        ? 'opacity 0.2s ease, transform 0.5s cubic-bezier(0.32, 0, 0.2, 1)'
        : 'none';
      cursor.style.transform = 'translate3d(' + tx + 'px, ' + ty + 'px, 0) scale(' + sc + ')';
    }
    async function typeOut(el, text) {
      el.textContent = '';
      var k;
      for (k = 0; k < text.length; k++) {
        el.textContent = text.slice(0, k + 1);
        await wait(55 + Math.random() * 35);
      }
    }
    async function loop() {
      while (true) {
        root.setAttribute('data-cfads-phase', 'reset');
        typed.textContent = '';
        setCursor(190, 178, 1, false);
        await wait(500);
        root.setAttribute('data-cfads-phase', 'typing');
        await typeOut(typed, TEXT);
        await wait(280);
        root.setAttribute('data-cfads-phase', 'cursor-in');
        await wait(160);
        setCursor(TARGET_X, TARGET_Y, 1, true);
        await wait(540);
        root.setAttribute('data-cfads-phase', 'press');
        cursor.style.transition = 'transform 0.12s cubic-bezier(0.4, 0, 0.2, 1)';
        cursor.style.transform = 'translate3d(' + (TARGET_X + 1) + 'px, ' + (TARGET_Y + 1) + 'px, 0) scale(0.92)';
        await wait(150);
        cursor.style.transform = 'translate3d(' + TARGET_X + 'px, ' + TARGET_Y + 'px, 0) scale(1)';
        await wait(130);
        root.setAttribute('data-cfads-phase', 'cursor-out');
        await wait(240);
        root.setAttribute('data-cfads-phase', 'enter');
        await wait(950);
        root.setAttribute('data-cfads-phase', 'marquee');
        await wait(8500);
        root.setAttribute('data-cfads-phase', 'exit');
        await wait(600);
      }
    }
    loop();
  }
  function start() {
    var roots = document.querySelectorAll('.cfads-wrap');
    for (var k = 0; k < roots.length; k++) initInstance(roots[k]);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
