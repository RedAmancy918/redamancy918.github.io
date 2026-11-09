(() => {
  'use strict';
  const DEFAULT_STYLE = 'classic';
  // Replace the photo: put an image in assets and update only the path below.
  // Example: const PROFILE_PHOTO = 'assets/portrait.jpg';
  const PROFILE_PHOTO = 'assets/portrait.svg';
  document.querySelectorAll('[data-portrait]').forEach(img => {
    img.src = PROFILE_PHOTO;
    img.alt = PROFILE_PHOTO === 'assets/portrait.svg' ? '' : 'Jiahao (Geo) Yang';
  });
  const params = new URLSearchParams(location.search);
  const style = params.get('style');
  document.body.dataset.style = ['classic','studio','sidebar'].includes(style) ? style : DEFAULT_STYLE;
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click',() => {
    const showAll = button.dataset.filter === 'all';
    document.querySelectorAll('.paper').forEach(el => {el.hidden = !showAll && el.dataset.selected !== 'true';});
    document.querySelectorAll('[data-filter]').forEach(el => el.setAttribute('aria-pressed',String(el===button)));
  }));
  const dialog = document.getElementById('bib-dialog');
  if (!dialog) return;
  const status = document.getElementById('copy-status');
  let bibliography;
  let lastTrigger;
  document.querySelectorAll('[data-bib]').forEach(button => button.addEventListener('click',async () => {
    lastTrigger = button;
    status.textContent = '';
    try {
      if(!bibliography) {const response = await fetch('bibliography.json'); if(!response.ok) throw new Error('Citation unavailable'); bibliography = await response.json();}
      document.getElementById('bib-content').textContent = bibliography[button.dataset.bib];
      dialog.showModal();
    } catch {document.getElementById('bib-content').textContent = 'Citation could not be loaded. Please use the export option on the paper page.';dialog.showModal();}
  }));
  document.getElementById('close-bib').addEventListener('click',() => dialog.close());
  dialog.addEventListener('close',() => lastTrigger?.focus());
  dialog.addEventListener('click',event => {if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  document.getElementById('copy-bib').addEventListener('click',async () => {
    try {await navigator.clipboard.writeText(document.getElementById('bib-content').textContent); status.textContent='Copied';}
    catch {const range=document.createRange();range.selectNodeContents(document.getElementById('bib-content'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='Selected. Press Ctrl/Cmd+C to copy.';}
  });
})();
