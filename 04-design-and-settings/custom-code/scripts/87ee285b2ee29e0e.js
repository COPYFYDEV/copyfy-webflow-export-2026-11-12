
(()=>{function init(){
const root=document.getElementById("wip-blog-design");if(!root)return;
const card=root.querySelector(".wip-blog-div-077"),source=root.querySelector(".wip-blog-hero-2 a.link-button"),logo=root.querySelector(".nav-bar-3 img.logo");
if(card&&!card.dataset.railReady){
 const brand=card.querySelector(".wip-blog-div-078");if(brand&&logo){const img=logo.cloneNode(false);img.className="wip-blog-rail-logo";img.alt="Copyfy";brand.replaceChildren(img);}
 const button=card.querySelector(".wip-blog-a-083");if(button&&source){const label=button.querySelector(".wip-blog-span-084")?.textContent||button.textContent.replace("→","").trim();button.className=source.className+" wip-blog-rail-button";button.replaceChildren(...Array.from(source.childNodes,node=>node.cloneNode(true)));const text=button.querySelector("[class*=text-v2]");if(text)text.textContent=label;}
 card.dataset.railReady="true";
}
const shop=root.querySelector(".wip-blog-div-087");if(shop&&!shop.dataset.railReady){const original=shop.querySelector("a[href]");if(original){const banner=original.cloneNode(false);banner.className="wip-blog-shopify-banner w-inline-block";banner.target="_blank";banner.rel="noopener";const img=document.createElement("img");img.src="https://cdn.prod.website-files.com/66bf717325c1db31e2aded00/68c43f5e839697ad1d64253c_image%2050.webp";img.width=552;img.height=347;img.loading="lazy";const lang=(document.documentElement.lang||"fr").split("-")[0];img.alt=({fr:"Shopify à 1 $ par mois pendant 3 mois",en:"Shopify for $1 a month for 3 months",es:"Shopify por 1 $ al mes durante 3 meses",nl:"Shopify voor $1 per maand gedurende 3 maanden",de:"Shopify für 1 $ pro Monat für 3 Monate",pt:"Shopify por 1 $ por mês durante 3 meses"})[lang]||"Shopify for $1 a month for 3 months";banner.append(img);shop.replaceChildren(banner);shop.dataset.railReady="true";}}
}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();})();
