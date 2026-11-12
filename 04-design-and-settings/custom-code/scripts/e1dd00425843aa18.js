
(()=>{function init(){
const root=document.getElementById('wip-blog-design');if(!root||root.querySelector('.resource-pagination'))return;
if(!['copyfy-vs','alternatives'].includes(root.dataset.resourceFamily))return;
const grid=root.querySelector('#resource-grid-slot .collection-list-blog'),items=grid?[...grid.children].filter(e=>e.classList.contains('w-dyn-item')):[];
const size=9,pages=Math.ceil(items.length/size);if(pages<=1)return;
const lang=(document.documentElement.lang||'fr').split('-')[0],labels={fr:['Pagination des articles','Précédent','Suivant','Page'],en:['Article pagination','Previous','Next','Page'],es:['Paginación de artículos','Anterior','Siguiente','Página'],nl:['Paginering van artikelen','Vorige','Volgende','Pagina'],de:['Artikelseiten','Zurück','Weiter','Seite'],pt:['Paginação dos artigos','Anterior','Seguinte','Página']}[lang]||['Article pagination','Previous','Next','Page'];
const nav=document.createElement('nav');nav.className='resource-pagination';nav.setAttribute('aria-label',labels[0]);root.querySelector('#resource-grid-slot').append(nav);
let current=1;
function fromHash(){const m=location.hash.match(/^#articles-page-(\d+)$/);return Math.max(1,Math.min(pages,m?Number(m[1]):1));}
function show(page,scroll=false){current=page;items.forEach((item,i)=>item.hidden=i<(page-1)*size||i>=page*size);nav.replaceChildren();
function button(text,target,disabled=false,number=false){const b=document.createElement('button');b.type='button';b.textContent=text;b.disabled=disabled;if(number)b.setAttribute('aria-label',labels[3]+' '+target);if(number&&target===current)b.setAttribute('aria-current','page');b.addEventListener('click',()=>{history.pushState(null,'','#articles-page-'+target);show(target,true);});nav.append(b);}
button(labels[1],page-1,page===1);for(let n=1;n<=pages;n++)button(String(n),n,false,true);button(labels[2],page+1,page===pages);
if(scroll)root.querySelector('#resource-grid-slot').scrollIntoView({block:'start',behavior:'auto'});
}
show(fromHash());addEventListener('popstate',()=>show(fromHash()));addEventListener('hashchange',()=>show(fromHash()));
}init();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);})();
