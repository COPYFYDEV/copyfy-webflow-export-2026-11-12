
  const params = window.location.search;
  if (params.includes('_page=')) {
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
  }
