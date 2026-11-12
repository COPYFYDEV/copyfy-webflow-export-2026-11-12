
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
      {q:"Waar sta je nu?",opts:[{t:"Nog geen product",ic:"pen",s:{G:2,C:2}},{t:"Een gevalideerd product, nog niet gelanceerd",ic:"rocket",s:{C:3,A:1}},{t:"Een webshop die draait",ic:"cart",s:{S:2,C:2}},{t:"Meerdere shops of een team",ic:"layers",s:{S:2,A:2,C:1}}]},
      {q:"Wat blokkeert je het meest?",opts:[{t:"Weten wat je moet verkopen",ic:"bolt",s:{C:3,G:1}},{t:"Weten hoeveel een concurrent verkoopt",ic:"coins",s:{S:3,C:1}},{t:"Advertentiehoeken vinden die werken",ic:"crown",s:{A:3,C:1}},{t:"Van idee naar live webshop",ic:"rocket",s:{C:4}}]},
      {q:"Je maandbudget voor tools?",opts:[{t:"Voorlopig nul",ic:"coins",s:{G:4}},{t:"Minder dan 50 $",ic:"cog",s:{C:2,S:1,G:1}},{t:"Tussen 50 en 150 $",ic:"bolt",s:{C:3,A:1}},{t:"Meer dan 150 $",ic:"crown",s:{A:2,S:2,C:2}}]},
      {q:"Je belangrijkste acquisitiekanaal?",opts:[{t:"Facebook en Instagram",ic:"bolt",s:{A:2,C:1}},{t:"TikTok",ic:"rocket",s:{A:2,C:1}},{t:"SEO en organisch",ic:"pen",s:{S:2,C:1}},{t:"Nog niet bepaald",ic:"wrench",s:{C:2,G:1}}]}
    ];
    var RESULTS={C:{verdict:"De alles-in-een",title:"Copyfy",desc:"Je wilt <strong>zoeken en lanceren op één plek</strong>. Productdatabase, Facebook- en TikTok-advertenties, shopanalyse en een AI-webshopbouwer in één abonnement. De proefperiode duurt 5 dagen en vraagt geen creditcard."},
      S:{verdict:"De shop-tracker",title:"PPSPY, met Koala Inspector ernaast",desc:"Je echte vraag is <strong>hoeveel die concurrent verkoopt</strong>. Een tracker geeft je zijn best-sellers, thema, apps en een omzetschatting, vanaf 39 $/maand. De Koala-extensie blijft gratis voor snelle checks."},
      A:{verdict:"De ad spy",title:"Minea of Winning Hunter",desc:"Je mist geen product, je mist <strong>de hoek die het verkoopt</strong>. Kijk naar looptijd en geschatte uitgaven vóór likes. AdSpy als je alleen Meta draait, al dekt het TikTok niet."},
      G:{verdict:"De gratis stack",title:"Koala Inspector, Dropispy en BigSpy",desc:"In deze fase is <strong>data niet je probleem</strong>, wel het aantal producten dat je testte. Deze drie dekken het eerste onderzoek zonder kaart, en de proef van 5 dagen bij Copyfy laat de rest zien."}};
    var idx=0,scores={C:0,S:0,A:0,G:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Vraag "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["C","S","A","G"][0],max=-1;["C","S","A","G"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={C:0,S:0,A:0,G:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  