
document.addEventListener("DOMContentLoaded", function () {
  const formWrapper = document.querySelector(".w-form");
  const overlay = document.getElementById("form_overlay");
  if (!formWrapper || !overlay) return;
  const observer = new MutationObserver(function () {
    const successMessage = formWrapper.querySelector(".w-form-done");
    if (successMessage && getComputedStyle(successMessage).display !== "none") {
      overlay.style.display = "none";
      observer.disconnect();
    }
  });
  observer.observe(formWrapper, {
    attributes: true,
    childList: true,
    subtree: true
  });
});
