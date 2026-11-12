
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

    // Questions : chaque option ajoute des points à S (Shopify), W (WordPress), H (Hybride)
    var QUESTIONS=[
      {q:"Je belangrijkste doel, nu meteen?",
       opts:[
        {t:"Snel verkopen en een product testen",ic:"bolt",s:{S:2}},
        {t:"Alles bezitten en controleren op lange termijn",ic:"crown",s:{W:2}}
       ]},
      {q:"Hoe comfortabel ben je met techniek?",
       opts:[
        {t:"Nul — ik wil dat het werkt zonder gepruts",ic:"rocket",s:{S:2}},
        {t:"Op mijn gemak — hosting, plugins, dat ken ik",ic:"cog",s:{W:2}}
       ]},
      {q:"Content (blog, SEO) in je strategie?",
       opts:[
        {t:"Het is mijn belangrijkste acquisitiemotor",ic:"pen",s:{W:2,H:1}},
        {t:"Bijzaak — ik zet in op ads en product",ic:"cart",s:{S:2}}
       ]},
      {q:"Hoeveel tijd per week voor onderhoud?",
       opts:[
        {t:"Het minimum — 2-3u, ik wil kant-en-klaar",ic:"clock",s:{S:2}},
        {t:"4-6u is prima als ik vrijheid win",ic:"wrench",s:{W:2}}
       ]},
      {q:"Je situatie vandaag?",
       opts:[
        {t:"Ik begin bij nul, ik wil lanceren",ic:"rocket",s:{S:1}},
        {t:"Ik heb al een publiek / een WordPress-blog",ic:"layers",s:{H:3}},
        {t:"Complexe catalogus of eigen workflow",ic:"cog",s:{W:2}},
        {t:"Ik doe dropshipping / producttesten",ic:"cart",s:{S:2}}
       ]}
    ];

    var RESULTS={
      S:{verdict:"Snelheid voorop",title:"Shopify is je veiligste gok",
         desc:"Je wilt <strong>nu verkopen</strong> en techniek als andermans probleem behandelen. Live in 1 tot 5 dagen, stabiele checkout, hosting en beveiliging inbegrepen — je besteedt je uren aan product en marketing, niet aan het repareren van de site. Het echte knelpunt wordt niet het platform, maar <strong>een product kiezen dat echt verkoopt</strong>."},
      W:{verdict:"Eigendom en controle",title:"WordPress + WooCommerce past bij jou",
         desc:"Je wilt <strong>alles bezitten</strong>: je code, je data, je SEO zonder plafond. De setup kost weken en 4-6u/week onderhoud, maar als content je motor is, levert die redactionele kracht jarenlang rente op. De echte vraag nu: <strong>wat verkopen</strong> om al dat verkeer te laten renderen?"},
      H:{verdict:"De hybride opzet",title:"Draai allebei parallel",
         desc:"Je hebt al een publiek — bouw niets opnieuw. Houd <strong>WordPress voor content</strong> en schroef er <strong>Shopify voor de verkoop</strong> op: wrijvingsloze checkout aan de ene kant, redactionele spierkracht aan de andere. Je voegt een verkoopmotor toe aan je verkeersmachine. Volgende stap: <strong>het winnende product vinden</strong> om aan te koppelen."}
    };

    var idx=0,scores={S:0,W:0,H:0};
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
      var winner="S",max=-1;
      ["S","W","H"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});
      var r=RESULTS[winner];
      document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;
      document.getElementById("copyfyQuizRTitle").textContent=r.title;
      document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;
      stage.style.display="none";
      resultEl.className="copyfy-quiz-result copyfy-active";
    }

    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){
      idx=0;scores={S:0,W:0,H:0};
      resultEl.className="copyfy-quiz-result";
      stage.style.display="block";
      render();
    });

    render();
  })();
  