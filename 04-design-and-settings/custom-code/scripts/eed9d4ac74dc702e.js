
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

    // Questions : chaque option ajoute des points à S (Shopify), W (WordPress), H (Hybride)
    var QUESTIONS=[
      {q:"¿Tu objetivo número uno ahora mismo?",
       opts:[
        {t:"Vender rápido y testear un producto",ic:"bolt",s:{S:2}},
        {t:"Poseer y controlar todo a largo plazo",ic:"crown",s:{W:2}}
       ]},
      {q:"¿Tu nivel de comodidad con lo técnico?",
       opts:[
        {t:"Cero — quiero que funcione sin trastear",ic:"rocket",s:{S:2}},
        {t:"Cómodo — alojamiento, plugins, lo controlo",ic:"cog",s:{W:2}}
       ]},
      {q:"¿El contenido (blog, SEO) en tu estrategia?",
       opts:[
        {t:"Es mi motor de captación principal",ic:"pen",s:{W:2,H:1}},
        {t:"Secundario — apuesto por ads y producto",ic:"cart",s:{S:2}}
       ]},
      {q:"¿Cuánto tiempo por semana para el mantenimiento?",
       opts:[
        {t:"El mínimo — 2-3h, lo quiero llave en mano",ic:"clock",s:{S:2}},
        {t:"4-6h me vale si gano en libertad",ic:"wrench",s:{W:2}}
       ]},
      {q:"¿Tu situación hoy?",
       opts:[
        {t:"Empiezo de cero, quiero lanzar",ic:"rocket",s:{S:1}},
        {t:"Ya tengo audiencia / un blog WordPress",ic:"layers",s:{H:3}},
        {t:"Catálogo complejo o flujo a medida",ic:"cog",s:{W:2}},
        {t:"Hago dropshipping / test de producto",ic:"cart",s:{S:2}}
       ]}
    ];

    var RESULTS={
      S:{verdict:"La velocidad ante todo",title:"Shopify es tu apuesta más segura",
         desc:"Quieres <strong>vender ya</strong> y dejar lo técnico en manos de otro. Online en 1 a 5 días, checkout estable, alojamiento y seguridad incluidos — dedicas tus horas al producto y al marketing, no a arreglar la web. El verdadero cuello de botella no será la plataforma, sino <strong>elegir un producto que venda de verdad</strong>."},
      W:{verdict:"Propiedad y control",title:"WordPress + WooCommerce encaja contigo",
         desc:"Quieres <strong>poseerlo todo</strong>: tu código, tus datos, tu SEO sin techo. La configuración lleva semanas y 4-6h/semana de mantenimiento, pero si el contenido es tu motor, esa potencia editorial genera intereses durante años. La pregunta de verdad ahora: <strong>qué vender</strong> para rentabilizar todo ese tráfico."},
      H:{verdict:"El montaje híbrido",title:"Haz funcionar las dos en paralelo",
         desc:"Ya tienes audiencia — no reconstruyas nada. Conserva <strong>WordPress para el contenido</strong> y acóplale <strong>Shopify para vender</strong>: checkout sin fricción por un lado, músculo editorial por el otro. Le añades un motor de ventas a tu máquina de tráfico. Siguiente paso: <strong>encontrar el producto ganador</strong> que conectar."}
    };

    var idx=0,scores={S:0,W:0,H:0};
    var stage=document.getElementById("copyfyQuizStage");
    var resultEl=document.getElementById("copyfyQuizResult");
    var qEl=document.getElementById("copyfyQuizQuestion");
    var optsEl=document.getElementById("copyfyQuizOptions");
    var badgeEl=document.getElementById("copyfyQuizBadge");
    var fillEl=document.getElementById("copyfyQuizFill");

    function render(){
      var item=QUESTIONS[idx];
      badgeEl.textContent="Pregunta "+(idx+1)+" / "+QUESTIONS.length;
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
      var winner="S",max=-1;
      ["S","W","H"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});
      var r=RESULTS[winner];
      document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;
      document.getElementById("copyfyQuizRTitle").textContent=r.title;
      document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;
      stage.style.display="none";
      resultEl.className="copyfy-quiz-result copyfy-active";
    }

    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){
      idx=0;scores={S:0,W:0,H:0};
      resultEl.className="copyfy-quiz-result";
      stage.style.display="block";
      render();
    });

    render();
  })();
  