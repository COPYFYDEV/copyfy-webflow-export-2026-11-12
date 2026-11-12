
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
      {q:"Where are you with your store?",opts:[{t:"Not launched, I’m looking for a product",ic:"pen",s:{C:4}},{t:"Launched, looking for my first winner",ic:"cart",s:{C:3}},{t:"Already selling, I want to scale",ic:"rocket",s:{A:1,S:1,C:1}}]},
      {q:"Where do you advertise?",opts:[{t:"Meta (Facebook and Instagram)",ic:"bolt",s:{C:2}},{t:"TikTok",ic:"rocket",s:{C:3}},{t:"Native ads with advertorials",ic:"layers",s:{A:4}},{t:"Google, YouTube or Reddit",ic:"layers",s:{S:4}}]},
      {q:"What do you need to see first?",opts:[{t:"Products that already sell",ic:"crown",s:{C:3}},{t:"Competitor stores and their ads",ic:"cart",s:{C:3}},{t:"The lander and offer behind an ad",ic:"wrench",s:{A:3}},{t:"Ads on as many platforms as possible",ic:"layers",s:{S:3}}]},
      {q:"What can the tool cost each month?",opts:[{t:"Less than $100",ic:"coins",s:{C:2}},{t:"Between $100 and $250",ic:"cog",s:{A:1,C:1}},{t:"$250 or more",ic:"crown",s:{A:2,S:2}}]}
    ];
    var RESULTS={A:{verdict:"Brand on native traffic",title:"AdPlexity Native can pay off",desc:"You run advertorials on native networks. AdPlexity shows the lander, the offer and the redirect chain behind each ad, <strong>across Taboola, Outbrain and MGID<\/strong>. The Native module costs $249 a month with no free trial, so book the demo first. For product research and competitor store analysis, Copyfy covers what AdPlexity leaves out."},
      S:{verdict:"Ads beyond Meta",title:"Look at PowerAdSpy",desc:"Your ads run on Google, YouTube or Reddit, where AdPlexity has no module. PowerAdSpy covers them on its upper plans: Google and YouTube from $279 a month, Reddit from $399. <strong>Choose by channel<\/strong>, not by database size. For Meta and TikTok ads tied to winning products, Copyfy adds store analysis."},
      C:{verdict:"Shopify seller",title:"Copyfy fits you better",desc:"AdPlexity shows no store revenue and no product data. Copyfy connects <strong>winning products, competitor stores and their active ads<\/strong>, with Meta and TikTok ads and an AI store builder. Plans start at $49 a month and the 3-day trial needs no credit card."}};
    var idx=0,scores={A:0,S:0,C:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Question "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round((idx/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic" aria-hidden="true">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["A", "S", "C"][0],max=-1;["A", "S", "C"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={A:0,S:0,C:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  