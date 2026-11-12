
const navs = document.querySelectorAll('.w-dropdown-toggle');
const menuBtn = document.querySelector('.navbar_menu-button');
const bg = document.querySelector('.nav_background');
const body = document.body;
function updateUI() {
  const isMobile = window.innerWidth <= 991;
  let isOpen = false;
  if (isMobile) {
    isOpen = menuBtn?.classList.contains('w--open');
  } else {
    isOpen = Array.from(navs).some(nav => nav.getAttribute('aria-expanded') === 'true');
  }
  bg.style.visibility = isOpen ? 'visible' : 'hidden';
  bg.style.opacity = isOpen ? '1' : '0';
  bg.style.pointerEvents = isOpen ? 'auto' : 'none';
  body.style.overflow = isOpen ? 'hidden' : '';
}
// observe les changements
navs.forEach(nav => {
  const observer = new MutationObserver(updateUI);
  observer.observe(nav, { attributes: true, attributeFilter: ['aria-expanded'] });
});
if (menuBtn) {
  const observerBtn = new MutationObserver(updateUI);
  observerBtn.observe(menuBtn, { attributes: true, attributeFilter: ['class'] });
}
window.addEventListener('resize', updateUI);
updateUI();
