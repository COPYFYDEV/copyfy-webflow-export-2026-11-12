
window.Webflow = window.Webflow || [];
window.Webflow.push(() => {
  if (!window.Swiper) { 
    console.error('Swiper non chargé'); 
    return; 
  }
  document.querySelectorAll('.swiper-cards').forEach((el) => {
    if (el.__swiperInstance) return;
    const wrapper = el.querySelector(':scope > .swiper-wrapper');
    if (!wrapper) return;
    if (!wrapper.querySelectorAll(':scope > .swiper-slide').length) return;
    const sw = new Swiper(el, {
      slidesPerView: 'auto',
      loop: false,
      grabCursor: true,
      roundLengths: true,
      watchOverflow: true,
      navigation: {
        nextEl: el.querySelector('[data-next]'),
        prevEl: el.querySelector('[data-prev]'),
        disabledClass: 'disabled',
      },
      breakpoints: {
        0:   { centeredSlides: true,  spaceBetween: 8 },
        768: { centeredSlides: false, spaceBetween: 24 }
      }
    });
    el.__swiperInstance = sw;
  });
});
