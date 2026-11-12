
(function() {
  'use strict';

  var questions = [
    {
      q: "Tens um programador interno ou uma agência contratada?",
      options: [
        { text: "Não, trabalho sozinho ou numa pequena equipa não técnica", points: { shopify: 3, magento: 0 } },
        { text: "Um freelancer ocasional para urgências", points: { shopify: 2, magento: 1 } },
        { text: "Sim, um programador interno ou uma agência em avença", points: { shopify: 0, magento: 3 } },
        { text: "Eu próprio sou programador", points: { shopify: 1, magento: 2 } }
      ]
    },
    {
      q: "Quel est ton budget mensuel total pour la plateforme et l'infra&nbsp;?",
      options: [
        { text: "Menos de 200 $ / mês", points: { shopify: 3, magento: 0 } },
        { text: "Entre 200 $ e 1 000 $ / mês", points: { shopify: 3, magento: 0 } },
        { text: "Entre 1 000 $ e 5 000 $ / mês", points: { shopify: 1, magento: 2 } },
        { text: "Mais de 5 000 $ / mês", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "Quantos produtos tens (ou prevês ter) no catálogo?",
      options: [
        { text: "Menos de 100 produtos (teste, dropshipping)", points: { shopify: 3, magento: 0 } },
        { text: "Entre 100 e 5 000 produtos", points: { shopify: 3, magento: 0 } },
        { text: "Entre 5 000 e 100 000 SKU", points: { shopify: 1, magento: 2 } },
        { text: "Mais de 100 000 SKU com atributos complexos", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "Qual é o teu prazo para lançar a loja?",
      options: [
        { text: "Esta semana, preciso de testar depressa", points: { shopify: 3, magento: 0 } },
        { text: "Dentro de um mês", points: { shopify: 3, magento: 0 } },
        { text: "Nos próximos 3 meses", points: { shopify: 2, magento: 1 } },
        { text: "Posso esperar 6+ meses, o projeto é estratégico", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "Quel type de business vends-tu&nbsp;?",
      options: [
        { text: "Dropshipping ou teste de produtos vencedores", points: { shopify: 3, magento: 0 } },
        { text: "Marca DTC em B2C clássico", points: { shopify: 3, magento: 0 } },
        { text: "B2C + algum B2B simples", points: { shopify: 2, magento: 1 } },
        { text: "B2B complexo (preços por cliente, condições de crédito, ERP)", points: { shopify: 0, magento: 3 } }
      ]
    }
  ];

  var state = {
    currentQuestion: 0,
    answers: new Array(questions.length).fill(null)
  };

  var introEl = document.getElementById('copyfy-quiz-intro');
  var questionsEl = document.getElementById('copyfy-quiz-questions');
  var resultEl = document.getElementById('copyfy-quiz-result');
  var startBtn = document.getElementById('copyfy-start-btn');
  var prevBtn = document.getElementById('copyfy-prev-btn');
  var nextBtn = document.getElementById('copyfy-next-btn');
  var questionContent = document.getElementById('copyfy-question-content');
  var progressFill = document.getElementById('copyfy-progress-fill');
  var progressLabel = document.getElementById('copyfy-progress-label');
  var progressPercent = document.getElementById('copyfy-progress-percent');

  function renderQuestion() {
    var q = questions[state.currentQuestion];
    var selected = state.answers[state.currentQuestion];
    var optionsHtml = '';
    for (var i = 0; i < q.options.length; i++) {
      var selectedClass = selected === i ? ' copyfy-selected' : '';
      optionsHtml += '<button type="button" class="copyfy-quiz-option' + selectedClass + '" data-index="' + i + '">' + q.options[i].text + '</button>';
    }
    questionContent.innerHTML = '<div class="copyfy-quiz-fade-in"><div class="copyfy-quiz-question">' + q.q + '</div><div class="copyfy-quiz-options">' + optionsHtml + '</div></div>';

    var optionButtons = questionContent.querySelectorAll('.copyfy-quiz-option');
    for (var j = 0; j < optionButtons.length; j++) {
      optionButtons[j].addEventListener('click', function(e) {
        var idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        state.answers[state.currentQuestion] = idx;
        for (var k = 0; k < optionButtons.length; k++) {
          optionButtons[k].classList.remove('copyfy-selected');
        }
        e.currentTarget.classList.add('copyfy-selected');
        nextBtn.disabled = false;
      });
    }

    var pct = Math.round(((state.currentQuestion + 1) / questions.length) * 100);
    progressFill.style.width = pct + '%';
    progressLabel.textContent = 'Pergunta ' + (state.currentQuestion + 1) + ' de ' + questions.length;
    progressPercent.textContent = pct + '%';

    prevBtn.style.visibility = state.currentQuestion === 0 ? 'hidden' : 'visible';
    nextBtn.disabled = state.answers[state.currentQuestion] === null;
    nextBtn.textContent = state.currentQuestion === questions.length - 1 ? 'Ver o meu veredicto →' : 'Seguinte →';
  }

  function computeResult() {
    var scores = { shopify: 0, magento: 0 };
    for (var i = 0; i < state.answers.length; i++) {
      var ans = state.answers[i];
      if (ans !== null) {
        var pts = questions[i].options[ans].points;
        scores.shopify += pts.shopify;
        scores.magento += pts.magento;
      }
    }
    return scores;
  }

  function renderResult() {
    var scores = computeResult();
    var diff = scores.shopify - scores.magento;
    var verdict, badge, title, text, ctaText;

    if (diff >= 8) {
      badge = "✅ Veredicto muito claro";
      title = "Shopify, sem hesitar";
      text = "O teu perfil preenche todos os requisitos da Shopify: sem programador interno, orçamento controlado, necessidade de lançar depressa e ecossistema dropshipping/DTC. O Magento seria um exagero técnico e financeiro. Com a Copyfy, podes lançar uma loja Shopify gerada por IA em 5 minutos a partir de um URL de produto, sem tocar numa linha de código.";
      ctaText = "Lançar a minha loja com a Copyfy →";
    } else if (diff >= 3) {
      badge = "✅ Veredicto claro";
      title = "A Shopify é a tua melhor escolha";
      text = "Em teoria, conseguirias pôr o Magento a funcionar, mas a relação esforço/benefício pende claramente para a Shopify. Vais poupar meses de configuração, milhares de dólares em desenvolvimento e terás acesso a todo o ecossistema de dropshipping nativo. A Copyfy permite-te ir ainda mais longe com uma loja gerada por IA e uma base de produtos vencedores.";
      ctaText = "Experimentar a Copyfy grátis →";
    } else if (diff >= -2) {
      badge = "⚖️ Veredicto com nuances";
      title = "Shopify, mas olha para o Magento se...";
      text = "O teu perfil é misto. A Shopify continua a ser recomendada pela velocidade e pelo custo, a menos que tenhas necessidades B2B muito específicas ou um catálogo que vá disparar para lá dos 100 000 SKU. A nossa dica: começa na Shopify e migra para o Magento ou para o Adobe Commerce só se bateres num teto técnico real. A Copyfy pode ajudar-te a validar rapidamente o teu modelo.";
      ctaText = "Começar na Shopify com a Copyfy →";
    } else {
      badge = "🏢 Perfil enterprise";
      title = "O Magento (ou o Adobe Commerce) pode justificar-se";
      text = "O teu perfil é raro: equipa de desenvolvimento disponível, catálogo enorme ou B2B complexo, orçamento enterprise e prazo longo. O Magento ou o Adobe Commerce podem legitimamente superar a Shopify no teu caso. Ainda assim, vale a pena avaliar o Shopify Plus: há marcas a migrar do Adobe Commerce para o Shopify Plus.";
      ctaText = "Descobrir a Copyfy na mesma →";
    }

    resultEl.innerHTML = '<div class="copyfy-quiz-fade-in">' +
      '<span class="copyfy-quiz-result-badge">' + badge + '</span>' +
      '<div class="copyfy-quiz-result-title">' + title + '</div>' +
      '<div class="copyfy-quiz-result-score">' +
        '<div class="copyfy-quiz-score-item">Shopify: <strong>' + scores.shopify + ' pts</strong></div>' +
        '<div class="copyfy-quiz-score-divider"></div>' +
        '<div class="copyfy-quiz-score-item">Magento: <strong>' + scores.magento + ' pts</strong></div>' +
      '</div>' +
      '<p class="copyfy-quiz-result-text">' + text + '</p>' +
      '<div class="copyfy-quiz-result-buttons">' +
        '<a href="https://app.copyfy.io/register?lang=pt" target="_blank" rel="noopener" class="copyfy-quiz-cta-link"><button type="button" class="copyfy-quiz-btn copyfy-quiz-btn-primary">' + ctaText + '</button></a>' +
        '<button type="button" class="copyfy-quiz-restart" id="copyfy-restart-btn">Refazer o quiz</button>' +
      '</div>' +
    '</div>';

    document.getElementById('copyfy-restart-btn').addEventListener('click', function() {
      state.currentQuestion = 0;
      state.answers = new Array(questions.length).fill(null);
      resultEl.classList.add('copyfy-quiz-hidden');
      introEl.classList.remove('copyfy-quiz-hidden');
    });
  }

  startBtn.addEventListener('click', function() {
    introEl.classList.add('copyfy-quiz-hidden');
    questionsEl.classList.remove('copyfy-quiz-hidden');
    renderQuestion();
  });

  prevBtn.addEventListener('click', function() {
    if (state.currentQuestion > 0) {
      state.currentQuestion--;
      renderQuestion();
    }
  });

  nextBtn.addEventListener('click', function() {
    if (state.answers[state.currentQuestion] === null) return;
    if (state.currentQuestion < questions.length - 1) {
      state.currentQuestion++;
      renderQuestion();
    } else {
      questionsEl.classList.add('copyfy-quiz-hidden');
      resultEl.classList.remove('copyfy-quiz-hidden');
      renderResult();
    }
  });
})();
