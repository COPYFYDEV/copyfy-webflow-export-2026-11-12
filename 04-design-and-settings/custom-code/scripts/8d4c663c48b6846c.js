
 const verdicts = {"0": {"emoji": "⚪", "text": "Por completar", "icon": "🔎", "title": "Pontos de preparação", "desc": "Um bloqueio de conformidade ou tesouraria basta para suspender o lançamento. As caixas assinaladas não garantem lucro."}, "1": {"emoji": "⚪", "text": "Por completar", "icon": "🔎", "title": "Pontos de preparação", "desc": "Um bloqueio de conformidade ou tesouraria basta para suspender o lançamento. As caixas assinaladas não garantem lucro."}, "2": {"emoji": "⚪", "text": "Por completar", "icon": "🔎", "title": "Pontos de preparação", "desc": "Um bloqueio de conformidade ou tesouraria basta para suspender o lançamento. As caixas assinaladas não garantem lucro."}, "3": {"emoji": "⚪", "text": "Por completar", "icon": "🔎", "title": "Pontos de preparação", "desc": "Um bloqueio de conformidade ou tesouraria basta para suspender o lançamento. As caixas assinaladas não garantem lucro."}, "4": {"emoji": "⚪", "text": "A verificar", "icon": "🔎", "title": "Pontos de preparação", "desc": "Um bloqueio de conformidade ou tesouraria basta para suspender o lançamento. As caixas assinaladas não garantem lucro."}, "5": {"emoji": "⚪", "text": "A verificar", "icon": "🔎", "title": "Pontos de preparação", "desc": "Um bloqueio de conformidade ou tesouraria basta para suspender o lançamento. As caixas assinaladas não garantem lucro."}, "6": {"emoji": "⚪", "text": "A verificar", "icon": "🔎", "title": "Pontos de preparação", "desc": "Um bloqueio de conformidade ou tesouraria basta para suspender o lançamento. As caixas assinaladas não garantem lucro."}, "7": {"emoji": "⚪", "text": "A verificar", "icon": "🔎", "title": "Pontos de preparação", "desc": "Um bloqueio de conformidade ou tesouraria basta para suspender o lançamento. As caixas assinaladas não garantem lucro."}, "8": {"emoji": "✅", "text": "Pronto para testes", "icon": "🔎", "title": "Pontos de preparação", "desc": "Um bloqueio de conformidade ou tesouraria basta para suspender o lançamento. As caixas assinaladas não garantem lucro."}};

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
 