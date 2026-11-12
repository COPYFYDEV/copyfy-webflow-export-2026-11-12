
document.addEventListener("DOMContentLoaded", function () {

  const revenueCounter = new countUp.CountUp("count-revenue", 1248573, {
    startVal: 800000,
    duration: 10,
    prefix: "€"
  });

  const triggerElement = document.querySelector("#revenue-trigger");

  if (!triggerElement) return;

  const observer = new IntersectionObserver(function (entries, observer) {

    if (entries[0].isIntersecting) {
      revenueCounter.start();
      observer.unobserve(triggerElement);
    }

  }, {
    threshold: 0
  });

  observer.observe(triggerElement);

});
