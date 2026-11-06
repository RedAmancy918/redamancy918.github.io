(() => {
  'use strict';
  let posts = [], category = 'all', layoutFrame, trigger;
  const feed = document.getElementById('moments');
  const dialog = document.getElementById('photo-dialog');
  const photo = document.getElementById('full-photo');
  const labels = {daily:'Everyday', travel:'Travel', lab:'In the lab'};
  const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(scheduleLayout) : null;
  function element(tag, cls, text) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text) el.textContent = text;
    return el;
  }
  function scheduleLayout() {
    cancelAnimationFrame(layoutFrame);
    layoutFrame = requestAnimationFrame(layout);
  }
  function layout() {
    // Tiny grid rows let cards settle into the available space while keeping
    // chronological DOM order. Observe the inner cards, not the row spans.
    feed.classList.add('masonry-ready');
    const gap = parseFloat(getComputedStyle(feed).getPropertyValue('--moment-gap')) || 24;
    const spans = Array.from(feed.children, article => Math.ceil(article.firstElementChild.getBoundingClientRect().height + gap));
    Array.from(feed.children).forEach((article, index) => {article.style.gridRowEnd = `span ${spans[index]}`;});
  }
  function render() {
    observer?.disconnect();
    feed.replaceChildren();
    const visible = posts.filter(post => category === 'all' || post.category === category);
    document.getElementById('empty-moments').hidden = visible.length !== 0;
    for (const post of visible) {
      const article = element('article', 'moment'); article.id = 'post-' + post.id;
      const card = element('div', 'moment-card');
      const images = (post.images || []).filter(image => /^assets\/life\/[a-zA-Z0-9._-]+\.(jpg|jpeg|png|webp)$/.test(image.src));
      if (images.length) {
        article.classList.add('has-photos');
        const grid = element('div', 'moment-photos'); grid.dataset.count = images.length;
        images.forEach((image, index) => {
          const button = element('button'); button.type = 'button';
          button.setAttribute('aria-label', `View photo ${index + 1}`);
          const img = element('img'); img.alt = image.alt || ''; img.loading = 'lazy';
          img.addEventListener('load', scheduleLayout);
          img.addEventListener('error', scheduleLayout);
          img.src = image.src;
          button.append(img);
          button.addEventListener('click', () => {
            trigger = button; photo.src = image.src; photo.alt = image.alt || ''; dialog.showModal();
          });
          grid.append(button);
        });
        card.append(grid);
      }
      const body = element('div', 'moment-body');
      const text = post.text_en || post.text;
      if (text) body.append(element('p', 'moment-text', text));
      const meta = element('div', 'moment-meta');
      const time = element('time', '', new Date(post.created_at).toLocaleDateString('en-GB', {year:'numeric', month:'short', day:'numeric', timeZone:'Asia/Shanghai'}));
      time.dateTime = post.created_at;
      meta.append(time, element('span', 'moment-category', labels[post.category] || ''));
      body.append(meta); card.append(body); article.append(card); feed.append(article);
      observer?.observe(card);
    }
    layout();
  }
  document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category;
    document.querySelectorAll('[data-category]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    render();
  }));
  window.addEventListener('resize', scheduleLayout, {passive:true});
  document.fonts?.ready.then(scheduleLayout);
  document.getElementById('close-photo').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => trigger?.focus());
  dialog.addEventListener('click', event => {if (event.target === dialog) dialog.close();});
  fetch('posts.json', {cache:'no-cache'}).then(response => {
    if (!response.ok) throw new Error();
    return response.json();
  }).then(data => {posts = Array.isArray(data) ? data : []; render();}).catch(() => {
    const el = document.getElementById('life-error'); el.hidden = false;
    el.textContent = 'Updates could not be loaded. Please try again shortly.';
  });
})();
