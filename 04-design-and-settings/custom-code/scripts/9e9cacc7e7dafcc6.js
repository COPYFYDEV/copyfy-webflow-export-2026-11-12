
(function () {
  function start() {
    var roots = document.querySelectorAll('.cfbld-wrap');
    for (var k = 0; k < roots.length; k++) initInstance(roots[k]);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  function initInstance(wrap) {
    if (wrap.getAttribute('data-cfbld-ready') === '1') return;
    wrap.setAttribute('data-cfbld-ready', '1');

    var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
    var introBtn = wrap.querySelector('.cfbld-intro-btn');
    var introCursor = wrap.querySelector('.cfbld-intro-cursor');
    var introText = wrap.querySelector('.cfbld-intro-text-content');
    var chatStatus = wrap.querySelector('.cfbld-chat-status');
    var chatInputText = wrap.querySelector('.cfbld-chat-input-text');

    var STATUS_ITEMS = [
      { key: 'struct-load', from: 'p3',  type: 'loading', text: 'Creating store structure...' },
      { key: 'struct-done', from: 'p5',  type: 'check',   text: 'Store structure created' },
      { key: 'img-load',    from: 'p5',  type: 'loading', text: 'Creating Product Images...' },
      { key: 'img-done',    from: 'p7',  type: 'check',   text: 'Product Images Created' },
      { key: 'desc-load',   from: 'p7',  type: 'loading', text: 'Creating Product Description...' },
      { key: 'desc-done',   from: 'p9',  type: 'check',   text: 'Product Description Created' },
      { key: 'offer-load',  from: 'p10', type: 'loading', text: 'Creating Product Offer...' },
      { key: 'ready',       from: 'p12', type: 'ready',   text: 'Your website is ready!' }
    ];

    var PHASE_ORDER = ['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12'];

    var LOADING_SVG = '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6" stroke="rgba(27,37,64,0.15)" stroke-width="1.6"/><path d="M14 8A6 6 0 0 0 8 2" stroke="#0C6CFB" stroke-width="1.6" stroke-linecap="round"/></svg>';
    var CHECK_SVG = '<svg viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3L3 5L7 1" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var READY_SVG = '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" fill="#0C6CFB"/><path d="M5 8L7.2 10L11 6" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    STATUS_ITEMS.forEach(function (item, idx) {
      var el = document.createElement('div');
      el.className = 'cfbld-status-item';
      if (item.type === 'check') el.className += ' cfbld-status-item--done';
      if (item.type === 'ready') el.className += ' cfbld-status-item--ready';
      el.setAttribute('data-from', item.from);
      var iconHTML = '';
      if (item.type === 'loading') iconHTML = '<span class="cfbld-status-icon cfbld-status-icon--loading">' + LOADING_SVG + '</span>';
      else if (item.type === 'check') iconHTML = '<span class="cfbld-status-icon cfbld-status-icon--check">' + CHECK_SVG + '</span>';
      else if (item.type === 'ready') iconHTML = '<span class="cfbld-status-icon cfbld-status-icon--ready">' + READY_SVG + '</span>';
      el.innerHTML = iconHTML + '<span class="cfbld-status-text">' + item.text + '</span>';
      chatStatus.appendChild(el);
      if (idx > 0) {
        var line = document.createElement('div');
        line.className = 'cfbld-status-line';
        line.setAttribute('data-from', item.from);
        line.innerHTML = '<div class="cfbld-status-line-inner"></div>';
        chatStatus.insertBefore(line, el);
      }
    });

    function phaseIdx(p) { return PHASE_ORDER.indexOf(p); }
    function updateStatusItems(currentPhase) {
      var currIdx = phaseIdx(currentPhase);
      var items = wrap.querySelectorAll('.cfbld-status-item, .cfbld-status-line');
      for (var i = 0; i < items.length; i++) {
        var from = items[i].getAttribute('data-from');
        if (currIdx >= phaseIdx(from)) items[i].classList.add('is-visible');
        else items[i].classList.remove('is-visible');
      }
    }

    var CHAT_INPUT_TEXT = {
      p3: 'Create ads for my brand', p4: 'Create ads for my brand',
      p5: "Let's create product images",
      p6: 'Now make my product title and description', p7: 'Now make my product title and description', p8: 'Now make my product title and description',
      p9: 'Build my offers and publish my website', p10: 'Build my offers and publish my website', p11: 'Build my offers and publish my website', p12: 'Build my offers and publish my website'
    };

    function setPhase(phase) {
      wrap.setAttribute('data-cfbld-phase', phase);
      if (CHAT_INPUT_TEXT[phase]) chatInputText.textContent = CHAT_INPUT_TEXT[phase];
      updateStatusItems(phase);
    }

    function moveIntroCursor(x, y, duration) {
      introCursor.style.transition = 'opacity 0.35s cubic-bezier(0.65,0,0.35,1), transform ' + duration + 'ms cubic-bezier(0.65,0,0.35,1)';
      introCursor.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
      return wait(duration);
    }

    function typeIntoIntro(text) {
      introText.textContent = '';
      var i = 0;
      return new Promise(function (resolve) {
        function step() {
          i++;
          introText.textContent = text.slice(0, i);
          if (i >= text.length) return resolve();
          setTimeout(step, 28 + Math.random() * 18);
        }
        step();
      });
    }

    var SUBMIT_X = 703;
    var SUBMIT_Y = 235;

    var stopped = false;
    async function loop() {
      while (!stopped) {
        setPhase('reset');
        introText.textContent = 'What would you like to build today?';
        introCursor.style.transition = 'opacity 0.2s';
        introCursor.style.transform = 'translate3d(120px, 430px, 0)';
        await wait(300);

        setPhase('p1');
        await wait(500);

        setPhase('p2');
        introText.textContent = '';
        var risePromise = (async function () {
          await wait(400);
          await moveIntroCursor(SUBMIT_X, SUBMIT_Y, 1000);
        })();
        await typeIntoIntro('Create an e-commerce store for me');
        await risePromise;
        await wait(180);

        introCursor.style.transition = 'transform 0.14s cubic-bezier(0.4,0,0.2,1)';
        introCursor.style.transform = 'translate3d(' + SUBMIT_X + 'px, ' + SUBMIT_Y + 'px, 0) scale(0.82)';
        introBtn.classList.add('is-pressed');
        await wait(160);
        introCursor.style.transform = 'translate3d(' + SUBMIT_X + 'px, ' + SUBMIT_Y + 'px, 0) scale(1)';
        introBtn.classList.remove('is-pressed');
        await wait(240);

        setPhase('p3');  await wait(900);
        setPhase('p4');  await wait(1300);
        setPhase('p5');  await wait(800);
        setPhase('p6');  await wait(1800);
        setPhase('p7');  await wait(900);
        setPhase('p8');  await wait(1200);
        setPhase('p9');  await wait(1000);
        setPhase('p10'); await wait(900);
        setPhase('p11'); await wait(1200);
        setPhase('p12'); await wait(2000);

        setPhase('reset');
        await wait(500);
      }
    }
    loop();

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          stopped = !entry.isIntersecting;
          if (entry.isIntersecting && wrap.getAttribute('data-cfbld-phase') === 'reset') {
            stopped = false;
            loop();
          }
        });
      }, { threshold: 0.05 });
      io.observe(wrap);
    }
  }
})();
