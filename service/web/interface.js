/* DOM-only accessibility for the existing Alpine controls. No API/data changes. */
(() => {
  const names = {
    loginUser:'Username',loginPass:'Password',captchaAnswer:'Verification code',
    oldPassword:'Current password',newPassword:'New password',newPassword2:'Confirm new password',
    'aiForm.name':'Provider name','aiForm.kind':'Provider protocol','aiForm.host':'Endpoint URL',
    'aiForm.api_key':'API key','aiForm.model':'Model','aiForm.max_tokens':'Maximum output tokens',
    'f.q':'Search findings','f.vclass':'Vulnerability class','f.triage':'Triage status',
    'f.minConf':'Minimum confidence',sort:'Sort findings',groupBy:'Group findings',
    compareA:'Baseline scan',compareB:'Comparison scan',newKeyword:'New sensitive keyword',
    filesKindFilter:'File kind',binariesJumpTo:'Binary page',scriptsJumpTo:'Script page',
    findingsJumpTo:'Findings page',filesJumpTo:'File page',sensitiveJumpTo:'Sensitive results page',
    theme:'Theme',vulnDBCheckerFilter:'Filter component checkers',sensitiveQuery:'Search sensitive strings',
    scanSearch:'Search samples or scans',binaryFunctionQuery:'Search recorded functions',
  };
  let nextID = 0;
  const helpTip=document.createElement('div');helpTip.id='context-help-tip';helpTip.className='context-tooltip';helpTip.setAttribute('role','tooltip');helpTip.setAttribute('popover','manual');document.body.append(helpTip);
  let helpOwner=null,helpPinned=false;
  function closeHelp(){if(helpTip.matches(':popover-open'))helpTip.hidePopover();helpOwner?.setAttribute('aria-expanded','false');helpOwner=null;helpPinned=false;}
  function openHelp(button){
    if(helpOwner!==button){closeHelp();helpOwner=button;}
    helpTip.textContent=button.dataset.help;
    button.setAttribute('aria-describedby',helpTip.id);button.setAttribute('aria-expanded','true');
    if(!helpTip.matches(':popover-open'))helpTip.showPopover();
    const box=button.getBoundingClientRect(),width=Math.min(360,innerWidth-24);
    helpTip.style.width=width+'px';helpTip.style.left=Math.max(12,Math.min(innerWidth-width-12,box.left))+'px';helpTip.style.top=Math.max(12,Math.min(box.bottom+8,innerHeight-helpTip.offsetHeight-12))+'px';
  }
  document.addEventListener('mouseover',e=>{const button=e.target.closest('[data-help]');if(button)openHelp(button);});
  document.addEventListener('mouseout',e=>{if(helpOwner&&!helpOwner.contains(e.relatedTarget)&&!helpPinned&&document.activeElement!==helpOwner)closeHelp();});
  document.addEventListener('focusin',e=>{const button=e.target.closest('[data-help]');if(button)openHelp(button);});
  document.addEventListener('focusout',e=>{if(e.target===helpOwner&&!helpPinned)closeHelp();});
  document.addEventListener('click',e=>{const button=e.target.closest('[data-help]');if(button){if(helpOwner===button&&helpPinned)closeHelp();else{openHelp(button);helpPinned=true;}}else closeHelp();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeHelp();});
  document.addEventListener('scroll',closeHelp,true);
  const handled = new WeakSet();
  const observedTables=new WeakSet();
  const resizeTables=new ResizeObserver(entries=>entries.forEach(({target})=>{
    const scrolls=target.scrollWidth>target.clientWidth+1;
    target.previousElementSibling.hidden=!scrolls;
    target.tabIndex=scrolls?0:-1;
  }));
  function prepareTable(el) {
    if(!el.matches('.table-wrap')||observedTables.has(el))return;
    observedTables.add(el);
    const hint=document.createElement('p');hint.className='table-scroll-hint';hint.hidden=true;
    hint.textContent='Scroll horizontally to view all columns.';el.before(hint);
    el.setAttribute('role','region');el.setAttribute('aria-label','Technical data table');
    resizeTables.observe(el);
  }

  function enhance(root) {
    if (!(root instanceof Element || root instanceof Document)) return;
    const elements = [...(root instanceof Element ? [root] : []),...root.querySelectorAll('input,select,button,.card.clickable,.drow.clickable,.table-wrap')];
    for (const el of elements) {
      if (handled.has(el)) continue;
      handled.add(el);
      prepareTable(el);
      if (el.matches('input,select')) {
        const modelAttribute = el.getAttributeNames().find(n=>n.startsWith('x-model'));
        const model = modelAttribute ? el.getAttribute(modelAttribute) : '';
        const name = names[model] || el.getAttribute('placeholder') || el.getAttribute('title') || (el.tagName==='SELECT' ? el.options[0]?.text : '') || el.closest('label')?.textContent?.trim() || (el.type==='checkbox' ? 'Select scan' : 'Search or filter');
        if (!el.hasAttribute('aria-label') && !el.labels?.length) el.setAttribute('aria-label',name);
        if (el.parentElement?.matches('.loginCard,.aiForm') && !el.matches('[type=file],[type=hidden],[type=checkbox]')) {
          const wrapper=document.createElement('div');wrapper.className='field-wrap';
          const label=document.createElement('label');label.className='form-label';
          el.id ||= 'workbench-field-'+(++nextID); label.htmlFor=el.id;label.textContent=name;
          el.before(wrapper);wrapper.append(label,el);
        }
      }
      if (el.matches('.card.clickable,.drow.clickable')) {
        el.tabIndex=0;el.setAttribute('role','button');
        el.addEventListener('keydown',event=>{if(event.target===el && (event.key==='Enter'||event.key===' ')){event.preventDefault();el.click();}});
      }
      if (el.matches('.kwchip button')) el.setAttribute('aria-label','Remove keyword '+el.parentElement.querySelector('span')?.textContent);
      if (el.matches('button.modalClose')) el.setAttribute('aria-label','Close dialog');
    }
  }
  enhance(document);
  new MutationObserver(records=>{
    for(const record of records) for(const node of record.addedNodes) enhance(node);
  }).observe(document.body,{childList:true,subtree:true});

  let activeOverlay=null,returnFocus=null;
  const overlays=[...document.querySelectorAll('.loginOverlay')];
  function updateDialogs() {
    const visible=overlays.filter(el=>el.style.display!=='none');
    const next=visible.at(-1)||null;
    for(const el of overlays){el.inert=el!==next;el.setAttribute('aria-hidden',String(el!==next));}
    for(const el of document.querySelectorAll('header,main,.mobile-toolbar')) el.inert=!!next;
    if(next===activeOverlay)return;
    if(next){
      if(!activeOverlay)returnFocus=next.getAttribute('x-show')==='showChangePassword'
        ? document.querySelector('.usermenu-btn') : document.activeElement;
      activeOverlay=next;
      const card=next.querySelector('.loginCard,.modalCard');
      next.setAttribute('role','dialog');next.setAttribute('aria-modal','true');
      next.setAttribute('aria-label',card.getAttribute('aria-label')||card.querySelector('h2')?.textContent||'Settings');
      requestAnimationFrame(()=>card.querySelector('input:not([type=hidden]),button:not(:disabled),select')?.focus());
    } else {
      activeOverlay=null;
      const previous=returnFocus; returnFocus=null;
      requestAnimationFrame(()=>{
        const target=previous?.isConnected && previous.getClientRects().length
          ? previous : previous?.closest('.usermenu')?.querySelector('.usermenu-btn');
        if(target && !target.closest('[inert]'))target.focus();
      });
    }
  }
  overlays.forEach(el=>new MutationObserver(updateDialogs).observe(el,{attributes:true,attributeFilter:['style']}));
  updateDialogs();
  document.addEventListener('keydown',event=>{
    if(event.key!=='Tab'||!activeOverlay)return;
    const items=[...activeOverlay.querySelectorAll('button,input,select,a[href],[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length);
    const first=items[0],last=items.at(-1);
    if(event.shiftKey&&(document.activeElement===first||!activeOverlay.contains(document.activeElement))){event.preventDefault();last?.focus();}
    else if(!event.shiftKey&&(document.activeElement===last||!activeOverlay.contains(document.activeElement))){event.preventDefault();first?.focus();}
  });
})();
