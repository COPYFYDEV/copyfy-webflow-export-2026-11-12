
document.addEventListener("DOMContentLoaded", function () {
  const revenueCounter = new countUp.CountUp("count-revenue", 482871, {
    startVal: 800000,
    duration: 7,
    suffix: "€"
  });
  const secondCounter = new countUp.CountUp("count-second", 2912, {
    startVal: 800,
    duration: 7
  });
  const triggerElement = document.querySelector("#revenue-trigger");
  if (!triggerElement) return;
  const observer = new IntersectionObserver(function (entries, observer) {
    if (entries[0].isIntersecting) {
      revenueCounter.start();
      secondCounter.start();
      observer.unobserve(triggerElement);
    }
  }, {
    threshold: 0
  });
  observer.observe(triggerElement);
});
