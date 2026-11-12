
  window.CopyfyTrackingV2MarketingEntryV1 = {
    href: window.location.href,
    referrer: document.referrer,
    epoch_cookie: document.cookie.split(';').map(function (part) { return part.trim(); })
      .filter(function (part) { return part.indexOf('copyfy_acq_v2_epoch=') === 0; }).join(';'),
    anonymous_cookie: document.cookie.split(';').map(function (part) { return part.trim(); })
      .filter(function (part) { return part.indexOf('copyfy_anon_v2_production_') === 0; }).sort().join(';')
  };
