
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
      {q:"¿Qué vende tu tienda?",opts:[{t:"Dropshipping o productos de impulso",ic:"rocket",s:{A:2}},{t:"Estoy empezando",ic:"coins",s:{B:2}},{t:"Premium, belleza o alto ticket",ic:"crown",s:{C:2}},{t:"Un catálogo grande con muchas referencias",ic:"layers",s:{D:2}}]},
      {q:"¿Tu presupuesto para el tema?",opts:[{t:"Cero, solo gratis",ic:"coins",s:{B:2}},{t:"Listo para invertir por más conversiones",ic:"bolt",s:{A:2}},{t:"Presupuesto premium para la imagen de marca",ic:"crown",s:{C:2}},{t:"Lo que haga falta para un catálogo grande rápido",ic:"layers",s:{D:2}}]},
      {q:"¿Cuántos productos vendes?",opts:[{t:"Uno o unos pocos productos estrella",ic:"crown",s:{C:2}},{t:"Una gama reducida",ic:"cart",s:{B:2}},{t:"Decenas, en crecimiento",ic:"rocket",s:{A:2}},{t:"Cientos o miles",ic:"layers",s:{D:2}}]},
      {q:"¿Qué es lo que más te importa?",opts:[{t:"Herramientas de conversión nativas",ic:"wrench",s:{A:2}},{t:"Velocidad y simplicidad a coste cero",ic:"clock",s:{B:2}},{t:"Imagen de marca y confianza",ic:"crown",s:{C:2}},{t:"Navegación rápida en catálogo grande",ic:"layers",s:{D:2}}]}
    ];
    var RESULTS={A:{verdict:"Máquina de convertir",title:"Ve a por Booster o Shoptimized",desc:"Ganas con herramientas CRO nativas y velocidad. <strong>Booster</strong> trae 30+ herramientas; <strong>Shoptimized</strong> carga en menos de un segundo. Hechos para el tráfico de pago."},
      B:{verdict:"Arranque inteligente",title:"Ve a por Dawn o Refresh",desc:"Rápidos, mobile-first y gratis. Añade dos o tres apps CRO y tienes una base que convierte sin presupuesto."},
      C:{verdict:"Marca premium",title:"Ve a por Prestige o Retina",desc:"Tu conversión depende de la confianza y el relato. <strong>Prestige</strong> para el storytelling, <strong>Retina</strong> para la prueba social."},
      D:{verdict:"Gran volumen",title:"Ve a por Turbo o Impact",desc:"Navegación instantánea en catálogo grande. <strong>Turbo</strong> por la precarga, <strong>Impact</strong> por diseño y conversión a escala."}};
    var idx=0,scores={A:0,B:0,C:0,D:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Pregunta "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["A","B","C","D"][0],max=-1;["A","B","C","D"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={A:0,B:0,C:0,D:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  