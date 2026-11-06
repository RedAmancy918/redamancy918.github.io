(() => {
  'use strict';
  const DEFAULT_STYLE = 'classic';
  // 照片替换：将照片放入 assets 文件夹，仅修改下面的路径即可。
  // Example: const PROFILE_PHOTO = 'assets/portrait.jpg';
  const PROFILE_PHOTO = 'assets/portrait.svg';
  document.querySelectorAll('[data-portrait]').forEach(img => {
    img.src = PROFILE_PHOTO;
    img.alt = PROFILE_PHOTO === 'assets/portrait.svg' ? '' : 'Jiahao Yang';
  });
  const params = new URLSearchParams(location.search);
  const style = params.get('style');
  document.body.dataset.style = ['classic','studio','sidebar'].includes(style) ? style : DEFAULT_STYLE;
  const zh = {
    about:'关于',research:'研究',experience:'经历',contact:'联系',role:'机器人学习与具身智能',eyebrow:'机器人学习 · 具身智能',studioTitle:'从数据到实机，<br>让机器人学会行动。',
    bio1:'我即将进入<a href="https://www.cuhk.edu.cn/" target="_blank" rel="noopener noreferrer">香港中文大学（深圳）</a>理工学院计算机与信息工程博士项目学习。目前在深圳市未来智联网络研究院（FNii）担任研究助理，并在伊辛智脑担任算法工程师。',
    bio2:'我的研究聚焦于<strong>具身智能、生成式机器人策略与真实机器人操作</strong>，关注机器人如何从示范中学习、理解环境，并将模型预测转化为可靠的物理动作。',
    bio3:'此前，我在智元机器人参与人形机器人系统与遥操作研发。硕士毕业于格拉斯哥大学机电一体化与机器人专业。',
    cv:'索取简历 ↗',news:'近期动态',latest:'研究与成长的几个片段',news1:'<a href="https://arxiv.org/abs/2609.23565" target="_blank" rel="noopener noreferrer">MaskVLA</a> 已发布于 arXiv，并被 IROS 2026 接收。',news2:'我们的生成式逆运动学工作 <a href="https://arxiv.org/abs/2606.15148" target="_blank" rel="noopener noreferrer">MimicIK</a> 已发布于 arXiv。',news3:'<a href="https://russderrick.github.io/Roboseek/" target="_blank" rel="noopener noreferrer">RoboSeek</a>：通过交互学习机器人操作。',researchLabel:'学术研究',publications:'代表论文',selected:'精选',all:'全部',contribution:'* 共同第一作者；加粗为本人姓名。',paper:'论文 ↗',project:'项目主页 ↗',experienceLabel:'科研与工程',current:'现任',present:'至今',isingRole:'算法工程师 · 初创团队成员',isingDesc:'开展 VLA 训练与实机部署，建设覆盖 AIRBOT、OpenArm 和天机机械臂的数据采集管线；与七月初科技联合推进家庭机器人研发和团队建设。',fniiRole:'研究助理 · VLA 组',fniiDesc:'机器人学习实验、遥操作数据采集、策略微调与嵌入式部署。',agibotRole:'算法软件工程师 / 产品工程师',agibotDesc:'围绕远征 A2、灵犀 X1/X2 开展人形机器人软件、遥操作映射、SDK 与系统集成。',education:'教育背景',incoming:'即将入学 · 春季',cuhk:'香港中文大学（深圳）',phd:'计算机与信息工程博士',glasgow:'格拉斯哥大学',msc:'理学硕士 · 机电一体化与机器人',hlju:'黑龙江大学',beng:'工学学士 · 机械设计制造及其自动化',getInTouch:'保持联系',contactTitle:'一起聊聊机器人。',contactText:'欢迎交流机器人学习、具身智能，以及如何把研究成果部署到真实硬件上。',updated:'更新于 2026 年 11 月',backTop:'返回顶部 ↑',copy:'复制引用'
  };
  const originals = new Map();
  document.querySelectorAll('[data-i18n]').forEach(el => originals.set(el, el.innerHTML));
  let lang = params.get('lang') === 'zh' ? 'zh' : 'en';
  function renderLanguage() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {el.innerHTML = lang === 'zh' ? (zh[el.dataset.i18n] || originals.get(el)) : originals.get(el);});
    document.querySelectorAll('[data-en][data-zh]').forEach(el => {el.textContent = el.dataset[lang];});
    const button = document.getElementById('language');
    button.textContent = lang === 'en' ? '中文' : 'EN';
    button.setAttribute('aria-label',lang === 'en' ? 'Switch to Chinese' : 'Switch to English');
  }
  document.getElementById('language').addEventListener('click',() => {lang=lang==='en'?'zh':'en';renderLanguage();});
  renderLanguage();
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click',() => {
    const showAll = button.dataset.filter === 'all';
    document.querySelectorAll('.paper').forEach(el => {el.hidden = !showAll && el.dataset.selected !== 'true';});
    document.querySelectorAll('[data-filter]').forEach(el => el.setAttribute('aria-pressed',String(el===button)));
  }));
  const dialog = document.getElementById('bib-dialog');
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
    } catch {document.getElementById('bib-content').textContent = lang==='zh'?'暂时无法加载引用，请使用论文页面上的引用导出功能。':'Citation could not be loaded. Please use the export option on the paper page.';dialog.showModal();}
  }));
  document.getElementById('close-bib').addEventListener('click',() => dialog.close());
  dialog.addEventListener('close',() => lastTrigger?.focus());
  dialog.addEventListener('click',event => {if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  document.getElementById('copy-bib').addEventListener('click',async () => {
    try {await navigator.clipboard.writeText(document.getElementById('bib-content').textContent); status.textContent=lang==='zh'?'已复制':'Copied';}
    catch {const range=document.createRange();range.selectNodeContents(document.getElementById('bib-content'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent=lang==='zh'?'已选中，请按 Ctrl/Cmd+C 复制':'Selected. Press Ctrl/Cmd+C to copy.';}
  });
})();
