
function initCSSMarquee() {
  const pixelsPerSecond = 20;
  const marquees = document.querySelectorAll('[data-marquee]');
  marquees.forEach((marquee) => {
    marquee.querySelectorAll('[data-marquee-list]').forEach((list) => {
      const clone = list.cloneNode(true);
      marquee.appendChild(clone);
      const isVertical = marquee.dataset.marqueeDirection === 'vertical';
      const size = isVertical ? list.offsetHeight : list.offsetWidth;
      const duration = size / pixelsPerSecond;
      list.style.animationDuration = `${duration}s`;
      clone.style.animationDuration = `${duration}s`;
      list.style.animationPlayState = 'paused';
      clone.style.animationPlayState = 'paused';
    });
  });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.querySelectorAll('[data-marquee-list]').forEach((list) => {
          list.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
        });
      });
    },
    { threshold: 0 }
  );
  marquees.forEach((marquee) => observer.observe(marquee));
}
document.addEventListener("DOMContentLoaded", initCSSMarquee);
