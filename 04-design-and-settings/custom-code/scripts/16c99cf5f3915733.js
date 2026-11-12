
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

    var QUESTIONS=[{"q": "Waar sta je met je winkel?", "opts": [{"t": "Net begonnen — Eerste winkel of producttest", "ic": "sprout", "v": "beginner"}, {"t": "In groei — Eerste verkopen, klaar om op te schalen", "ic": "trend", "v": "growing"}, {"t": "Gevestigd — $3.000+ maandomzet", "ic": "rocket", "v": "established"}, {"t": "Premium merk — High-end positionering", "ic": "gem", "v": "luxury"}]}, {"q": "Hoeveel producten ga je verkopen?", "opts": [{"t": "1 tot 5 producten — Mono-product of snelle test", "ic": "target", "v": "single"}, {"t": "10 tot 50 producten — Kleine niche-catalogus", "ic": "package", "v": "small"}, {"t": "50 tot 500 producten — Gestructureerde winkel", "ic": "store", "v": "medium"}, {"t": "500+ producten — Grote catalogus / marketplace", "ic": "building", "v": "large"}]}, {"q": "Wat is je themabudget?", "opts": [{"t": "$0 — Alleen gratis", "ic": "gift", "v": "free"}, {"t": "~ $300 — Krap maar flexibel", "ic": "cash", "v": "low"}, {"t": "$300 tot $425 — Premium als het de moeite waard is", "ic": "card", "v": "medium"}, {"t": "$425 + — Ik wil het beste", "ic": "gem", "v": "high"}]}, {"q": "Wat is je nummer één prioriteit?", "opts": [{"t": "Snelheid & SEO — Top Core Web Vitals", "ic": "bolt", "v": "speed"}, {"t": "Conversie — Upsell, urgentie, bundles", "ic": "target", "v": "conversion"}, {"t": "Premium design — High-end look and feel", "ic": "palette", "v": "design"}, {"t": "Eenvoud — Snelle launch, geen gedoe", "ic": "feather", "v": "simplicity"}]}];

    var THEMES={"impulse": {"name": "Impulse", "tag": "De allrounder", "tagline": "Het meest veelzijdige thema op de markt, gebouwd om te converteren.", "price": "$425", "speed": "&lt; 1,3 s", "score": "92", "desc": "Impulse verwerkt een 500-SKU mode-winkel net zo makkelijk als een gecureerde lifestyle shop. Visuele megamenu\\'s, native timers, color swatches en geavanceerd filteren: geen extra apps nodig.", "features": ["Volledige Shopify 2.0, overal aanpasbare secties", "Native promobanners en countdown timers", "Geavanceerde filters, color swatches, snelle weergave", "Meerdere presets om te personaliseren"]}, "prestige": {"name": "Prestige", "tag": "Premium elegantie", "tagline": "Het thema ontworpen voor high-end merken.", "price": "$425", "speed": "&lt; 1,4 s", "score": "90", "desc": "Prestige is gebouwd voor winkels die op premium prijspunten verkopen. Sieraden, designermeubelen, beauty, luxemode: visueel storytelling voelt luxueus zonder moeite.", "features": ["Premium uitstraling out of the box", "Ingebouwde storytelling-secties", "Productzoom en videogalerij", "Schone code en snelle laadtijd"]}, "dawn": {"name": "Dawn", "tag": "Beste gratis thema", "tagline": "Shopify's standaardthema, brutaal efficiënt.", "price": "Gratis", "speed": "&lt; 1,1 s", "score": "95", "desc": "Dawn is het referentiethema van Shopify en een van de snelste op de markt. Voordat je elders $425 uitgeeft, probeer het: voor een one-product-shop of een snelle test is het ruim voldoende.", "features": ["100% gratis, geen initiële investering", "Lighthouse mobiele score rond 95", "Regelmatige updates van Shopify", "Snelle setup en customizatie"]}, "horizon": {"name": "Horizon", "tag": "AI-vriendelijk gratis", "tagline": "Het gratis AI-aangedreven thema om snel te lanceren.", "price": "Gratis", "speed": "Snel", "score": "90+", "desc": "Horizon integreert native AI-blokken om snel custom secties te genereren. Voor een beginner die een schone winkel wil zonder design-tools aan te raken, een uitstekend vertrekpunt.", "features": ["Gratis met AI-gegenereerde secties", "Snelle laadtijd op mobiel", "Super-makkelijke setup, nul design-skills nodig", "Schone Dawn-achtige code"]}, "impact": {"name": "Impact", "tag": "De opschaalmachine", "tagline": "Het ultrasnelle thema voor winkels die opschalen.", "price": "$400", "speed": "&lt; 1,0 s", "score": "95+", "desc": "Impact is het thema dat je kiest bij 100.000 bezoeken per maand, wanneer elke tiende seconde telt. Het vervangt 4 of 5 betaalde app-abonnementen: upsell, bundles, cross-sell, native timers.", "features": ["Best-in-class laadsnelheid", "Native upsell, bundles, urgentie en timers", "Zeer aanpasbare visuele builder", "Gebouwd om verkeer op te schalen"]}, "expanse": {"name": "Expanse", "tag": "Koning van grote catalogi", "tagline": "Het thema ontworpen voor winkels met 500+ SKU\\'s.", "price": "$380", "speed": "Geoptimaliseerd", "score": "88", "desc": "Verkoop je meer dan 1.000 SKU\\'s (elektronica, accessoires, voeding)? Expanse verwerkt massale voorraden soepel. Multi-level navigatie, geavanceerd filteren, oneindig scrollen.", "features": ["Geoptimaliseerd voor massale catalogi", "Geavanceerd productfilteren en sorteren", "Soepel megamenu met 50+ collecties", "Oneindig scrollen en geneste collecties"]}, "turbo": {"name": "Turbo", "tag": "Pure snelheid", "tagline": "Het snelste thema in de Shopify Theme Store.", "price": "$425", "speed": "&lt; 1,1 s", "score": "95+", "desc": "Turbo profileert zichzelf als het snelste thema in de Shopify Theme Store, en de cijfers staven het. Als je marketing meer leunt op Google dan Instagram, dan is dit jouw thema.", "features": ["Uitstekende snelheidsscore op desktop & mobiel", "Minimalistische code, weinig JavaScript", "Geoptimaliseerde font loading", "Gebouwd voor technische SEO"]}, "booster": {"name": "Booster", "tag": "Dropshipping-specialist", "tagline": "Conversiegericht third-party thema, met zorg gebruiken.", "price": "$297", "speed": "Solide", "score": "85", "desc": "Booster komt met elk dropshipping-effect: timers, urgency popups, voorraadbadges, social proof. Gebruik met zorg, omdat sommige effecten de limieten van Shopify-beleid opzoeken.", "features": ["Plug-and-play dropshipping-effecten", "App-besparingen (urgentie, upsell, social proof)", "Frequente updates", "Lifetime licentie voor $297"]}, "shrine": {"name": "Shrine", "tag": "De conversiekoning", "tagline": "Het favoriete betaalde thema van dropshippers om te converteren.", "price": "$149", "speed": "Snel", "score": "90+", "desc": "Shrine bevat native upsells, cross-sells, bundels en staffelkortingen om de gemiddelde orderwaarde te maximaliseren zonder apps te stapelen. Van mono-product tot merken met 7 cijfers, de conversiegerichte dropshipping-referentie.", "features": ["Native upsells, cross-sells en bundels", "Staffelkortingen, sticky add-to-cart", "Ingebouwde countdowns en trust-badges", "Diepe aanpassing, $149 levenslang"]}};

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
  