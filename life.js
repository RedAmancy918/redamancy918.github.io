(() => {
  'use strict';
  let posts=[],category='all';
  const feed=document.getElementById('moments');
  const dialog=document.getElementById('photo-dialog');
  const photo=document.getElementById('full-photo');
  let trigger;
  const labels={daily:'Everyday',travel:'Travel',lab:'In the lab'};
  function element(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;return el;}
  function render(){
    feed.replaceChildren();
    const visible=posts.filter(p=>category==='all'||p.category===category);
    document.getElementById('empty-moments').hidden=visible.length!==0;
    for(const post of visible){
      const article=element('article','moment');article.id='post-'+post.id;
      const meta=element('div','moment-meta');meta.append(element('span','initials','JY'),element('strong','','Jiahao Yang'));
      const time=element('time','',new Date(post.created_at).toLocaleDateString('en-GB',{year:'numeric',month:'short',day:'numeric',timeZone:'Asia/Shanghai'}));time.dateTime=post.created_at;meta.append(time);article.append(meta);
      article.append(element('p','moment-text',post.text_en||post.text));
      const images=(post.images||[]).filter(i=>/^assets\/life\/[a-zA-Z0-9._-]+\.(jpg|png|webp)$/.test(i.src));
      if(images.length){const grid=element('div','moment-photos');grid.dataset.count=images.length;
        images.forEach((image,index)=>{const button=element('button');button.type='button';button.setAttribute('aria-label',`View photo ${index+1}`);const img=element('img');img.src=image.src;img.alt=image.alt||'';img.loading='lazy';button.append(img);button.addEventListener('click',()=>{trigger=button;photo.src=image.src;photo.alt=image.alt||'';dialog.showModal();});grid.append(button);});article.append(grid);}
      article.append(element('span','moment-category',labels[post.category]||''));feed.append(article);
    }
  }
  document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.category;document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render();}));
  document.getElementById('close-photo').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>trigger?.focus());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  fetch('posts.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error();return r.json();}).then(data=>{posts=Array.isArray(data)?data:[];render();}).catch(()=>{const el=document.getElementById('life-error');el.hidden=false;el.textContent='Updates could not be loaded. Please try again shortly.';});
})();
