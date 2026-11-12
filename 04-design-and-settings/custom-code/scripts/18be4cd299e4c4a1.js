
 const verdicts = {"0": {"emoji": "⚪", "text": "À compléter", "icon": "🔎", "title": "Points de préparation", "desc": "Un point bloquant de conformité ou de trésorerie suffit à suspendre le lancement. Les cases cochées ne garantissent aucun bénéfice."}, "1": {"emoji": "⚪", "text": "À compléter", "icon": "🔎", "title": "Points de préparation", "desc": "Un point bloquant de conformité ou de trésorerie suffit à suspendre le lancement. Les cases cochées ne garantissent aucun bénéfice."}, "2": {"emoji": "⚪", "text": "À compléter", "icon": "🔎", "title": "Points de préparation", "desc": "Un point bloquant de conformité ou de trésorerie suffit à suspendre le lancement. Les cases cochées ne garantissent aucun bénéfice."}, "3": {"emoji": "⚪", "text": "À compléter", "icon": "🔎", "title": "Points de préparation", "desc": "Un point bloquant de conformité ou de trésorerie suffit à suspendre le lancement. Les cases cochées ne garantissent aucun bénéfice."}, "4": {"emoji": "⚪", "text": "À vérifier", "icon": "🔎", "title": "Points de préparation", "desc": "Un point bloquant de conformité ou de trésorerie suffit à suspendre le lancement. Les cases cochées ne garantissent aucun bénéfice."}, "5": {"emoji": "⚪", "text": "À vérifier", "icon": "🔎", "title": "Points de préparation", "desc": "Un point bloquant de conformité ou de trésorerie suffit à suspendre le lancement. Les cases cochées ne garantissent aucun bénéfice."}, "6": {"emoji": "⚪", "text": "À vérifier", "icon": "🔎", "title": "Points de préparation", "desc": "Un point bloquant de conformité ou de trésorerie suffit à suspendre le lancement. Les cases cochées ne garantissent aucun bénéfice."}, "7": {"emoji": "⚪", "text": "À vérifier", "icon": "🔎", "title": "Points de préparation", "desc": "Un point bloquant de conformité ou de trésorerie suffit à suspendre le lancement. Les cases cochées ne garantissent aucun bénéfice."}, "8": {"emoji": "✅", "text": "Prêt pour les tests", "icon": "🔎", "title": "Points de préparation", "desc": "Un point bloquant de conformité ou de trésorerie suffit à suspendre le lancement. Les cases cochées ne garantissent aucun bénéfice."}};

 function toggleCheck(item) {
 item.classList.toggle('checked');
 item.querySelector('.checkbox').classList.add('pop');
 setTimeout(() => item.querySelector('.checkbox').classList.remove('pop'), 200);
 updateScore();
 }

 function updateScore() {
 const checked = document.querySelectorAll('.checklist-item.checked').length;
 const percent = (checked / 8) * 100;
 
 document.getElementById('scoreNum').textContent = checked;
 
 const gauge = document.getElementById('gaugeFill');
 gauge.style.width = percent + '%';
 
 const circle = document.getElementById('scoreCircle');
 const angle = (checked / 8) * 360;
 circle.style.background = `conic-gradient(white 0deg, white ${angle}deg, rgba(255,255,255,0.2) ${angle}deg)`;
 
 const verdict = verdicts[checked];
 document.getElementById('scoreVerdict').innerHTML = `
 <span class="verdict-emoji">${verdict.emoji}</span>
 <span style="color: white !important;">${verdict.text}</span>
 `;
 
 document.getElementById('verdictMsgIcon').textContent = verdict.icon;
 document.getElementById('verdictMsgTitle').textContent = verdict.title;
 document.getElementById('verdictMsgDesc').textContent = verdict.desc;
 
 const msgBox = document.getElementById('verdictMessage');
 if (checked >= 6) {
 msgBox.style.background = 'rgba(255,255,255,0.15)';
 msgBox.style.borderColor = 'rgba(255,255,255,0.3)';
 } else if (checked >= 4) {
 msgBox.style.background = 'rgba(255,255,255,0.12)';
 msgBox.style.borderColor = 'rgba(255,255,255,0.25)';
 } else if (checked >= 1) {
 msgBox.style.background = 'rgba(255,255,255,0.08)';
 msgBox.style.borderColor = 'rgba(255,255,255,0.15)';
 } else {
 msgBox.style.background = 'rgba(255,255,255,0.08)';
 msgBox.style.borderColor = 'rgba(255,255,255,0.12)';
 }
 }

 function resetChecklist() {
 document.querySelectorAll('.checklist-item').forEach(item => {
 item.classList.remove('checked');
 });
 updateScore();
 }

 updateScore();
 