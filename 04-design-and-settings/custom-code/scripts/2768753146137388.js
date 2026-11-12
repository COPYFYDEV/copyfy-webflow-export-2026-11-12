
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
      {q:"Waar staat je winkel nu?",opts:[{t:"Net begonnen, onder $10K MRR",ic:"coins",s:{F:2}},{t:"Snel aan het opschalen, ruim boven $10K MRR",ic:"rocket",s:{L:2}},{t:"Gevestigd, met een devteam of headless",ic:"cog",s:{E:2}},{t:"Abonnees vertrekken sneller dan me lief is",ic:"clock",s:{R:2}}]},
      {q:"Wat telt het zwaarst in de rekening?",opts:[{t:"Nul kosten terwijl ik valideer",ic:"coins",s:{F:2}},{t:"Geen kosten per bestelling bij hoog volume",ic:"rocket",s:{L:2}},{t:"Ik betaal voor diepe API en integraties",ic:"cog",s:{E:2}},{t:"Alles wat churn verlaagt betaalt zichzelf terug",ic:"crown",s:{R:1,L:1}}]},
      {q:"Jouw checkout-setup?",opts:[{t:"Standaard Shopify, lekker simpel",ic:"cart",s:{F:1,L:1}},{t:"Shop Pay of headless, geen discussie",ic:"layers",s:{E:2}},{t:"Native Checkout plus stevige retentieflows",ic:"wrench",s:{L:1,R:1}}]},
      {q:"Je belangrijkste prioriteit dit kwartaal?",opts:[{t:"Goedkoop abonnementen lanceren",ic:"coins",s:{F:2}},{t:"De kosten per bestelling verlagen op schaal",ic:"rocket",s:{L:2}},{t:"Meer LTV uit je abonnees halen",ic:"crown",s:{R:2}},{t:"Weg van een logge oude app",ic:"cog",s:{E:2}}]},
      {q:"Je technische gemak en je team?",opts:[{t:"Solo, ik wil kant-en-klaar",ic:"rocket",s:{F:1,L:1}},{t:"Ik heb devs voor maatwerk",ic:"cog",s:{E:2}},{t:"Klein team dat retentie test",ic:"pen",s:{R:2}}]}
    ];
    var RESULTS={F:{verdict:"Gratis en licht",title:"Seal of Appstle is jouw keuze",desc:"Je wilt echte abonnementsfuncties <strong>zonder aan je marges te komen</strong>. Beide draaien op een echt gratis plan met 0% transactiekosten: je lanceert dunning, een klantportaal en bundels voordat je een cent betaalt. De echte vraag is niet de app, maar <strong>of het product een abonnement waard is</strong>."},
      L:{verdict:"Gebouwd om te schalen",title:"Loop past bij een groeiend DTC-merk",desc:"Bij jouw volume wint <strong>geen kosten per bestelling</strong> op totale kosten, en Loops retentietools financieren de ads die de volgende abonnee brengen. Je bent voorbij de validatie: de hefboom is nu <strong>de machine voeden met het juiste product</strong> zodat de terugkerende omzet blijft groeien."},
      E:{verdict:"Enterprise-diepgang",title:"Recharge of Skio voor jou",desc:"Je hebt <strong>diepe API, headless en Shop Pay</strong> nodig, en je betaalt voor het ecosysteem dat het levert. Deze platforms verdienen hun marge met integratiediepte, niet met retentiemagie. Met de infra geregeld komt het voordeel <strong>van het product dat je op abonnement zet</strong>."},
      R:{verdict:"Retentie eerst",title:"Stay AI is jouw match",desc:"Je knelpunt is <strong>churn</strong>, en Stay AI draait om AI-gestuurde retentie en LTV. De flows houden abonnees langer vast, maar geen enkele stack redt een product dat niemand twee keer wil. Zet <strong>een product in dat echt verkoopt</strong>, en laat de retentiemotor zijn werk doen."}};
    var idx=0,scores={F:0,L:0,E:0,R:0};
    var stage=document.getElementById("copyfyQuizStage");
    var resultEl=document.getElementById("copyfyQuizResult");
    var qEl=document.getElementById("copyfyQuizQuestion");
    var optsEl=document.getElementById("copyfyQuizOptions");
    var badgeEl=document.getElementById("copyfyQuizBadge");
    var fillEl=document.getElementById("copyfyQuizFill");
    function render(){
      var item=QUESTIONS[idx];
      badgeEl.textContent="Vraag "+(idx+1)+" / "+QUESTIONS.length;
      fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";
      qEl.textContent=item.q;
      optsEl.innerHTML="";
      item.opts.forEach(function(o){
        var btn=document.createElement("button");
        btn.type="button";btn.className="copyfy-quiz-opt";
        btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';
        btn.addEventListener("click",function(){
          for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}
          idx++;
          if(idx<QUESTIONS.length){render();}else{showResult();}
        });
        optsEl.appendChild(btn);
      });
    }
    function showResult(){
      fillEl.style.width="100%";
      var winner="F",max=-1;
      ["F","L","E","R"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});
      var r=RESULTS[winner];
      document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;
      document.getElementById("copyfyQuizRTitle").textContent=r.title;
      document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;
      stage.style.display="none";
      resultEl.className="copyfy-quiz-result copyfy-active";
    }
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){
      idx=0;scores={F:0,L:0,E:0,R:0};
      resultEl.className="copyfy-quiz-result";
      stage.style.display="block";
      render();
    });
    render();
  })();
  