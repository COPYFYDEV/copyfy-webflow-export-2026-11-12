
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
      {q:"Wo steht dein Shop?",opts:[{t:"Noch nicht live, ich suche ein Produkt",ic:"pen",s:{C:4}},{t:"Live, ich suche meinen ersten Winner",ic:"cart",s:{C:3}},{t:"Ich verkaufe schon und will skalieren",ic:"rocket",s:{A:1,S:1,C:1}}]},
      {q:"Wo schaltest du Werbung?",opts:[{t:"Meta (Facebook und Instagram)",ic:"bolt",s:{C:2}},{t:"TikTok",ic:"rocket",s:{C:3}},{t:"Native mit Advertorials",ic:"layers",s:{A:4}},{t:"Google, YouTube oder Reddit",ic:"layers",s:{S:4}}]},
      {q:"Was willst du zuerst sehen?",opts:[{t:"Produkte, die sich schon verkaufen",ic:"crown",s:{C:3}},{t:"Konkurrenz-Shops und ihre Anzeigen",ic:"cart",s:{C:3}},{t:"Lander und Angebot hinter einer Anzeige",ic:"wrench",s:{A:3}},{t:"Anzeigen auf möglichst vielen Plattformen",ic:"layers",s:{S:3}}]},
      {q:"Wie viel darf das Tool im Monat kosten?",opts:[{t:"Unter 100 $",ic:"coins",s:{C:2}},{t:"Zwischen 100 und 250 $",ic:"cog",s:{A:1,C:1}},{t:"250 $ oder mehr",ic:"crown",s:{A:2,S:2}}]}
    ];
    var RESULTS={A:{verdict:"Marke mit Native-Traffic",title:"AdPlexity Native kann sich lohnen",desc:"Du schaltest Advertorials in Native-Netzwerken. AdPlexity zeigt Lander, Angebot und Redirect-Kette hinter jeder Anzeige, <strong>auf Taboola, Outbrain und MGID<\/strong>. Das Native-Modul kostet 249 $ im Monat ohne Testphase, buche also zuerst die Demo. Für Produktrecherche und die Analyse der Konkurrenz-Shops deckt Copyfy ab, was AdPlexity auslässt."},
      S:{verdict:"Anzeigen jenseits von Meta",title:"Schau dir PowerAdSpy an",desc:"Deine Anzeigen laufen auf Google, YouTube oder Reddit, wo AdPlexity kein Modul hat. PowerAdSpy deckt sie in den höheren Plänen ab: Google und YouTube ab 279 $ im Monat, Reddit ab 399 $. <strong>Wähle nach Kanal<\/strong>, nicht nach Datenbankgröße. Für Meta- und TikTok-Anzeigen rund um Winning-Produkte ergänzt Copyfy die Shop-Analyse."},
      C:{verdict:"Shopify-Händler",title:"Copyfy passt besser zu dir",desc:"AdPlexity zeigt weder Shop-Umsätze noch Produktdaten. Copyfy verbindet <strong>Winning-Produkte, Konkurrenz-Shops und ihre aktiven Anzeigen<\/strong>, mit Meta- und TikTok-Anzeigen und einem KI-Shop-Builder. Die Pläne starten bei 49 € im Monat, und die 3-tägige Testphase braucht keine Kreditkarte."}};
    var idx=0,scores={A:0,S:0,C:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Frage "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round((idx/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic" aria-hidden="true">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["A", "S", "C"][0],max=-1;["A", "S", "C"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={A:0,S:0,C:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  