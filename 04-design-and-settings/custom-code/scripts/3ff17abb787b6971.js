
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

    var QUESTIONS=[{"q": "Où en es-tu avec ta boutique ?", "opts": [{"t": "Je débute — Première boutique ou test produit", "ic": "sprout", "v": "beginner"}, {"t": "En croissance — Premières ventes, prêt à scaler", "ic": "trend", "v": "growing"}, {"t": "Établi — 3 000 $+ de revenus mensuels", "ic": "rocket", "v": "established"}, {"t": "Marque premium — Positionnement haut de gamme", "ic": "gem", "v": "luxury"}]}, {"q": "Combien de produits vas-tu vendre ?", "opts": [{"t": "1 à 5 produits — Mono-produit ou test rapide", "ic": "target", "v": "single"}, {"t": "10 à 50 produits — Petit catalogue de niche", "ic": "package", "v": "small"}, {"t": "50 à 500 produits — Boutique structurée", "ic": "store", "v": "medium"}, {"t": "500+ produits — Gros catalogue / marketplace", "ic": "building", "v": "large"}]}, {"q": "Quel est ton budget thème ?", "opts": [{"t": "$0 — Gratuit uniquement", "ic": "gift", "v": "free"}, {"t": "~ 300 $ — Serré mais flexible", "ic": "cash", "v": "low"}, {"t": "300 $ à 425 $ — Premium si ça en vaut la peine", "ic": "card", "v": "medium"}, {"t": "425 $ + — Je veux le meilleur", "ic": "gem", "v": "high"}]}, {"q": "Quelle est ta priorité numéro un ?", "opts": [{"t": "Vitesse & SEO — Top Core Web Vitals", "ic": "bolt", "v": "speed"}, {"t": "Conversion — Upsell, urgence, bundles", "ic": "target", "v": "conversion"}, {"t": "Design premium — Look haut de gamme", "ic": "palette", "v": "design"}, {"t": "Simplicité — Lancement rapide, sans prise de tête", "ic": "feather", "v": "simplicity"}]}];

    var THEMES={"impulse": {"name": "Impulse", "tag": "Le polyvalent", "tagline": "Le thème le plus polyvalent du marché, conçu pour convertir.", "price": "425 $", "speed": "&lt; 1,3 s", "score": "92", "desc": "Impulse gère une boutique mode 500 SKUs aussi facilement qu\\'un lifestyle shop curé. Mega menus visuels, timers natifs, color swatches et filtrage avancé : pas besoin d\\'apps en plus.", "features": ["Shopify 2.0 complet, sections personnalisables partout", "Bandeaux promo et timers natifs", "Filtres avancés, color swatches, vue rapide", "Plusieurs presets pour personnaliser"]}, "prestige": {"name": "Prestige", "tag": "Élégance premium", "tagline": "Le thème conçu pour les marques haut de gamme.", "price": "425 $", "speed": "&lt; 1,4 s", "score": "90", "desc": "Prestige est conçu pour les boutiques qui vendent à des prix premium. Bijouterie, mobilier de designer, beauté, mode de luxe : le storytelling visuel paraît luxueux sans effort.", "features": ["Look premium dès l\\'installation", "Sections storytelling intégrées", "Zoom produit et galerie vidéo", "Code propre, chargement rapide"]}, "dawn": {"name": "Dawn", "tag": "Meilleur thème gratuit", "tagline": "Le thème par défaut de Shopify, brutalement efficace.", "price": "Gratuit", "speed": "&lt; 1,1 s", "score": "95", "desc": "Dawn est le thème de référence de Shopify et l'un des plus rapides du marché. Avant de dépenser 425 $ ailleurs, essaie-le : pour une boutique mono-produit ou un test rapide, il suffit largement.", "features": ["100 % gratuit, aucun investissement", "Score Lighthouse mobile autour de 95", "Mises à jour régulières par Shopify", "Setup et personnalisation rapides"]}, "horizon": {"name": "Horizon", "tag": "Gratuit boosté à l\\'IA", "tagline": "Le thème gratuit boosté à l\\'IA pour lancer vite.", "price": "Gratuit", "speed": "Rapide", "score": "90+", "desc": "Horizon intègre nativement des blocs IA pour générer rapidement des sections custom. Pour un débutant qui veut une boutique propre sans toucher à des outils de design, un excellent point de départ.", "features": ["Gratuit avec sections générées par IA", "Chargement rapide sur mobile", "Setup ultra-facile, zéro skill design", "Code propre, à la Dawn"]}, "impact": {"name": "Impact", "tag": "La machine à scaler", "tagline": "Le thème ultra-rapide pour les boutiques qui montent en puissance.", "price": "400 $", "speed": "&lt; 1,0 s", "score": "95+", "desc": "Impact est le thème que tu prends à 100 000 visites par mois, quand chaque dixième de seconde compte. Il remplace 4 ou 5 abonnements d\\'apps payantes : upsell, bundles, cross-sell, timers natifs.", "features": ["Vitesse de chargement parmi les meilleures", "Upsell, bundles, urgence et timers natifs", "Builder visuel très personnalisable", "Pensé pour scaler le trafic"]}, "expanse": {"name": "Expanse", "tag": "Roi des gros catalogues", "tagline": "Le thème conçu pour les boutiques avec 500+ SKUs.", "price": "380 $", "speed": "Optimisé", "score": "88", "desc": "Tu vends plus de 1 000 SKUs (électronique, accessoires, alimentaire) ? Expanse gère les inventaires massifs avec fluidité. Navigation multi-niveaux, filtrage avancé, scroll infini.", "features": ["Optimisé pour les catalogues massifs", "Filtrage et tri produit avancés", "Mega menu fluide avec 50+ collections", "Scroll infini et collections imbriquées"]}, "turbo": {"name": "Turbo", "tag": "Vitesse pure", "tagline": "Le thème le plus rapide du Shopify Theme Store.", "price": "425 $", "speed": "&lt; 1,1 s", "score": "95+", "desc": "Turbo se positionne comme le thème le plus rapide du Shopify Theme Store, et les chiffres confirment. Si ton marketing s\\'appuie plus sur Google qu\\'Instagram, c\\'est ton thème.", "features": ["Score de vitesse exceptionnel sur desktop & mobile", "Code minimaliste, très peu de JavaScript", "Chargement de polices optimisé", "Pensé pour le SEO technique"]}, "booster": {"name": "Booster", "tag": "Spécialiste dropshipping", "tagline": "Thème tiers orienté conversion, à manier avec prudence.", "price": "297 $", "speed": "Solide", "score": "85", "desc": "Booster embarque tous les effets dropshipping : timers, popups d\\'urgence, badges de stock, preuve sociale. À utiliser avec prudence car certains effets repoussent les limites de la politique Shopify.", "features": ["Effets dropshipping plug-and-play", "Économies sur les apps (urgence, upsell, preuve sociale)", "Mises à jour fréquentes", "Licence à vie à 297 $"]}, "shrine": {"name": "Shrine", "tag": "Le roi de la conversion", "tagline": "Le thème payant préféré des dropshippers pour convertir.", "price": "149 $", "speed": "Rapide", "score": "90+", "desc": "Shrine intègre nativement upsells, cross-sells, bundles et paliers de quantité pour maximiser le panier moyen sans empiler les apps. Du mono-produit à la marque à 7 chiffres, c est la référence dropshipping orientée conversion.", "features": ["Upsells, cross-sells et bundles natifs", "Paliers de quantité, add-to-cart collant", "Comptes à rebours et badges intégrés", "Personnalisation poussée, 149 $ à vie"]}};

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
  