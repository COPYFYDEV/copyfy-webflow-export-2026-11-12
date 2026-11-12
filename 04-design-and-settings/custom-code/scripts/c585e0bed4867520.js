
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
      {q:"Dein Hauptziel?",opts:[{t:"Gewinnerprodukte finden und meinen Shop steuern",ic:"cart",s:{C:2}},{t:"Möglichst viele Plattformen und Daten überwachen",ic:"bolt",s:{D:2}}]},
      {q:"Dein monatliches Budget für ein Tool?",opts:[{t:"Weniger als 30€",ic:"coins",s:{C:2}},{t:"Zwischen 30 und 50€",ic:"coins",s:{C:1}},{t:"Mehr als 50€, der Preis ist mir egal",ic:"crown",s:{D:1}}]},
      {q:"Dein Niveau im E-Commerce?",opts:[{t:"Ich fange an und will etwas Einfaches",ic:"rocket",s:{C:2}},{t:"Ich bin erfahren und will riesige Datenmengen",ic:"crown",s:{D:2}}]},
      {q:"Deine Produktbeschreibungen generieren und Bilder zu Shopify importieren?",opts:[{t:"Ja, das ist für mich entscheidend",ic:"pen",s:{C:2}},{t:"Nein, das löse ich anders",ic:"wrench",s:{D:1}}]},
      {q:"Vor dem Bezahlen kostenlos testen, zählt das?",opts:[{t:"Ja, ich will eine kostenlose Testphase",ic:"clock",s:{C:2}},{t:"Egal",ic:"cog",s:{D:1}}]}
    ];
    var RESULTS={C:{verdict:"Copyfy ist genau dein Tool 🏆",title:"Die All-in-one-Suite, und günstiger",desc:"Du willst Gewinnerprodukte finden, deine Konkurrenten analysieren und deinen Shop starten, ohne Abos zu stapeln. Copyfy erfüllt alle Kriterien, für 49€/Monat mit <strong>kostenloser Testphase</strong>."},
      D:{verdict:"DiffShop passt besser zu deinem Bedarf",title:"Die plattformübergreifende Datenmaschine",desc:"Dein Ding ist es, möglichst viele Plattformen (Shopify, Shein, Temu, Amazon, TikTok) gleichzeitig zu durchleuchten, und DiffShop ist darin stark. Allerdings deckt Copyfy auch Produktrecherche, Beschreibungen und Shop-Verwaltung in einem einzigen Abo Geld ab. Eine <strong>kostenlose Testphase</strong> bringt schnell Klarheit."}};
    var idx=0,scores={C:0,D:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Frage "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["C","D"][0],max=-1;["C","D"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={C:0,D:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  