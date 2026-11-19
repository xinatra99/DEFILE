/* Explicit static-edition bootstrap and disclosures. Full never loads this file. */
(() => {
  'use strict';
  const ready=fetch('/demo/data/data.json').then(r=>{if(!r.ok)throw Error('Bundled sample data could not load.');return r.json();}).then(DefileDemo.createAdapter);
  const memory=new Map();
  const storage={getItem(k){try{return sessionStorage.getItem('defile-live:'+k);}catch{return memory.get(k)??null;}},setItem(k,v){try{sessionStorage.setItem('defile-live:'+k,String(v));}catch{memory.set(k,String(v));}},removeItem(k){try{sessionStorage.removeItem('defile-live:'+k);}catch{memory.delete(k);}}};
  let app;
  const descriptions={
    ghidra:'Ghidra demonstration preview. This view uses sample analysis data. Live decompilation requires Ghidra and a compatible Java runtime in the self hosted edition.',
    cve:'CVE demonstration preview. This environment uses a curated dataset. Live database synchronization and comprehensive component matching are available when configured in the self hosted edition.',
    ai:DefileDemo.AI,
  };
  let serial=0;const closeTips=new Set();
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeTips.forEach(close=>close());});
  function information(feature){
    const holder=document.createElement('span');holder.className='demo-info';holder.dataset.feature=feature;
    const button=document.createElement('button');button.type='button';button.className='demo-info-button';button.setAttribute('aria-label','About '+feature.toUpperCase()+' demonstration');button.setAttribute('aria-expanded','false');
    button.innerHTML='<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 9v5M10 6v.5"/></svg>';
    const tip=document.createElement('div');tip.className='demo-tooltip';tip.id='demo-tip-'+(++serial);tip.setAttribute('role','tooltip');tip.setAttribute('popover','manual');tip.textContent=descriptions[feature];button.setAttribute('aria-describedby',tip.id);
    document.body.append(tip);holder.append(button);let pinned=false;
    const open=()=>{if(!tip.matches(':popover-open'))tip.showPopover();const r=button.getBoundingClientRect(),width=Math.min(340,innerWidth-24);tip.style.width=width+'px';tip.style.left=Math.max(12,Math.min(innerWidth-width-12,r.left))+'px';tip.style.top=Math.min(r.bottom+8,innerHeight-tip.offsetHeight-12)+'px';button.setAttribute('aria-expanded','true');};
    const close=()=>{if(tip.matches(':popover-open'))tip.hidePopover();button.setAttribute('aria-expanded','false');pinned=false;};
    closeTips.add(close);
    holder.addEventListener('mouseenter',open);holder.addEventListener('mouseleave',()=>{if(!pinned&&!holder.matches(':focus-within'))close();});
    button.addEventListener('focus',open);button.addEventListener('blur',()=>{if(!pinned)close();});
    button.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();pinned=!pinned;if(pinned)open();else close();});
    button.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close();}});
    document.addEventListener('click',e=>{if(!holder.contains(e.target)&&!tip.contains(e.target))close();});
    return holder;
  }
  function label(text,feature){const line=document.createElement('div');line.className='demo-disclosure';const badge=document.createElement('span');badge.className='demo-label';badge.textContent=text;line.append(badge);if(feature)line.append(information(feature));return line;}
  async function pseudocodePreview(){
    if(!app.demoPreviewReturn){
      app.demoPreviewReturn={scan:app.selectedId,tab:app.tab,label:app.scanName(app.selJob)+' · '+app.tabLabel(),scrollTop:document.getElementById('research-workspace').scrollTop,f:JSON.parse(JSON.stringify(app.f)),sort:app.sort,groupBy:app.groupBy,collapsedGroups:[...app.collapsedGroups],offset:app.findingsPage.offset,
        expanded:[...document.querySelectorAll('[data-finding-id]')].filter(el=>el.querySelector('.hd')?.getAttribute('aria-expanded')==='true').map(el=>el.dataset.findingId),
        compareMode:app.compareMode,showVulnDB:app.showVulnDB,showSensitiveDict:app.showSensitiveDict,focusedBinaryPath:app.focusedBinaryPath,binaryFunctionQuery:app.binaryFunctionQuery,
        stringsBinary:app.stringsBinary,stringsQuery:app.stringsQuery,sensitiveBinary:app.sensitiveBinary,sensitiveQuery:app.sensitiveQuery,filesKindFilter:app.filesKindFilter,filePreviewPath:app.filePreviewPath,
        filesOffset:app.filesPage.offset,binariesOffset:app.binariesPage.offset,scriptsOffset:app.scriptsPage.offset};
    }
    await app.select('sample-original');app.tab='findings';app.groupBy='';app.f.q='strcpy';await app.loadFindings();
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    const finding=[...document.querySelectorAll('.finding')].find(el=>el.querySelector('details'));
    if(finding){const hd=finding.querySelector('.hd');if(hd.getAttribute('aria-expanded')!=='true')hd.click();finding.querySelector('details').open=true;finding.scrollIntoView({block:'center'});}
  }
  async function returnFromPreview(){
    const origin=app.demoPreviewReturn;if(!origin)return;
    await app.select(origin.scan);
    app.f=origin.f;app.sort=origin.sort;app.groupBy=origin.groupBy;app.findingsPage.offset=origin.offset;
    app.filesKindFilter=origin.filesKindFilter;app.filesPage.offset=origin.filesOffset;app.binariesPage.offset=origin.binariesOffset;app.scriptsPage.offset=origin.scriptsOffset;
    await Promise.all([app.loadFindings(false),app.loadFiles(false),app.loadBinaries(false),app.loadScripts(false)]);
    app.collapsedGroups=origin.collapsedGroups;app.focusedBinaryPath=origin.focusedBinaryPath;app.binaryFunctionQuery=origin.binaryFunctionQuery;
    app.stringsBinary=origin.stringsBinary;app.stringsQuery=origin.stringsQuery;app.sensitiveBinary=origin.sensitiveBinary;app.sensitiveQuery=origin.sensitiveQuery;app.computeSensitive();
    if(origin.filePreviewPath){const file=app.filesStringsAll.find(f=>f.path===origin.filePreviewPath);if(file)await app.openFilePreview(file);}
    app.tab=origin.tab;if(origin.tab==='ai')await app.loadAIAnalysis();
    app.compareMode=origin.compareMode;app.showVulnDB=origin.showVulnDB;app.showSensitiveDict=origin.showSensitiveDict;app.demoPreviewReturn=null;
    await new Promise(resolve=>app.$nextTick(resolve));
    for(const el of document.querySelectorAll('[data-finding-id]'))if(origin.expanded.includes(el.dataset.findingId)&&el.querySelector('.hd')?.getAttribute('aria-expanded')!=='true')el.querySelector('.hd').click();
    await new Promise(resolve=>requestAnimationFrame(resolve));
    const workspace=document.getElementById('research-workspace');workspace.scrollTop=origin.scrollTop;
    const heading=origin.tab==='findings'?[...document.querySelectorAll('[data-finding-id]')].find(el=>origin.expanded.includes(el.dataset.findingId))?.querySelector('.hd'):null;
    (heading||workspace).focus({preventScroll:true});
  }
  function enhance(){
    for(const el of document.querySelectorAll('[data-integration-preview]'))if(!el.dataset.demoEnhanced){el.dataset.demoEnhanced='true';el.append(label('Demo Preview',el.dataset.integrationPreview));}
    for(const el of document.querySelectorAll('.analysis-options'))if(!el.dataset.demoEnhanced){
      el.dataset.demoEnhanced='true';const line=label('Demo Preview','ghidra');const button=document.createElement('button');button.type='button';button.className='ghost sm';button.textContent='Preview pseudocode';button.addEventListener('click',pseudocodePreview);line.append(button);el.append(line);
    }
    for(const heading of document.querySelectorAll('.pane h2,.pane h3')){
      if(heading.dataset.demoEnhanced)continue;
      const text=heading.textContent.trim();let feature=text==='CVE database'?'cve':text==='AI Analysis'?'ai':null;
      if(feature){heading.dataset.demoEnhanced='true';const line=label('Demo Preview',feature);const words=document.createElement('span');words.className='demo-caption';words.textContent=feature==='ai'?'Illustrative investigation response · authored for this demo':'Curated references · recorded checker catalogue';line.append(words);heading.after(line);}
      if(text==='Sensitive dictionary'){heading.dataset.demoEnhanced='true';const line=label('Session only');line.append(' Dictionary changes stay in this browser session. Published sample data remains unchanged.');heading.after(line);}
    }
    for(const el of document.querySelectorAll('.report-heading'))if(!el.dataset.demoEnhanced){
      el.dataset.demoEnhanced='true';const line=label('Recorded sample');const message=document.createElement('span');message.className='demo-caption';message.textContent='Educational fixture · heuristic findings, not proof of exploitability · synthetic version banners';line.append(message);el.append(line);
    }
    for(const el of document.querySelectorAll('.progress-pane'))if(!el.dataset.demoEnhanced){
      el.dataset.demoEnhanced='true';const line=label('Recorded timeline');line.append(' Actual completed engine events. No analysis is running or being replayed automatically.');el.prepend(line);
      const controls=document.createElement('div');controls.className='demo-recorded-controls';for(const name of ['Pause','Resume','Stop']){const b=document.createElement('button');b.className='ghost sm';b.textContent=name;b.addEventListener('click',()=>app.notify('This is a recorded timeline. Execution controls require DEFILE Full; no live job exists.'));controls.append(b);}el.querySelector('h2').after(controls);
    }
    for(const el of document.querySelectorAll('.modalCard'))if(!el.dataset.demoEnhanced){el.dataset.demoEnhanced='true';const line=label('Demo Preview','ai');line.append(' Provider configuration is read-only. No API key is required or accepted.');el.querySelector('h2').after(line);}
    for(const el of document.querySelectorAll('.usermenu-dropdown'))if(!el.dataset.demoEnhanced){el.dataset.demoEnhanced='true';const caption=document.createElement('p');caption.className='demo-caption';caption.textContent='Preferences last for this demo session.';el.append(caption);}
    for(const input of document.querySelectorAll('.aiForm input')){input.readOnly=true;if(input.type==='password'){input.value='';input.placeholder='Not used in this demonstration';}}
    for(const select of document.querySelectorAll('.aiForm select'))select.disabled=true;
  }
  globalThis.DEFILE_TRANSPORT={
    storage,
    previewGhidra:pseudocodePreview,
    returnFromPreview,
    request:async(url,options)=>(await ready).request(url,options),
    events:()=>({close(){}}),
    exportURL:(id,format)=>`/demo/data/${id==='sample-timeline'?'sample-original':id}.${format==='sbom'?'sbom.json':format}`,
    dirChartURL:id=>`/demo/data/${id==='sample-timeline'?'sample-original':id}.png`,
    async onReady(instance){
      if(app)return;
      app=instance;const adapter=await ready;
      app.authToken='';app.username='Demo visitor';app.loginRequired=false;app.showLogin=false;
      app.target='samples/sample-original';app.compareA='sample-original';app.compareB='sample-hardened';
      const mutations=['submit','submitExtract','rescan','submitFromRegion','pauseJob','resumeJob','stopJob','deleteJob','deleteSelectedJobs','setTriage','doChangePassword','saveAIProvider','fetchAIModelsForForm','testAIProvider','deleteAIProvider'];
      for(const name of mutations)app[name]=async()=>app.notify(name.includes('AI')?'Provider configuration and external requests require DEFILE Full. No changes were saved.':DefileDemo.EXECUTION+' No changes were made.');
      app.runAIAnalysis=async()=>app.notify(DefileDemo.AI+' Read the illustrative example already shown below.');
      app.upload=async event=>{if(event?.target)event.target.value='';app.notify(DefileDemo.EXECUTION);};
      document.addEventListener('click',event=>{if(event.target.matches('input[type=file]')){event.preventDefault();event.stopImmediatePropagation();app.notify(DefileDemo.EXECUTION);}},true);
      document.addEventListener('drop',event=>{if(event.dataTransfer?.files.length){event.preventDefault();app.notify(DefileDemo.EXECUTION);}});
      const header=document.querySelector('header .brand');header.append(label('Sample data'));
      let scheduled=false;new MutationObserver(()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{scheduled=false;enhance();});}}).observe(document.body,{childList:true,subtree:true});
      enhance();
      const params=new URLSearchParams(location.hash.slice(1)),id=params.get('scan');
      app.select(adapter.data.jobs.some(j=>j.id===id)?id:'sample-original');
      const tab=params.get('tab');if(['dashboard','findings','binaries','scripts','files','components','busybox','services','strings','sensitive','ai','reports'].includes(tab))app.tab=tab;
      if(tab==='ai')await app.loadAIAnalysis();
      if(params.get('view')==='cve')app.toggleVulnDB();
      else if(params.get('view')==='compare')app.toggleCompare();
      else if(params.get('view')==='dictionary')app.toggleSensitiveDict();
      const sync=()=>{const p=new URLSearchParams({scan:app.selectedId||'sample-original',tab:app.tab});if(app.showVulnDB)p.set('view','cve');else if(app.compareMode)p.set('view','compare');else if(app.showSensitiveDict)p.set('view','dictionary');history.replaceState(null,'','#'+p);};
      for(const key of ['selectedId','tab','showVulnDB','compareMode','showSensitiveDict'])app.$watch(key,sync);
      sync();
    }
  };
})();
