
(function () {
  "use strict";
  var keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ttclid", "campaign_id", "adgroup_id", "ad_id"];
  var storageKey = "copyfy_webflow_attribution_v1";
  var entry = window.CopyfyTrackingV2MarketingEntryV1;
  var incoming = new URL(entry && entry.href || window.location.href).searchParams;
  var attribution = {};
  keys.forEach(function (key) {
    var value = incoming.get(key);
    if (value && value.trim()) attribution[key] = value;
  });
  if (Object.keys(attribution).length) {
    try { sessionStorage.setItem(storageKey, JSON.stringify(attribution)); } catch (_) {}
  } else {
    try {
      var saved = JSON.parse(sessionStorage.getItem(storageKey) || "{}");
      keys.forEach(function (key) {
        if (saved && typeof saved[key] === "string" && saved[key].trim()) attribution[key] = saved[key];
      });
    } catch (_) {}
  }
  var route = window.location.pathname.replace(/\/$/, "").replace(/^\/(en|es|nl|de|pt)(?=\/|$)/, "");
  var lpContent = route === "/liste-produits" ? "challenge-liste" : route === "/ai-store" ? "challenge-aistore" : "";
  if (lpContent && !(incoming.get("utm_content") || "").trim()) {
    attribution.utm_content = lpContent;
  }
  if (!Object.keys(attribution).length) return;
  function decorate(link) {
    try {
      var url = new URL(link.getAttribute("href"), document.baseURI);
      if (url.protocol !== "https:" || url.hostname !== "app.copyfy.io") return;
      keys.forEach(function (key) {
        if (attribution[key]) url.searchParams.set(key, attribution[key]);
      });
      if (link.href !== url.href) link.href = url.href;
    } catch (_) {}
  }
  function scan(root) {
    if (root.matches && root.matches("a[href]")) decorate(root);
    if (root.querySelectorAll) root.querySelectorAll("a[href]").forEach(decorate);
  }
  scan(document);
  new MutationObserver(function (records) {
    records.forEach(function (record) {
      if (record.type === "attributes") decorate(record.target);
      else record.addedNodes.forEach(scan);
    });
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["href"] });
  function beforeNavigate(event) {
    var link = event.target.closest && event.target.closest("a[href]");
    if (link) decorate(link);
  }
  document.addEventListener("click", beforeNavigate, true);
  document.addEventListener("auxclick", beforeNavigate, true);
})();
