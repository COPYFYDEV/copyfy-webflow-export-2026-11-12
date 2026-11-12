
(function () {
var ADS = [
{ n:'Sunnyale', c:'#F59E0B', days:'2 days', copy:'Power at your fingertips — no more crawling behind the sofa! Introducing the V…', r:'8,247', im:'18,951',
img:'https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6a1d3b68e8abdd281ddb70c5_image-1780300611129.jpg' },
{ n:'Iktops', c:'#3B82F6', days:'27 days', copy:'Chic design with built-in padding for added support 🌟 Pleated details create…', r:'7,969', im:'19,396',
img:'https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6a1d3b68a28bc3e705fd5ec2_image-1780300625230.jpg' },
{ n:'Alisonwish', c:'#E86A5E', days:'34 days', copy:'🤩 Remove loose fur, detangle knots, and massage your pet — all in one gen…', r:'6,828', im:'24,586',
img:'https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6a1d3b68acf0490feb980290_image-1780300630532.jpg' }
];
var STAR = '<svg viewBox="0 0 9 9" fill="currentColor"><path d="M4.5 .5L5.6 3.3L8.5 3.6L6.3 5.6L7 8.5L4.5 7L2 8.5L2.7 5.6L.5 3.6L3.4 3.3Z"/></svg>';
function adHTML(a){
return '<div class="cfspt-ad">'+
'<div class="cfspt-ad-header">'+
'<span class="cfspt-ad-logo" style="background:'+a.c+'">'+a.n[0]+'</span>'+
'<span class="cfspt-ad-brand"><span class="cfspt-ad-name">'+a.n+'</span><span class="cfspt-ad-active">Ad active since '+a.days+'</span></span>'+
'<span class="cfspt-ad-library"><svg viewBox="0 0 9 9" fill="none"><circle cx="3" cy="4.5" r="2" stroke="currentColor" stroke-width="1"/><circle cx="6" cy="4.5" r="2" stroke="currentColor" stroke-width="1"/></svg>Ads Library</span>'+
'</div>'+
'<div class="cfspt-ad-meta">'+
'<span class="cfspt-ad-adsets"><svg viewBox="0 0 9 9" fill="none"><rect x="1" y="1" width="3" height="3" stroke="currentColor" stroke-width="1"/><rect x="5" y="1" width="3" height="3" stroke="currentColor" stroke-width="1"/><rect x="1" y="5" width="3" height="3" stroke="currentColor" stroke-width="1"/><rect x="5" y="5" width="3" height="3" stroke="currentColor" stroke-width="1"/></svg>Used in 4 adsets</span>'+
'<span class="cfspt-ad-stars">'+STAR+STAR+STAR+STAR+STAR+'</span>'+
'</div>'+
'<div class="cfspt-ad-stats">'+
'<span class="cfspt-ad-stat-icon">⊕</span>'+
'<span class="cfspt-ad-stat"><span class="cfspt-ad-stat-label">Reach</span><span class="cfspt-ad-stat-val">'+a.r+'</span></span>'+
'<span class="cfspt-ad-stat"><span class="cfspt-ad-stat-label">Impressions</span><span class="cfspt-ad-stat-val">'+a.im+'</span></span>'+
'</div>'+
'<div class="cfspt-ad-desc">'+a.copy+'</div>'+
'<div class="cfspt-ad-thumb"><img src="'+a.img+'" alt="" loading="lazy" onerror="this.style.opacity=0"></div>'+
'</div>';
}
var runId = 0;
function sleep(ms, id){ return new Promise(function(r){ setTimeout(function(){ r(id === runId); }, ms); }); }
function fmtInt(v){ return Math.round(v).toLocaleString('en-US'); }
function countUp(el, to, dur, fmt, id){
var t0 = performance.now();
(function step(t){ if(id !== runId) return; var p = Math.min((t-t0)/dur,1), e = 1-Math.pow(1-p,3); el.textContent = fmt(to*e); if(p<1) requestAnimationFrame(step); })(t0);
}
function initInstance(wrap){
if(wrap.getAttribute('data-cfspt-ready') === '1') return;
wrap.setAttribute('data-cfspt-ready','1');
var $ = function(s){ return wrap.querySelector(s); };
var cols = $('.cfspt-cols');
var niches = wrap.querySelectorAll('.cfspt-niche'), thumb = $('.cfspt-nthumb');
function build(){
cols.innerHTML=''; cols.classList.remove('paused');
var arr = [[0,1,2,1],[2,0,1,0],[1,2,0,2]], durs=['46s','58s','40s'];
arr.forEach(function(a,i){
var col = document.createElement('div'); col.className='cfspt-col'+(i===1?' rev':'');
col.style.setProperty('--dur', durs[i]);
var st = document.createElement('div'); st.className='cfspt-colstack';
var half = a.map(function(k){ return adHTML(ADS[k]); }).join('');
st.innerHTML = half + half; col.appendChild(st); cols.appendChild(col);
});
$('.cfspt-veil').classList.remove('on'); $('.cfspt-spot').classList.remove('on');
$('.cfspt-adsets-bar').classList.remove('open');
$('.cfspt-spot .m1').textContent='0'; $('.cfspt-spot .m2').textContent='0'; $('.cfspt-spot .m3').textContent='0€';
niches.forEach(function(n){ n.classList.remove('on'); });
thumb.style.width='0px'; thumb.style.opacity='0';
}
function selectNiche(i){
niches.forEach(function(n){ n.classList.toggle('on', +n.dataset.n === i); });
var el = niches[i]; thumb.style.opacity='1'; thumb.style.left = el.offsetLeft+'px'; thumb.style.width = el.offsetWidth+'px';
}
async function run(){
var id = ++runId;
build();
if(!await sleep(900, id)) return;
selectNiche(0); if(!await sleep(1100, id)) return;
selectNiche(1); if(!await sleep(1100, id)) return;
selectNiche(2); if(!await sleep(1300, id)) return;
cols.classList.add('paused');
$('.cfspt-veil').classList.add('on');
if(!await sleep(330, id)) return;
$('.cfspt-spot').classList.add('on');
if(!await sleep(680, id)) return;
countUp($('.cfspt-spot .m1'), 6828, 1150, fmtInt, id);
countUp($('.cfspt-spot .m2'), 24586, 1350, fmtInt, id);
countUp($('.cfspt-spot .m3'), 940, 1350, function(v){ return fmtInt(v)+'€'; }, id);
if(!await sleep(1450, id)) return;
$('.cfspt-adsets-bar').classList.add('open');
if(!await sleep(2900, id)) return;
$('.cfspt-spot').classList.remove('on'); $('.cfspt-veil').classList.remove('on'); $('.cfspt-adsets-bar').classList.remove('open');
cols.classList.remove('paused');
if(!await sleep(900, id)) return;
if(id === runId) run();
}
run();
if('IntersectionObserver' in window){
var vis = true;
var io = new IntersectionObserver(function(es){ es.forEach(function(en){
if(en.isIntersecting && !vis){ vis=true; run(); } else if(!en.isIntersecting){ vis=false; runId++; }
}); }, { threshold:0.05 });
io.observe(wrap);
}
}
function start(){ document.querySelectorAll('.cfspt-wrap').forEach(initInstance); }
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
