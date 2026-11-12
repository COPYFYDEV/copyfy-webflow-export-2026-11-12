
    function initTOC() {
      const content = document.querySelector('[toc="content"]');
      const tocContainer = document.querySelector('[toc="wrapper"]');
      if (!content || !tocContainer) return;
    
      const offset = 104;
      tocContainer.innerHTML = "";
    
      const headings = content.querySelectorAll('h2');
    
      headings.forEach((heading, i) => {
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
      });
    
      window.addEventListener('scroll', function () {
        let currentIndex = headings.length - 1;
    
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
        });
      });
    
      window.dispatchEvent(new Event('scroll'));
    }

    document.addEventListener("DOMContentLoaded", initTOC);
