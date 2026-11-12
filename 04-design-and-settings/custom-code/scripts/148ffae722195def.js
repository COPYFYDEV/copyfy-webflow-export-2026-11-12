
  function initFaq(e) {
    let items = e.querySelectorAll('.dropdown-item');
    if (items.length === 0) return;
    items.forEach((item) => {
      let trigger = item.querySelector('.dropdown-link');
      let content = item.querySelector('.dropdown-content');
      let icon = item.querySelector('[data-icon]');
      trigger.addEventListener('click', () => {
        let isOpen = item.getAttribute('data-state') === 'open';
        items.forEach((otherItem) => {
          if (otherItem !== item && otherItem.getAttribute('data-state') === 'open') {
            otherItem.setAttribute('data-state', 'closed');
            otherItem.classList.remove('is-active');
            const otherContent = otherItem.querySelector('.dropdown-content');
            const otherIcon = otherItem.querySelector('[data-icon]');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            gsap.to(otherContent, {
              height: 0,
              duration: 0.30,
              ease: "power1.inOut",
              onComplete: () => ScrollTrigger?.refresh()
            });
          }
        });
        if (!isOpen) {
          item.setAttribute('data-state', 'open');
          item.classList.add('is-active');
          if (icon) icon.style.transform = 'rotate(180deg)';
          content.style.height = 'auto';
          let h = content.scrollHeight;
          content.style.height = '0px';
          gsap.to(content, {
            height: h,
            duration: 0.30,
            ease: "power1.inOut",
            onComplete: () => {
              content.style.height = 'auto';
              ScrollTrigger?.refresh();
            }
          });
        } else {
          item.setAttribute('data-state', 'closed');
          item.classList.remove('is-active');
          if (icon) icon.style.transform = 'rotate(0deg)';
          gsap.to(content, {
            height: 0,
            duration: 0.30,
            ease: "power1.inOut",
            onComplete: () => ScrollTrigger?.refresh()
          });
        }
      });
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-faq]').forEach(initFaq);
  });
