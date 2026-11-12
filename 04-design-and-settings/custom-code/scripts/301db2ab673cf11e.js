
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
      {q:"Wo steht dein Shop gerade?",opts:[{t:"Gerade gestartet, unter $10K MRR",ic:"coins",s:{F:2}},{t:"Skaliere schnell, weit über $10K MRR",ic:"rocket",s:{L:2}},{t:"Etabliert, mit Dev-Team oder headless",ic:"cog",s:{E:2}},{t:"Abonnenten springen schneller ab, als mir lieb ist",ic:"clock",s:{R:2}}]},
      {q:"Was zählt bei den Kosten am meisten?",opts:[{t:"Null Kosten, während ich validiere",ic:"coins",s:{F:2}},{t:"Keine Gebühr pro Bestellung bei hohem Volumen",ic:"rocket",s:{L:2}},{t:"Ich zahle für tiefe API und Integrationen",ic:"cog",s:{E:2}},{t:"Was Churn senkt, zahlt sich selbst",ic:"crown",s:{R:1,L:1}}]},
      {q:"Dein Checkout-Setup?",opts:[{t:"Standard-Shopify, schön einfach",ic:"cart",s:{F:1,L:1}},{t:"Shop Pay oder headless, nicht verhandelbar",ic:"layers",s:{E:2}},{t:"Nativer Checkout plus starke Retention-Flows",ic:"wrench",s:{L:1,R:1}}]},
      {q:"Deine Priorität Nummer eins dieses Quartal?",opts:[{t:"Abos günstig starten",ic:"coins",s:{F:2}},{t:"Die Kosten pro Bestellung bei Skalierung senken",ic:"rocket",s:{L:2}},{t:"Mehr LTV aus den Abonnenten holen",ic:"crown",s:{R:2}},{t:"Von einer schwerfälligen Alt-App migrieren",ic:"cog",s:{E:2}}]},
      {q:"Dein technisches Niveau und dein Team?",opts:[{t:"Solo, ich will schlüsselfertig",ic:"rocket",s:{F:1,L:1}},{t:"Ich habe Devs für Maßarbeit",ic:"cog",s:{E:2}},{t:"Kleines Team, das Retention testet",ic:"pen",s:{R:2}}]}
    ];
    var RESULTS={F:{verdict:"Gratis und schlank",title:"Seal oder Appstle ist deine Wahl",desc:"Du willst echte Abo-Funktionen <strong>ohne deine Margen anzutasten</strong>. Beide laufen auf einem echten Gratis-Tarif mit 0% Transaktionsgebühr: du startest Dunning, ein Kundenportal und Bundles, bevor du einen Cent zahlst. Die echte Frage ist nicht die App, sondern <strong>ob das Produkt ein Abo wert ist</strong>."},
      L:{verdict:"Zum Skalieren gebaut",title:"Loop passt zu einer wachsenden DTC-Marke",desc:"Bei deinem Volumen gewinnt <strong>keine Gebühr pro Bestellung</strong> bei den Gesamtkosten, und Loops Retention-Tools finanzieren die Ads, die den nächsten Abonnenten bringen. Du bist über die Validierung hinaus: der Hebel ist jetzt, <strong>die Maschine mit dem richtigen Produkt zu füttern</strong>, damit der wiederkehrende Umsatz wächst."},
      E:{verdict:"Enterprise-Tiefe",title:"Recharge oder Skio für dich",desc:"Du brauchst <strong>tiefe API, headless und Shop Pay</strong>, und du zahlst für das Ökosystem, das das liefert. Diese Plattformen rechtfertigen ihren Anteil durch Integrationstiefe, nicht durch Retention-Magie. Mit geregelter Infrastruktur kommt der Vorteil <strong>vom Produkt, das du ins Abo legst</strong>."},
      R:{verdict:"Retention zuerst",title:"Stay AI ist dein Match",desc:"Dein Engpass ist <strong>Churn</strong>, und Stay AI ist auf KI-gesteuerte Retention und LTV gebaut. Die Flows halten Abonnenten länger, aber keine Stack rettet ein Produkt, das niemand zweimal will. Sichere dir <strong>ein Produkt, das wirklich verkauft</strong>, und lass die Retention-Engine arbeiten."}};
    var idx=0,scores={F:0,L:0,E:0,R:0};
    var stage=document.getElementById("copyfyQuizStage");
    var resultEl=document.getElementById("copyfyQuizResult");
    var qEl=document.getElementById("copyfyQuizQuestion");
    var optsEl=document.getElementById("copyfyQuizOptions");
    var badgeEl=document.getElementById("copyfyQuizBadge");
    var fillEl=document.getElementById("copyfyQuizFill");
    function render(){
      var item=QUESTIONS[idx];
      badgeEl.textContent="Frage "+(idx+1)+" / "+QUESTIONS.length;
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
  