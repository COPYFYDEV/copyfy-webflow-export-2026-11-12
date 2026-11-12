
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
      {q:"Où vends-tu, ou comptes-tu vendre ?",opts:[{t:"Sur TikTok Shop",ic:"rocket",s:{D:4}},{t:"Sur une boutique Shopify",ic:"cart",s:{C:3,S:1}},{t:"Je n’ai pas encore choisi",ic:"pen",s:{C:4}}]},
      {q:"Qu’attends-tu d’abord de l’outil ?",opts:[{t:"Des produits et créateurs TikTok Shop",ic:"crown",s:{D:3}},{t:"Repérer les pubs qui tournent",ic:"bolt",s:{S:3}},{t:"Passer du produit à la boutique",ic:"wrench",s:{C:3}}]},
      {q:"Comment veux-tu tester l’outil ?",opts:[{t:"Sans carte bancaire",ic:"coins",s:{C:3}},{t:"Avec ma carte, je résilierai à temps",ic:"clock",s:{D:2,S:1}}]},
      {q:"Quel budget pub as-tu pour tester ?",opts:[{t:"Aucun pour l’instant",ic:"layers",s:{C:3}},{t:"Un petit budget de test",ic:"cog",s:{C:1,S:2}},{t:"Un budget chaque semaine",ic:"rocket",s:{D:2,S:2}}]}
    ];
    var RESULTS={C:{verdict:"Boutique à lancer",title:"Commence par Copyfy, sans carte",desc:"Ton enjeu est de choisir un produit et de le mettre en vente. Copyfy réunit <strong>la recherche de produits, de boutiques et de pubs<\/strong>, puis crée ta boutique avec l’IA. L’essai de 3 jours ne demande aucune carte bancaire."},
      D:{verdict:"Vendeur TikTok Shop",title:"Dropship.io peut valoir son prix",desc:"Ses bibliothèques de boutiques et de créateurs TikTok Shop collent à ton canal. Programme un rappel avant la 72e heure : <strong>l’essai devient payant sans remboursement<\/strong>. Pour passer d’un produit à une boutique Shopify créée avec l’IA, Copyfy prend le relais."},
      S:{verdict:"Priorité aux pubs",title:"Choisis un outil d’espionnage de pubs",desc:"Tu veux d’abord voir les créas qui tournent. Minea et WinningHunter sont centrés sur l’ad spy. Copyfy couvre aussi <strong>les pubs Meta et TikTok<\/strong>, avec la recherche produit et la création de boutique dans le même outil."}};
    var idx=0,scores={C:0,D:0,S:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Question "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round((idx/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic" aria-hidden="true">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["C", "D", "S"][0],max=-1;["C", "D", "S"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={C:0,D:0,S:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  