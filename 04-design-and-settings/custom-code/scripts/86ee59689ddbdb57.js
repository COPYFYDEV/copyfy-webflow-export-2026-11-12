
  window.addEventListener('message', function (e) {
    if (e.origin !== 'https://copyfy-free-tools.vercel.app') return;
    if (e.data && e.data.copyfyToolHeight) {
      document.getElementById('cf-tool').style.height = e.data.copyfyToolHeight + 'px';
    }
  });
