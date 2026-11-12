
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
      {q:"Em que ponto está a tua loja, neste momento?",opts:[{t:"Estou a começar, abaixo de $10K de MRR",ic:"coins",s:{F:2}},{t:"Estou a crescer depressa, bem acima de $10K de MRR",ic:"rocket",s:{L:2}},{t:"Consolidada, com equipa de desenvolvimento ou em headless",ic:"cog",s:{E:2}},{t:"Os meus subscritores saem mais depressa do que eu queria",ic:"clock",s:{R:2}}]},
      {q:"O que pesa mais na fatura?",opts:[{t:"Custo zero enquanto valido",ic:"coins",s:{F:2}},{t:"Nenhuma taxa por encomenda em grande volume",ic:"rocket",s:{L:2}},{t:"Pago por uma API avançada e integrações",ic:"cog",s:{E:2}},{t:"Tudo o que reduz o churn paga-se a si próprio",ic:"crown",s:{R:1,L:1}}]},
      {q:"Como é o teu checkout?",opts:[{t:"Shopify standard, quero manter simples",ic:"cart",s:{F:1,L:1}},{t:"Shop Pay ou headless, não abdico",ic:"layers",s:{E:2}},{t:"Checkout nativo e novas tentativas de pagamento sólidas",ic:"wrench",s:{L:1,R:1}}]},
      {q:"A tua prioridade número um este trimestre?",opts:[{t:"Lançar subscrições sem gastar muito",ic:"coins",s:{F:2}},{t:"Baixar o custo por encomenda em escala",ic:"rocket",s:{L:2}},{t:"Tirar mais LTV dos meus subscritores",ic:"crown",s:{R:2}},{t:"Migrar de uma app antiga e pesada",ic:"cog",s:{E:2}}]},
      {q:"O teu à-vontade técnico e a tua equipa?",opts:[{t:"Sozinho, quero tudo pronto a usar",ic:"rocket",s:{F:1,L:1}},{t:"Tenho programadores para desenvolvimento à medida",ic:"cog",s:{E:2}},{t:"Equipa pequena que testa a retenção",ic:"pen",s:{R:2}}]}
    ];
    var RESULTS={F:{verdict:"Grátis e leve",title:"Seal ou Appstle, é a tua escolha",desc:"Queres funcionalidades de subscrição a sério <strong>sem mexer nas tuas margens</strong>. As duas funcionam com um plano gratuito real e 0% de taxas: lanças novas tentativas de pagamento, portal do cliente e bundles antes de pagares um cêntimo. A verdadeira questão não é a app, é <strong>se o produto merece uma subscrição</strong> à partida."},
      L:{verdict:"Feito para escalar",title:"A Loop encaixa numa marca DTC em crescimento",desc:"No teu volume, <strong>zero taxas por encomenda</strong> pesa mais do que o custo total, e as ferramentas de retenção da Loop pagam os anúncios que trazem o próximo subscritor. Já passaste a fase de validação: agora a alavanca é <strong>alimentar a máquina com o produto certo</strong> para fazer crescer a receita recorrente."},
      E:{verdict:"Profundidade enterprise",title:"Recharge ou Skio para ti",desc:"Precisas de <strong>uma API avançada, headless e Shop Pay</strong>, e vais pagar o ecossistema que os oferece. Estas plataformas justificam a sua comissão pela profundidade de integração, não por magia na retenção. Com a infraestrutura resolvida, a vantagem vem <strong>do produto que pões em subscrição</strong>."},
      R:{verdict:"A retenção primeiro",title:"A Stay AI é a tua escolha",desc:"O teu gargalo é o <strong>churn</strong>, e a Stay AI foi construída em torno da retenção e da LTV guiadas por IA. Os percursos mantêm os subscritores durante mais tempo, mas nenhuma stack salva um produto que ninguém quer duas vezes. Garante <strong>um produto que se vende mesmo</strong> e depois deixa o motor de retenção fazer o trabalho."}};
    var idx=0,scores={F:0,L:0,E:0,R:0};
    var stage=document.getElementById("copyfyQuizStage");
    var resultEl=document.getElementById("copyfyQuizResult");
    var qEl=document.getElementById("copyfyQuizQuestion");
    var optsEl=document.getElementById("copyfyQuizOptions");
    var badgeEl=document.getElementById("copyfyQuizBadge");
    var fillEl=document.getElementById("copyfyQuizFill");
    function render(){
      var item=QUESTIONS[idx];
      badgeEl.textContent="Pergunta "+(idx+1)+" / "+QUESTIONS.length;
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
  