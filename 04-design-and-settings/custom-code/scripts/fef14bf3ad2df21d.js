
window.Webflow = window.Webflow || [];
window.Webflow.push(() => {
  if (!window.Swiper) { console.error('Swiper non chargé'); return; }
  if (window.innerWidth > 767) return; // mobile only
  document.querySelectorAll('.swiper-testi').forEach((el) => {
    if (el.__swiperInstance) return;
    const wrapper = el.querySelector(':scope > .swiper-wrapper');
    if (!wrapper) { console.error('wrapper manquant'); return; }
    wrapper.classList.remove('swiper-slide');
    el.classList.remove('swiper-wrapper');
    const slideCount = wrapper.querySelectorAll(':scope > .swiper-slide').length;
    if (slideCount === 0) { console.warn('Aucun .swiper-slide détecté'); return; }
    const sw = new Swiper(el, {
      slidesPerView: 1,
      spaceBetween: 12,
      loop: slideCount > 1,
      allowTouchMove: true,
      grabCursor: true,
      keyboard: { enabled: true },
      autoplay: { delay: 3000, disableOnInteraction: false },
      observer: true,
      observeParents: true,
      // pagination
      pagination: {
        el: el.querySelector('.swiper-pagination'),
        clickable: true,
        bulletClass: 'swiper-bullet',
        bulletActiveClass: 'active',
      },
    });
    el.__swiperInstance = sw;
  });
});
