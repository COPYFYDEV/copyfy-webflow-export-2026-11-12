
(function() {
  'use strict';

  var questions = [
    {
      q: "Heb je een in-house developer of een agency op retainer?",
      options: [
        { text: "Nee, ik werk alleen of met een klein niet-technisch team", points: { shopify: 3, magento: 0 } },
        { text: "Een freelancer voor noodgevallen", points: { shopify: 2, magento: 1 } },
        { text: "Ja, een in-house dev of retainer agency", points: { shopify: 0, magento: 3 } },
        { text: "Ik ben zelf developer", points: { shopify: 1, magento: 2 } }
      ]
    },
    {
      q: "Wat is je totale maandelijkse budget voor platform en infra?",
      options: [
        { text: "Minder dan $200 / maand", points: { shopify: 3, magento: 0 } },
        { text: "Tussen $200 en $1.000 / maand", points: { shopify: 3, magento: 0 } },
        { text: "Tussen $1.000 en $5.000 / maand", points: { shopify: 1, magento: 2 } },
        { text: "Meer dan $5.000 / maand", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "Hoeveel producten heb je (of ga je hebben) in je catalogus?",
      options: [
        { text: "Minder dan 100 producten (testen, dropshipping)", points: { shopify: 3, magento: 0 } },
        { text: "Tussen 100 en 5.000 producten", points: { shopify: 3, magento: 0 } },
        { text: "Tussen 5.000 en 100.000 SKU's", points: { shopify: 1, magento: 2 } },
        { text: "Meer dan 100.000 SKU's met complexe attributen", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "Wat is je deadline om je shop te lanceren?",
      options: [
        { text: "Deze week, ik moet snel testen", points: { shopify: 3, magento: 0 } },
        { text: "Binnen de maand", points: { shopify: 3, magento: 0 } },
        { text: "Binnen 3 maanden", points: { shopify: 2, magento: 1 } },
        { text: "Ik kan 6+ maanden wachten, het project is strategisch", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "Wat voor business verkoop je?",
      options: [
        { text: "Dropshipping of het testen van winnende producten", points: { shopify: 3, magento: 0 } },
        { text: "Klassiek DTC B2C-merk", points: { shopify: 3, magento: 0 } },
        { text: "B2C + een beetje simpele B2B", points: { shopify: 2, magento: 1 } },
        { text: "Complexe B2B (prijzen per klant, kredietvoorwaarden, ERP)", points: { shopify: 0, magento: 3 } }
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
    progressLabel.textContent = 'Vraag ' + (state.currentQuestion + 1) + ' van ' + questions.length;
    progressPercent.textContent = pct + '%';

    prevBtn.style.visibility = state.currentQuestion === 0 ? 'hidden' : 'visible';
    nextBtn.disabled = state.answers[state.currentQuestion] === null;
    nextBtn.textContent = state.currentQuestion === questions.length - 1 ? "Bekijk mijn oordeel →" : "Volgende →";
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
      badge = "✅ Heel duidelijk oordeel";
      title = "Shopify, zonder twijfel";
      text = "Jouw profiel vinkt elk vakje van Shopify aan: geen in-house dev, beperkt budget, snel willen lanceren en dropshipping/DTC-ecosysteem. Magento zou technisch en financieel overkill zijn. Met Copyfy lanceer je een door AI gegenereerde Shopify-shop in 5 minuten vanaf een product-URL, zonder ook maar één regel code te schrijven.";
      ctaText = "Mijn shop lanceren met Copyfy →";
    } else if (diff >= 3) {
      badge = "✅ Duidelijk oordeel";
      title = "Shopify is je beste keuze";
      text = "Je zou Magento technisch wel kunnen runnen, maar de verhouding tussen inspanning en opbrengst leunt duidelijk naar Shopify. Je bespaart maanden setup-werk, duizenden dollars aan dev-kosten en krijgt toegang tot het hele native dropshipping-ecosysteem. Copyfy laat je nog verder gaan met een door AI gegenereerde shop en een database vol winnende producten.";
      ctaText = "Copyfy gratis proberen →";
    } else if (diff >= -2) {
      badge = "⚖️ Genuanceerd oordeel";
      title = "Shopify, maar kijk naar Magento als...";
      text = "Jouw profiel is gemixt. Shopify blijft aanbevolen vanwege snelheid en kosten, tenzij je hele specifieke B2B-eisen hebt of een catalogus die boven de 100.000 SKU's gaat groeien. Ons advies: begin op Shopify en migreer alleen naar Magento of Adobe Commerce als je tegen een echt technisch plafond aanloopt. Copyfy helpt je je model snel te valideren.";
      ctaText = "Beginnen op Shopify met Copyfy →";
    } else {
      badge = "🏢 Enterprise-profiel";
      title = "Magento (of Adobe Commerce) kan kloppen";
      text = "Jouw profiel is zeldzaam: een dev-team beschikbaar, een enorme catalogus of complex B2B, enterprise-budget en een lange deadline. Magento of Adobe Commerce kunnen Shopify in jouw geval legitiem verslaan. Toch verdient Shopify Plus een serieuze blik: merken migreren van Adobe Commerce naar Shopify Plus in een verhouding van 2 op 1.";
      ctaText = "Toch Copyfy ontdekken →";
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
        '<a href="https://app.copyfy.io/login?lang=nl&utm_source=blog_seo" target="_blank" rel="noopener" class="copyfy-quiz-cta-link"><button type="button" class="copyfy-quiz-btn copyfy-quiz-btn-primary">' + ctaText + '</button></a>' +
        '<button type="button" class="copyfy-quiz-restart" id="copyfy-restart-btn">Quiz opnieuw doen</button>' +
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
