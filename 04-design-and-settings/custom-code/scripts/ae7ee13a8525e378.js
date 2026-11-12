
(function() {
  'use strict';

  var questions = [
    {
      q: "¿Tienes un desarrollador interno o una agencia contratada?",
      options: [
        { text: "No, voy solo/a o tengo un equipo pequeño no técnico", points: { shopify: 3, magento: 0 } },
        { text: "Un freelance puntual para emergencias", points: { shopify: 2, magento: 1 } },
        { text: "Sí, un dev interno o agencia retainer", points: { shopify: 0, magento: 3 } },
        { text: "Yo mismo/a soy desarrollador/a", points: { shopify: 1, magento: 2 } }
      ]
    },
    {
      q: "¿Cuál es tu presupuesto mensual total para plataforma e infraestructura?",
      options: [
        { text: "Menos de $200 / mes", points: { shopify: 3, magento: 0 } },
        { text: "Entre $200 y $1.000 / mes", points: { shopify: 3, magento: 0 } },
        { text: "Entre $1.000 y $5.000 / mes", points: { shopify: 1, magento: 2 } },
        { text: "Más de $5.000 / mes", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "¿Cuántos productos tienes (o piensas tener) en catálogo?",
      options: [
        { text: "Menos de 100 productos (test, dropshipping)", points: { shopify: 3, magento: 0 } },
        { text: "Entre 100 y 5.000 productos", points: { shopify: 3, magento: 0 } },
        { text: "Entre 5.000 y 100.000 SKUs", points: { shopify: 1, magento: 2 } },
        { text: "Más de 100.000 SKUs con atributos complejos", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "¿En qué plazo quieres lanzar tu tienda?",
      options: [
        { text: "Esta semana, necesito testear rápido", points: { shopify: 3, magento: 0 } },
        { text: "En el mes", points: { shopify: 3, magento: 0 } },
        { text: "En los próximos 3 meses", points: { shopify: 2, magento: 1 } },
        { text: "Puedo esperar 6+ meses, el proyecto es estratégico", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "¿Qué tipo de negocio vendes?",
      options: [
        { text: "Dropshipping o test de productos ganadores", points: { shopify: 3, magento: 0 } },
        { text: "Marca DTC en B2C clásico", points: { shopify: 3, magento: 0 } },
        { text: "B2C + algo de B2B sencillo", points: { shopify: 2, magento: 1 } },
        { text: "B2B complejo (precios por cliente, condiciones de crédito, ERP)", points: { shopify: 0, magento: 3 } }
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
    progressLabel.textContent = 'Pregunta ' + (state.currentQuestion + 1) + ' de ' + questions.length;
    progressPercent.textContent = pct + '%';

    prevBtn.style.visibility = state.currentQuestion === 0 ? 'hidden' : 'visible';
    nextBtn.disabled = state.answers[state.currentQuestion] === null;
    nextBtn.textContent = state.currentQuestion === questions.length - 1 ? "Ver mi veredicto →" : "Siguiente →";
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
      badge = "✅ Veredicto muy claro";
      title = "Shopify, sin dudarlo";
      text = "Tu perfil cumple todas las casillas de Shopify: sin dev interno, presupuesto ajustado, necesidad de lanzar rápido y ecosistema dropshipping/DTC. Magento sería un exceso técnico y financiero. Con Copyfy puedes desplegar una tienda Shopify generada por IA en 5 minutos desde una URL de producto, sin tocar una sola línea de código.";
      ctaText = "Lanzar mi tienda con Copyfy →";
    } else if (diff >= 3) {
      badge = "✅ Veredicto claro";
      title = "Shopify es tu mejor opción";
      text = "Técnicamente podrías hacer funcionar Magento, pero la relación esfuerzo/beneficio se inclina claramente hacia Shopify. Te ahorrarás meses de setup, miles de dólares en desarrollo y tendrás acceso a todo el ecosistema dropshipping nativo. Copyfy te permite ir aún más lejos con una tienda generada por IA y una base de productos ganadores.";
      ctaText = "Probar Copyfy gratis →";
    } else if (diff >= -2) {
      badge = "⚖️ Veredicto matizado";
      title = "Shopify, pero mira Magento si...";
      text = "Tu perfil es mixto. Shopify sigue siendo lo recomendable por velocidad y coste, salvo que tengas necesidades B2B muy concretas o un catálogo que vaya a explotar por encima de los 100.000 SKUs. Nuestro consejo: empieza en Shopify y migra a Magento o Adobe Commerce solo si llegas a un techo técnico real. Copyfy puede ayudarte a validar el modelo rápido.";
      ctaText = "Empezar en Shopify con Copyfy →";
    } else {
      badge = "🏢 Perfil enterprise";
      title = "Magento (o Adobe Commerce) puede tener sentido";
      text = "Tu perfil es poco común: equipo de dev disponible, catálogo masivo o B2B complejo, presupuesto enterprise y plazo largo. Magento o Adobe Commerce pueden legítimamente ganarle a Shopify en tu caso. Dicho esto, Shopify Plus también merece una evaluación: las marcas están migrando de Adobe Commerce a Shopify Plus en una proporción de 2 a 1.";
      ctaText = "Descubrir Copyfy igualmente →";
    }

    resultEl.innerHTML = '<div class="copyfy-quiz-fade-in">' +
      '<span class="copyfy-quiz-result-badge">' + badge + '</span>' +
      '<div class="copyfy-quiz-result-title">' + title + '</div>' +
      '<div class="copyfy-quiz-result-score">' +
        '<div class="copyfy-quiz-score-item">Shopify : <strong>' + scores.shopify + ' pts</strong></div>' +
        '<div class="copyfy-quiz-score-divider"></div>' +
        '<div class="copyfy-quiz-score-item">Magento : <strong>' + scores.magento + ' pts</strong></div>' +
      '</div>' +
      '<p class="copyfy-quiz-result-text">' + text + '</p>' +
      '<div class="copyfy-quiz-result-buttons">' +
        '<a href="https://app.copyfy.io/login?lang=es&utm_source=blog_seo" target="_blank" rel="noopener" class="copyfy-quiz-cta-link"><button type="button" class="copyfy-quiz-btn copyfy-quiz-btn-primary">' + ctaText + '</button></a>' +
        '<button type="button" class="copyfy-quiz-restart" id="copyfy-restart-btn">Reiniciar el quiz</button>' +
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
