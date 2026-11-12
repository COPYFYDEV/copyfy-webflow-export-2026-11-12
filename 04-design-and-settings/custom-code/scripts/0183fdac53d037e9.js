
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
      {q:"Wo stehst du bei der bezahlten Akquise?",opts:[{t:"Mein Angebot steht, ich schalte schon Ads",ic:"rocket",s:{gethookd:3}},{t:"Ich suche noch das richtige Produkt",ic:"cart",s:{copyfy:3}},{t:"Ich betreue mehrere Konten mit viel Budget",ic:"layers",s:{analytics:3}}]},
      {q:"Was ist dein größter Engpass?",opts:[{t:"Angles finden und mehr Creatives erstellen",ic:"pen",s:{gethookd:2}},{t:"Wissen, ob ein Produkt echte Nachfrage hat",ic:"crown",s:{copyfy:2}},{t:"Meine Creatives mit Verkäufen verknüpfen",ic:"cog",s:{analytics:2}}]},
      {q:"Worin willst du investieren?",opts:[{t:"Günstige Anzeigenrecherche und Erstellung",ic:"coins",s:{gethookd:1}},{t:"Ein Produkt finden und den Shop starten",ic:"bolt",s:{copyfy:1}},{t:"Tiefe Analyse meiner Kampagnen",ic:"wrench",s:{analytics:1}}]}
    ];
    var RESULTS={gethookd:{verdict:"Media Buyer schon aktiv",title:"GetHookd passt zu deinem Bedarf",desc:"Dein Angebot ist validiert und dich bremst <strong>das Creative-Volumen<\/strong>. Prüfe im Testzeitraum, wie tief deine Nische geht und was die Credits wirklich kosten. Um dein nächstes Testprodukt zu finden, analysiert Copyfy Shops, Produkte und aktive Anzeigen."},
      copyfy:{verdict:"Produkt noch offen",title:"Starte besser mit Copyfy",desc:"Deine Aufgabe bleibt, ein Produkt zu wählen und den Markt zu validieren. GetHookd findet Anzeigen und Angles, aber <strong>validiert kein Produkt<\/strong>. Copyfy verknüpft Anzeigen mit Produkten und Shops und hilft dir, deinen Shop mit KI zu erstellen."},
      analytics:{verdict:"Manager mehrerer Konten",title:"Vergleiche ein Creative-Analytics-Tool",desc:"Du musst vor allem <strong>deine Kampagnen messen<\/strong> und über mehrere Konten berichten. Motion verbindet sich mit deinen Kampagnen und zeigt, welche Creatives Ergebnisse bringen. Um neue Testprodukte zu finden, analysiert Copyfy Shops, Produkte und aktive Anzeigen."}};
    var idx=0,scores={gethookd:0,copyfy:0,analytics:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Frage "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round((idx/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic" aria-hidden="true">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["gethookd", "copyfy", "analytics"][0],max=-1;["gethookd", "copyfy", "analytics"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={gethookd:0,copyfy:0,analytics:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  