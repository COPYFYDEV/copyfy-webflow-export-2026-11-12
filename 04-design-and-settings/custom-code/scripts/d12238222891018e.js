
(function() {
  'use strict';

  var questions = [
    {
      q: "As-tu un développeur en interne ou une agence sous contrat&nbsp;?",
      options: [
        { text: "Non, je suis seul·e ou une petite équipe non technique", points: { shopify: 3, magento: 0 } },
        { text: "Un freelance occasionnel pour les urgences", points: { shopify: 2, magento: 1 } },
        { text: "Oui, un dev en interne ou agence retainer", points: { shopify: 0, magento: 3 } },
        { text: "Je suis moi-même développeur", points: { shopify: 1, magento: 2 } }
      ]
    },
    {
      q: "Quel est ton budget mensuel total pour la plateforme et l'infra&nbsp;?",
      options: [
        { text: "Moins de 200 $ / mois", points: { shopify: 3, magento: 0 } },
        { text: "Entre 200 $ et 1 000 $ / mois", points: { shopify: 3, magento: 0 } },
        { text: "Entre 1 000 $ et 5 000 $ / mois", points: { shopify: 1, magento: 2 } },
        { text: "Plus de 5 000 $ / mois", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "Combien de produits as-tu (ou prévois-tu d'avoir) au catalogue&nbsp;?",
      options: [
        { text: "Moins de 100 produits (test, dropshipping)", points: { shopify: 3, magento: 0 } },
        { text: "Entre 100 et 5 000 produits", points: { shopify: 3, magento: 0 } },
        { text: "Entre 5 000 et 100 000 SKUs", points: { shopify: 1, magento: 2 } },
        { text: "Plus de 100 000 SKUs avec attributs complexes", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "Quel est ton délai pour lancer ta boutique&nbsp;?",
      options: [
        { text: "Cette semaine, j'ai besoin de tester vite", points: { shopify: 3, magento: 0 } },
        { text: "Dans le mois", points: { shopify: 3, magento: 0 } },
        { text: "Dans les 3 prochains mois", points: { shopify: 2, magento: 1 } },
        { text: "Je peux attendre 6+ mois, le projet est stratégique", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "Quel type de business vends-tu&nbsp;?",
      options: [
        { text: "Dropshipping ou test de produits gagnants", points: { shopify: 3, magento: 0 } },
        { text: "Marque DTC en B2C classique", points: { shopify: 3, magento: 0 } },
        { text: "B2C + un peu de B2B simple", points: { shopify: 2, magento: 1 } },
        { text: "B2B complexe (tarifs par client, conditions crédit, ERP)", points: { shopify: 0, magento: 3 } }
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
    progressLabel.textContent = 'Question ' + (state.currentQuestion + 1) + ' sur ' + questions.length;
    progressPercent.textContent = pct + '%';

    prevBtn.style.visibility = state.currentQuestion === 0 ? 'hidden' : 'visible';
    nextBtn.disabled = state.answers[state.currentQuestion] === null;
    nextBtn.textContent = state.currentQuestion === questions.length - 1 ? 'Voir mon verdict →' : 'Suivant →';
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
      badge = "✅ Verdict très clair";
      title = "Shopify, sans hésiter";
      text = "Ton profil coche toutes les cases Shopify : pas de dev en interne, budget maîtrisé, besoin de lancer vite et écosystème dropshipping/DTC. Magento serait un overkill technique et financier. Avec Copyfy, tu peux déployer une boutique Shopify générée par IA en 5 minutes à partir d'une URL produit, sans toucher une ligne de code.";
      ctaText = "Lancer ma boutique avec Copyfy →";
    } else if (diff >= 3) {
      badge = "✅ Verdict clair";
      title = "Shopify est ton meilleur choix";
      text = "Tu pourrais théoriquement faire tourner Magento, mais le ratio effort/bénéfice penche nettement vers Shopify. Tu vas économiser des mois de setup, des milliers de dollars de dev et tu auras accès à tout l'écosystème dropshipping natif. Copyfy te permet de pousser encore plus loin avec une boutique générée par IA et une base de produits gagnants.";
      ctaText = "Tester Copyfy gratuitement →";
    } else if (diff >= -2) {
      badge = "⚖️ Verdict nuancé";
      title = "Shopify, mais regarde Magento si...";
      text = "Ton profil est mixte. Shopify reste recommandé pour la vitesse et le coût, sauf si tu as des besoins B2B très spécifiques ou un catalogue qui va exploser au-delà de 100 000 SKUs. Notre conseil : commence sur Shopify, migre vers Magento ou Adobe Commerce seulement si tu atteins un plafond technique réel. Copyfy peut t'aider à valider rapidement ton modèle.";
      ctaText = "Démarrer sur Shopify avec Copyfy →";
    } else {
      badge = "🏢 Profil enterprise";
      title = "Magento (ou Adobe Commerce) peut se justifier";
      text = "Ton profil est rare : équipe de dev disponible, catalogue massif ou B2B complexe, budget enterprise et délai long. Magento ou Adobe Commerce peuvent légitimement battre Shopify dans ton cas. Cela dit, Shopify Plus mérite quand même une évaluation : les marques migrent d'Adobe Commerce vers Shopify Plus dans un ratio de 2 contre 1.";
      ctaText = "Découvrir Copyfy quand même →";
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
        '<a href="https://app.copyfy.io/login?lang=fr&utm_source=blog_seo" target="_blank" rel="noopener" class="copyfy-quiz-cta-link"><button type="button" class="copyfy-quiz-btn copyfy-quiz-btn-primary">' + ctaText + '</button></a>' +
        '<button type="button" class="copyfy-quiz-restart" id="copyfy-restart-btn">Refaire le quiz</button>' +
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
