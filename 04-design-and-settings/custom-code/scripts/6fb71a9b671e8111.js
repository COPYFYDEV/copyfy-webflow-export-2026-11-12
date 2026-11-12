
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
      {q:"With Thieve, where are you really at?",opts:[{t:"I pin without ever launching",ic:"pen",s:{C:2}},{t:"My finds just don't sell",ic:"cart",s:{C:2}},{t:"I collect pretty product finds",ic:"pen",s:{X:2}},{t:"I'm automating my sourcing",ic:"cog",s:{S:2}}]},
      {q:"Beyond pretty finds, what do you need?",opts:[{t:"To sell, not just to pin",ic:"rocket",s:{C:2}},{t:"A curated aesthetic selection",ic:"pen",s:{X:2}},{t:"Sourcing to store in one go",ic:"wrench",s:{C:2}},{t:"Automated product research",ic:"layers",s:{S:2}}]},
      {q:"On monthly budget, how are you?",opts:[{t:"Thieve's free tier suits me",ic:"coins",s:{X:2}},{t:"~€40 to start selling",ic:"cog",s:{C:2}},{t:"Price aside, I want it all",ic:"crown",s:{C:2}}]},
      {q:"Six months on, what did your finds become?",opts:[{t:"My first sale, banked",ic:"rocket",s:{C:2}},{t:"A top product mood board",ic:"crown",s:{X:2}},{t:"All my sourcing automated",ic:"cog",s:{S:2}},{t:"Pins turned into real sales",ic:"bolt",s:{C:2}}]}
    ];
    var RESULTS={C:{verdict:"The all-in-one",title:"Copyfy is made for you 🏆",desc:"You don't just want to collect product ideas, you want to <strong>take action</strong>. Copyfy brings a database of validated winning products, Facebook and TikTok ad spy and a 5-minute AI store builder under one roof. Where Thieve stops at the selection, Copyfy takes you <strong>all the way to a store that sells</strong>, without juggling three subscriptions."},
      X:{verdict:"The curated picks",title:"Thieve might be enough",desc:"Your thing is <strong>product scouting</strong>: browsing a curated selection of AliExpress ideas, spotting trends, nothing more. With its free plan, Thieve does the job on that specific ground. Just keep in mind that <strong>Copyfy covers that product research and adds ad spy and the store</strong> for the day you actually want to launch."},
      S:{verdict:"Automated research",title:"Sell The Trend for you",desc:"What you want above all is <strong>data volume and automation</strong> to feed your product research. Sell The Trend and its huge catalog tick that box. That said, if you want that same volume <strong>plus ad spy and an AI store builder</strong> in a single platform, Copyfy will save you a ton of time."}};
    var idx=0,scores={C:0,X:0,S:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Question "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["C","X","S"][0],max=-1;["C","X","S"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={C:0,X:0,S:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  