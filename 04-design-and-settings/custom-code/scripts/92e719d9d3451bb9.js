
(function() {
  'use strict';

  var questions = [
    {
      q: "Hast du einen Inhouse-Entwickler oder eine Agentur unter Vertrag?",
      options: [
        { text: "Nein, ich arbeite alleine oder in einem kleinen, nicht-technischen Team", points: { shopify: 3, magento: 0 } },
        { text: "Einen Freelancer für Notfälle", points: { shopify: 2, magento: 1 } },
        { text: "Ja, einen Inhouse-Dev oder eine Retainer-Agentur", points: { shopify: 0, magento: 3 } },
        { text: "Ich bin selbst Entwickler", points: { shopify: 1, magento: 2 } }
      ]
    },
    {
      q: "Wie hoch ist dein monatliches Gesamtbudget für Plattform und Infra?",
      options: [
        { text: "Weniger als $200 / Monat", points: { shopify: 3, magento: 0 } },
        { text: "Zwischen $200 und $1.000 / Monat", points: { shopify: 3, magento: 0 } },
        { text: "Zwischen $1.000 und $5.000 / Monat", points: { shopify: 1, magento: 2 } },
        { text: "Mehr als $5.000 / Monat", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "Wie viele Produkte hast du (oder planst du) im Katalog?",
      options: [
        { text: "Weniger als 100 Produkte (Test, Dropshipping)", points: { shopify: 3, magento: 0 } },
        { text: "Zwischen 100 und 5.000 Produkten", points: { shopify: 3, magento: 0 } },
        { text: "Zwischen 5.000 und 100.000 SKUs", points: { shopify: 1, magento: 2 } },
        { text: "Mehr als 100.000 SKUs mit komplexen Attributen", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "Wann willst du deinen Shop launchen?",
      options: [
        { text: "Diese Woche, ich muss schnell testen", points: { shopify: 3, magento: 0 } },
        { text: "Innerhalb eines Monats", points: { shopify: 3, magento: 0 } },
        { text: "In den nächsten 3 Monaten", points: { shopify: 2, magento: 1 } },
        { text: "Ich kann 6+ Monate warten, das Projekt ist strategisch", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "Welche Art Business verkaufst du?",
      options: [
        { text: "Dropshipping oder Test von Gewinnerprodukten", points: { shopify: 3, magento: 0 } },
        { text: "Klassische DTC-B2C-Marke", points: { shopify: 3, magento: 0 } },
        { text: "B2C + ein bisschen einfaches B2B", points: { shopify: 2, magento: 1 } },
        { text: "Komplexes B2B (Preise pro Kunde, Kreditbedingungen, ERP)", points: { shopify: 0, magento: 3 } }
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
    progressLabel.textContent = 'Frage ' + (state.currentQuestion + 1) + ' von ' + questions.length;
    progressPercent.textContent = pct + '%';

    prevBtn.style.visibility = state.currentQuestion === 0 ? 'hidden' : 'visible';
    nextBtn.disabled = state.answers[state.currentQuestion] === null;
    nextBtn.textContent = state.currentQuestion === questions.length - 1 ? "Mein Urteil ansehen →" : "Weiter →";
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
      badge = "✅ Sehr klares Urteil";
      title = "Shopify, ohne Zögern";
      text = "Dein Profil erfüllt alle Shopify-Kriterien: kein Inhouse-Dev, kontrolliertes Budget, schneller Launch nötig und Dropshipping/DTC-Ökosystem. Magento wäre technisch und finanziell übertrieben. Mit Copyfy kannst du in 5 Minuten einen KI-generierten Shopify-Shop aus einer Produkt-URL aufsetzen, ohne eine einzige Zeile Code zu schreiben.";
      ctaText = "Meinen Shop mit Copyfy starten →";
    } else if (diff >= 3) {
      badge = "✅ Klares Urteil";
      title = "Shopify ist deine beste Wahl";
      text = "Technisch könntest du Magento betreiben, aber das Verhältnis von Aufwand zu Nutzen spricht klar für Shopify. Du sparst Monate beim Setup, tausende Dollar an Entwicklungskosten und bekommst Zugang zum gesamten nativen Dropshipping-Ökosystem. Mit Copyfy gehst du sogar noch weiter: KI-generierter Shop plus Datenbank an Gewinnerprodukten.";
      ctaText = "Copyfy kostenlos testen →";
    } else if (diff >= -2) {
      badge = "⚖️ Differenziertes Urteil";
      title = "Shopify, aber schau dir Magento an, wenn...";
      text = "Dein Profil ist gemischt. Shopify bleibt wegen Tempo und Kosten die Empfehlung, außer du hast sehr spezifische B2B-Anforderungen oder einen Katalog, der über 100.000 SKUs hinauswächst. Unsere Empfehlung: Starte auf Shopify und migriere nur dann zu Magento oder Adobe Commerce, wenn du an eine echte technische Grenze stößt. Copyfy hilft dir, dein Modell schnell zu validieren.";
      ctaText = "Auf Shopify mit Copyfy starten →";
    } else {
      badge = "🏢 Enterprise-Profil";
      title = "Magento (oder Adobe Commerce) kann sinnvoll sein";
      text = "Dein Profil ist selten: verfügbares Dev-Team, riesiger Katalog oder komplexes B2B, Enterprise-Budget und langer Zeitplan. Magento oder Adobe Commerce können Shopify in deinem Fall berechtigt schlagen. Dennoch verdient Shopify Plus eine Prüfung: Marken wechseln von Adobe Commerce zu Shopify Plus im Verhältnis 2 zu 1.";
      ctaText = "Copyfy trotzdem entdecken →";
    }

    resultEl.innerHTML = '<div class="copyfy-quiz-fade-in">' +
      '<span class="copyfy-quiz-result-badge">' + badge + '</span>' +
      '<div class="copyfy-quiz-result-title">' + title + '</div>' +
      '<div class="copyfy-quiz-result-score">' +
        '<div class="copyfy-quiz-score-item">Shopify : <strong>' + scores.shopify + ' Pkt</strong></div>' +
        '<div class="copyfy-quiz-score-divider"></div>' +
        '<div class="copyfy-quiz-score-item">Magento : <strong>' + scores.magento + ' Pkt</strong></div>' +
      '</div>' +
      '<p class="copyfy-quiz-result-text">' + text + '</p>' +
      '<div class="copyfy-quiz-result-buttons">' +
        '<a href="https://app.copyfy.io/login?lang=de&utm_source=blog_seo" target="_blank" rel="noopener" class="copyfy-quiz-cta-link"><button type="button" class="copyfy-quiz-btn copyfy-quiz-btn-primary">' + ctaText + '</button></a>' +
        '<button type="button" class="copyfy-quiz-restart" id="copyfy-restart-btn">Quiz neu starten</button>' +
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
