
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
      {q:"Où tu en es aujourd'hui ?",opts:[{t:"Pas encore de produit",ic:"pen",s:{G:2,C:2}},{t:"Un produit validé, pas encore lancé",ic:"rocket",s:{C:3,A:1}},{t:"Une boutique qui tourne",ic:"cart",s:{S:2,C:2}},{t:"Plusieurs boutiques ou une équipe",ic:"layers",s:{S:2,A:2,C:1}}]},
      {q:"Qu'est-ce qui te bloque le plus ?",opts:[{t:"Savoir quoi vendre",ic:"bolt",s:{C:3,G:1}},{t:"Savoir combien vend un concurrent",ic:"coins",s:{S:3,C:1}},{t:"Trouver des angles publicitaires",ic:"crown",s:{A:3,C:1}},{t:"Passer de l'idée à la boutique en ligne",ic:"rocket",s:{C:4}}]},
      {q:"Ton budget outils par mois ?",opts:[{t:"Zéro pour l'instant",ic:"coins",s:{G:4}},{t:"Moins de 50 $",ic:"cog",s:{C:2,S:1,G:1}},{t:"Entre 50 et 150 $",ic:"bolt",s:{C:3,A:1}},{t:"Plus de 150 $",ic:"crown",s:{A:2,S:2,C:2}}]},
      {q:"Ton canal d'acquisition principal ?",opts:[{t:"Facebook et Instagram",ic:"bolt",s:{A:2,C:1}},{t:"TikTok",ic:"rocket",s:{A:2,C:1}},{t:"SEO et organique",ic:"pen",s:{S:2,C:1}},{t:"Pas encore fixé",ic:"wrench",s:{C:2,G:1}}]}
    ];
    var RESULTS={C:{verdict:"Le tout-en-un",title:"Copyfy",desc:"Tu as besoin de <strong>chercher et de lancer au même endroit</strong>. Base de produits, pubs Facebook et TikTok, analyse de boutique et création de boutique par IA dans un seul abonnement. L'essai dure 5 jours et ne demande aucune carte bancaire."},
      S:{verdict:"Le tracker de boutiques",title:"PPSPY, complété par Koala Inspector",desc:"Ta vraie question, c'est <strong>combien vend ce concurrent</strong>. Un tracker te donne ses best-sellers, son thème, ses applications et une estimation de revenus, à partir de 39 $/mois. L'extension Koala reste gratuite pour les vérifications rapides."},
      A:{verdict:"L'ad spy",title:"Minea ou Winning Hunter",desc:"Il ne te manque pas un produit, il te manque <strong>l'angle qui le vend</strong>. Regarde la durée de diffusion et la dépense estimée avant le nombre de likes. AdSpy si tu ne fais que Meta, mais il ne couvre pas TikTok."},
      G:{verdict:"La stack gratuite",title:"Koala Inspector, Dropispy et BigSpy",desc:"À ce stade, <strong>la donnée n'est pas ton problème</strong> : le nombre de produits que tu as testés, si. Ces trois outils couvrent la recherche de départ sans carte bancaire, et l'essai Copyfy de 5 jours te montre le reste."}};
    var idx=0,scores={C:0,S:0,A:0,G:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Question "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["C","S","A","G"][0],max=-1;["C","S","A","G"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={C:0,S:0,A:0,G:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  