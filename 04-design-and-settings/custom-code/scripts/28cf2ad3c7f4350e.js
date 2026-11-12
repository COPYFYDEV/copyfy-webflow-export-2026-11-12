
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

    var QUESTIONS=[{"q": "Em que fase está a tua loja?", "opts": [{"t": "Estou a começar — Primeira loja ou teste de produto", "ic": "sprout", "v": "beginner"}, {"t": "Em crescimento — Primeiras vendas, pronto para escalar", "ic": "trend", "v": "growing"}, {"t": "Estabelecido — Mais de 3 000 $ de receita mensal", "ic": "rocket", "v": "established"}, {"t": "Marca premium — Posicionamento de gama alta", "ic": "gem", "v": "luxury"}]}, {"q": "Quantos produtos vais vender?", "opts": [{"t": "1 a 5 produtos — Monoproduto ou teste rápido", "ic": "target", "v": "single"}, {"t": "10 a 50 produtos — Pequeno catálogo de nicho", "ic": "package", "v": "small"}, {"t": "50 a 500 produtos — Loja estruturada", "ic": "store", "v": "medium"}, {"t": "500+ produtos — Grande catálogo / marketplace", "ic": "building", "v": "large"}]}, {"q": "Qual é o teu orçamento para o tema?", "opts": [{"t": "$0 — Só grátis", "ic": "gift", "v": "free"}, {"t": "~ 300 $ — Apertado mas flexível", "ic": "cash", "v": "low"}, {"t": "300 $ a 425 $ — Premium se valer a pena", "ic": "card", "v": "medium"}, {"t": "425 $ + — Quero o melhor", "ic": "gem", "v": "high"}]}, {"q": "Qual é a tua prioridade número um?", "opts": [{"t": "Velocidade e SEO — Core Web Vitals de topo", "ic": "bolt", "v": "speed"}, {"t": "Conversão — Upsell, urgência, bundles", "ic": "target", "v": "conversion"}, {"t": "Design premium — Visual de gama alta", "ic": "palette", "v": "design"}, {"t": "Simplicidade — Lançamento rápido, sem dores de cabeça", "ic": "feather", "v": "simplicity"}]}];

    var THEMES={"impulse": {"name": "Impulse", "tag": "O versátil", "tagline": "O tema mais versátil do mercado, pensado para converter.", "price": "425 $", "speed": "&lt; 1,3 s", "score": "92", "desc": "O Impulse gere uma loja de moda com 500 SKUs com a mesma facilidade que uma loja lifestyle curada. Mega menus visuais, temporizadores nativos, color swatches e filtragem avançada: sem precisar de mais apps.", "features": ["Shopify 2.0 completo, secções personalizáveis em todo o lado", "Faixas promocionais e temporizadores nativos", "Filtros avançados, color swatches, vista rápida", "Vários presets para personalizar"]}, "prestige": {"name": "Prestige", "tag": "Elegância premium", "tagline": "O tema pensado para marcas de gama alta.", "price": "425 $", "speed": "&lt; 1,4 s", "score": "90", "desc": "O Prestige foi pensado para lojas que vendem a preços premium. Joalharia, mobiliário de designer, beleza, moda de luxo: o storytelling visual parece luxuoso sem esforço.", "features": ["Visual premium logo após a instalação", "Secções de storytelling integradas", "Zoom de produto e galeria de vídeo", "Código limpo, carregamento rápido"]}, "dawn": {"name": "Dawn", "tag": "Melhor tema grátis", "tagline": "O tema predefinido da Shopify, brutalmente eficaz.", "price": "Grátis", "speed": "&lt; 1,1 s", "score": "95", "desc": "O Dawn é o tema de referência da Shopify e um dos mais rápidos do mercado. Antes de gastares 425 $ noutro, experimenta-o: para uma loja monoproduto ou um teste rápido, chega e sobra.", "features": ["100 % grátis, zero investimento", "Pontuação Lighthouse mobile por volta de 95", "Atualizações regulares pela Shopify", "Configuração e personalização rápidas"]}, "horizon": {"name": "Horizon", "tag": "Grátis e turbinado com IA", "tagline": "O tema grátis turbinado com IA para lançar depressa.", "price": "Grátis", "speed": "Rápido", "score": "90+", "desc": "O Horizon integra nativamente blocos de IA para gerar secções personalizadas depressa. Para um principiante que quer uma loja limpa sem mexer em ferramentas de design, é um excelente ponto de partida.", "features": ["Grátis com secções geradas por IA", "Carregamento rápido no telemóvel", "Configuração muito fácil, zero conhecimentos de design", "Código limpo, ao estilo do Dawn"]}, "impact": {"name": "Impact", "tag": "A máquina de escalar", "tagline": "O tema ultrarrápido para lojas em crescimento.", "price": "400 $", "speed": "&lt; 1,0 s", "score": "95+", "desc": "O Impact é o tema que escolhes quando tens 100 000 visitas por mês e cada décima de segundo conta. Substitui 4 ou 5 subscrições de apps pagas: upsell, bundles, cross-sell, temporizadores nativos.", "features": ["Velocidade de carregamento entre as melhores", "Upsell, bundles, urgência e temporizadores nativos", "Builder visual muito personalizável", "Pensado para escalar o tráfego"]}, "expanse": {"name": "Expanse", "tag": "Rei dos grandes catálogos", "tagline": "O tema pensado para lojas com 500+ SKUs.", "price": "380 $", "speed": "Otimizado", "score": "88", "desc": "Vendes mais de 1 000 SKUs (eletrónica, acessórios, alimentação)? O Expanse gere inventários enormes com fluidez. Navegação multinível, filtragem avançada, scroll infinito.", "features": ["Otimizado para catálogos enormes", "Filtragem e ordenação de produtos avançadas", "Mega menu fluido com 50+ coleções", "Scroll infinito e coleções encadeadas"]}, "turbo": {"name": "Turbo", "tag": "Velocidade pura", "tagline": "O tema mais rápido da Shopify Theme Store.", "price": "425 $", "speed": "&lt; 1,1 s", "score": "95+", "desc": "O Turbo apresenta-se como o tema mais rápido da Shopify Theme Store, e os números confirmam. Se o teu marketing depende mais do Google do que do Instagram, este é o teu tema.", "features": ["Pontuação de velocidade excecional em desktop e mobile", "Código minimalista, muito pouco JavaScript", "Carregamento de fontes otimizado", "Pensado para SEO técnico"]}, "booster": {"name": "Booster", "tag": "Especialista em dropshipping", "tagline": "Tema de terceiros focado na conversão, a usar com cuidado.", "price": "297 $", "speed": "Sólido", "score": "85", "desc": "O Booster traz todos os efeitos de dropshipping: temporizadores, popups de urgência, badges de stock, prova social. Usa-o com cuidado, porque alguns efeitos vão ao limite da política da Shopify.", "features": ["Efeitos de dropshipping plug-and-play", "Poupança em apps (urgência, upsell, prova social)", "Atualizações frequentes", "Licença vitalícia a 297 $"]}, "shrine": {"name": "Shrine", "tag": "O rei da conversão", "tagline": "O tema pago preferido dos dropshippers para converter.", "price": "149 $", "speed": "Rápido", "score": "90+", "desc": "O Shrine integra nativamente upsells, cross-sells, bundles e escalões de quantidade para maximizar o valor médio da encomenda sem acumular apps. Do monoproduto à marca de 7 dígitos, é a referência de dropshipping focada na conversão.", "features": ["Upsells, cross-sells e bundles nativos", "Escalões de quantidade, add-to-cart fixo", "Contagens decrescentes e badges integrados", "Personalização avançada, 149 $ vitalício"]}};

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
  