
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
      {q:"Where are you right now?",opts:[{t:"No product yet",ic:"pen",s:{G:2,C:2}},{t:"A validated product, not launched yet",ic:"rocket",s:{C:3,A:1}},{t:"A store that is running",ic:"cart",s:{S:2,C:2}},{t:"Several stores or a team",ic:"layers",s:{S:2,A:2,C:1}}]},
      {q:"What is blocking you most?",opts:[{t:"Knowing what to sell",ic:"bolt",s:{C:3,G:1}},{t:"Knowing how much a competitor sells",ic:"coins",s:{S:3,C:1}},{t:"Finding ad angles that work",ic:"crown",s:{A:3,C:1}},{t:"Going from idea to live store",ic:"rocket",s:{C:4}}]},
      {q:"Your monthly tool budget?",opts:[{t:"Zero for now",ic:"coins",s:{G:4}},{t:"Under $50",ic:"cog",s:{C:2,S:1,G:1}},{t:"Between $50 and $150",ic:"bolt",s:{C:3,A:1}},{t:"Above $150",ic:"crown",s:{A:2,S:2,C:2}}]},
      {q:"Your main acquisition channel?",opts:[{t:"Facebook and Instagram",ic:"bolt",s:{A:2,C:1}},{t:"TikTok",ic:"rocket",s:{A:2,C:1}},{t:"SEO and organic",ic:"pen",s:{S:2,C:1}},{t:"Not decided yet",ic:"wrench",s:{C:2,G:1}}]}
    ];
    var RESULTS={C:{verdict:"The all-in-one",title:"Copyfy",desc:"You need to <strong>research and launch in one place</strong>. Product database, Facebook and TikTok ads, store analysis and AI store creation on a single subscription. The trial lasts 5 days and asks for no credit card."},
      S:{verdict:"The store tracker",title:"PPSPY, with Koala Inspector alongside",desc:"Your real question is <strong>how much this competitor sells</strong>. A tracker returns its best sellers, theme, apps and a revenue estimate, from $39/mo. The Koala extension stays free for quick checks."},
      A:{verdict:"The ad spy",title:"Minea or Winning Hunter",desc:"You are not missing a product, you are missing <strong>the angle that sells it</strong>. Read run time and estimated spend before like counts. AdSpy if you only run Meta, though it has no TikTok coverage."},
      G:{verdict:"The free stack",title:"Koala Inspector, Dropispy and BigSpy",desc:"At this stage <strong>data is not your problem</strong>, the number of products you tested is. These three cover early research with no card, and the 5-day Copyfy trial shows you the rest."}};
    var idx=0,scores={C:0,S:0,A:0,G:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Question "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["C","S","A","G"][0],max=-1;["C","S","A","G"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={C:0,S:0,A:0,G:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  