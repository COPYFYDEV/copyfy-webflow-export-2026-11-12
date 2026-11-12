
(function () {
  var STATUS_TEXTS = [
    'Analyzing your website',
    'Analyzing your ads',
    'Analyzing your product images'
  ];
  var CARDS = [
    { label: 'Channels',                             value: 'Instagram \u00B7 TikTok' },
    { label: '12 new Products launched this month',  value: '23 Total Products in this store' }
  ];
  // Inline SVG string for the card icon (Copyfy C in blue rounded square)
  var ICON_SVG =
    '<svg viewBox="0 0 15.6772 15.6772" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="15.6772" height="15.6772" rx="7.83862" fill="#0C6CFB"/>' +
      '<path d="M9.39248 7.3993C9.41111 7.91497 9.22386 8.43663 8.83017 8.83023C8.07864 9.58177 6.86007 9.58177 6.10854 8.83023C5.35701 8.07868 5.35701 6.86009 6.10854 6.10855C6.48436 5.73272 6.9768 5.54492 7.46935 5.54492V4.31804C6.66289 4.31804 5.85643 4.62574 5.24104 5.24103C4.01037 6.47173 4.01037 8.46704 5.24104 9.69763C6.32184 10.7785 7.99221 10.9099 9.21667 10.0923L10.3243 11.3592L11.3592 10.3243L10.0923 9.21662C10.4579 8.66913 10.6335 8.03247 10.6196 7.39919L10.0076 7.3993H9.39248Z" fill="#fff"/>' +
    '</svg>';
  function initInstance(root) {
    if (root.getAttribute('data-cfstr-ready') === '1') return;
    root.setAttribute('data-cfstr-ready', '1');
    var track = root.querySelector('.cfstr-cards-track');
    var status = root.querySelector('.cfstr-status');
    var statusText = root.querySelector('.cfstr-status__text');
    // Build cards: 3 copies of 2 unique = 6 tiles, seamless -33.333% scroll loop
    var i, j, c, el, html;
    for (j = 0; j < 3; j++) {
      for (i = 0; i < CARDS.length; i++) {
        c = CARDS[i];
        el = document.createElement('div');
        el.className = 'cfstr-card';
        html =
          '<div class="cfstr-card__head">' +
            '<span class="cfstr-card__icon">' + ICON_SVG + '</span>' +
            '<span class="cfstr-card__label">' + c.label + '</span>' +
          '</div>' +
          '<div class="cfstr-card__row">' +
            '<span class="cfstr-card__value">' + c.value + '</span>' +
            '<span class="cfstr-card__open">Open \u2192</span>' +
          '</div>';
        el.innerHTML = html;
        track.appendChild(el);
      }
    }
    // Measure each status text's natural width, then compute pill width = text + extras
    var probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;font-family:Inter,system-ui,sans-serif;font-weight:500;font-size:10px;letter-spacing:-0.2px;white-space:nowrap;line-height:1.09';
    document.body.appendChild(probe);
    var textWidths = [];
    for (i = 0; i < STATUS_TEXTS.length; i++) {
      probe.textContent = STATUS_TEXTS[i];
      textWidths.push(Math.ceil(probe.offsetWidth));
    }
    document.body.removeChild(probe);
    // Pill extras: padding-left 12 + padding-right 12 + dot 7 + gap 6 = 37
    var PILL_EXTRAS = 37;
    var pillWidths = textWidths.map(function (w) { return w + PILL_EXTRAS; });
    var idx = 0;
    status.style.width = pillWidths[0] + 'px';
    statusText.textContent = STATUS_TEXTS[0];
    setInterval(function () {
      // Phase 1: fade out current text (CSS class adds opacity 0 + blur)
      status.classList.add('is-changing');
      // Phase 2: after fade-out, swap text + width
      setTimeout(function () {
        idx = (idx + 1) % STATUS_TEXTS.length;
        statusText.textContent = STATUS_TEXTS[idx];
        status.style.width = pillWidths[idx] + 'px';
        // Phase 3: next frame, remove class to fade in
        requestAnimationFrame(function () {
          status.classList.remove('is-changing');
        });
      }, 220);
    }, 3000);
  }
  var roots = document.querySelectorAll('.cfstr-wrap');
  for (var k = 0; k < roots.length; k++) initInstance(roots[k]);
})();
