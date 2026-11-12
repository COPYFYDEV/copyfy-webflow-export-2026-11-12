
(function () {
  const monthlyBtn   = document.querySelector('[data-price-option="monthly"]');
  const yearlyBtn    = document.querySelector('[data-price-option="yearly"]');
  const quarterlyBtn = document.querySelector('[data-price-option="quarterly"]'); // NEW
  const priceEls = document.querySelectorAll('[data-price]');
  priceEls.forEach(el => {
    el.setAttribute('data-monthly-base', el.textContent.trim());
  });
  function animateTo(el, targetNumber) {
    const startNumber = Number(el.textContent.trim());
    const endNumber   = Number(targetNumber);
    if (startNumber === endNumber) return;
    const duration = 500;
    const startTime = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const valueNow = startNumber + (endNumber - startNumber) * eased;
      const rounded = Math.round(valueNow);
      el.textContent = String(rounded);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  function setMode(mode) {
    if (mode === "monthly") {
      monthlyBtn.classList.add('active');
      yearlyBtn.classList.remove('active');
      quarterlyBtn.classList.remove('active'); // NEW
    } else if (mode === "quarterly") { // NEW
      quarterlyBtn.classList.add('active'); // NEW
      monthlyBtn.classList.remove('active'); // NEW
      yearlyBtn.classList.remove('active'); // NEW
    } else {
      yearlyBtn.classList.add('active');
      monthlyBtn.classList.remove('active');
      quarterlyBtn.classList.remove('active'); // NEW
    }
    priceEls.forEach(el => {
      const monthlyBase    = el.getAttribute('data-monthly-base');
      const yearlyValue    = el.getAttribute('data-price');
      const quarterlyValue = el.getAttribute('data-quarterly-price'); // NEW
      const target = mode === "monthly" ? monthlyBase : mode === "quarterly" ? quarterlyValue : yearlyValue; // NEW
      animateTo(el, target);
    });
  }
  monthlyBtn.addEventListener('click', function (e) {
    e.preventDefault();
    setMode('monthly');
  });
  yearlyBtn.addEventListener('click', function (e) {
    e.preventDefault();
    setMode('yearly');
  });
  quarterlyBtn.addEventListener('click', function (e) { // NEW
    e.preventDefault(); // NEW
    setMode('quarterly'); // NEW
  }); // NEW
  setMode('monthly');
})();
