
if (!/Safari/.test(navigator.userAgent) || /Chrome/.test(navigator.userAgent)) {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  document.querySelectorAll('[data-anim="heading"]').forEach((el) => {
    const split = new SplitText(el, { type: "lines,words,chars", linesClass: "line" });
    gsap.set(split.lines, { overflow: "hidden" });

    ScrollTrigger.create({
      trigger: el,
      start: "top 50%",
      onEnter: () => {
        gsap.from(split.words, {
          opacity: 0,
          y: "150%",
          rotate: 10,
          stagger: 0.075,
          duration: 0.75,
          ease: "power2.out"
        });
      }
    });
  });
}
