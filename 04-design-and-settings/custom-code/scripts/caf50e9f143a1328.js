
(()=>{function init(){
const root=document.getElementById('wip-blog-design');if(!root||root.querySelector('.resource-pagination'))return;
if(!['copyfy-vs','alternatives'].includes(root.dataset.resourceFamily))return;
const grid=root.querySelector('#resource-grid-slot .collection-list-blog'),items=grid?[...grid.children].filter(e=>e.classList.contains('w-dyn-item')):[];
const size=9,pages=Math.ceil(items.length/size);if(pages<=1)return;
const lang=(document.documentElement.lang||'fr').split('-')[0],labels={fr:['Pagination des articles','Précédent','Suivant','Page'],en:['Article pagination','Previous','Next','Page'],es:['Paginación de artículos','Anterior','Siguiente','Página'],nl:['Paginering van artikelen','Vorige','Volgende','Pagina'],de:['Artikelseiten','Zurück','Weiter','Seite'],pt:['Paginação dos artigos','Anterior','Seguinte','Página']}[lang]||['Article pagination','Previous','Next','Page'];
const nav=document.createElement('nav');nav.className='resource-pagination';nav.setAttribute('aria-label',labels[0]);root.querySelector('#resource-grid-slot').append(nav);
let current=1;
function fromLocation(){const value=new URLSearchParams(location.search).get('page'),legacy=location.hash.match(/^#articles-page-(\d+)$/);return Math.max(1,Math.min(pages,value&&/^\d+$/.test(value)?Number(value):legacy?Number(legacy[1]):1));}
function hrefFor(page){return location.pathname+(page>1?'?page='+page:'');}
function show(page,scroll=false){current=page;items.forEach((item,i)=>item.hidden=i<(page-1)*size||i>=page*size);nav.replaceChildren();
function link(text,target,disabled=false,number=false,rel=''){const a=document.createElement(disabled?'span':'a');a.textContent=text;if(disabled){a.className='is-disabled';a.setAttribute('aria-disabled','true');}else{a.href=hrefFor(target);if(rel)a.rel=rel;if(number)a.setAttribute('aria-label',labels[3]+' '+target);if(number&&target===current)a.setAttribute('aria-current','page');a.addEventListener('click',event=>{if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();history.pushState(null,'',a.href);show(target,true);});}nav.append(a);}
link(labels[1],page-1,page===1,false,'prev');for(let n=1;n<=pages;n++)link(String(n),n,false,true);link(labels[2],page+1,page===pages,false,'next');
if(scroll)root.querySelector('#resource-grid-slot').scrollIntoView({block:'start',behavior:'auto'});
}
show(fromLocation());addEventListener('popstate',()=>show(fromLocation()));addEventListener('hashchange',()=>show(fromLocation()));
}init();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);})();
