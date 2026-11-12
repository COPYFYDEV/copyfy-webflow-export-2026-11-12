
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
      {q:"Wo stehst du gerade?",opts:[{t:"Ich bereite meinen ersten Shop vor",ic:"rocket",s:{A:2}},{t:"Mein Shop läuft, hat aber wenig Traffic",ic:"cart",s:{B:2}},{t:"Ich starte und brauche einen Rahmen",ic:"layers",s:{C:2}}]},
      {q:"Was ist deine Priorität?",opts:[{t:"Nische, Marge und Shop verstehen",ic:"coins",s:{A:4}},{t:"An Kategorien, Inhalten und Links arbeiten",ic:"pen",s:{B:4}},{t:"Feedback und einen Aktionsplan bekommen",ic:"cog",s:{C:4}}]},
      {q:"Wie lernst du am besten?",opts:[{t:"Mit Grundlagen und einfachen Übungen",ic:"bolt",s:{A:3}},{t:"Mit einem Fachkurs und Tests im Shop",ic:"wrench",s:{B:3}},{t:"Mit fester Betreuung und Terminen",ic:"clock",s:{C:3}}]}
    ];
    var RESULTS={A:{verdict:"Einsteiger im E-Commerce",title:"Beginne mit den E-Commerce-Grundlagen",desc:"Wähle einen Einstiegskurs, der Nische, Marge, Lieferanten und Shop-Aufbau verbindet, und <strong>prüfe eine kleine Produktauswahl<\/strong>, bevor du für eine SEO-Spezialisierung bezahlst. Copyfy hilft dir zu prüfen, ob eine Nische aktive Produkte und Konkurrenten hat, und die KI-Shop-Erstellung liefert dir eine erste Struktur."},
      B:{verdict:"Shop mit wenig Traffic",title:"Vertiefe dein E-Commerce-SEO",desc:"Such dir ein Programm zu Keywords, Kategorien, interner Verlinkung und Backlinks: Guillaume Jacob für WooCommerce oder die Eskimoz Academy, wenn dein Problem rein organisch ist. <strong>Prüfe, ob es zu deiner Plattform passt<\/strong>, bevor du dich anmeldest. Copyfy ergänzt den Kurs mit aktuellen Daten zu Produkten, konkurrierenden Shopify-Shops und ihren Traffic-Quellen."},
      C:{verdict:"Projekt mit Betreuungsbedarf",title:"Wähle einen begleiteten Lernweg",desc:"LiveMentor bietet den klarsten Rahmen, mit einem persönlichen Mentor über drei Monate. <strong>Frag, wer dein Mentor sein wird<\/strong> und wie viel Einzelfeedback enthalten ist. Bei Copyfy ist die E-Commerce-Schulung inklusive, und das wöchentliche Gruppencoaching beginnt mit dem Growth-Plan."}};
    var idx=0,scores={A:0,B:0,C:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Frage "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round((idx/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic" aria-hidden="true">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["A", "B", "C"][0],max=-1;["A", "B", "C"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={A:0,B:0,C:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  