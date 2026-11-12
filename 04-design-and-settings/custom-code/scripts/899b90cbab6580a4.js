
  const cats = [...document.querySelectorAll('[aisearch]')];
  const imgs = [...document.querySelectorAll('[aisearch-img]')];

  let roles = cats.length ? [0, 1 % cats.length, 2 % cats.length] : [];

  function applyRoles() {
    cats.forEach(el => el.classList.remove('first','second','third'));

    if (cats[roles[0]]) cats[roles[0]].classList.add('first');
    if (cats[roles[1]]) cats[roles[1]].classList.add('second');
    if (cats[roles[2]]) cats[roles[2]].classList.add('third');

    const firstEl = cats[roles[0]];
    const val = firstEl ? firstEl.getAttribute('aisearch') : null;
    imgs.forEach(img => {
      img.classList.toggle('active', val && img.getAttribute('aisearch-img') === val);
    });
  }

  function rotate() {
    // first→second, second→third, third→first
    if (roles.length === 3) {
      roles = [roles[2], roles[0], roles[1]];
    }
    applyRoles();
  }

  applyRoles();
  setInterval(rotate, 3000);
