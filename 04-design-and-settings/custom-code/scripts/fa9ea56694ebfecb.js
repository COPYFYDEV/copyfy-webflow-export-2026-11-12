
(function () {
  'use strict';

  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }

  function text(selector) {
    var element = document.querySelector(selector);
    return element ? element.textContent.replace(/\s+/g, ' ').trim() : '';
  }

  function meta(selector) {
    var element = document.querySelector(selector);
    return element ? (element.getAttribute('content') || '').trim() : '';
  }

  function addSchema(id, schema) {
    if (document.getElementById(id)) return;
    var script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  function containsApplication(value, canonical) {
    if (!value || typeof value !== 'object') return false;
    if (Array.isArray(value)) return value.some(function (item) { return containsApplication(item, canonical); });
    var types = Array.isArray(value['@type']) ? value['@type'] : [value['@type']];
    if (types.indexOf('SoftwareApplication') !== -1 || types.indexOf('WebApplication') !== -1) {
      return value.url === canonical || String(value['@id'] || '').indexOf(canonical + '#') === 0;
    }
    return Object.keys(value).some(function (key) { return containsApplication(value[key], canonical); });
  }

  function alreadyHasSpecificApplication(canonical) {
    return Array.from(document.querySelectorAll('script[type="application/ld+json"]')).some(function (script) {
      try {
        return containsApplication(JSON.parse(script.textContent), canonical);
      } catch (error) {
        return false;
      }
    });
  }

  ready(function () {
    var webflowPageId = document.documentElement.getAttribute('data-wf-page');
    if (webflowPageId === '6800f4f57417e87eed6912a6' || webflowPageId === '6800f5001b61cc1a17d7a44b') return;
    var canonicalElement = document.querySelector('link[rel="canonical"]');
    var canonical = canonicalElement ? canonicalElement.href : window.location.origin + window.location.pathname;
    canonical = canonical.replace(/^http:/, 'https:').replace(/\/$/, '');
    if (canonical === 'https://www.copyfy.io') canonical += '/';

    var path = new URL(canonical).pathname.replace(/\/$/, '') || '/';
    var localeMatch = path.match(/^\/(en|es|nl|de)(?=\/|$)/);
    var locale = localeMatch ? localeMatch[1] : 'fr';
    var localeRoot = locale === 'fr' ? 'https://www.copyfy.io/' : 'https://www.copyfy.io/' + locale;
    var route = path.replace(/^\/(en|es|nl|de)(?=\/|$)/, '') || '/';
    var pageTitle = text('h1') || meta('meta[property="og:title"]') || document.title;
    var description = meta('meta[name="description"]') || meta('meta[property="og:description"]');
    var image = meta('meta[property="og:image"]');
    var language = document.documentElement.lang || locale;
    var logo = 'https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/68c30b4a9127a29885405a96_logo_white_in_blue_box.svg';
    var organization = {
      '@type': 'Organization',
      '@id': 'https://www.copyfy.io/#organization',
      name: 'Copyfy',
      url: 'https://www.copyfy.io/',
      logo: { '@type': 'ImageObject', url: logo }
    };

    var editorialMatch = route.match(/^\/(blog|alternatives|copyfy-vs)\/([^/]+)$/);
    if (editorialMatch) {
      var dates = (window.__copyfyEditorialDates || {})[locale + '/' + editorialMatch[1] + '/' + editorialMatch[2]] || [];
      var article = {
        '@context': 'https://schema.org',
        '@type': editorialMatch[1] === 'blog' ? 'BlogPosting' : 'Article',
        '@id': canonical + '#article',
        headline: pageTitle,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        inLanguage: language,
        author: {
          '@type': 'Person',
          '@id': 'https://www.buildwiththomas.com/#person',
          name: 'Thomas Salic',
          url: 'https://www.buildwiththomas.com/',
          image: 'https://cdn.prod.website-files.com/67dd3c04f88f95cc9ef2f392/69d948e43e08631317fa5453_546512664_18280967017277839_908400875743488148_n.jpg',
          jobTitle: 'Co-founder of Copyfy',
          worksFor: { '@id': 'https://www.copyfy.io/#organization' },
          sameAs: [
            'https://www.linkedin.com/in/thomas-salic/',
            'https://x.com/tom_builders',
            'https://www.youtube.com/@thomas.builders'
          ]
        },
        publisher: organization
      };
      if (description) article.description = description;
      if (image) article.image = [image];
      if (dates[0]) article.datePublished = dates[0];
      if (dates[1]) article.dateModified = dates[1];
      addSchema('copyfy-jsonld-editorial', article);
    }

    var toolMatch = route.match(/^\/(tools|free-tools)\/([^/]+)$/);
    if (toolMatch && !alreadyHasSpecificApplication(canonical)) {
      var tool = {
        '@context': 'https://schema.org',
        '@type': ['SoftwareApplication', 'WebApplication'],
        '@id': canonical + '#software',
        name: pageTitle,
        url: canonical,
        operatingSystem: 'Web',
        applicationCategory: 'UtilitiesApplication',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock'
        },
        publisher: organization
      };
      if (description) tool.description = description;
      if (image) tool.image = image;
      addSchema('copyfy-jsonld-tool', tool);
    }

    var isHub = /^(\/blog|\/alternatives|\/copyfy-vs|\/tools)$/.test(route);
    var isCategory = /^\/category\/[^/]+$/.test(route);
    if (isHub || isCategory) {
      var prefix = isCategory ? '/blog/' : route === '/tools' ? null : route + '/';
      var links = [];
      var seen = new Set();
      document.querySelectorAll('main a[href]').forEach(function (anchor) {
        var url;
        try { url = new URL(anchor.href, window.location.origin); } catch (error) { return; }
        if (url.hostname !== 'www.copyfy.io' && url.hostname !== 'copyfy.io') return;
        var targetRoute = url.pathname.replace(/^\/(en|es|nl|de)(?=\/|$)/, '');
        var matches = prefix ? targetRoute.indexOf(prefix) === 0 : /^\/(tools|free-tools)\/[^/]+$/.test(targetRoute);
        var cleanUrl = 'https://www.copyfy.io' + url.pathname.replace(/\/$/, '');
        if (!matches || cleanUrl === canonical || seen.has(cleanUrl)) return;
        seen.add(cleanUrl);
        links.push({
          '@type': 'ListItem',
          position: links.length + 1,
          name: (anchor.getAttribute('aria-label') || anchor.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 150),
          url: cleanUrl
        });
      });
      var collection = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': canonical + '#collection',
        url: canonical,
        name: pageTitle,
        inLanguage: language,
        isPartOf: { '@id': 'https://www.copyfy.io/#website' }
      };
      if (description) collection.description = description;
      if (links.length) collection.mainEntity = { '@type': 'ItemList', itemListElement: links };
      addSchema('copyfy-jsonld-collection', collection);
    }

    if (route !== '/') {
      var homeLabels = { fr: 'Accueil', en: 'Home', es: 'Inicio', nl: 'Home', de: 'Startseite' };
      var parentLabels = {
        blog: 'Blog', alternatives: 'Alternatives', 'copyfy-vs': 'Copyfy vs', tools: 'Tools'
      };
      var breadcrumbItems = [
        { '@type': 'ListItem', position: 1, name: homeLabels[locale] || 'Home', item: localeRoot }
      ];
      var parentRoute = '';
      var parentLabel = '';
      if (/^\/blog\//.test(route)) { parentRoute = '/blog'; parentLabel = parentLabels.blog; }
      else if (/^\/alternatives\//.test(route)) { parentRoute = '/alternatives'; parentLabel = parentLabels.alternatives; }
      else if (/^\/copyfy-vs\//.test(route)) { parentRoute = '/copyfy-vs'; parentLabel = parentLabels['copyfy-vs']; }
      else if (/^\/(tools|free-tools)\//.test(route)) { parentRoute = '/tools'; parentLabel = parentLabels.tools; }
      else if (/^\/category\//.test(route)) { parentRoute = '/blog'; parentLabel = parentLabels.blog; }
      if (parentRoute) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 2,
          name: parentLabel,
          item: localeRoot.replace(/\/$/, '') + parentRoute
        });
      }
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: breadcrumbItems.length + 1,
        name: pageTitle,
        item: canonical
      });
      addSchema('copyfy-jsonld-breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems
      });
    }
  });
})();

