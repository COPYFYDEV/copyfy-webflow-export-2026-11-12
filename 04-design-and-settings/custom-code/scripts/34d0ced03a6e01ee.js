
    console.log("📜 Script TOC chargé dans la page");
    // Fonction pour initialiser le TOC
    function initTOC() {
      console.log("🚀 Script TOC démarré");
      const content = document.querySelector('[toc="content"]');
      const tocContainer = document.querySelector('[toc="wrapper"]');
      console.log("📄 Content trouvé:", content);
      console.log("📋 TOC Container trouvé:", tocContainer);
      if (!content || !tocContainer) {
        console.error("❌ Éléments manquants - Content:", !!content, "TOC Container:", !!tocContainer);
        return;
      }
      const offset = 104;
      tocContainer.innerHTML = "";
      const headings = content.querySelectorAll('h2, h3, h4');
      console.log("📝 Titres trouvés:", headings.length, headings);
      headings.forEach((heading, i) => {
        console.log(`📌 Traitement du titre ${i}:`, heading.textContent);
        const id = `heading-${i}`;
        heading.id = id;
        const link = document.createElement('a');
        link.href = '#';
        link.className = `toc-link is-${heading.tagName.toLowerCase()}`;
        link.id = `toc-${i}`;
        link.onclick = function (e) {
          e.preventDefault();
          const elementTop = heading.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
        };
        const text = document.createElement('div');
        text.className = 'toc-text';
        text.textContent = heading.textContent;
        link.appendChild(text);
        tocContainer.appendChild(link);
        console.log(`✅ Lien créé pour: ${heading.textContent}`);
      });
      console.log("🎯 TOC généré avec", headings.length, "liens");
      window.addEventListener('scroll', function () {
        let currentIndex = headings.length - 1;
        console.log("🔄 Scroll détecté, recherche de l'index actuel...");
        for (let i = 0; i < headings.length - 1; i++) {
          const nextTop = headings[i + 1].getBoundingClientRect().top;
          if (Math.floor(nextTop) > offset) {
            currentIndex = i;
            break;
          }
        }
        headings.forEach((heading, i) => {
          const tocLink = document.getElementById(`toc-${i}`);
          const current = i === currentIndex;
          tocLink?.classList.toggle('active', current);
          if (current) {
            console.log(`🎯 Section active: ${i} - ${heading.textContent}`);
          }
        });
      });
      window.dispatchEvent(new Event('scroll'));
    }
    // Essayer plusieurs méthodes pour Webflow
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initTOC);
    } else {
      // Si déjà chargé, attendre un peu pour Webflow
      setTimeout(initTOC, 100);
    }
    // Fallback pour Webflow
    setTimeout(initTOC, 500);
    setTimeout(initTOC, 1000);
    document.addEventListener("DOMContentLoaded", initTOC);
