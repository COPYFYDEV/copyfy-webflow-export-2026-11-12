
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
      {q:"Que parte do teu volume de negócios vem da Meta?",opts:[{t:"80 % ou mais",ic:"bolt",s:{A:2}},{t:"Mais ou menos metade",ic:"layers",s:{C:1,B:1}},{t:"Sobretudo TikTok",ic:"rocket",s:{C:2}},{t:"Ainda nenhuma venda",ic:"clock",s:{D:2}}]},
      {q:"O teu orçamento mensal para ferramentas?",opts:[{t:"Menos de 20 $",ic:"coins",s:{B:2}},{t:"À volta de 50 $",ic:"cart",s:{C:2}},{t:"149 $ sem problema",ic:"crown",s:{A:2}},{t:"Uma única subscrição que cubra tudo",ic:"layers",s:{D:2}}]},
      {q:"O que procuras exatamente?",opts:[{t:"Os comentários e a intenção de compra",ic:"pen",s:{A:2}},{t:"Volume de criativos em muitas redes",ic:"cog",s:{B:2}},{t:"O produto por trás do anúncio",ic:"cart",s:{C:2}},{t:"Lojas que estão a crescer",ic:"coins",s:{D:2}}]},
      {q:"Com que frequência fazes pesquisa de mercado?",opts:[{t:"Todos os dias",ic:"bolt",s:{A:2}},{t:"Duas ou três vezes por semana",ic:"clock",s:{B:2}},{t:"Raramente",ic:"wrench",s:{B:1,D:1}},{t:"Estou mesmo a começar",ic:"rocket",s:{D:2}}]}
    ];
    var RESULTS={A:{verdict:"AdSpy",title:"Para ti, vale os 149 $",desc:"A Meta sustenta o teu negócio e pesquisas todos os dias. A pesquisa nos comentários e os filtros de afiliação não existem em mais lado nenhum. <strong>Mesmo assim, nenhuma ferramenta te dirá se o produto vende.</strong>"},
      B:{verdict:"BigSpy",title:"Amplitude a preço baixo",desc:"Dez redes a partir de 9 $ por mês, com um plano gratuito para testar a interface. A precisão na Meta fica abaixo do AdSpy, <strong>mas pagas quinze vezes menos</strong> para cobrir muitos mais canais."},
      C:{verdict:"Minea ou PiPiAds",title:"O TikTok e o produto por trás do anúncio",desc:"Estas duas ligam um anúncio ao artigo vendido, coisa que o AdSpy nunca faz. <strong>É a camada que conta quando procuras um produto</strong>, e não só um ângulo."},
      D:{verdict:"Copyfy",title:"O teu bloqueio não é o anúncio",desc:"Ainda não sabes o que testar. Precisas de produtos validados, de lojas analisadas pelo tráfego e pelo volume de negócios, <strong>e de pôr tudo online logo a seguir</strong>."}};
    var idx=0,scores={A:0,B:0,C:0,D:0};
    var stage=document.getElementById("copyfyQuizStage"),resultEl=document.getElementById("copyfyQuizResult"),qEl=document.getElementById("copyfyQuizQuestion"),optsEl=document.getElementById("copyfyQuizOptions"),badgeEl=document.getElementById("copyfyQuizBadge"),fillEl=document.getElementById("copyfyQuizFill");
    function render(){var item=QUESTIONS[idx];badgeEl.textContent="Pergunta "+(idx+1)+" / "+QUESTIONS.length;fillEl.style.width=Math.round(((idx)/QUESTIONS.length)*100)+"%";qEl.textContent=item.q;optsEl.innerHTML="";item.opts.forEach(function(o){var btn=document.createElement("button");btn.type="button";btn.className="copyfy-quiz-opt";btn.innerHTML='<span class="copyfy-quiz-opt-ic">'+(ICONS[o.ic]||"")+'</span><span>'+o.t+'</span>';btn.addEventListener("click",function(){for(var k in o.s){scores[k]=(scores[k]||0)+o.s[k];}idx++;if(idx<QUESTIONS.length){render();}else{showResult();}});optsEl.appendChild(btn);});}
    function showResult(){fillEl.style.width="100%";var winner=["A","B","C","D"][0],max=-1;["A","B","C","D"].forEach(function(k){if(scores[k]>max){max=scores[k];winner=k;}});var r=RESULTS[winner];document.getElementById("copyfyQuizRVerdict").textContent=r.verdict;document.getElementById("copyfyQuizRTitle").textContent=r.title;document.getElementById("copyfyQuizRDesc").innerHTML=r.desc;stage.style.display="none";resultEl.className="copyfy-quiz-result copyfy-active";}
    document.getElementById("copyfyQuizRestart").addEventListener("click",function(){idx=0;scores={A:0,B:0,C:0,D:0};resultEl.className="copyfy-quiz-result";stage.style.display="block";render();});
    render();
  })();
  