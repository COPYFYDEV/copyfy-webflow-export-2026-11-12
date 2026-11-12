
 const verdicts = {"0": {"emoji": "⚪", "text": "Por completar", "icon": "🔎", "title": "Puntos de preparación", "desc": "Un bloqueo de conformidad o tesorería basta para suspender el lanzamiento. Marcar casillas no garantiza beneficios."}, "1": {"emoji": "⚪", "text": "Por completar", "icon": "🔎", "title": "Puntos de preparación", "desc": "Un bloqueo de conformidad o tesorería basta para suspender el lanzamiento. Marcar casillas no garantiza beneficios."}, "2": {"emoji": "⚪", "text": "Por completar", "icon": "🔎", "title": "Puntos de preparación", "desc": "Un bloqueo de conformidad o tesorería basta para suspender el lanzamiento. Marcar casillas no garantiza beneficios."}, "3": {"emoji": "⚪", "text": "Por completar", "icon": "🔎", "title": "Puntos de preparación", "desc": "Un bloqueo de conformidad o tesorería basta para suspender el lanzamiento. Marcar casillas no garantiza beneficios."}, "4": {"emoji": "⚪", "text": "Por verificar", "icon": "🔎", "title": "Puntos de preparación", "desc": "Un bloqueo de conformidad o tesorería basta para suspender el lanzamiento. Marcar casillas no garantiza beneficios."}, "5": {"emoji": "⚪", "text": "Por verificar", "icon": "🔎", "title": "Puntos de preparación", "desc": "Un bloqueo de conformidad o tesorería basta para suspender el lanzamiento. Marcar casillas no garantiza beneficios."}, "6": {"emoji": "⚪", "text": "Por verificar", "icon": "🔎", "title": "Puntos de preparación", "desc": "Un bloqueo de conformidad o tesorería basta para suspender el lanzamiento. Marcar casillas no garantiza beneficios."}, "7": {"emoji": "⚪", "text": "Por verificar", "icon": "🔎", "title": "Puntos de preparación", "desc": "Un bloqueo de conformidad o tesorería basta para suspender el lanzamiento. Marcar casillas no garantiza beneficios."}, "8": {"emoji": "✅", "text": "Listo para pruebas", "icon": "🔎", "title": "Puntos de preparación", "desc": "Un bloqueo de conformidad o tesorería basta para suspender el lanzamiento. Marcar casillas no garantiza beneficios."}};

 function toggleCheck(item) {
 item.classList.toggle('checked');
 item.querySelector('.checkbox').classList.add('pop');
 setTimeout(() => item.querySelector('.checkbox').classList.remove('pop'), 300);
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
 <span style="color: white;">${verdict.text}</span>
 `;
 
 document.getElementById('verdictMsgIcon').textContent = verdict.icon;
 document.getElementById('verdictMsgTitle').textContent = verdict.title;
 document.getElementById('verdictMsgDesc').textContent = verdict.desc;
 
 const msgBox = document.getElementById('verdictMessage');
 if (checked >= 6) {
 msgBox.style.background = 'rgba(255,255,255,0.2)';
 msgBox.style.borderColor = 'rgba(255,255,255,0.4)';
 } else if (checked >= 4) {
 msgBox.style.background = 'rgba(255,255,255,0.15)';
 msgBox.style.borderColor = 'rgba(255,255,255,0.3)';
 } else if (checked >= 1) {
 msgBox.style.background = 'rgba(255,255,255,0.1)';
 msgBox.style.borderColor = 'rgba(255,255,255,0.2)';
 } else {
 msgBox.style.background = 'rgba(255,255,255,0.1)';
 msgBox.style.borderColor = 'rgba(255,255,255,0.15)';
 }
 }

 function resetChecklist() {
 document.querySelectorAll('.checklist-item').forEach(item => {
 item.classList.remove('checked');
 });
 updateScore();
 }

 updateScore();
 