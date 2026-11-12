
  (function(){
    var root=document.getElementById("copyfyQuizSW");
    if(!root||root.dataset.copyfyInit)return;root.dataset.copyfyInit="1";

    var ICONS={
      banknote:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"6\" width=\"20\" height=\"12\" rx=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"2.5\"/><path d=\"M6 12h.01M18 12h.01\"/></svg>",
      barchart:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"10\"/><line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"4\"/><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\"/></svg>",
      bolt:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 2 3 14h9l-1 8 10-12h-9z\"/></svg>",
      clapper:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 8h18v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z\"/><path d=\"M3 8 5.5 3l4 1L7 9M9.5 4 13 5 10.5 10M14 5l3.5 1L15 11\"/></svg>",
      clock:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/></svg>",
      coins:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"8\" cy=\"8\" r=\"6\"/><path d=\"M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82\"/></svg>",
      flame:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\"/></svg>",
      gem:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 3h12l4 6-10 12L2 9z\"/><path d=\"M11 3 8 9l4 12 4-12-3-6M2 9h20\"/></svg>",
      ghost:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z\"/></svg>",
      landmark:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"3\" y1=\"22\" x2=\"21\" y2=\"22\"/><line x1=\"6\" y1=\"18\" x2=\"6\" y2=\"11\"/><line x1=\"10\" y1=\"18\" x2=\"10\" y2=\"11\"/><line x1=\"14\" y1=\"18\" x2=\"14\" y2=\"11\"/><line x1=\"18\" y1=\"18\" x2=\"18\" y2=\"11\"/><polygon points=\"12 2 20 7 4 7\"/></svg>",
      laptop:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"12\" rx=\"2\"/><line x1=\"2\" y1=\"20\" x2=\"22\" y2=\"20\"/></svg>",
      link:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></svg>",
      palette:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"13.5\" cy=\"6.5\" r=\"1.5\"/><circle cx=\"17.5\" cy=\"10.5\" r=\"1.5\"/><circle cx=\"8.5\" cy=\"7.5\" r=\"1.5\"/><circle cx=\"6.5\" cy=\"12.5\" r=\"1.5\"/><path d=\"M12 2a10 10 0 0 0 0 20c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z\"/></svg>",
      palm:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 8c0-3 2.5-5 5.5-5 1.5 0 2.5 1 2.5 1M13 8c0-3-2.5-5-5.5-5C6 3 5 4 5 4M13 8c2.5-1.5 5-1 6.5.5M13 8c-2.5-1.5-5-1-6.5.5M13 8c1 .5 2 2 2 4M13 8c-1 .5-2 2-2 4M12 12c0 5 0 9 0 9\"/></svg>",
      rocket:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 13c-3 1-3 5-3 5s4 0 5-3M9 15l-3-3c1-5 5-9 12-10 0 7-5 11-10 12z\"/><circle cx=\"14\" cy=\"10\" r=\"1.5\"/></svg>",
      shrug:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg>",
      sprout:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 20h10\"/><path d=\"M12 20v-9\"/><path d=\"M12 11C12 7 9 4 4 4c0 5 3 7 8 7z\"/><path d=\"M12 11c0-3 2-5 6-5 0 4-3 5-6 5z\"/></svg>",
      timer:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"10\" y1=\"2\" x2=\"14\" y2=\"2\"/><line x1=\"12\" y1=\"14\" x2=\"15\" y2=\"11\"/><circle cx=\"12\" cy=\"14\" r=\"8\"/></svg>",
      trendup:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"22 7 13.5 15.5 8.5 10.5 2 17\"/><polyline points=\"16 7 22 7 22 13\"/></svg>",
      trophy:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 9a6 6 0 0 0 12 0V4H6z\"/><path d=\"M6 4H3v2a3 3 0 0 0 3 3M18 4h3v2a3 3 0 0 1-3 3M9 21h6M12 15v6\"/></svg>",
      wallet:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2\"/><path d=\"M21 12a2 2 0 0 0-2-2h-4a2 2 0 0 0 0 4h4a2 2 0 0 0 2-2z\"/></svg>",
      wrench:"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2z\"/></svg>"
    };

    var QWORD="Question";

    // Questions : auto-advance ; chaque reponse enregistre sa value (q1..q5) pour le calcul combinatoire d'origine.
    var QUESTIONS=[
      {q:"What's your starting capital?",sub:"The money you can lose without crying",
       opts:[
         {t:"$0 — starting from zero",ic:"wallet",v:"0"},
         {t:"Less than $1,000",ic:"banknote",v:"1"},
         {t:"$1,000 to $3,000",ic:"coins",v:"2"},
         {t:"$3,000 and above",ic:"landmark",v:"3"}
       ]},
      {q:"How much time can you commit?",sub:"Be honest, not optimistic",
       opts:[
         {t:"5h/week max",ic:"timer",v:"0"},
         {t:"10 to 20h/week",ic:"clock",v:"1"},
         {t:"20 to 40h/week",ic:"bolt",v:"2"},
         {t:"Full-time, I'm all in",ic:"flame",v:"3"}
       ]},
      {q:"What's your main strength?",sub:"The one you can build on",
       opts:[
         {t:"Creative (design, content, video)",ic:"palette",v:"creative"},
         {t:"Technical (code, dev)",ic:"laptop",v:"tech"},
         {t:"Marketing / sales",ic:"trendup",v:"marketing"},
         {t:"None, I'm a total beginner",ic:"shrug",v:"none"}
       ]},
      {q:"Do you already have an online audience?",sub:"TikTok, YouTube, newsletter, community…",
       opts:[
         {t:"Yes, more than 10K followers",ic:"rocket",v:"big"},
         {t:"A small one, still growing",ic:"sprout",v:"small"},
         {t:"No, zero audience",ic:"ghost",v:"none"},
         {t:"No, but I'm ready to create content",ic:"clapper",v:"willing"}
       ]},
      {q:"What's your main goal?",sub:"What you really want to achieve",
       opts:[
         {t:"Fast cash (3-6 months)",ic:"bolt",v:"cash"},
         {t:"Build a real brand",ic:"trophy",v:"brand"},
         {t:"Long-term passive income",ic:"palm",v:"passive"},
         {t:"Scale a big machine",ic:"barchart",v:"scale"}
       ]}
    ];

    // Resultats : meme contenu que l'ancien quiz (verbatim). Icone Lucide a la place de l'emoji legacy.
    var RESULTS={
      private_label:{ic:"trophy",title:"Private Label",desc:"You have the profile to build a real brand. You take an existing product, improve it, brand it, and sell it at a 5x markup. It's the model behind 90% of 7-figure Shopify stores. It takes capital and patience, but that's where the real long-term cash is.",margin:"20-35%",time:"3-6 months",capital:"$3,000+"},
      dropshipping:{ic:"bolt",title:"Modern dropshipping",desc:"You want fast cash and you're willing to test a lot. Dropshipping still works, but not like before: you have to spot products already validated by competitors, source a better version, and outposition the existing sellers. Expect to test 10-30 products before finding a winner.",margin:"15-25%",time:"1-3 months",capital:"$1,500-3,000"},
      pod:{ic:"palette",title:"Print on Demand",desc:"Your creative side is your edge. No stock, no risk: you upload designs, the supplier prints on demand. Tighter margins (30-50%) but zero inventory. The secret: target an ultra-specific niche where your designs resonate (e.g. for math teachers, cafe racers, etc.) instead of going generic.",margin:"30-50%",time:"2-4 months",capital:"$0-500"},
      digital:{ic:"gem",title:"Digital products",desc:"Margins of 95%+, infinitely scalable, no logistics. Notion templates, Lightroom presets, Excel calculators, courses\u2026 You produce once, you sell a thousand times. The only real obstacle: you need an audience or an acquisition channel that converts. That's exactly your case.",margin:"90-95%",time:"2-6 months",capital:"$0-300"},
      affiliate:{ic:"link",title:"Shopify Partner Program",desc:"No product to manage, no support tickets. You create content (YouTube, blog, TikTok) and earn a commission on every merchant you refer to Shopify. It's slow (6-12 months for results) but it compounds over time. Ideal as a complement if you already create content about the ecom ecosystem.",margin:"100%",time:"6-12 months",capital:"$0"},
      apps:{ic:"wrench",title:"Shopify Apps & Themes",desc:"The royal road for tech profiles. The Shopify App Store holds 6,000+ apps and each merchant spends $40-90/month on apps. A useful app priced at $5-30/month can reach $20,000+ MRR in a year. The barrier to entry is high (real dev skills required) but it's the most defensible model.",margin:"80-90%",time:"6-12 months",capital:"$500-2,000"}
    };

    var idx=0,answers={};
    var stage=document.getElementById("copyfyQuizStage");
    var resultEl=document.getElementById("copyfyQuizResult");
    var qEl=document.getElementById("copyfyQuizQuestion");
    var subEl=document.getElementById("copyfyQuizSubtitle");
    var optsEl=document.getElementById("copyfyQuizOptions");
    var badgeEl=document.getElementById("copyfyQuizBadge");
    var fillEl=document.getElementById("copyfyQuizFill");

    function render(){
      var item=QUESTIONS[idx];
      badgeEl.textContent=QWORD+" "+(idx+1)+" / "+QUESTIONS.length;
      fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";
      qEl.textContent=item.q;
      subEl.textContent=item.sub;
      optsEl.innerHTML="";
      item.opts.forEach(function(o){
        var btn=document.createElement("button");
        btn.type="button";btn.className="copyfy-quiz-opt";
        btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';
        btn.addEventListener("click",function(){
          answers["q"+(idx+1)]=o.v;
          idx++;
          if(idx<QUESTIONS.length){render();}else{showResult();}
        });
        optsEl.appendChild(btn);
      });
    }

    // ===== Logique de resultat PORTEE A L'IDENTIQUE depuis l'ancien quiz =====
    function computeResult(){
      var capital = parseInt(answers.q1 || 0);
      var time = parseInt(answers.q2 || 0);
      var skill = answers.q3 || 'none';
      var audience = answers.q4 || 'none';
      var goal = answers.q5 || 'cash';

      var scores = {
        private_label: 0,
        dropshipping: 0,
        pod: 0,
        digital: 0,
        affiliate: 0,
        apps: 0
      };

      // Capital
      if (capital >= 3) { scores.private_label += 3; scores.dropshipping += 2; }
      if (capital === 2) { scores.dropshipping += 3; scores.private_label += 1; }
      if (capital <= 1) { scores.pod += 2; scores.digital += 2; scores.affiliate += 3; }
      if (capital === 0) { scores.affiliate += 2; scores.pod += 1; }

      // Time
      if (time >= 2) { scores.private_label += 2; scores.dropshipping += 2; scores.apps += 2; }
      if (time <= 1) { scores.affiliate += 2; scores.pod += 1; scores.digital += 1; }

      // Skill
      if (skill === 'creative') { scores.pod += 3; scores.digital += 2; }
      if (skill === 'tech') { scores.apps += 4; scores.digital += 1; }
      if (skill === 'marketing') { scores.dropshipping += 3; scores.private_label += 2; scores.affiliate += 2; }
      if (skill === 'none') { scores.dropshipping += 1; scores.affiliate += 1; }

      // Audience
      if (audience === 'big') { scores.digital += 4; scores.affiliate += 3; scores.pod += 2; }
      if (audience === 'small') { scores.digital += 2; scores.pod += 2; scores.affiliate += 2; }
      if (audience === 'willing') { scores.pod += 2; scores.digital += 1; scores.affiliate += 1; }
      if (audience === 'none') { scores.dropshipping += 2; scores.private_label += 1; }

      // Goal
      if (goal === 'cash') { scores.dropshipping += 3; }
      if (goal === 'brand') { scores.private_label += 4; }
      if (goal === 'passive') { scores.digital += 3; scores.affiliate += 3; scores.apps += 2; }
      if (goal === 'scale') { scores.private_label += 3; scores.apps += 2; scores.dropshipping += 1; }

      // Find winner
      var winner = 'dropshipping';
      var max = 0;
      for (var key in scores) {
        if (scores[key] > max) { max = scores[key]; winner = key; }
      }
      return winner;
    }

    function showResult(){
      fillEl.style.width="100%";
      var winner=computeResult();
      var r=RESULTS[winner];
      document.getElementById("copyfyQuizRIcon").innerHTML=ICONS[r.ic]||"";
      document.getElementById("copyfyQuizRTitle").textContent=r.title;
      document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;
      document.getElementById("copyfyQuizRMargin").textContent=r.margin;
      document.getElementById("copyfyQuizRTime").textContent=r.time;
      document.getElementById("copyfyQuizRCapital").textContent=r.capital;
      stage.style.display="none";
      resultEl.className="copyfy-quiz-result copyfy-active";
    }

    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){
      idx=0;answers={};
      resultEl.className="copyfy-quiz-result";
      stage.style.display="block";
      render();
    });

    render();
  })();
  