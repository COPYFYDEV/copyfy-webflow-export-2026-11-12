
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

    const slideCount = wrapper.querySelectorAll(':scope > .swiper-slide').length;
    if (!slideCount) return;

    const sw = new Swiper(el, {
      spaceBetween: 24,
      slidesPerGroup: 1,
       slidesPerView: 'auto',
      centeredSlides: false,
      loop: true,
      grabCursor: true,
      roundLengths: true,
      loop: false,
      navigation: {
        nextEl: el.querySelector('[data-next]'),
        prevEl: el.querySelector('[data-prev]'),
        disabledClass: 'disabled',
      },
      breakpoints: {
        0: {  
          slidesPerView: 1,
          centeredSlides: true
        },
        768: { 
          slidesPerView: 'auto',
          centeredSlides: false
        }
      }
    });

    el.__swiperInstance = sw;
  });
});
