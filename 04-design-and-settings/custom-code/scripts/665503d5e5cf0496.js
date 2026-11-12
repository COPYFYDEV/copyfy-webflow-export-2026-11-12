
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

    var QUESTIONS=[{"q": "¿Dónde estás con tu tienda?", "opts": [{"t": "Empezando — Primera tienda o test de producto", "ic": "sprout", "v": "beginner"}, {"t": "Creciendo — Primeras ventas, listo para escalar", "ic": "trend", "v": "growing"}, {"t": "Establecido — 3 000 $+ de ingresos mensuales", "ic": "rocket", "v": "established"}, {"t": "Marca premium — Posicionamiento de alta gama", "ic": "gem", "v": "luxury"}]}, {"q": "¿Cuántos productos venderás?", "opts": [{"t": "1 a 5 productos — Mono-producto o test rápido", "ic": "target", "v": "single"}, {"t": "10 a 50 productos — Pequeño catálogo de nicho", "ic": "package", "v": "small"}, {"t": "50 a 500 productos — Tienda estructurada", "ic": "store", "v": "medium"}, {"t": "500+ productos — Gran catálogo / marketplace", "ic": "building", "v": "large"}]}, {"q": "¿Cuál es tu presupuesto de tema?", "opts": [{"t": "$0 — Solo gratis", "ic": "gift", "v": "free"}, {"t": "~ 300 $ — Ajustado pero flexible", "ic": "cash", "v": "low"}, {"t": "300 $ a 425 $ — Premium si vale la pena", "ic": "card", "v": "medium"}, {"t": "425 $ + — Quiero lo mejor", "ic": "gem", "v": "high"}]}, {"q": "¿Cuál es tu prioridad número uno?", "opts": [{"t": "Velocidad y SEO — Top Core Web Vitals", "ic": "bolt", "v": "speed"}, {"t": "Conversión — Upsell, urgencia, bundles", "ic": "target", "v": "conversion"}, {"t": "Diseño premium — Look de alta gama", "ic": "palette", "v": "design"}, {"t": "Simplicidad — Lanzamiento rápido, sin complicaciones", "ic": "feather", "v": "simplicity"}]}];

    var THEMES={"impulse": {"name": "Impulse", "tag": "El polivalente", "tagline": "El tema más versátil del mercado, construido para convertir.", "price": "425 $", "speed": "&lt; 1,3 s", "score": "92", "desc": "Impulse maneja una tienda de moda 500 SKUs tan fácilmente como un lifestyle shop curado. Megamenús visuales, temporizadores nativos, color swatches y filtrado avanzado: sin necesidad de apps extra.", "features": ["Shopify 2.0 completo, secciones personalizables en todas partes", "Banners promocionales y temporizadores de cuenta atrás nativos", "Filtros avanzados, color swatches, vista rápida", "Varios presets para personalizar"]}, "prestige": {"name": "Prestige", "tag": "Elegancia premium", "tagline": "El tema diseñado para marcas de alta gama.", "price": "425 $", "speed": "&lt; 1,4 s", "score": "90", "desc": "Prestige está construido para tiendas que venden a precios premium. Joyería, muebles de diseñador, belleza, moda de lujo: el storytelling visual se siente lujoso sin esfuerzo.", "features": ["Aspecto premium nada más instalar", "Secciones de storytelling integradas", "Zoom de producto y galería de vídeo", "Código limpio y carga rápida"]}, "dawn": {"name": "Dawn", "tag": "Mejor tema gratuito", "tagline": "El tema por defecto de Shopify, brutalmente eficaz.", "price": "Gratis", "speed": "&lt; 1,1 s", "score": "95", "desc": "Dawn es el tema de referencia de Shopify y uno de los más rápidos del mercado. Antes de gastar 425 $ en otro, pruébalo: para una tienda de un solo producto o un test rápido, es más que suficiente.", "features": ["100 % gratis, sin inversión inicial", "Puntuación Lighthouse móvil alrededor de 95", "Actualizaciones regulares por parte de Shopify", "Setup y personalización rápidos"]}, "horizon": {"name": "Horizon", "tag": "Gratuito con IA", "tagline": "El tema gratuito impulsado por IA para lanzar rápido.", "price": "Gratis", "speed": "Rápido", "score": "90+", "desc": "Horizon integra nativamente bloques de IA para generar secciones personalizadas rápidamente. Para un principiante que quiere una tienda limpia sin tocar herramientas de diseño, un excelente punto de partida.", "features": ["Gratis con secciones generadas por IA", "Carga rápida en móvil", "Setup súper fácil, cero habilidades de diseño", "Código limpio estilo Dawn"]}, "impact": {"name": "Impact", "tag": "La máquina de escalado", "tagline": "El tema ultrarrápido para tiendas que ramping up.", "price": "400 $", "speed": "&lt; 1,0 s", "score": "95+", "desc": "Impact es el tema que eliges a 100 000 visitas al mes, cuando cada décima de segundo importa. Reemplaza 4 o 5 suscripciones de apps de pago: upsell, bundles, cross-sell, temporizadores nativos.", "features": ["Velocidad de carga de las mejores", "Upsell, bundles, urgencia y temporizadores nativos", "Builder visual altamente personalizable", "Construido para escalar tráfico"]}, "expanse": {"name": "Expanse", "tag": "Rey de los grandes catálogos", "tagline": "El tema diseñado para tiendas con 500+ SKUs.", "price": "380 $", "speed": "Optimizado", "score": "88", "desc": "¿Vendes más de 1 000 SKUs (electrónica, accesorios, alimentación)? Expanse maneja inventarios masivos con fluidez. Navegación multinivel, filtrado avanzado, scroll infinito.", "features": ["Optimizado para catálogos masivos", "Filtrado y orden de productos avanzado", "Megamenú fluido con 50+ colecciones", "Scroll infinito y colecciones anidadas"]}, "turbo": {"name": "Turbo", "tag": "Velocidad pura", "tagline": "El tema más rápido del Shopify Theme Store.", "price": "425 $", "speed": "&lt; 1,1 s", "score": "95+", "desc": "Turbo se posiciona como el tema más rápido del Shopify Theme Store, y los números lo confirman. Si tu marketing se apoya más en Google que en Instagram, este es tu tema.", "features": ["Puntuación de velocidad excepcional en escritorio y móvil", "Código minimalista, muy poco JavaScript", "Carga de fuentes optimizada", "Construido para SEO técnico"]}, "booster": {"name": "Booster", "tag": "Especialista en dropshipping", "tagline": "Tema de terceros orientado a conversión, úsalo con cuidado.", "price": "297 $", "speed": "Sólido", "score": "85", "desc": "Booster trae todos los efectos de dropshipping: temporizadores, popups de urgencia, badges de stock, prueba social. Úsalo con cuidado, ya que algunos efectos llevan al límite la política de Shopify.", "features": ["Efectos de dropshipping plug-and-play", "Ahorros en apps (urgencia, upsell, prueba social)", "Actualizaciones frecuentes", "Licencia de por vida a 297 $"]}, "shrine": {"name": "Shrine", "tag": "El rey de la conversión", "tagline": "El tema de pago favorito de los dropshippers para convertir.", "price": "149 $", "speed": "Rápido", "score": "90+", "desc": "Shrine incluye de forma nativa upsells, cross-sells, bundles y descuentos por cantidad para maximizar el ticket medio sin acumular apps. Del mono-producto a marcas de 7 cifras, es la referencia de dropshipping orientada a la conversión.", "features": ["Upsells, cross-sells y bundles nativos", "Descuentos por cantidad, add-to-cart fijo", "Cuentas atrás y sellos integrados", "Personalización profunda, 149 $ de por vida"]}};

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
  