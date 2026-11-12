
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
      {q:"Où en est ta boutique, là, maintenant ?",opts:[{t:"Je démarre, sous $10K de MRR",ic:"coins",s:{F:2}},{t:"Je scale vite, bien au-dessus de $10K de MRR",ic:"rocket",s:{L:2}},{t:"Établie, avec une équipe dev ou en headless",ic:"cog",s:{E:2}},{t:"Mes abonnés partent plus vite que je voudrais",ic:"clock",s:{R:2}}]},
      {q:"Ce qui compte le plus dans la facture ?",opts:[{t:"Coût zéro pendant que je valide",ic:"coins",s:{F:2}},{t:"Aucun frais par commande à gros volume",ic:"rocket",s:{L:2}},{t:"Je paierai pour une API poussée et des intégrations",ic:"cog",s:{E:2}},{t:"Tout ce qui réduit le churn se rembourse",ic:"crown",s:{R:1,L:1}}]},
      {q:"Ta config de checkout ?",opts:[{t:"Shopify standard, je garde simple",ic:"cart",s:{F:1,L:1}},{t:"Shop Pay ou headless, non négociable",ic:"layers",s:{E:2}},{t:"Checkout natif plus des relances solides",ic:"wrench",s:{L:1,R:1}}]},
      {q:"Ta priorité numéro un ce trimestre ?",opts:[{t:"Lancer l'abonnement pas cher",ic:"coins",s:{F:2}},{t:"Baisser le coût par commande à l'échelle",ic:"rocket",s:{L:2}},{t:"Tirer plus de LTV de mes abonnés",ic:"crown",s:{R:2}},{t:"Migrer d'une vieille app lourde",ic:"cog",s:{E:2}}]},
      {q:"Ton aisance technique et ton équipe ?",opts:[{t:"Solo, je veux du clé en main",ic:"rocket",s:{F:1,L:1}},{t:"J'ai des devs pour le sur-mesure",ic:"cog",s:{E:2}},{t:"Petite équipe qui teste la rétention",ic:"pen",s:{R:2}}]}
    ];
    var RESULTS={F:{verdict:"Gratuit et léger",title:"Seal ou Appstle, c'est ton choix",desc:"Tu veux de vraies fonctions d'abonnement <strong>sans toucher à tes marges</strong>. Les deux tournent sur une offre gratuite réelle à 0% de frais : tu lances relance, portail client et bundles avant de payer un centime. La vraie question, ce n'est pas l'app, c'est <strong>si le produit mérite qu'on s'y abonne</strong> au départ."},
      L:{verdict:"Fait pour scaler",title:"Loop colle à une marque DTC en croissance",desc:"À ton volume, <strong>zéro frais par commande</strong> l'emporte sur le coût total, et les outils de rétention de Loop financent la pub qui amène le prochain abonné. Tu as dépassé la validation : le levier, c'est maintenant <strong>nourrir la machine avec le bon produit</strong> pour faire grossir le récurrent."},
      E:{verdict:"Profondeur enterprise",title:"Recharge ou Skio pour toi",desc:"Il te faut <strong>une API poussée, du headless et Shop Pay</strong>, et tu paieras l'écosystème qui les livre. Ces plateformes justifient leur prélèvement par la profondeur d'intégration, pas par la magie de la rétention. L'infra réglée, l'avantage vient <strong>du produit que tu mets en abonnement</strong>."},
      R:{verdict:"La rétention d'abord",title:"Stay AI est ton match",desc:"Ton goulot, c'est le <strong>churn</strong>, et Stay AI est bâti autour de la rétention et de la LTV pilotées par l'IA. Les parcours gardent les abonnés plus longtemps, mais aucune stack ne sauve un produit qu'on ne veut pas deux fois. Verrouille <strong>un produit qui se vend vraiment</strong>, puis laisse le moteur de rétention faire le travail."}};
    var idx=0,scores={F:0,L:0,E:0,R:0};
    var stage=document.getElementById("copyfyQuizStage");
    var resultEl=document.getElementById("copyfyQuizResult");
    var qEl=document.getElementById("copyfyQuizQuestion");
    var optsEl=document.getElementById("copyfyQuizOptions");
    var badgeEl=document.getElementById("copyfyQuizBadge");
    var fillEl=document.getElementById("copyfyQuizFill");
    function render(){
      var item=QUESTIONS[idx];
      badgeEl.textContent="Question "+(idx+1)+" / "+QUESTIONS.length;
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
  