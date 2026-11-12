
window.Webflow = window.Webflow || [];
window.Webflow.push(() => {
  if (!window.Swiper) { 
    console.error('Swiper non chargé'); 
    return; 
  }
  document.querySelectorAll('.swiper-cards').forEach((el) => {
    if (el.__swiperInstance) return;
    // 1. trouver le wrapper dans ce swiper
    const wrapper = el.querySelector('.swiper-wrapper');
    if (!wrapper) return;
    const slideCount = wrapper.querySelectorAll('.swiper-slide').length;
    if (!slideCount) return;
    // 2. trouver la nav associée
    //    -> on prend d'abord le sibling direct suivant
    //    -> sinon on cherche le .swiper-pagination juste après dans le parent
    let paginationContainer = el.nextElementSibling;
    if (
      !paginationContainer ||
      !paginationContainer.classList.contains('swiper-pagination')
    ) {
      paginationContainer = el.parentElement.querySelector('.swiper-pagination.cards');
    }
    if (!paginationContainer) {
      console.warn('Pas de .swiper-pagination pour', el);
      return;
    }
    const nextBtn = paginationContainer.querySelector('.swiper-button-next');
    const prevBtn = paginationContainer.querySelector('.swiper-button-prev');
    if (!nextBtn || !prevBtn) {
      console.warn('Pas de boutons prev/next dans la pagination pour', el);
      return;
    }
    // 3. init Swiper
    const sw = new Swiper(el, {
      spaceBetween: 24,
      slidesPerGroup: 1,
      roundLengths: true,
      loop: false,
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
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
