
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

    var QUESTIONS=[{"q": "Wo stehst du mit deinem Shop?", "opts": [{"t": "Gerade erst angefangen — Erster Shop oder Produkttest", "ic": "sprout", "v": "beginner"}, {"t": "Im Wachstum — Erste Verkäufe, bereit zu skalieren", "ic": "trend", "v": "growing"}, {"t": "Etabliert — 3.000 $+ Monatsumsatz", "ic": "rocket", "v": "established"}, {"t": "Premium-Marke — High-End-Positionierung", "ic": "gem", "v": "luxury"}]}, {"q": "Wie viele Produkte wirst du verkaufen?", "opts": [{"t": "1 bis 5 Produkte — Mono-Produkt oder schneller Test", "ic": "target", "v": "single"}, {"t": "10 bis 50 Produkte — Kleiner Nischen-Katalog", "ic": "package", "v": "small"}, {"t": "50 bis 500 Produkte — Strukturierter Shop", "ic": "store", "v": "medium"}, {"t": "500+ Produkte — Großer Katalog / Marketplace", "ic": "building", "v": "large"}]}, {"q": "Wie hoch ist dein Theme-Budget?", "opts": [{"t": "$0 — Nur gratis", "ic": "gift", "v": "free"}, {"t": "~ 300 $ — Knapp aber flexibel", "ic": "cash", "v": "low"}, {"t": "300 $ bis 425 $ — Premium, wenn es sich lohnt", "ic": "card", "v": "medium"}, {"t": "425 $ + — Ich will das Beste", "ic": "gem", "v": "high"}]}, {"q": "Was ist deine Priorität Nummer eins?", "opts": [{"t": "Geschwindigkeit & SEO — Top Core Web Vitals", "ic": "bolt", "v": "speed"}, {"t": "Konversion — Upsell, Urgency, Bundles", "ic": "target", "v": "conversion"}, {"t": "Premium-Design — High-End-Look-and-Feel", "ic": "palette", "v": "design"}, {"t": "Einfachheit — Schneller Launch, kein Stress", "ic": "feather", "v": "simplicity"}]}];

    var THEMES={"impulse": {"name": "Impulse", "tag": "Der Allrounder", "tagline": "Das vielseitigste Theme auf dem Markt, gebaut zum Konvertieren.", "price": "425 $", "speed": "&lt; 1,3 s", "score": "92", "desc": "Impulse bewältigt einen 500-SKU-Mode-Shop genauso einfach wie einen kuratierten Lifestyle-Shop. Visuelle Megamenüs, native Timer, Color Swatches und erweiterte Filterung: keine Extra-Apps nötig.", "features": ["Vollständiges Shopify 2.0, überall anpassbare Sektionen", "Native Promo-Banner und Countdown-Timer", "Erweiterte Filter, Color Swatches, Schnellansicht", "Mehrere Presets zum Personalisieren"]}, "prestige": {"name": "Prestige", "tag": "Premium-Eleganz", "tagline": "Das Theme für High-End-Marken.", "price": "425 $", "speed": "&lt; 1,4 s", "score": "90", "desc": "Prestige ist für Shops gebaut, die zu Premium-Preisen verkaufen. Schmuck, Designermöbel, Beauty, Luxusmode: visuelles Storytelling fühlt sich mühelos luxuriös an.", "features": ["Premium-Look out of the box", "Eingebaute Storytelling-Sektionen", "Produkt-Zoom und Videogalerie", "Sauberer Code und schnelle Ladezeit"]}, "dawn": {"name": "Dawn", "tag": "Bestes kostenloses Theme", "tagline": "Shopifys Standard-Theme, brutal effizient.", "price": "Gratis", "speed": "&lt; 1,1 s", "score": "95", "desc": "Dawn ist das Referenz-Theme von Shopify und eines der schnellsten auf dem Markt. Bevor du anderswo 425 $ ausgibst, probier es: für einen Ein-Produkt-Shop oder einen schnellen Test reicht es mehr als aus.", "features": ["100 % gratis, keine anfängliche Investition", "Lighthouse Mobile Score um 95", "Regelmäßige Updates von Shopify", "Schnelles Setup und Anpassung"]}, "horizon": {"name": "Horizon", "tag": "KI-freundlich gratis", "tagline": "Das kostenlose KI-gestützte Theme zum schnellen Launchen.", "price": "Gratis", "speed": "Schnell", "score": "90+", "desc": "Horizon integriert nativ KI-Blöcke, um schnell custom Sektionen zu generieren. Für einen Anfänger, der einen sauberen Shop ohne Design-Tools will, ein ausgezeichneter Ausgangspunkt.", "features": ["Gratis mit KI-generierten Sektionen", "Schnelle Ladezeit auf Mobile", "Super einfache Einrichtung, null Design-Skills nötig", "Sauberer Dawn-ähnlicher Code"]}, "impact": {"name": "Impact", "tag": "Die Skalierungsmaschine", "tagline": "Das ultraschnelle Theme für Shops, die hochfahren.", "price": "400 $", "speed": "&lt; 1,0 s", "score": "95+", "desc": "Impact ist das Theme, das du bei 100.000 Besuchen pro Monat wählst, wenn jede Zehntelsekunde zählt. Es ersetzt 4 oder 5 kostenpflichtige App-Abos: Upsell, Bundles, Cross-Sell, native Timer.", "features": ["Best-in-class Ladegeschwindigkeit", "Nativer Upsell, Bundles, Urgency und Timer", "Hochgradig anpassbarer visueller Builder", "Gebaut, um Traffic zu skalieren"]}, "expanse": {"name": "Expanse", "tag": "König der großen Kataloge", "tagline": "Das Theme, das für Shops mit 500+ SKUs entworfen wurde.", "price": "380 $", "speed": "Optimiert", "score": "88", "desc": "Verkaufst du mehr als 1.000 SKUs (Elektronik, Zubehör, Lebensmittel)? Expanse bewältigt massive Inventare flüssig. Multi-Level-Navigation, erweiterte Filterung, unendliches Scrollen.", "features": ["Optimiert für massive Kataloge", "Erweiterte Produktfilterung und Sortierung", "Glattes Megamenü mit 50+ Kollektionen", "Unendliches Scrollen und verschachtelte Kollektionen"]}, "turbo": {"name": "Turbo", "tag": "Reine Geschwindigkeit", "tagline": "Das schnellste Theme im Shopify Theme Store.", "price": "425 $", "speed": "&lt; 1,1 s", "score": "95+", "desc": "Turbo positioniert sich als das schnellste Theme im Shopify Theme Store, und die Zahlen bestätigen es. Wenn dein Marketing mehr auf Google als auf Instagram setzt, ist das dein Theme.", "features": ["Herausragender Geschwindigkeits-Score auf Desktop & Mobile", "Minimalistischer Code, sehr wenig JavaScript", "Optimiertes Font Loading", "Gebaut für technisches SEO"]}, "booster": {"name": "Booster", "tag": "Dropshipping-Spezialist", "tagline": "Conversion-orientiertes Drittanbieter-Theme, mit Vorsicht nutzen.", "price": "297 $", "speed": "Solide", "score": "85", "desc": "Booster bringt jeden Dropshipping-Effekt: Timer, Urgency-Popups, Stock-Badges, Social Proof. Mit Vorsicht verwenden, da einige Effekte an die Grenzen der Shopify-Richtlinien gehen.", "features": ["Plug-and-Play-Dropshipping-Effekte", "App-Einsparungen (Urgency, Upsell, Social Proof)", "Häufige Updates", "Lebenslange Lizenz für 297 $"]}, "shrine": {"name": "Shrine", "tag": "Der Conversion-König", "tagline": "Das beliebteste kostenpflichtige Theme der Dropshipper zum Konvertieren.", "price": "$149", "speed": "Schnell", "score": "90+", "desc": "Shrine bietet native Upsells, Cross-Sells, Bundles und Mengenrabatte, um den durchschnittlichen Bestellwert zu maximieren, ohne Apps zu stapeln. Vom Ein-Produkt-Shop bis zur 7-stelligen Marke die conversion-orientierte Dropshipping-Referenz.", "features": ["Native Upsells, Cross-Sells und Bundles", "Mengenrabatte, klebriger Add-to-Cart", "Integrierte Countdowns und Trust-Badges", "Tiefe Anpassung, $149 lebenslang"]}};

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
  