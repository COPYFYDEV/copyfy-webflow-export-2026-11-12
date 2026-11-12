
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
      {q:"What budget can you put into your training?",opts:[{t:"Under $500, I want to keep cash to test",ic:"coins",s:{A:2}},{t:"Between $500 and $2,000",ic:"coins",s:{A:2}},{t:"Over $2,000, I want to invest big",ic:"crown",s:{B:3}},{t:"$0, I have nothing to spend",ic:"cart",s:{C:2}}]},
      {q:"How do you learn best?",opts:[{t:"By taking action right away",ic:"bolt",s:{A:2}},{t:"With tools that do the work for me",ic:"cog",s:{A:2}},{t:"With a mentor coaching me 1-on-1",ic:"crown",s:{B:3}},{t:"By digging through free videos at my own pace",ic:"pen",s:{C:2}}]},
      {q:"What do you need most?",opts:[{t:"Course, tools and coaching in one place",ic:"layers",s:{A:3}},{t:"A clear, step-by-step method",ic:"pen",s:{A:2}},{t:"Premium, ultra-personalized support",ic:"crown",s:{B:3}},{t:"Just enough to get started for free",ic:"cart",s:{C:2}}]},
      {q:"When do you want to launch your store?",opts:[{t:"This week, I want results fast",ic:"rocket",s:{A:2}},{t:"This month",ic:"clock",s:{A:2}},{t:"When I feel ready, no matter how long",ic:"clock",s:{A:1,B:2}},{t:"No rush, I’m just exploring for now",ic:"clock",s:{C:2}}]},
      {q:"Where are you today?",opts:[{t:"Total beginner, starting from scratch",ic:"bolt",s:{A:2}},{t:"I have some basics",ic:"layers",s:{A:2}},{t:"I already have a store and want to scale",ic:"crown",s:{A:1,B:2}},{t:"I’m just testing out of curiosity",ic:"pen",s:{C:2}}]}
    ];
    var RESULTS={A:{verdict:"Your match: Copyfy",title:"The all-in-one ecosystem at $29/month",desc:"You want to move fast without blowing your budget. Copyfy bundles <strong>training, tools and live coaching</strong> in one place, and you take action in 7 days instead of locking $2,000 into a fixed course. It’s the best results-to-price ratio to get started."},
      B:{verdict:"Your match: a premium course",title:"You’re after high-end support",desc:"A premium course with a mentor can fit you. But before you lock in over $2,000, look at <strong>Copyfy</strong>: training, tools and coaching bundled for a fraction of the price, with real-time market data that fixed courses don’t have."},
      C:{verdict:"Your match: the free route",title:"You want to learn without spending",desc:"Free content exists, but plan for 70 hours of sorting with no support or tools. <strong>Copyfy</strong> saves you that time for $29/month and gives you a structure to actually take action."}};
    var idx=0,scores={A:0,B:0,C:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Question "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["A","B","C"][0],max=-1;["A","B","C"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={A:0,B:0,C:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  