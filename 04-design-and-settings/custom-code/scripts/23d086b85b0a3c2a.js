
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
      {q:"Where's your store right now?",opts:[{t:"Just starting, under $10K MRR",ic:"coins",s:{F:2}},{t:"Scaling fast, well past $10K MRR",ic:"rocket",s:{L:2}},{t:"Established, with a dev team or headless",ic:"cog",s:{E:2}},{t:"Subscribers leave faster than I'd like",ic:"clock",s:{R:2}}]},
      {q:"What matters most in the bill?",opts:[{t:"Zero cost while I validate",ic:"coins",s:{F:2}},{t:"No per-order fee at high volume",ic:"rocket",s:{L:2}},{t:"I'll pay for deep API and integrations",ic:"cog",s:{E:2}},{t:"Whatever cuts churn pays for itself",ic:"crown",s:{R:1,L:1}}]},
      {q:"Your checkout setup?",opts:[{t:"Standard Shopify, keep it simple",ic:"cart",s:{F:1,L:1}},{t:"Shop Pay or headless is non-negotiable",ic:"layers",s:{E:2}},{t:"Native Checkout plus strong retention flows",ic:"wrench",s:{L:1,R:1}}]},
      {q:"Your number one priority this quarter?",opts:[{t:"Launch subscriptions cheaply",ic:"coins",s:{F:2}},{t:"Lower the cost per order at scale",ic:"rocket",s:{L:2}},{t:"Squeeze more LTV from subscribers",ic:"crown",s:{R:2}},{t:"Migrate off a clunky legacy app",ic:"cog",s:{E:2}}]},
      {q:"Your tech comfort and team?",opts:[{t:"Solo, I want turnkey",ic:"rocket",s:{F:1,L:1}},{t:"I have devs for custom work",ic:"cog",s:{E:2}},{t:"Small team running retention experiments",ic:"pen",s:{R:2}}]}
    ];
    var RESULTS={F:{verdict:"Free and lean",title:"Seal or Appstle is your pick",desc:"You want real subscription features <strong>without touching your margins</strong>. Both run on a genuine free plan with 0% transaction fee, so you launch dunning, a customer portal and bundles before paying a cent. The real question isn't the app, it's <strong>whether the product is worth subscribing to</strong> in the first place."},
      L:{verdict:"Built to scale",title:"Loop fits a scaling DTC brand",desc:"At your volume, <strong>no per-order fee</strong> wins on total cost, and Loop's retention tooling funds the ads that bring the next subscriber. You're past validation, so the lever now is <strong>feeding the machine the right product</strong> to keep that recurring revenue compounding."},
      E:{verdict:"Enterprise depth",title:"Recharge or Skio for you",desc:"You need <strong>deep API, headless and Shop Pay</strong>, and you'll pay for the ecosystem that delivers it. These platforms earn their cut through integration depth, not retention magic. With the infrastructure handled, the edge comes from <strong>the product you put on subscription</strong>."},
      R:{verdict:"Retention first",title:"Stay AI is your match",desc:"Your bottleneck is <strong>churn</strong>, and Stay AI is built around AI-driven retention and LTV. The flows hold subscribers longer, but no stack saves a product nobody wants twice. Lock in <strong>a product proven to sell</strong>, then let the retention engine work."}};
    var idx=0,scores={F:0,L:0,E:0,R:0};
    var stage=document.getElementById("copyfyQuizStage");
    var resultEl=document.getElementById("copyfyQuizResult");
    var qEl=document.getElementById("copyfyQuizQuestion");
    var optsEl=document.getElementById("copyfyQuizOptions");
    var badgeEl=document.getElementById("copyfyQuizBadge");
    var fillEl=document.getElementById("copyfyQuizFill");
    function render(){
      var item=QUESTIONS[idx];
      badgeEl.textContent="Question "+(idx+1)+" / "+QUESTIONS.length;
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
  