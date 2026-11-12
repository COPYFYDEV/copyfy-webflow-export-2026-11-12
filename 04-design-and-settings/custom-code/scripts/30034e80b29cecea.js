
(()=>{function init(){
const grid=document.querySelector('.page_wrapper .collection-list-blog');
const wrapper=grid?.closest('.collection-list-wrapper-blog'),native=wrapper?.querySelector('.w-pagination-wrapper');
if(!grid||!native||document.getElementById('copyfy-blog-pagination'))return;
const lang=(document.documentElement.lang||'fr').split('-')[0],labels={fr:['Pagination des articles','Précédent','Suivant','Page'],en:['Article pagination','Previous','Next','Page'],es:['Paginación de artículos','Anterior','Siguiente','Página'],nl:['Paginering van artikelen','Vorige','Volgende','Pagina'],de:['Artikelseiten','Zurück','Weiter','Seite'],pt:['Paginação dos artigos','Anterior','Seguinte','Página']}[lang]||['Article pagination','Previous','Next','Page'];
let signature='',nav;
function render(){
const count=native.querySelector('.w-page-count')?.textContent.match(/(\d+)\s*\/\s*(\d+)/);
const source=native.querySelector('a[href]');if(!count||!source)return;
const key=[...new URL(source.href,location.href).searchParams.keys()].find(k=>/_page$/.test(k));if(!key)return;
const current=Number(count[1]),pages=Number(count[2]);if(!current||pages<2)return;
const next=key+'|'+current+'|'+pages;if(next===signature)return;signature=next;
if(!nav){nav=document.createElement('nav');nav.id='copyfy-blog-pagination';nav.className='resource-pagination';nav.setAttribute('aria-label',labels[0]);native.after(nav);native.id='copyfy-blog-native-pagination';}
nav.replaceChildren();
function hrefFor(page){const url=new URL(location.pathname,location.origin);if(page>1)url.searchParams.set(key,String(page));return url.pathname+url.search;}
function link(text,page,disabled=false,number=false,rel=''){
const a=document.createElement(disabled?'span':'a');a.textContent=text;
if(disabled){a.className='is-disabled';a.setAttribute('aria-disabled','true');}
else{a.href=hrefFor(page);if(rel)a.rel=rel;if(number)a.setAttribute('aria-label',labels[3]+' '+page);if(number&&page===current)a.setAttribute('aria-current','page');}
nav.append(a);
}
link(labels[1],current-1,current===1,false,'prev');function ellipsis(){const span=document.createElement('span');span.textContent='…';span.className='is-ellipsis';span.setAttribute('aria-hidden','true');nav.append(span);}
if(pages<=7){for(let n=1;n<=pages;n++)link(String(n),n,false,true);}
else{const start=current<=4?2:current>=pages-3?pages-4:current-1;const end=current<=4?5:current>=pages-3?pages-1:current+1;link('1',1,false,true);if(start>2)ellipsis();for(let n=start;n<=end;n++)link(String(n),n,false,true);if(end<pages-1)ellipsis();link(String(pages),pages,false,true);}link(labels[2],current+1,current===pages,false,'next');
}
render();new MutationObserver(render).observe(native,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['href','aria-label']});
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
