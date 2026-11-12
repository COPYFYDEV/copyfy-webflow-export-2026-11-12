
  (function(){
    var root=document.getElementById("copyfyQuizSW");
    if(!root||root.dataset.copyfyInit)return;root.dataset.copyfyInit="1";

    var ICONS={
      bolt:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 2 3 14h9l-1 8 10-12h-9z\"/></svg>",
      building:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"1\"/><path d=\"M9 9h.01M15 9h.01M9 13h.01M15 13h.01M10 21v-4h4v4\"/></svg>",
      card:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"/><path d=\"M2 10h20\"/></svg>",
      cash:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"6\" width=\"20\" height=\"12\" rx=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"2.5\"/><path d=\"M6 12h.01M18 12h.01\"/></svg>",
      feather:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.2 5.8a5 5 0 0 0-7 0L5 14v5h5l8.2-8.2a5 5 0 0 0 0-7z\"/><path d=\"M16 8 2 22M17.5 11H9\"/></svg>",
      gem:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 3h12l4 6-10 12L2 9z\"/><path d=\"M11 3 8 9l4 12 4-12-3-6\"/><path d=\"M2 9h20\"/></svg>",
      gift:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\"/><path d=\"M12 8v13M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7\"/><path d=\"M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5\"/></svg>",
      package:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M16.5 9.4 7.5 4.21\"/><path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"/><path d=\"m3.3 7 8.7 5 8.7-5\"/><path d=\"M12 22V12\"/></svg>",
      palette:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2a10 10 0 0 0 0 20 2.5 2.5 0 0 0 2.5-2.5c0-.7-.3-1.3-.7-1.7-.4-.4-.6-1-.6-1.6A2.2 2.2 0 0 1 15.4 14H17a5 5 0 0 0 5-5c0-4-4.5-7-10-7z\"/><circle cx=\"7.5\" cy=\"10.5\" r=\"1\"/><circle cx=\"9.5\" cy=\"6.5\" r=\"1\"/><circle cx=\"14.5\" cy=\"6.5\" r=\"1\"/><circle cx=\"17\" cy=\"10.5\" r=\"1\"/></svg>",
      rocket:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 13c-3 1-3 5-3 5s4 0 5-3M9 15l-3-3c1-5 5-9 12-10 0 7-5 11-10 12z\"/><circle cx=\"14\" cy=\"10\" r=\"1.5\"/></svg>",
      sprout:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 20h10\"/><path d=\"M10 20c5.5-2.5.8-6.4 3-10\"/><path d=\"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z\"/><path d=\"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z\"/></svg>",
      store:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 7l1.5-4h17L22 7\"/><path d=\"M2 7v1a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0V7\"/><path d=\"M4 11v9h16v-9\"/><path d=\"M9 20v-5h6v5\"/></svg>",
      target:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1.5\"/></svg>",
      trend:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 7 13.5 15.5 8.5 10.5 2 17\"/><path d=\"M16 7h6v6\"/></svg>"
    };

    var CHECK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

    var QUESTIONS=[{"q": "Where are you with your store?", "opts": [{"t": "Just starting — First store or product test", "ic": "sprout", "v": "beginner"}, {"t": "Growing — First sales, ready to scale", "ic": "trend", "v": "growing"}, {"t": "Established — $3,000+ monthly revenue", "ic": "rocket", "v": "established"}, {"t": "Premium brand — High-end positioning", "ic": "gem", "v": "luxury"}]}, {"q": "How many products will you sell?", "opts": [{"t": "1 to 5 products — Single-product or quick test", "ic": "target", "v": "single"}, {"t": "10 to 50 products — Small niche catalog", "ic": "package", "v": "small"}, {"t": "50 to 500 products — Structured store", "ic": "store", "v": "medium"}, {"t": "500+ products — Large catalog / marketplace", "ic": "building", "v": "large"}]}, {"q": "What's your theme budget?", "opts": [{"t": "$0 — Free only", "ic": "gift", "v": "free"}, {"t": "~ $300 — Tight but flexible", "ic": "cash", "v": "low"}, {"t": "$300 to $425 — Premium if it's worth it", "ic": "card", "v": "medium"}, {"t": "$425 + — I want the best", "ic": "gem", "v": "high"}]}, {"q": "What's your number one priority?", "opts": [{"t": "Speed & SEO — Top Core Web Vitals", "ic": "bolt", "v": "speed"}, {"t": "Conversion — Upsell, urgency, bundles", "ic": "target", "v": "conversion"}, {"t": "Premium design — High-end look and feel", "ic": "palette", "v": "design"}, {"t": "Simplicity — Quick launch, no hassle", "ic": "feather", "v": "simplicity"}]}];

    var THEMES={"impulse": {"name": "Impulse", "tag": "The all-rounder", "tagline": "The most versatile theme on the market, built to convert.", "price": "$425", "speed": "< 1.3 s", "score": "92", "desc": "Impulse handles a 500-SKU fashion store as easily as a curated lifestyle shop. Visual mega menus, native timers, color swatches and advanced filtering: no need for extra apps.", "features": ["Full Shopify 2.0, customizable sections everywhere", "Native promo banners and countdown timers", "Advanced filters, color swatches, quick view", "Multiple presets to personalize"]}, "prestige": {"name": "Prestige", "tag": "Premium elegance", "tagline": "The theme designed for high-end brands.", "price": "$425", "speed": "< 1.4 s", "score": "90", "desc": "Prestige is built for stores selling at premium price points. Jewelry, designer furniture, beauty, luxury fashion: visual storytelling feels luxurious without effort.", "features": ["Premium look out of the box", "Built-in storytelling sections", "Product zoom and video gallery", "Clean code and fast loading"]}, "dawn": {"name": "Dawn", "tag": "Best free theme", "tagline": "Shopify's default theme, brutally efficient.", "price": "Free", "speed": "< 1.1 s", "score": "95", "desc": "Dawn is Shopify's reference theme and one of the fastest on the market. Before spending $425 elsewhere, try it: for a single-product shop or a quick test, it's more than enough.", "features": ["100% free, no upfront investment", "Lighthouse mobile score around 95", "Regular updates from Shopify", "Fast setup and customization"]}, "horizon": {"name": "Horizon", "tag": "AI-friendly free", "tagline": "The free AI-powered theme to launch fast.", "price": "Free", "speed": "Fast", "score": "90+", "desc": "Horizon natively integrates AI blocks to generate custom sections quickly. For a beginner who wants a clean store without touching design tools, it\\'s an excellent starting point.", "features": ["Free with AI-generated sections", "Fast loading on mobile", "Super-easy setup, zero design skills needed", "Clean Dawn-like code"]}, "impact": {"name": "Impact", "tag": "The scaling machine", "tagline": "The ultra-fast theme for stores ramping up.", "price": "$400", "speed": "< 1.0 s", "score": "95+", "desc": "Impact is the theme you pick at 100,000 visits per month, when every tenth of a second matters. It replaces 4 or 5 paid app subscriptions: upsell, bundles, cross-sell, native timers.", "features": ["Best-in-class loading speed", "Native upsell, bundles, urgency and timers", "Highly customizable visual builder", "Built to scale traffic"]}, "expanse": {"name": "Expanse", "tag": "King of large catalogs", "tagline": "The theme designed for stores with 500+ SKUs.", "price": "$380", "speed": "Optimized", "score": "88", "desc": "Selling more than 1,000 SKUs (electronics, accessories, food)? Expanse handles massive inventories smoothly. Multi-level navigation, advanced filtering, infinite scroll.", "features": ["Optimized for massive catalogs", "Advanced product filtering and sorting", "Smooth mega menu with 50+ collections", "Infinite scroll and nested collections"]}, "turbo": {"name": "Turbo", "tag": "Pure speed", "tagline": "The fastest theme on the Shopify Theme Store.", "price": "$425", "speed": "< 1.1 s", "score": "95+", "desc": "Turbo brands itself as the fastest theme on the Shopify Theme Store, and the numbers back it up. If your marketing leans on Google more than Instagram, this is your theme.", "features": ["Outstanding speed score on desktop & mobile", "Minimalist code, very little JavaScript", "Optimized font loading", "Built for technical SEO"]}, "booster": {"name": "Booster", "tag": "Dropshipping specialist", "tagline": "Conversion-focused third-party theme, use with care.", "price": "$297", "speed": "Solid", "score": "85", "desc": "Booster ships with every dropshipping effect: timers, urgency popups, stock badges, social proof. Use with care, as some effects push the limits of Shopify policy.", "features": ["Plug-and-play dropshipping effects", "App savings (urgency, upsell, social proof)", "Frequent updates", "Lifetime license at $297"]}, "shrine": {"name": "Shrine", "tag": "The conversion king", "tagline": "The dropshippers favorite paid theme for converting.", "price": "$149", "speed": "Fast", "score": "90+", "desc": "Shrine includes native upsells, cross-sells, bundles and quantity breaks to maximize average order value without stacking apps. From one-product to 7-figure brands, it is the conversion-focused dropshipping reference.", "features": ["Native upsells, cross-sells and bundles", "Quantity breaks, sticky add-to-cart", "Built-in countdowns and trust badges", "Deep customization, $149 lifetime"]}};

    // Logique de recommandation : portée VERBATIM de l'ancien quiz (combinatoire)
    function getRecommendation(a){
        if (a[1] === 'luxury') return 'prestige';

        if (a[1] === 'beginner') {
          if (a[3] === 'free') {
            return a[4] === 'design' ? 'horizon' : 'dawn';
          }
          if (a[2] === 'single') return 'dawn';
          return a[3] === 'low' ? 'booster' : 'dawn';
        }

        if (a[1] === 'established') {
          if (a[2] === 'large') return 'expanse';
          if (a[4] === 'speed') return 'turbo';
          if (a[4] === 'conversion') return a[3] === 'free' ? 'impact' : 'shrine';
          if (a[4] === 'design') return 'prestige';
          return 'impulse';
        }

        if (a[1] === 'growing') {
          if (a[2] === 'large') return 'expanse';
          if (a[4] === 'speed') return 'turbo';
          if (a[4] === 'conversion') {
            return a[3] === 'free' ? 'impact' : 'shrine';
          }
          if (a[4] === 'simplicity' && a[3] === 'free') return 'dawn';
          if (a[4] === 'design') return 'prestige';
          return 'impulse';
        }

        return 'impulse';
    }

    var idx=0,answers={};
    var stage=document.getElementById("copyfyQuizStage");
    var resultEl=document.getElementById("copyfyQuizResult");
    var qEl=document.getElementById("copyfyQuizQuestion");
    var optsEl=document.getElementById("copyfyQuizOptions");
    var badgeEl=document.getElementById("copyfyQuizBadge");
    var fillEl=document.getElementById("copyfyQuizFill");
    var backEl=document.getElementById("copyfyQuizBack");

    function render(){
      var item=QUESTIONS[idx];
      badgeEl.textContent=(idx+1)+" / "+QUESTIONS.length;
      fillEl.style.width=Math.round((idx/QUESTIONS.length)*100)+"%";
      qEl.textContent=item.q;
      if(idx>0){backEl.className="copyfy-quiz-back";}else{backEl.className="copyfy-quiz-back copyfy-hidden";}
      optsEl.innerHTML="";
      item.opts.forEach(function(o){
        var btn=document.createElement("button");
        btn.type="button";btn.className="copyfy-quiz-opt";
        btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';
        btn.addEventListener("click",function(){
          answers[idx+1]=o.v;
          idx++;
          if(idx<QUESTIONS.length){render();}else{showResult();}
        });
        optsEl.appendChild(btn);
      });
    }

    function showResult(){
      fillEl.style.width="100%";
      var key=getRecommendation(answers);
      var r=THEMES[key];
      document.getElementById("copyfyQuizRVerdict").textContent=r.tag;
      document.getElementById("copyfyQuizRTitle").textContent=r.name;
      document.getElementById("copyfyQuizRTagline").textContent=r.tagline;
      document.getElementById("copyfyQuizStatPrice").textContent=r.price;
      document.getElementById("copyfyQuizStatSpeed").innerHTML=r.speed;
      document.getElementById("copyfyQuizStatScore").textContent=r.score;
      document.getElementById("copyfyQuizRDesc").textContent=r.desc;
      var fe=document.getElementById("copyfyQuizFeats");
      fe.innerHTML="";
      r.features.forEach(function(f){
        var li=document.createElement("li");
        li.innerHTML=CHECK+'<span>'+f+'</span>';
        fe.appendChild(li);
      });
      stage.style.display="none";
      resultEl.className="copyfy-quiz-result copyfy-active";
    }

    backEl.addEventListener("click",function(){
      if(idx>0){idx--;delete answers[idx+1];render();}
    });

    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){
      idx=0;answers={};
      resultEl.className="copyfy-quiz-result";
      stage.style.display="block";
      render();
    });

    render();
  })();
  