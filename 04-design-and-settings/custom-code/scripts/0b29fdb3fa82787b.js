
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
      {q:"Op hoeveel talen mik je?",opts:[{t:"Maar 1 of 2, om te testen",ic:"bolt",s:{A:2}},{t:"3 of meer, ik wil opschalen",ic:"rocket",s:{B:2}},{t:"Eén, maar perfect",ic:"pen",s:{C:2}},{t:"Vooral meerdere landen",ic:"layers",s:{D:2}}]},
      {q:"Wat is je budget om te vertalen?",opts:[{t:"0€, zo gratis mogelijk",ic:"coins",s:{A:2}},{t:"Enkele tientallen €/maand om te automatiseren",ic:"cog",s:{B:2}},{t:"Genoeg voor een pro-vertaler",ic:"crown",s:{C:2}},{t:"Ik denk per markt, niet per app",ic:"layers",s:{D:2}}]},
      {q:"Wat telt voor jou het zwaarst?",opts:[{t:"Snel starten, zonder kosten",ic:"bolt",s:{A:2}},{t:"Auto-vertaling, hreflang en nette SEO",ic:"cog",s:{B:2}},{t:"Een onberispelijke taalkwaliteit",ic:"pen",s:{C:2}},{t:"Lokale valuta, betalingen en prijzen",ic:"cart",s:{D:2}}]},
      {q:"Je middelen op dit moment?",opts:[{t:"Beginner, ik wil Shopify's eigen tool",ic:"bolt",s:{A:2}},{t:"Op m'n gemak, ik wil een tool die alles regelt",ic:"rocket",s:{B:2}},{t:"Een team of een vaste vertaler",ic:"crown",s:{C:2}},{t:"Ik ga voor internationale expansie",ic:"layers",s:{D:2}}]}
    ];
    var RESULTS={A:{verdict:"De gratis eigen optie",title:"Translate & Adapt",desc:"Begin met <strong>Translate & Adapt</strong>, de gratis app van Shopify. Perfect voor 1 of 2 talen, het regelt de hreflang-tags vanzelf en kost je niets. Vertaal je drukst bezochte pagina's, publiceer en stel bij."},
      B:{verdict:"De automatisering",title:"Een externe app",desc:"Ga voor <strong>Weglot</strong> om snel uit te rollen, <strong>Langify</strong> als je technische controle wilt, of <strong>LangShop</strong> als je budget krap is. Je krijgt auto-vertaling, nette hreflang en meertalige SEO zonder slapeloze nachten."},
      C:{verdict:"De premium kwaliteit",title:"Handmatige vertaling",desc:"Exporteer je content als CSV en laat een <strong>native vertaler</strong> het doen. Trager, maar onverslaanbaar op nuance en toon. Ideaal als je catalogus klein is of je content gevoelig ligt."},
      D:{verdict:"De volledige lokalisatie",title:"Shopify Markets",desc:"Je wilt niet alleen vertalen, je wilt in meerdere landen verkopen. <strong>Shopify Markets</strong> regelt valuta, lokale betalingen en prijzen per markt vanuit één winkel. Vertalen is maar één onderdeel van je strategie."}};
    var idx=0,scores={A:0,B:0,C:0,D:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Vraag "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["A","B","C","D"][0],max=-1;["A","B","C","D"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={A:0,B:0,C:0,D:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  