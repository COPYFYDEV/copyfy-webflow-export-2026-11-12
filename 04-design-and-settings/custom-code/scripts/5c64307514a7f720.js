
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
      {q:"¿En qué punto está tu tienda ahora?",opts:[{t:"Empiezo, por debajo de $10K de MRR",ic:"coins",s:{F:2}},{t:"Escalo rápido, muy por encima de $10K de MRR",ic:"rocket",s:{L:2}},{t:"Establecida, con equipo dev o headless",ic:"cog",s:{E:2}},{t:"Mis suscriptores se van más rápido de lo que quisiera",ic:"clock",s:{R:2}}]},
      {q:"¿Qué te importa más en la factura?",opts:[{t:"Coste cero mientras valido",ic:"coins",s:{F:2}},{t:"Sin comisión por pedido a gran volumen",ic:"rocket",s:{L:2}},{t:"Pagaré por una API potente e integraciones",ic:"cog",s:{E:2}},{t:"Lo que reduzca el churn se paga solo",ic:"crown",s:{R:1,L:1}}]},
      {q:"¿Tu configuración de checkout?",opts:[{t:"Shopify estándar, lo mantengo simple",ic:"cart",s:{F:1,L:1}},{t:"Shop Pay o headless, innegociable",ic:"layers",s:{E:2}},{t:"Checkout nativo y flujos de retención sólidos",ic:"wrench",s:{L:1,R:1}}]},
      {q:"¿Tu prioridad número uno este trimestre?",opts:[{t:"Lanzar suscripciones barato",ic:"coins",s:{F:2}},{t:"Bajar el coste por pedido a escala",ic:"rocket",s:{L:2}},{t:"Sacar más LTV de mis suscriptores",ic:"crown",s:{R:2}},{t:"Migrar de una app antigua y pesada",ic:"cog",s:{E:2}}]},
      {q:"¿Tu soltura técnica y tu equipo?",opts:[{t:"Solo, quiero algo llave en mano",ic:"rocket",s:{F:1,L:1}},{t:"Tengo devs para lo a medida",ic:"cog",s:{E:2}},{t:"Equipo pequeño que prueba retención",ic:"pen",s:{R:2}}]}
    ];
    var RESULTS={F:{verdict:"Gratis y ligero",title:"Seal o Appstle es tu elección",desc:"Quieres funciones reales de suscripción <strong>sin tocar tus márgenes</strong>. Ambas funcionan con un plan gratis de verdad y 0% de comisión: lanzas dunning, portal de cliente y bundles antes de pagar un céntimo. La pregunta real no es la app, es <strong>si el producto merece que se suscriban</strong> de entrada."},
      L:{verdict:"Hecha para escalar",title:"Loop encaja con una marca DTC en crecimiento",desc:"A tu volumen, <strong>sin comisión por pedido</strong> gana en coste total, y las herramientas de retención de Loop financian los ads que traen al siguiente suscriptor. Ya pasaste la validación: ahora la palanca es <strong>alimentar la máquina con el producto correcto</strong> para que el recurrente siga creciendo."},
      E:{verdict:"Profundidad enterprise",title:"Recharge o Skio para ti",desc:"Necesitas <strong>API potente, headless y Shop Pay</strong>, y pagarás por el ecosistema que lo entrega. Estas plataformas justifican su comisión por la profundidad de integración, no por magia de retención. Con la infraestructura resuelta, la ventaja viene <strong>del producto que pones en suscripción</strong>."},
      R:{verdict:"La retención primero",title:"Stay AI es tu match",desc:"Tu cuello de botella es el <strong>churn</strong>, y Stay AI se construye en torno a retención y LTV con IA. Los flujos retienen a los suscriptores más tiempo, pero ninguna stack salva un producto que nadie quiere dos veces. Asegura <strong>un producto que se venda de verdad</strong>, y deja que el motor de retención trabaje."}};
    var idx=0,scores={F:0,L:0,E:0,R:0};
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
  