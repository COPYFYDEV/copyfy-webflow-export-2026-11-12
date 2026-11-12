
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
      {q:"Em que ponto estás no teu e-commerce?",opts:[{t:"Estou a começar e quero ser guiado do início ao fim",ic:"rocket",s:{C:2}},{t:"Já tenho uma loja, só quero dados de anúncios",ic:"layers",s:{M:2}},{t:"Procuro sobretudo o meu próximo produto vencedor",ic:"cart",s:{C:2}}]},
      {q:"A tua prioridade número um?",opts:[{t:"Encontrar o produto E lançar a loja",ic:"bolt",s:{C:2}},{t:"Espiar a fundo os anúncios no Facebook, TikTok e Pinterest",ic:"crown",s:{M:2}},{t:"Uma ferramenta tudo-em-um com IA que trabalha por mim",ic:"cog",s:{C:2}}]},
      {q:"O teu orçamento e o teu estilo?",opts:[{t:"Orçamento apertado, quero um teste gratuito e um preço claro",ic:"coins",s:{C:2}},{t:"Pago mais se a espionagem de anúncios for a mais completa",ic:"clock",s:{M:2}},{t:"A melhor relação tudo-em-um para avançar depressa",ic:"wrench",s:{C:2}}]},
      {q:"O que te pouparia mais tempo?",opts:[{t:"Passar da pesquisa ao lançamento sem mudar de ferramenta",ic:"rocket",s:{C:2}},{t:"A base de anúncios multirrede mais profunda possível",ic:"layers",s:{M:2}},{t:"A IA que encontra produtos e ângulos e cria a loja",ic:"pen",s:{C:2}}]}
    ];
    var RESULTS={C:{verdict:"Copyfy",title:"A Copyfy é a ferramenta de que precisas",desc:"Queres avançar depressa sem andar a saltar entre dez ferramentas. A <strong>Copyfy</strong> junta o adspy, a pesquisa de produtos vencedores e a criação de loja com IA no mesmo sítio. Da análise ao lançamento, está tudo lá, com um teste gratuito para experimentares."},
      M:{verdict:"Minea",title:"A Minea encaixa no teu perfil",desc:"A tua prioridade é espiar anúncios a fundo no Facebook, TikTok e Pinterest. A <strong>Minea</strong> foi feita para isso. Lembra-te de que a Copyfy continua a ser a opção tudo-em-um se também quiseres encontrar produtos e lançar a tua loja."}};
    var idx=0,scores={C:0,M:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Pergunta "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["C","M"][0],max=-1;["C","M"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={C:0,M:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  