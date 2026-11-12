
(function () {
  function init() {
    const input = document.getElementById("marcuus-email");
    const form = input?.closest("form");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      input.value = input.value.trim();
      if (!form.reportValidity()) return;
      const url = new URL(
        "https://dev.copyfy.io/register?utm_source=marcuus-kos&callbackUrl=%2Fdashboard%2Fmarcuus"
      );
      url.hash = "email=" + encodeURIComponent(input.value);
      window.location.assign(url.href);
    }, true);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
