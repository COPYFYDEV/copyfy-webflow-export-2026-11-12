
(function(){
  function setLang(lang){
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en]').forEach(function(el){
      var val = el.getAttribute('data-' + lang);
      if(val !== null) el.innerHTML = val;
    });
    document.querySelectorAll('.lang-btn').forEach(function(b){
      b.classList.toggle('is-on', b.getAttribute('data-lang') === lang);
    });
  }
  document.querySelectorAll('.lang-btn').forEach(function(b){
    b.addEventListener('click', function(){ setLang(b.getAttribute('data-lang')); });
  });
})();
