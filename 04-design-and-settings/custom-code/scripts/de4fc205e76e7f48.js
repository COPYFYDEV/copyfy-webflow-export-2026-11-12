
(function() {
  'use strict';

  var questions = [
    {
      q: "Do you have an in-house developer or a retained agency?",
      options: [
        { text: "No, I'm solo or a small non-technical team", points: { shopify: 3, magento: 0 } },
        { text: "An occasional freelancer for emergencies", points: { shopify: 2, magento: 1 } },
        { text: "Yes, in-house dev or retainer agency", points: { shopify: 0, magento: 3 } },
        { text: "I'm a developer myself", points: { shopify: 1, magento: 2 } }
      ]
    },
    {
      q: "What's your total monthly budget for platform and infra?",
      options: [
        { text: "Less than $200 / month", points: { shopify: 3, magento: 0 } },
        { text: "Between $200 and $1,000 / month", points: { shopify: 3, magento: 0 } },
        { text: "Between $1,000 and $5,000 / month", points: { shopify: 1, magento: 2 } },
        { text: "More than $5,000 / month", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "How many products do you have (or plan to have) in your catalog?",
      options: [
        { text: "Less than 100 products (testing, dropshipping)", points: { shopify: 3, magento: 0 } },
        { text: "Between 100 and 5,000 products", points: { shopify: 3, magento: 0 } },
        { text: "Between 5,000 and 100,000 SKUs", points: { shopify: 1, magento: 2 } },
        { text: "More than 100,000 SKUs with complex attributes", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "What's your timeline to launch your store?",
      options: [
        { text: "This week, I need to test fast", points: { shopify: 3, magento: 0 } },
        { text: "Within the month", points: { shopify: 3, magento: 0 } },
        { text: "Within the next 3 months", points: { shopify: 2, magento: 1 } },
        { text: "I can wait 6+ months, the project is strategic", points: { shopify: 0, magento: 3 } }
      ]
    },
    {
      q: "What type of business are you selling?",
      options: [
        { text: "Dropshipping or testing winning products", points: { shopify: 3, magento: 0 } },
        { text: "Classic DTC B2C brand", points: { shopify: 3, magento: 0 } },
        { text: "B2C + a bit of simple B2B", points: { shopify: 2, magento: 1 } },
        { text: "Complex B2B (per-client pricing, credit terms, ERP)", points: { shopify: 0, magento: 3 } }
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
    progressLabel.textContent = 'Question ' + (state.currentQuestion + 1) + ' of ' + questions.length;
    progressPercent.textContent = pct + '%';

    prevBtn.style.visibility = state.currentQuestion === 0 ? 'hidden' : 'visible';
    nextBtn.disabled = state.answers[state.currentQuestion] === null;
    nextBtn.textContent = state.currentQuestion === questions.length - 1 ? "See my verdict →" : "Next →";
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
      badge = "✅ Very clear verdict";
      title = "Shopify, no question";
      text = "Your profile checks every Shopify box: no in-house dev, tight budget, need to launch fast, and dropshipping/DTC ecosystem. Magento would be technical and financial overkill. With Copyfy, you can deploy an AI-generated Shopify store in 5 minutes from a product URL, without touching a single line of code.";
      ctaText = "Launch my store with Copyfy →";
    } else if (diff >= 3) {
      badge = "✅ Clear verdict";
      title = "Shopify is your best pick";
      text = "You could technically run Magento, but the effort-to-benefit ratio clearly tilts toward Shopify. You'll save months of setup, thousands of dollars in dev work, and you'll get access to the entire native dropshipping ecosystem. Copyfy lets you push even further with an AI-generated store and a database of winning products.";
      ctaText = "Try Copyfy free →";
    } else if (diff >= -2) {
      badge = "⚖️ Nuanced verdict";
      title = "Shopify, but consider Magento if...";
      text = "Your profile is mixed. Shopify still wins on speed and cost, unless you have very specific B2B needs or a catalog that's about to explode past 100,000 SKUs. Our advice: start on Shopify and migrate to Magento or Adobe Commerce only if you hit a real technical ceiling. Copyfy can help you validate your model quickly.";
      ctaText = "Start on Shopify with Copyfy →";
    } else {
      badge = "🏢 Enterprise profile";
      title = "Magento (or Adobe Commerce) can make sense";
      text = "Your profile is rare: available dev team, massive catalog or complex B2B, enterprise budget and long timeline. Magento or Adobe Commerce can legitimately beat Shopify in your case. That said, Shopify Plus still deserves a look: brands are migrating from Adobe Commerce to Shopify Plus at a 2-to-1 ratio.";
      ctaText = "Check out Copyfy anyway →";
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
        '<a href="https://app.copyfy.io/login?lang=en&utm_source=blog_seo" target="_blank" rel="noopener" class="copyfy-quiz-cta-link"><button type="button" class="copyfy-quiz-btn copyfy-quiz-btn-primary">' + ctaText + '</button></a>' +
        '<button type="button" class="copyfy-quiz-restart" id="copyfy-restart-btn">Restart the quiz</button>' +
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
