
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
      {q:"Em que ponto estás hoje?",opts:[{t:"Estou a preparar a minha primeira loja",ic:"rocket",s:{A:2}},{t:"A minha loja existe mas falta tráfego",ic:"cart",s:{B:2}},{t:"Estou a lançar e preciso de estrutura",ic:"layers",s:{C:2}}]},
      {q:"Qual é a tua prioridade?",opts:[{t:"Perceber nicho, margem e loja",ic:"coins",s:{A:4}},{t:"Trabalhar categorias, conteúdos e links",ic:"pen",s:{B:4}},{t:"Ter feedback e um plano de ação",ic:"cog",s:{C:4}}]},
      {q:"Como aprendes melhor?",opts:[{t:"Com bases e exercícios simples",ic:"bolt",s:{A:3}},{t:"Com um curso técnico e testes no meu site",ic:"wrench",s:{B:3}},{t:"Com acompanhamento regular e prazos",ic:"clock",s:{C:3}}]}
    ];
    var RESULTS={A:{verdict:"Principiante em e-commerce",title:"Começa pelas bases do e-commerce",desc:"Escolhe um percurso introdutório que ligue nicho, margem, fornecedores e criação da loja online, e <strong>valida uma pequena seleção de produtos<\/strong> antes de pagares uma especialização em SEO. A Copyfy ajuda-te a verificar se um nicho tem produtos e concorrentes ativos, e a criação de loja com IA dá-te uma primeira estrutura."},
      B:{verdict:"Loja com pouco tráfego",title:"Aprofunda o SEO para e-commerce",desc:"Procura um programa dedicado a palavras-chave, categorias, ligações internas e backlinks: Guillaume Jacob para WooCommerce, ou a Eskimoz Academy se o teu problema for puramente orgânico. <strong>Confirma que se adapta à tua plataforma<\/strong> antes de te inscreveres. A Copyfy complementa a formação com dados recentes sobre produtos, lojas Shopify concorrentes e as respetivas fontes de tráfego."},
      C:{verdict:"Projeto a precisar de apoio",title:"Dá prioridade a um percurso acompanhado",desc:"A LiveMentor oferece o enquadramento mais claro, com um mentor individual durante três meses. <strong>Pergunta quem vai ser o teu mentor<\/strong> e quantos comentários individuais estão incluídos. Na Copyfy, a formação em e-commerce está incluída e o coaching de grupo semanal começa com o plano Growth."}};
    var idx=0,scores={A:0,B:0,C:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Pergunta "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round((idx/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic" aria-hidden="true">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["A", "B", "C"][0],max=-1;["A", "B", "C"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={A:0,B:0,C:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  