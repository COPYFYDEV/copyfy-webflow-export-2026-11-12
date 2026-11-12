
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
      layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5z"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5"/></svg>',
      leaf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 11-5 16-9 16z"/><path d="M4 21c2-4 5-7 9-9"/></svg>',
      trendingUp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 7-7"/><path d="M17 7h4v4"/></svg>',
      target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
      heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5a4.5 4.5 0 0 0-7 1 4.5 4.5 0 0 0-7-1 4.5 4.5 0 0 0 0 6l7 7 7-7a4.5 4.5 0 0 0 0-6z"/></svg>',
      paw:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="11" r="1.8"/><circle cx="18" cy="11" r="1.8"/><circle cx="9.5" cy="6.5" r="1.8"/><circle cx="14.5" cy="6.5" r="1.8"/><path d="M12 12c-2.5 0-4 2-4 4 0 1.7 1.5 3 4 3s4-1.3 4-3c0-2-1.5-4-4-4z"/></svg>',
      sparkle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>',
      globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>',
      gamepad:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v4M5 12h4"/><circle cx="16" cy="11" r="0.6"/><circle cx="18" cy="13" r="0.6"/><rect x="2" y="6" width="20" height="12" rx="4"/></svg>',
      dumbbell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12"/></svg>',
      home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>',
      smartphone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></svg>',
      search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
      flame:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c2 4 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5-1-8z"/></svg>',
      moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10z"/></svg>',
      scale:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M7 21h10"/><path d="M5 7h14"/><path d="M5 7l-3 6h6zM19 7l-3 6h6z"/></svg>',
      scissors:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8 8l12 8M8 16l12-8"/></svg>',
      play:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l14 8-14 8z"/></svg>',
      megaphone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a1 1 0 0 0 1 1h2l9 5V5L6 10H4a1 1 0 0 0-1 1z"/><path d="M18 8a4 4 0 0 1 0 8"/></svg>',
      trophy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3"/></svg>',
      plane:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 13l20-7-7 20-3-8z"/></svg>',
      palette:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1 0 2-1 2-2 0-1.5 1-2 2-2h1a4 4 0 0 0 4-4c0-5-4-8-9-8z"/><circle cx="7.5" cy="11" r="1"/><circle cx="11" cy="7.5" r="1"/><circle cx="15.5" cy="8.5" r="1"/></svg>',
      gift:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="11" rx="1"/><path d="M3 9h18M12 9v11"/><path d="M12 9C12 5 9 3 7 5s0 4 5 4c3 0 6-2 5-4s-5 0-5 4z"/></svg>',
      baby:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3"/><path d="M7 21c0-4 2-7 5-7s5 3 5 7"/><path d="M10 7h.01M14 7h.01"/></svg>',
      yoga:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v6M5 21l7-8 7 8M4 13h16"/></svg>',
      car:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13"/><path d="M3 13h18v5H3z"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></svg>',
      pan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="13" r="6"/><path d="M16 11l6-2"/></svg>',
      bank:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-5 9 5"/><path d="M5 9v9M9 9v9M15 9v9M19 9v9M3 21h18"/></svg>',
      gem:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M9 3 6 9l6 12 6-12-3-6"/></svg>',
      banknote:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></svg>',
      calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>',
      book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h11a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2z"/><path d="M17 6h3v14h-3"/></svg>',
      box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/></svg>',
      candle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="6" height="11" rx="1"/><path d="M12 9V6"/><path d="M12 3c1 1 1.5 2 0 3-1.5-1-1-2 0-3z"/></svg>',
      lizard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c3-3 6 0 9 0s5-4 9-2c-2 2-5 2-7 4 2 1 4 0 6 2-3 1-6-1-9 0s-5 3-8 1c2-2 4-2 6-3-2-1-4 0-6-2z"/></svg>',
      flask:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7.5 14h9"/></svg>',
      dress:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3l3 3 3-3M9 3l-1 4 4 3 4-3-1-4M8 10l-3 11h14l-3-11"/></svg>',
      bag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
      shoe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16v-5l4-1 3 3 8 1a3 3 0 0 1 3 3v2H3z"/><path d="M7 10v3M11 13v2"/></svg>',
      ring:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="6"/><path d="M9 5l3-2 3 2-1.5 4h-3z"/></svg>',
      lipstick:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="9" width="8" height="12" rx="1"/><path d="M9 9l1-6h4l1 6"/></svg>',
      tent:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 3 20h18z"/><path d="M12 4v16"/></svg>',
      ball:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3l3 4-3 5-3-5zM4 9l5 2M20 9l-5 2M7 19l2-5M17 19l-2-5"/></svg>'
    };
    var CHECK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    var QUESTIONS=[
      {q:"💰 Quel est ton budget de démarrage ?",opts:[
        {t:"< 500€, Tester petit",ic:"leaf",sc:"eco,fitness,beaute"},
        {t:"500€, 2000€, Sérieux",ic:"trendingUp",sc:"animaux,maison,sante"},
        {t:"> 2000€, All-in",ic:"rocket",sc:"tech,gaming,auto"}
      ]},
      {q:"❤️ Qu'est-ce qui te passionne ?",opts:[
        {t:"Écologie & bien-être familial",ic:"globe",sc:"eco,jardin,bebe"},
        {t:"Tech & gadgets innovants",ic:"bolt",sc:"tech,gaming,auto"},
        {t:"Lifestyle, beauté & fitness",ic:"sparkle",sc:"beaute,fitness,sante"},
        {t:"Animaux & loisirs créatifs",ic:"paw",sc:"animaux,loisirs,voyage"}
      ]},
      {q:"🎯 Quel type de client cibler ?",opts:[
        {t:"Émotionnel, Achat passion",ic:"heart",sc:"beaute,animaux,bebe"},
        {t:"Utilitaire, Besoin solution",ic:"wrench",sc:"tech,maison,auto"},
        {t:"Aspirationnel, S'améliorer",ic:"trophy",sc:"eco,fitness,sante"}
      ]},
      {q:"📱 Où veux-tu vendre ?",opts:[
        {t:"TikTok / Instagram",ic:"play",sc:"beaute,fitness,loisirs"},
        {t:"Google / SEO",ic:"search",sc:"tech,maison,sante"},
        {t:"Facebook Ads",ic:"megaphone",sc:"animaux,bebe,eco"}
      ]},
      {q:"⏱️ Temps disponible ?",opts:[
        {t:"Side-project",ic:"moon",sc:"pod,maison,sante"},
        {t:"15-20h/semaine",ic:"scale",sc:"animaux,fitness,beaute"},
        {t:"Full focus 100%",ic:"flame",sc:"tech,gaming,eco"}
      ]}
    ];
    var NICHES={
      eco:{name:"Produits éco-responsables",ic:"leaf",desc:"Vérifie les allégations écologiques et le coût livré."},
      animaux:{name:"Accessoires animaux premium",ic:"paw",desc:"Teste qualité, sécurité et fréquence réelle de réachat."},
      tech:{name:"Smart home & domotique",ic:"home",desc:"Vérifie compatibilité, conformité et service après-vente."},
      fitness:{name:"Fitness à domicile",ic:"dumbbell",desc:"Compare poids, dimensions et marge après livraison."},
      beaute:{name:"Beauté naturelle",ic:"sparkle",desc:"Contrôle conformité et coûts ; aucun taux de marge garanti."},
      gaming:{name:"Accessoires gaming",ic:"gamepad",desc:"Étudie les besoins du segment et les offres concurrentes."},
      maison:{name:"Kitchen gadgets viraux",ic:"pan",desc:"Teste l’utilité du produit et tes démonstrations vidéo."},
      sante:{name:"Santé & bien-être",ic:"yoga",desc:"Vérifie la sécurité et évite les promesses médicales injustifiées."},
      bebe:{name:"Puériculture innovante",ic:"baby",desc:"La sécurité et la conformité doivent précéder la vente."},
      auto:{name:"Accessoires voiture",ic:"car",desc:"Vérifie compatibilité et sécurité de chaque référence."},
      jardin:{name:"Jardinage urbain",ic:"leaf",desc:"Étudie saisonnalité, dimensions et besoins d’entretien."},
      loisirs:{name:"Loisirs créatifs",ic:"palette",desc:"Mesure le temps de contenu et les coûts d’acquisition."},
      pod:{name:"Print-on-demand",ic:"gift",desc:"Stock initial limité ; production et acquisition réduisent la marge."},
      voyage:{name:"Accessoires voyage",ic:"plane",desc:"Teste solidité, dimensions et demande sur ton marché."}
    };

    var idx=0;
    var scores={};
    var stage=document.getElementById("copyfyQuizStage");
    var resultEl=document.getElementById("copyfyQuizResult");
    var qEl=document.getElementById("copyfyQuizQuestion");
    var optsEl=document.getElementById("copyfyQuizOptions");
    var badgeEl=document.getElementById("copyfyQuizBadge");
    var fillEl=document.getElementById("copyfyQuizFill");
    var cardsEl=document.getElementById("copyfyQuizCards");

    function render(){
      var item=QUESTIONS[idx];
      badgeEl.textContent="Question"+" "+(idx+1)+" / "+QUESTIONS.length;
      fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";
      qEl.textContent=item.q;
      optsEl.innerHTML="";
      item.opts.forEach(function(o){
        var btn=document.createElement("button");
        btn.type="button";btn.className="copyfy-quiz-opt";
        btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';
        btn.addEventListener("click",function(){
        var keys=o.sc.split(',');
        keys.forEach(function(k){scores[k]=(scores[k]||0)+1;});
          idx++;
          if(idx<QUESTIONS.length){render();}else{showResult();}
        });
        optsEl.appendChild(btn);
      });
    }

    function buildCard(rank,n,match){
      var card=document.createElement("div");
      card.className="copyfy-quiz-card";
      card.innerHTML='<div class="copyfy-quiz-card-head">'+
        '<span class="copyfy-quiz-rank">'+rank+'</span>'+
        '<span class="copyfy-quiz-card-ic">'+(ICONS[n.ic]||"")+'</span>'+
        '<span class="copyfy-quiz-card-name">'+n.name+'</span>'+
        '</div>'+
        '<div class="copyfy-quiz-card-desc">'+n.desc+'</div>'+
        '<span class="copyfy-quiz-match">'+CHECK+'<span>'+'Piste à tester</span></span>';
      return card;
    }

    function showResult(){
      fillEl.style.width="100%";
      var sorted=Object.entries(scores).sort(function(a,b){return b[1]-a[1];}).slice(0,3);
      cardsEl.innerHTML='';
      sorted.forEach(function(item,index){
        var n=NICHES[item[0]];if(!n)return;
        var match=Math.round(item[1]/QUESTIONS.length*100);
        cardsEl.appendChild(buildCard(index+1,n,match));
      });
      stage.style.display="none";
      resultEl.className="copyfy-quiz-result copyfy-active";
    }

    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){
      idx=0;scores={};
      resultEl.className="copyfy-quiz-result";
      stage.style.display="block";
      render();
    });

    render();
  })();
  