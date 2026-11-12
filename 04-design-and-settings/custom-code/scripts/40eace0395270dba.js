
(async function(){'use strict';
const path=(document.body?.getAttribute('data-copyfy-preview-path')||location.pathname).replace(/\/$/,'')||'/';
if(/\/webinar$/.test(path)||path==='/freetrial-en')return;
const lang=path.match(/^\/(en|es|nl|de|pt)(?:\/|$)/)?.[1]||'fr';
document.documentElement.lang=lang;
const sources={"fr":"https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ac151432d077bc9c0fad11f_copyfy-ui-fr-c3558764c427.txt","en":"https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ac1546b3984dad11256bf76_copyfy-ui-en-34f7702bae49.txt","es":"https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ac1546d2a512c9d872a1b4d_copyfy-ui-es-8c227ea75fb3.txt","nl":"https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ac1546e089460111977eaa1_copyfy-ui-nl-4100b2a3a244.txt","de":"https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ac154707d68e43d4387cf9c_copyfy-ui-de-2a1d4afe89dd.txt","pt":"https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/6ac154728eb8d5410a0a7459_copyfy-ui-pt-af32bc8f7af2.txt"};
if(!sources[lang])return;
const response=await fetch(sources[lang],{credentials:'omit'});if(!response.ok)throw new Error('Translation data unavailable');
const data=await response.json();
const text=Object.create(null),rich=Object.create(null),dest=data.links||{};
for(const [source,[value,paths]] of Object.entries(data.text||{}))if(paths.includes(path))text[source]=value;
for(const [source,[value,paths]] of Object.entries(data.rich||{}))if(paths.includes(path))rich[source]=value;
const normalize=s=>s.replace(/\s+/g,' ').trim().replace(/\s+([,.;:!?%)])/g,'$1');
function replace(node){const source=normalize(node.nodeValue||''),arrow=source.match(/\s*([→↗])$/);const value=text[source]||(arrow&&text[source.slice(0,arrow.index)]&&text[source.slice(0,arrow.index)]+' '+arrow[1]);if(value)node.nodeValue=(node.nodeValue.match(/^\s*/)||[''])[0]+value+(node.nodeValue.match(/\s*$/)||[''])[0];}
function shape(el){return Array.from(el.children).map(c=>c.tagName+'('+shape(c)+')').join('|');}
function copyText(el,template){
 const children=Array.from(el.children);let i=0;
 const nodes=Array.from(template.childNodes).map(n=>{
  if(n.nodeType===Node.ELEMENT_NODE){const existing=children[i++];copyText(existing,n);return existing;}
  return document.createTextNode(n.nodeValue||'');
 });
 el.replaceChildren(...nodes);
}
function apply(){
 for(const [source,[value,paths]] of Object.entries(data.seo||{})){
  if(!paths.includes(path))continue;
  if(normalize(document.title)===source)document.title=value;
  document.querySelectorAll('meta[name=description],meta[property="og:title"],meta[property="og:description"]').forEach(m=>{if(normalize(m.content)===source)m.content=value;});
 }
 document.querySelectorAll('p,li,h1,h2,h3,h4,h5,h6,blockquote,div,span,a,button,label').forEach(el=>{
  if(!el.children.length||el.closest('script,style,pre,code,textarea,select,#copyfyQuizSW,[data-copyfy-quiz]'))return;
  const value=rich[normalize(el.textContent||'')];if(!value)return;
  const template=document.createElement('template');template.innerHTML=value;
  if(shape(el)!==shape(template.content))return;
  copyText(el,template.content);
 });
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(node){return node.parentElement?.closest('script,style,pre,code,textarea,select,#copyfyQuizSW,[data-copyfy-quiz]')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;}});
 while(walker.nextNode())replace(walker.currentNode);
 document.querySelectorAll('[alt],[aria-label],[title],[placeholder]').forEach(el=>{
  if(el.closest('#copyfyQuizSW,[data-copyfy-quiz]'))return;
  for(const a of ['alt','aria-label','title','placeholder']){const old=el.getAttribute(a),v=old&&text[normalize(old)];if(v&&old!==v)el.setAttribute(a,v);}
 });
 document.querySelectorAll('a[href]').forEach(a=>{
  if(a.hasAttribute('hreflang')||a.closest('.locale-link,.locales-wrapper'))return;
  const old=a.href,value=dest[old];if(value&&value!==old)a.setAttribute('href',value);
  if(/\/curriculum$/.test(path)){const legal={fr:['politique-de-confidentialite','conditions-dutilisation','cgv'],en:['en/privacy-policy','en/terms-of-use','en/cgv'],es:['es/politica-de-confidencialidad','es/condiciones-de-uso','es/cgv'],nl:['nl/politique-de-confidentialite','nl/gebruiksvoorwaarden','nl/cgv'],de:['de/politique-de-confidentialite','de/conditions-dutilisation','de/cgv'],pt:['pt/politica-de-privacidade','pt/conditions-dutilisation','pt/condicoes-gerais-venda-coaching']};const i=['https://www.copyfy.io/privacy-policy','https://www.copyfy.io/terms-of-use','https://www.copyfy.io/terms-of-sale'].indexOf(old);if(i>=0)a.setAttribute('href','https://www.copyfy.io/'+legal[lang][i]);}
  const u=new URL(a.href);if(u.hostname==='app.copyfy.io'&&['/register','/checkout/register'].includes(u.pathname)){u.pathname='/register';u.searchParams.set('lang',lang);if(u.href!==a.href)a.setAttribute('href',u.href);}
 });
}
function init(){apply();document.body.setAttribute('data-copyfy-translations-ready',lang);window.Webflow=window.Webflow||[];window.Webflow.push(apply);window.addEventListener('load',apply,{once:true});setTimeout(apply,300);setTimeout(apply,1200);
 let scheduled=false;const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;apply();});});
 observer.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['href','alt','aria-label','title','placeholder']});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})().catch(error=>console.error('Copyfy UI localization:',error));
