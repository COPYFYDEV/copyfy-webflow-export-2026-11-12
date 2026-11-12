
(function () {
  "use strict";
  var language = (document.documentElement.lang || "fr").toLowerCase().split("-")[0];
  var international = ["en", "es", "nl", "de", "pt"].indexOf(language) !== -1;
  if (language !== "fr" && !international) return;
  var images = international ? {"hero-homepage-clearwater":"https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec68e22ca447e0a43c37_hero-homepage-clearwater-en.webp","generated-in-1-click":"https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec67a05576c94fafb2f6_generated-in-1-click-en.png","page-produit-maison":"https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec8cc1bc9ff8cd3ae65a_page-produit-maison-en.webp","page-produit-beaute":"https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec68d3d25975a7da05e6_page-produit-beaute-en.webp","page-produit-tech":"https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec8c1450fcfefd69ba9d_page-produit-tech-en.webp","page-produit-fitness":"https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec8cf38010cc38209169_page-produit-fitness-en.webp","page-produit-outdoor":"https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec8c3e791e1df4d18b9c_page-produit-outdoor-en.webp","winning-store-finder":"https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec96c1bc9ff8cd3aea08_winning-store-finder-en.png"} : {};
  var videoSets = {"fr":{"motion-design":["https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec9637a85a55f8659149_copyfy-motion-design-fr-1080p.mp4","https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec9698027c5608058aec_copyfy-motion-design-fr-1080p-poster.jpg"]},"international":{"motion-design":["https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec671bb392bf6f3fc310_copyfy-motion-design-en-1080p.mp4","https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec9705fe72c3dba2c237_copyfy-motion-design-en-1080p-poster.jpg"],"generation-1-click":["https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec68d7e3c1cfe1cccbca_generation-1-click-en.mp4","https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec970a497974855d3637_generation-1-click-en-poster.jpg"],"product-page-generation":["https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec8ddcf98e3961fae1f4_product-page-generation-en.mp4","https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ae2ec98dcf98e3961fae6a5_product-page-generation-en-poster.jpg"]}};
  var videos = international ? videoSets.international : videoSets.fr;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var gallerySizes = {"page-produit-maison":[840,2456],"page-produit-beaute":[840,2496],"page-produit-tech":[840,2456],"page-produit-fitness":[840,2456],"page-produit-outdoor":[840,2456]};
  Object.keys(gallerySizes).forEach(function (key) {
    if (!images[key]) return;
    var preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.href = images[key];
    preload.fetchPriority = "low";
    document.head.appendChild(preload);
  });
  function applyMedia() {
    document.querySelectorAll("[data-copyfy-home-asset]").forEach(function (element) {
      var key = element.getAttribute("data-copyfy-home-asset");
      var image = images[key];
      if (image && element.tagName === "IMG" && element.getAttribute("src") !== image) {
        element.removeAttribute("srcset");
        element.removeAttribute("sizes");
        element.src = image;
      }
      if (image && element.tagName === "IMG" && gallerySizes[key]) {
        element.width = gallerySizes[key][0];
        element.height = gallerySizes[key][1];
        element.loading = "eager";
        element.decoding = "async";
        element.fetchPriority = "low";
      }
      var source = videos[key];
      var still = international && key === "winning-store-finder-desktop" ? images["winning-store-finder"] : null;
      if (!source && !still) return;
      var video = element.querySelector("video");
      var url = source ? source[0] : still;
      if (!video || video.getAttribute("data-copyfy-media-source") === url) return;
      video.setAttribute("data-copyfy-media-source", url);
      video.pause();
      video.querySelectorAll("source").forEach(function (child) { child.remove(); });
      video.removeAttribute("src");
      video.poster = source ? source[1] : still;
      video.style.backgroundImage = 'url("' + video.poster + '")';
      element.setAttribute("data-poster-url", video.poster);
      element.setAttribute("data-video-urls", source ? url : "");
      if (source) {
        video.src = url;
        video.muted = true;
        video.playsInline = true;
      } else {
        video.autoplay = false;
        video.removeAttribute("autoplay");
        element.setAttribute("data-autoplay", "false");
        video.style.display = "none";
        video.setAttribute("aria-hidden", "true");
        var stillImage = document.createElement("img");
        stillImage.src = still;
        stillImage.alt = "";
        stillImage.setAttribute("data-copyfy-home-still", "true");
        stillImage.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:contain";
        element.appendChild(stillImage);
      }
      video.load();
      if (source && video.autoplay && !reduceMotion) {
        var playing = video.play();
        if (playing && playing.catch) playing.catch(function () {});
      }
    });
  }
  var observer = new MutationObserver(applyMedia);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  applyMedia();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      applyMedia();
      observer.disconnect();
    }, { once: true });
  } else {
    observer.disconnect();
  }
})();
