
  /* --- Conversion tracking: push to dataLayer on CTA clicks that send users to the app --- */
  document.querySelectorAll('[data-cta]').forEach(function(el){
    el.addEventListener('click',function(){
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event:'cta_essai_gratuit',          // Keep this name if your GTM trigger already uses it. Rename only if you update GTM.
        cta_location:this.getAttribute('data-cta'),
        link_url:this.getAttribute('href')
      });
    });
  });

  /* --- Reveal on scroll, respecting prefers-reduced-motion --- */
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!rm && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    },{threshold:.12});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');});
  }
