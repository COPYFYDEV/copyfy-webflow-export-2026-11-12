
(function() {
'use strict';
var RATE = 0.30;
var PLAN_PRICE = 89;
var L = {
fr: ['fr-FR', 'Simulateur de revenu', '30 % de commission récurrente sur le plan Growth, chaque mois, tant que vos filleuls restent abonnés.', 'Versement', '/mois', 'filleul', 'filleuls', 'Devenir affilié'],
en: ['en-US', 'Revenue simulator', '30% recurring commission on the Growth plan, every month, for as long as your referrals stay subscribed.', 'Payout', '/month', 'referral', 'referrals', 'Become an affiliate'],
es: ['es-ES', 'Simulador de ingresos', '30 % de comisión recurrente en el plan Growth, cada mes, mientras tus referidos sigan suscritos.', 'Pago', '/mes', 'referido', 'referidos', 'Hazte afiliado'],
nl: ['nl-NL', 'Inkomstensimulator', '30% terugkerende commissie op het Growth-abonnement, elke maand, zolang je referrals geabonneerd blijven.', 'Uitbetaling', '/maand', 'referral', 'referrals', 'Word affiliate'],
de: ['de-DE', 'Einnahmen-Rechner', '30 % wiederkehrende Provision auf den Growth-Plan, jeden Monat, solange deine Empfehlungen abonniert bleiben.', 'Auszahlung', '/Monat', 'Empfehlung', 'Empfehlungen', 'Partner werden']
};
var m = location.pathname.match(/^\/(en|es|nl|de)(\/|$)/);
var t = L[m ? m[1] : 'fr'];
var el = function(id) { return document.getElementById('copyfy-affsim-' + id); };
var euro = function(v) {
return new Intl.NumberFormat(t[0], {
style: 'currency', currency: 'EUR',
minimumFractionDigits: 0, maximumFractionDigits: 0
}).format(v);
};
var range = el('range');
var bubble = el('bubble');
var payout = el('payout');
var pill = el('pill');
el('title').textContent = t[1];
el('sub').textContent = t[2];
el('label').textContent = t[3];
el('unit').textContent = t[4];
el('cta').textContent = t[7];
range.setAttribute('aria-label', t[6]);
function render() {
var refs = parseInt(range.value, 10) || 0;
var pct = (refs - range.min) / (range.max - range.min);
range.style.background =
'linear-gradient(90deg, #0c6cfb 0%, #0c6cfb ' + (pct * 100) + '%, #ffffff1a ' + (pct * 100) + '%, #ffffff1a 100%)';
var thumb = 24;
bubble.style.left = (pct * (range.offsetWidth - thumb) + thumb / 2) + 'px';
bubble.textContent = refs;
payout.textContent = euro(refs * PLAN_PRICE * RATE);
pill.textContent = refs + ' ' + (refs > 1 ? t[6] : t[5]);
}
range.addEventListener('input', render);
window.addEventListener('resize', render);
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', render);
} else {
render();
}
})();
