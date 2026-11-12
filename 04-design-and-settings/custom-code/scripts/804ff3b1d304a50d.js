
(function () {
  "use strict";
  var path = (document.body.getAttribute("data-copyfy-preview-path") || location.pathname).replace(/\/$/, "");
  var localeMatch = path.match(/^\/(en|es|nl|de|pt)(?:\/|$)/);
  var locale = localeMatch ? localeMatch[1] : "fr";
  var route = path.replace(/^\/(en|es|nl|de|pt)(?=\/|$)/, "");
  if (route !== "/liste-produits" && route !== "/ai-store") return;
  var content = route === "/ai-store" ? "challenge-aistore" : "challenge-liste";
  var defaults = { utm_source: "marcuus-kos", utm_medium: "influence", utm_campaign: "marcuus", utm_content: content, ref: "marcuus" };
  var incoming = new URLSearchParams(location.search);

  function decorate(anchor) {
    var url;
    try { url = new URL(anchor.getAttribute("href"), document.baseURI); } catch (_) { return; }
    if (anchor.matches("a[hreflang], .w-locales-item a")) {
      if (url.origin !== location.origin) return;
      incoming.forEach(function (value, key) { url.searchParams.set(key, value); });
      if (anchor.matches(".footer_lang[hreflang]")) {
        var active = anchor.getAttribute("hreflang") === locale;
        anchor.classList.toggle("w--current", active);
        if (active) anchor.setAttribute("aria-current", "page");
        else anchor.removeAttribute("aria-current");
      }
    } else if (url.protocol === "https:" && url.hostname === "app.copyfy.io") {
      Object.keys(defaults).forEach(function (key) {
        if (!url.searchParams.get(key)) url.searchParams.set(key, defaults[key]);
      });
      url.searchParams.set("lang", locale);
    } else return;
    if (anchor.href !== url.href) anchor.setAttribute("href", url.href);
  }

  function localizeMockups(root) {
    if (locale !== "fr" || !root) return;
    var translations = {
      "23 Total Products in this store": "23 produits au total dans cette boutique",
      "Analyzing your ads": "Analyse de tes pubs en cours"
    };
    var selector = ".cfstr-card__value, .cfstr-status__text";
    var elements = root.querySelectorAll ? Array.from(root.querySelectorAll(selector)) : [];
    if (root.matches && root.matches(selector)) elements.push(root);
    elements.forEach(function (element) {
      var text = element.textContent.replace(/\s+/g, " ").trim();
      if (translations[text]) element.textContent = translations[text];
    });
  }

  function scan(root) {
    if (root.matches && root.matches("a[href]")) decorate(root);
    if (root.querySelectorAll) root.querySelectorAll("a[href]").forEach(decorate);
    localizeMockups(root);
  }

  function init() {
    scan(document);
    new MutationObserver(function (records) {
      records.forEach(function (record) {
        if (record.type === "attributes") {
          if (record.target.matches("a[href]")) decorate(record.target);
        }
        else if (record.type === "characterData") localizeMockups(record.target.parentElement);
        else {
          localizeMockups(record.target);
          record.addedNodes.forEach(function (node) { if (node.nodeType === 1) scan(node); });
        }
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["href"] });
    document.addEventListener("click", function (event) {
      var anchor = event.target.closest && event.target.closest("a[href]");
      if (anchor) decorate(anchor);
    }, true);
    document.addEventListener("auxclick", function (event) {
      var anchor = event.target.closest && event.target.closest("a[href]");
      if (anchor) decorate(anchor);
    }, true);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
