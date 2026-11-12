
// Custom Event Tracking Mixpanel
const demoShopBtnFromWhereAttribute = document.querySelectorAll('[data-track="demo_shop"]')
if(demoShopBtnFromWhereAttribute) {
demoShopBtnFromWhereAttribute.forEach((el) => {
  if(!el) return
	if (typeof mixpanel !== 'undefined') {
  	mixpanel.set_config({debug:true});
  	mixpanel.track('See_Demoshop_Clicked', {
			'from_where': el.getAttribute('data-from_where'),
			'shop_name': el.getAttribute('data-shop_name')
    });
  }
})
}
(function () {
  const ACTIVE = "active";
  const MOBILE_MQ = window.matchMedia("(max-width: 767px)");
  const DURATION = 300; 
  const AUTOPLAY_DELAY = 5000;
  let autoplayTimer;
  let currentIndex = 0;
  function easeInOutCubic(t){ return t<0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }
  function animateWidth(el, expand, duration = DURATION){
    if (!el) return;
    if (el._raf) cancelAnimationFrame(el._raf);
    const start = el.getBoundingClientRect().width;
    let target;
    if (expand){
      const prev = el.style.width;
      el.style.width = "auto";
      target = el.getBoundingClientRect().width;
      el.style.width = prev || (start + "px");
    } else target = 0;
    const delta = target - start;
    const t0 = performance.now();
    function step(now){
      const p = Math.min(1, (now - t0) / duration);
      const eased = easeInOutCubic(p);
      el.style.width = (start + delta * eased) + "px";
      if (p < 1){
        el._raf = requestAnimationFrame(step);
      } else {
        el.style.width = expand ? "auto" : "0px";
        el._raf = null;
      }
    }
    el.style.overflow = "hidden";
    el._raf = requestAnimationFrame(step);
  }
  function isMobile(){ return MOBILE_MQ.matches; }
  function toggleTitlesActive(id){
    const triggers = document.querySelectorAll('[data-menu="trigger"]');
    triggers.forEach((t,i) => {
      const title = t.querySelector('[data-menu="title"]');
      const active = t.dataset.menuId === id;
      t.classList.toggle(ACTIVE, active);
      if (active) currentIndex = i; // update index
      if (isMobile()){
        animateWidth(title, active);
      } else {
        if (title){ title.style.width=""; title.style.overflow=""; }
      }
    });
  }
  function togglePanels(id){
    document.querySelectorAll('[data-menu="panel"]').forEach(p =>
      p.classList.toggle(ACTIVE, p.dataset.menuId === id)
    );
  }
  function activate(id){
    toggleTitlesActive(id);
    togglePanels(id);
    restartAutoplay();
  }
  // autoplay
  function next(){
    const triggers = [...document.querySelectorAll('[data-menu="trigger"]')];
    if (!triggers.length) return;
    currentIndex = (currentIndex + 1) % triggers.length;
    const nextTrigger = triggers[currentIndex];
    activate(nextTrigger.dataset.menuId);
  }
  function restartAutoplay(){
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(next, AUTOPLAY_DELAY);
  }
  // Click
  document.addEventListener("click", e => {
    const btn = e.target.closest('[data-menu="trigger"]');
    if (btn) activate(btn.dataset.menuId);
  });
  // Init
  const first = document.querySelector('[data-menu="trigger"]');
  if (first) activate(first.dataset.menuId);
  // Breakpoint change
  MOBILE_MQ.addEventListener("change", () => {
    const current = document.querySelector('[data-menu="trigger"].active') || first;
    if (current) activate(current.dataset.menuId);
  });
})();
