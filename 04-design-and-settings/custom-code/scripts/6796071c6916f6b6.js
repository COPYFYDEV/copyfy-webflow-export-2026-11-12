
(function () {
var ICON_MAP = {'product':'ri:shopping-bag-3-line','traffic-growth':'ri:line-chart-line','monthly-visits':'ri:user-3-line','active-ads':'ri:megaphone-line','creation-date':'ri:calendar-line','markets':'ri:store-2-line'};
var SHOPS = [
{ n:'Steve Madden', d:'stevemadden.com', launch:'Launched 1990', ads:280, adsD:'(+58)', tr:'6.9M', trD:52, rev:'16.6M - 22.5M $',
ang:32, rad:.62, hero:true,
logo:'https://bucket.copyfy.io/screenshots/shop-18384-stevemadden.com-1779308520315.png',
spark:'M0 20L8 19L16 17L24 16L32 12L40 9L48 6L56 3' },
{ n:'Fashion Nova', d:'fashionnova.com', launch:'Launched 2013', ads:259, adsD:'(+41)', tr:'35.2M', trD:31, rev:'32.4M - 43.8M €',
ang:78, rad:.50,
logo:'https://bucket.copyfy.io/screenshots/shop-2168-fashionnova.com-1770932196057.png',
spark:'M0 18L8 16L16 17L24 13L32 12L40 9L48 8L56 5' },
{ n:'JB Hi-Fi', d:'jbhifi.com.au', launch:'Launched 2000', ads:182, adsD:'(+24)', tr:'20.8M', trD:18, rev:'164.4M - 222.5M A$',
ang:126, rad:.72,
logo:'https://bucket.copyfy.io/screenshots/shop-139410-jbhifi.com.au-1779247883686.png',
spark:'M0 16L8 15L16 16L24 13L32 13L40 11L48 10L56 8' },
{ n:'Gymshark', d:'gymshark.com', launch:'Launched 2012', ads:341, adsD:'(+63)', tr:'28.1M', trD:27, rev:'39.2M - 51.4M £',
ang:178, rad:.44,  logo:'https://www.google.com/s2/favicons?domain=gymshark.com&sz=128',
spark:'M0 19L8 18L16 16L24 15L32 12L40 10L48 7L56 5' },
{ n:'Alo Yoga', d:'aloyoga.com', launch:'Launched 2007', ads:298, adsD:'(+35)', tr:'18.4M', trD:22, rev:'27.8M - 36.1M $',
ang:236, rad:.78, logo:'https://www.google.com/s2/favicons?domain=aloyoga.com&sz=128',
spark:'M0 17L8 17L16 15L24 14L32 12L40 11L48 9L56 7' },
{ n:'Represent', d:'representclo.com', launch:'Launched 2011', ads:164, adsD:'(+19)', tr:'9.7M', trD:15, rev:'12.4M - 17.9M £',
ang:300, rad:.60, logo:'https://www.google.com/s2/favicons?domain=representclo.com&sz=128',
spark:'M0 15L8 15L16 14L24 13L32 12L40 11L48 10L56 9' }
];
var NOISE = [{ang:58,rad:.86},{ang:205,rad:.30},{ang:330,rad:.88}];
var runId = 0;
function sleep(ms, id){ return new Promise(function(r){ setTimeout(function(){ r(id === runId); }, ms); }); }
function polar(ang, rad){ var t = ang*Math.PI/180; return { x:50 + rad*50*Math.sin(t), y:50 - rad*50*Math.cos(t) }; }
function fmtInt(v){ return Math.round(v).toLocaleString('en-US'); }
function countUp(el, to, dur, fmt, id){
var t0 = performance.now();
(function step(t){ if(id !== runId) return; var p = Math.min((t-t0)/dur,1), e = 1-Math.pow(1-p,3); el.textContent = fmt(to*e); if(p<1) requestAnimationFrame(step); })(t0);
}
function initInstance(wrap){
if(wrap.getAttribute('data-cfrad-ready') === '1') return;
wrap.setAttribute('data-cfrad-ready','1');
var $ = function(s){ return wrap.querySelector(s); };
Object.keys(ICON_MAP).forEach(function(k){
var c = wrap.querySelector('.cfrad-chip[data-chip="'+k+'"] .cfrad-chip-icon');
if(c) c.innerHTML = '<iconify-icon icon="'+ICON_MAP[k]+'" style="font-size:12px;line-height:1;color:currentColor"></iconify-icon>';
});
var radar = $('.cfrad-radar'), rows = $('.cfrad-rows');
function build(){
radar.classList.remove('live');
radar.querySelectorAll('.cfrad-blip').forEach(function(b){ b.remove(); });
$('.cfrad-lock').classList.remove('on');
wrap.querySelectorAll('.cfrad-chip[data-selected="true"]').forEach(function(c){ c.removeAttribute('data-selected'); });
SHOPS.forEach(function(s,i){
var b = document.createElement('span'); b.className='cfrad-blip'; b.dataset.k=i;
var p = polar(s.ang, s.rad); b.style.left=p.x+'%'; b.style.top=p.y+'%'; radar.appendChild(b);
});
NOISE.forEach(function(nz){
var b = document.createElement('span'); b.className='cfrad-blip weak';
var p = polar(nz.ang, nz.rad); b.style.left=p.x+'%'; b.style.top=p.y+'%'; radar.appendChild(b);
});
rows.innerHTML = '';
SHOPS.forEach(function(s,i){
var r = document.createElement('div');
r.className = 'cfrad-row' + (s.hero ? ' hero' : ''); r.dataset.k = i;
r.innerHTML =
'<div class="cfrad-shop">'+
(s.logo ? '<img class="cfrad-logo'+(s.logo.indexOf('favicons')>-1?' fav':'')+'" src="'+s.logo+'" alt="" onerror="this.style.visibility=\'hidden\'">' : '<span class="cfrad-logo-ph"></span>')+
'<div class="cfrad-shop-info">'+
'<span class="cfrad-shop-name">'+s.n+'</span>'+
'<span class="cfrad-shop-url">www.'+s.d+'</span>'+
'<span class="cfrad-shop-launch"><svg viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" stroke="currentColor" stroke-width="1" fill="none"/></svg>'+s.launch+'</span>'+
'</div>'+
'</div>'+
'<div class="cfrad-metric">'+
'<div class="cfrad-metric-info"><span class="cfrad-num dot">'+s.ads+'</span><span class="cfrad-delta">'+s.adsD+'</span></div>'+
'</div>'+
'<div class="cfrad-metric">'+
'<div class="cfrad-metric-info"><span class="cfrad-num">'+s.tr+'</span><span class="cfrad-delta trd">(+'+(s.hero?0:s.trD)+'%)</span></div>'+
'<svg class="cfrad-spark'+(s.hero?'':' drawn')+'" viewBox="0 0 56 22" preserveAspectRatio="none">'+
'<path class="fill" d="'+s.spark+' L56 22 L0 22 Z"/><path class="l" d="'+s.spark+'"/></svg>'+
'</div>'+
'<div class="cfrad-rev">'+s.rev+'</div>';
rows.appendChild(r);
if(s.hero){
var ln = r.querySelector('path.l'); var len = ln.getTotalLength();
ln.style.strokeDasharray = len; ln.style.strokeDashoffset = len;
}
});
$('.cfrad-count').textContent = '0';
$('.cfrad-nb').textContent = '0';
}
async function run(){
var id = ++runId;
build();
if(!await sleep(600, id)) return;
radar.classList.add('live');
countUp($('.cfrad-count'), 512940, 5000, fmtInt, id);
setTimeout(function(){ if(id===runId) wrap.querySelector('.cfrad-chip[data-chip="traffic-growth"]').setAttribute('data-selected','true'); }, 500);
setTimeout(function(){ if(id===runId) wrap.querySelector('.cfrad-chip[data-chip="active-ads"]').setAttribute('data-selected','true'); }, 900);
var evts = [];
SHOPS.forEach(function(s,i){ evts.push({ t:(s.ang/360)*4200 + 500, shop:i }); });
NOISE.forEach(function(nz,i){ evts.push({ t:(nz.ang/360)*4200 + 500, weak:i }); });
evts.sort(function(a,b){ return a.t-b.t; });
var last=0, found=0;
for(var e=0; e<evts.length; e++){
var ev = evts[e];
if(!await sleep(ev.t-last, id)) return; last = ev.t;
if(ev.weak !== undefined){
wrap.querySelectorAll('.cfrad-blip.weak')[ev.weak].classList.add('on');
} else {
$('.cfrad-blip[data-k="'+ev.shop+'"]').classList.add('on');
$('.cfrad-row[data-k="'+ev.shop+'"]').classList.add('in');
found++; $('.cfrad-nb').textContent = found;
}
}
if(!await sleep(800, id)) return;
var hero = $('.cfrad-row[data-k="0"]');
var lock = $('.cfrad-lock'); var hp = polar(SHOPS[0].ang, SHOPS[0].rad);
lock.style.left = hp.x+'%'; lock.style.top = hp.y+'%'; lock.classList.add('on');
var hln = hero.querySelector('path.l');
hln.style.transition = 'stroke-dashoffset 1.15s cubic-bezier(.23,1,.32,1)';
hln.style.strokeDashoffset = 0;
hero.querySelector('.cfrad-spark').classList.add('drawn');
countUp(hero.querySelector('.trd'), 52, 1150, function(v){ return '(+'+Math.round(v)+'%)'; }, id);
if(!await sleep(2600, id)) return;
wrap.querySelectorAll('.cfrad-row').forEach(function(r){ r.classList.remove('in'); });
wrap.querySelectorAll('.cfrad-blip').forEach(function(b){ b.classList.remove('on'); });
$('.cfrad-lock').classList.remove('on');
wrap.querySelectorAll('.cfrad-chip[data-selected="true"]').forEach(function(c){ c.removeAttribute('data-selected'); });
radar.classList.remove('live');
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
function start(){ document.querySelectorAll('.cfrad-wrap').forEach(initInstance); }
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
