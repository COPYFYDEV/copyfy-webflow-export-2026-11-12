
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
      {q:"Wo stehst du mit deinem E-Commerce?",opts:[{t:"Ich fange an und will von A bis Z begleitet werden",ic:"rocket",s:{C:2}},{t:"Ich habe schon einen Shop, ich will nur Anzeigendaten",ic:"layers",s:{M:2}},{t:"Ich suche vor allem mein nächstes Gewinnerprodukt",ic:"cart",s:{C:2}}]},
      {q:"Deine oberste Priorität?",opts:[{t:"Das Produkt finden UND den Shop starten",ic:"bolt",s:{C:2}},{t:"Facebook-, TikTok- und Pinterest-Anzeigen tief ausspähen",ic:"crown",s:{M:2}},{t:"Ein All-in-one-Tool mit KI, die die Arbeit macht",ic:"cog",s:{C:2}}]},
      {q:"Dein Budget und dein Stil?",opts:[{t:"Knappes Budget, ich will eine Gratis-Testphase und klare Preise",ic:"coins",s:{C:2}},{t:"Ich zahle mehr, wenn das Anzeigen-Ausspähen am tiefsten ist",ic:"clock",s:{M:2}},{t:"Das beste All-in-one-Verhältnis, um schnell voranzukommen",ic:"wrench",s:{C:2}}]},
      {q:"Was würde dir am meisten Zeit sparen?",opts:[{t:"Von der Recherche zum Launch ohne Tool-Wechsel",ic:"rocket",s:{C:2}},{t:"Die tiefste mögliche netzwerkübergreifende Anzeigendatenbank",ic:"layers",s:{M:2}},{t:"KI, die Produkte und Angles findet und den Shop baut",ic:"pen",s:{C:2}}]}
    ];
    var RESULTS={C:{verdict:"Copyfy",title:"Copyfy ist das richtige Tool für dich",desc:"Du willst schnell vorankommen, ohne mit zehn Tools zu jonglieren. <strong>Copyfy</strong> vereint AdSpy, die Suche nach Gewinnerprodukten und den KI-Shop-Builder an einem Ort. Von der Recherche bis zum Launch ist alles dabei, mit einer Gratis-Testphase zum Ausprobieren."},
      M:{verdict:"Minea",title:"Minea passt zu deinem Profil",desc:"Deine Priorität ist tiefes Anzeigen-Ausspähen auf Facebook, TikTok und Pinterest. <strong>Minea</strong> ist dafür gemacht. Denk daran, dass Copyfy die All-in-one-Option bleibt, wenn du auch deine Produkte finden und deinen Shop starten willst."}};
    var idx=0,scores={C:0,M:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Frage "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["C","M"][0],max=-1;["C","M"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={C:0,M:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  