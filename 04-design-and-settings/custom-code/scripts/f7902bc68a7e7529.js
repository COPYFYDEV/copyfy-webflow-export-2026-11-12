
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
      {q:"Dein Hauptziel?",opts:[{t:"Winning Products finden und meinen Shop steuern",ic:"cart",s:{C:2}},{t:"Einfach die Verkäufe von Shopify-Shops verfolgen",ic:"bolt",s:{S:2}}]},
      {q:"Dein Monatsbudget für ein Tool?",opts:[{t:"Ich kann rund 29€ für ein komplettes Tool ausgeben",ic:"coins",s:{C:2}},{t:"Null, ich will etwas 100% Kostenloses",ic:"coins",s:{S:2}},{t:"Egal, wenn das Tool mir Zeit spart",ic:"crown",s:{C:1}}]},
      {q:"Dein Niveau im E-Commerce?",opts:[{t:"Ich will ein komplettes Tool, um schnell voranzukommen",ic:"rocket",s:{C:2}},{t:"Ich fange gerade an und teste nur kostenlos das Konzept",ic:"cog",s:{S:2}}]},
      {q:"Deine Produktseiten mit KI generieren und die Bilder zu Shopify importieren?",opts:[{t:"Ja, das ist essenziell für mich",ic:"pen",s:{C:2}},{t:"Nein, ich erstelle den Content von Hand",ic:"wrench",s:{S:1}}]},
      {q:"Konkurrenzshops gründlich analysieren, nicht nur ihre Verkäufe?",opts:[{t:"Ja, ich will Produkte, Preise und Strategie",ic:"layers",s:{C:2}},{t:"Das Verkaufstracking von Shopify reicht mir",ic:"clock",s:{S:1}}]}
    ];
    var RESULTS={C:{verdict:"Copyfy ist für dich gemacht 🏆",title:"Die All-in-one-Suite, mit KI verstärkt",desc:"Du willst Winning Products finden, deine Konkurrenten analysieren und deinen Shop starten, ohne Tools zu stapeln. Copyfy hakt jede Box ab, für 49€/Monat mit <strong>kostenloser Testphase</strong>."},
      S:{verdict:"SellerCenter passt besser zu deinem Bedarf",title:"Das kostenlose Tool für den Start",desc:"Dein Ding ist es, kostenlos die Verkäufe einiger Shopify-Shops zu verfolgen, und SellerCenter erledigt diesen Punkt. Sobald du allerdings KI, Produktseiten und eine echte Konkurrenzanalyse willst, geht Copyfy viel weiter: eine <strong>kostenlose Testphase</strong> klärt es schnell."}};
    var idx=0,scores={C:0,S:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Frage "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["C","S"][0],max=-1;["C","S"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={C:0,S:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  