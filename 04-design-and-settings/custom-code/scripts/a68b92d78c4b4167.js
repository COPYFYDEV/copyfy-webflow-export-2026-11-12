
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-tab="root"]').forEach(initAutoTabs);
});
function initAutoTabs(scope){
  const links = Array.from(scope.querySelectorAll('[data-tab="link"].w-tab-link'));
  if (!links.length) return;
  const DUR   = parseInt(scope.getAttribute('data-tab-duration') || 5000, 10);
  const LOOP  = scope.getAttribute('data-tab-loop') !== 'false';
  const PAUSE = scope.getAttribute('data-tab-pause') !== 'false';
  let i = Math.max(0, links.findIndex(l => l.classList.contains('w--current')));
  let raf = null, start = 0, paused = false, remaining = DUR;
  resetAll();
  activate(i, false);
  links.forEach((l, idx) => {
    l.addEventListener('click', (e) => {
      e.preventDefault();
      activate(idx, true);
    }, {passive:false});
  });
  if (PAUSE) {
    scope.addEventListener('mouseenter', pause);
    scope.addEventListener('mouseleave', resume);
  }
  function resetAll(){
    links.forEach(l => {
      const bar = l.querySelector('[data-tab="progress"]');
      if (!bar) return;
      bar.style.transition = 'none';
      bar.style.width = '0%';
    });
  }
  function switchTo(idx){
    const link = links[idx];
    const key  = link.getAttribute('data-w-tab');
    const pane = scope.querySelector(`.w-tab-pane[data-w-tab="${CSS.escape(key)}"]`);
    links.forEach(l => {
      l.classList.remove('w--current');
      l.setAttribute('aria-selected','false');
    });
    scope.querySelectorAll('.w-tab-pane').forEach(p => {
      p.classList.remove('w--tab-active');
      p.hidden = true;
    });
    link.classList.add('w--current');
    link.setAttribute('aria-selected','true');
    if (pane){ pane.classList.add('w--tab-active'); pane.hidden = false; }
  }
  function activate(idx, programmatic = true){
    cancel();
    i = idx;
    if (programmatic){
      switchTo(i);
    }
    remaining = parseInt(scope.getAttribute('data-tab-duration') || 5000, 10);
    resetAll();
    const bar = links[i].querySelector('[data-tab="progress"]');
    if (bar){
      bar.style.transition = 'none';
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.transition = `width ${remaining}ms linear`;
          bar.style.width = '100%';
          start = performance.now();
          const tick = (t) => {
            if (paused) { raf = requestAnimationFrame(tick); return; }
            const elapsed = t - start;
            if (elapsed >= remaining) {
              const next = i + 1 < links.length ? i + 1 : (LOOP ? 0 : i);
              if (next === i && !LOOP) { cancel(); return; }
              activate(next, true);
              return;
            }
            raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        });
      });
    }
  }
  function pause(){
    if (paused) return;
    paused = true;
    const bar = links[i].querySelector('[data-tab="progress"]');
    const now = performance.now();
    const elapsed = now - start;
    remaining = Math.max(0, remaining - elapsed);
    if (bar){
      const w = parseFloat(getComputedStyle(bar).width);
      const wp = bar.parentElement ? parseFloat(getComputedStyle(bar.parentElement).width) : 1;
      const pct = Math.max(0, Math.min(100, (w / wp) * 100));
      bar.style.transition = 'none';
      bar.style.width = pct + '%';
    }
    cancel();
  }
  function resume(){
    if (!paused) return;
    paused = false;
    const bar = links[i].querySelector('[data-tab="progress"]');
    start = performance.now();
    const ms = Math.max(50, remaining);
    if (bar){
      bar.style.transition = `width ${ms}ms linear`;
      bar.style.width = '100%';
    }
    const tick = (t) => {
      if (paused) { raf = requestAnimationFrame(tick); return; }
      const elapsed = t - start;
      if (elapsed >= remaining) {
        const next = i + 1 < links.length ? i + 1 : (LOOP ? 0 : i);
        if (next === i && !LOOP) { cancel(); return; }
        activate(next, true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }
  function cancel(){ if (raf) { cancelAnimationFrame(raf); raf = null; } }
}
