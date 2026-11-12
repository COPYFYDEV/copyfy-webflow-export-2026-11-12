
  (function(){
    var root=document.getElementById("copyfyQuizSW");
    if(!root||root.dataset.copyfyInit)return;root.dataset.copyfyInit="1";
    var ICONS={
      bolt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>',
      crown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7l4 4 5-7 5 7 4-4-1.5 12.5h-15z"/></svg>',
      wrench:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2z"/></svg>',
      pen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
      cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>',
      clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
      cog:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>',
      coins:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>',
      rocket:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13c-3 1-3 5-3 5s4 0 5-3M9 15l-3-3c1-5 5-9 12-10 0 7-5 11-10 12z"/><circle cx="14" cy="10" r="1.5"/></svg>',
      layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5z"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5"/></svg>'
    };
    var QUESTIONS=[
      {q:"¿Cuántos idiomas quieres cubrir?",opts:[{t:"Solo 1 o 2, para probar",ic:"bolt",s:{A:2}},{t:"3 o más, quiero escalar",ic:"rocket",s:{B:2}},{t:"Solo uno, pero impecable",ic:"pen",s:{C:2}},{t:"Varios países ante todo",ic:"layers",s:{D:2}}]},
      {q:"¿Cuál es tu presupuesto para traducir?",opts:[{t:"0€, gratis al máximo",ic:"coins",s:{A:2}},{t:"Unas decenas de €/mes para automatizar",ic:"cog",s:{B:2}},{t:"Lo justo para pagar a un traductor pro",ic:"crown",s:{C:2}},{t:"Pienso por mercado, no por app",ic:"layers",s:{D:2}}]},
      {q:"¿Qué es lo que más te importa?",opts:[{t:"Arrancar rápido, sin costes",ic:"bolt",s:{A:2}},{t:"Traducción automática, hreflang y SEO cuidado",ic:"cog",s:{B:2}},{t:"Una calidad de idioma impecable",ic:"pen",s:{C:2}},{t:"Divisas, pagos y precios locales",ic:"cart",s:{D:2}}]},
      {q:"¿Tus recursos hoy?",opts:[{t:"Principiante, quiero lo nativo de Shopify",ic:"bolt",s:{A:2}},{t:"Cómodo, quiero una herramienta que lo gestione todo",ic:"rocket",s:{B:2}},{t:"Un equipo o un traductor dedicado",ic:"crown",s:{C:2}},{t:"Voy a por una expansión internacional",ic:"layers",s:{D:2}}]}
    ];
    var RESULTS={A:{verdict:"La opción nativa gratis",title:"Translate & Adapt",desc:"Empieza con <strong>Translate & Adapt</strong>, la app gratuita de Shopify. Perfecta para 1 o 2 idiomas, gestiona las etiquetas hreflang sola y no te cuesta nada. Traduce tus páginas más visitadas, publica y ajusta."},
      B:{verdict:"La automatización",title:"Una app de terceros",desc:"Tira de <strong>Weglot</strong> para desplegar rápido, <strong>Langify</strong> si quieres control técnico, o <strong>LangShop</strong> si tu presupuesto es ajustado. Ganas traducción automática, hreflang limpio y SEO multilingüe sin quemarte."},
      C:{verdict:"La calidad premium",title:"La traducción manual",desc:"Exporta tu contenido en CSV y que lo traduzca un <strong>traductor nativo</strong>. Más lento, pero imbatible en matices y tono. Ideal si tu catálogo es pequeño o tu contenido es sensible."},
      D:{verdict:"La localización completa",title:"Shopify Markets",desc:"No quieres solo traducir, quieres vender en varios países. <strong>Shopify Markets</strong> gestiona divisas, pagos locales y precios por mercado desde una sola tienda. La traducción es solo una pieza de tu estrategia."}};
    var idx=0,scores={A:0,B:0,C:0,D:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Pregunta "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["A","B","C","D"][0],max=-1;["A","B","C","D"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={A:0,B:0,C:0,D:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  