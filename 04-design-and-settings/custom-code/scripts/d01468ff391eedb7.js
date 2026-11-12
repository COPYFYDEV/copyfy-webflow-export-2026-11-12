
(()=>{
function init(){
const root=document.getElementById('wip-blog-design');if(!root||root.dataset.cmsReady)return;
const article=root.querySelector('#wip-blog-design-rich-text');if(!article)return;root.dataset.cmsReady='true';const quiz=article.querySelector('#copyfyQuizSW');if(quiz&&!quiz.dataset.copyfyInit){quiz.querySelectorAll('script:not([src])').forEach(old=>{const script=document.createElement('script');script.textContent=old.textContent;old.replaceWith(script);});}article.removeAttribute('data-wip-placeholder');
const breadcrumb=root.querySelector('#wip-cms-breadcrumb-name');if(breadcrumb){const full=breadcrumb.textContent.trim();let short=full.split(/[:,]|\s[–—]\s/)[0].trim();if(short.length>52)short=short.slice(0,52).replace(/\s+\S*$/,'')+'…';breadcrumb.textContent=short;breadcrumb.setAttribute('title',full);breadcrumb.setAttribute('aria-label',full);}
const tldr=root.querySelector('#wip-blog-tldr-box'), tldrText=root.querySelector('#wip-blog-tldr-text');
if(tldr)tldr.hidden=!tldrText?.textContent.trim();
if(tldr&&!tldr.hidden){const first=article.firstElementChild;if(first&&/^en bref\s*:?$/i.test(first.textContent.trim())&&first.nextElementSibling?.tagName==='UL'){first.nextElementSibling.hidden=true;first.hidden=true;}}
const read=root.querySelector('#wip-cms-read-time');
if(read&&!read.textContent.trim()){const copy=article.cloneNode(true);copy.querySelectorAll('script,style,[hidden],#copyfyQuizSW,.cfcta-card,.cfuc-box').forEach(e=>e.remove());const words=copy.textContent.trim().split(/\s+/).filter(Boolean).length;read.textContent=Math.max(1,Math.ceil(words/220))+' min de lecture';read.classList.remove('w-dyn-bind-empty');}
const date=root.querySelector('#wip-cms-updated');if(date&&!date.textContent.trim()){date.hidden=true;if(date.previousElementSibling)date.previousElementSibling.hidden=true;}const picture=root.querySelector('#wip-cms-author-picture');if(picture&&(!picture.getAttribute('src')||picture.classList.contains('w-dyn-bind-empty')))picture.parentElement.hidden=true;
const headings=[...article.querySelectorAll(':scope > h2')];
const toc=root.querySelector('.wip-blog-div-041');let links=[];
if(toc){toc.replaceChildren();headings.forEach((h,i)=>{if(!h.id)h.id='article-section-'+(i+1);const a=document.createElement('a');a.className='wip-cms-toc-link';a.href='#'+h.id;a.textContent=h.textContent.trim();a.addEventListener('click',e=>{e.preventDefault();h.scrollIntoView({behavior:'smooth',block:'start'});});toc.append(a);links.push(a);});toc.parentElement.hidden=headings.length===0;}
article.querySelectorAll('table').forEach(table=>{const header=table.rows[0];if(header)header.classList.add('wip-cms-table-header');const wrap=document.createElement('div');wrap.className='wip-cms-table-scroll';wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label','Tableau comparatif');table.before(wrap);wrap.append(table);});
const author=root.querySelector('.wip-blog-author');if(author&&!author.querySelector('.wip-blog-div-074')?.textContent.trim())author.hidden=true;
if(author&&author.querySelector('.wip-blog-div-074')?.textContent.trim()==='Thomas Salic'){const bio=author.querySelector('.wip-blog-div-075');if(bio)bio.textContent="15 M€+ de revenus générés en e-commerce depuis 2017. Fondateur de plusieurs marques et SaaS.";}
root.querySelectorAll('[id^="wip-cms-social-"]').forEach(a=>{a.hidden=!a.getAttribute('href')||a.getAttribute('href')==='#'||a.classList.contains('w-dyn-bind-empty');});
const category=root.querySelector('.wip-blog-a-021')?.textContent.trim(),title=root.querySelector('h1')?.textContent.trim();let count=0;
const related=root.querySelector('.wip-blog-related-2');related?.querySelectorAll('.wip-blog-related-card').forEach(card=>{const same=card.querySelector('.wip-cms-related-category')?.textContent.trim()===category;const current=card.querySelector('.wip-blog-related-title')?.textContent.trim()===title;const show=same&&!current&&count<6;card.closest('.w-dyn-item').hidden=!show;if(show)count++;});if(related)related.hidden=count===0;
const progress=[...root.querySelectorAll('[data-wip-progress]')],percent=root.querySelector('[data-wip-percent]'),sticky=root.querySelector('[data-wip-sticky]');let pending=false;
function update(){pending=false;const box=article.getBoundingClientRect(),total=Math.max(article.offsetHeight-innerHeight+100,1),value=Math.min(100,Math.max(0,(-box.top+100)/total*100));progress.forEach(e=>e.style.width=value+'%');if(percent)percent.textContent=Math.round(value)+' %';if(sticky)sticky.dataset.visible=String(value>=50&&box.bottom>0);let active=0;headings.forEach((h,i)=>{if(h.getBoundingClientRect().top<=150)active=i;});links.forEach((a,i)=>{if(i===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update);}},{passive:true});addEventListener('resize',update);article.querySelectorAll('img').forEach(img=>img.addEventListener('load',update));update();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
