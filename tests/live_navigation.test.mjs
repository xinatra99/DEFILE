import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read=name=>fs.readFileSync(new URL('../'+name,import.meta.url),'utf8');
const data=JSON.parse(read('demo/data/data.json'));
const navigationKey='defile-live:navigation';

// Run the Live bootstrap with the real workbench and recorded-data transport.
// Reloads get a fresh application/context while retaining the tab's storage.
async function load({url='https://defile-demo.austinbc.dev/',session=new Map(),blocked=false}={}) {
  const location=new URL(url),replacements=[],watchers=new Map(),skipListeners=new Map();
  const workspace={focused:false,focus(){this.focused=true;}};
  const node=()=>({append(){}});
  const history={state:{existing:'preserved'},replaceState(state,title,value){
    replacements.push(value);location.href=new URL(value,location).href;this.state=state;
  }};
  const context=vm.createContext({
    URL,URLSearchParams,Response,structuredClone,setTimeout,clearTimeout,clearInterval,
    fetch:async()=>Response.json(data),location,history,
    sessionStorage:{
      getItem(key){if(blocked)throw Error('Storage blocked');return session.get(key)??null;},
      setItem(key,value){if(blocked)throw Error('Storage blocked');session.set(key,String(value));},
      removeItem(key){if(blocked)throw Error('Storage blocked');session.delete(key);},
    },
    MutationObserver:class{observe(){}},
    document:{
      addEventListener(){},createElement:node,querySelectorAll:()=>[],
      querySelector(selector){
        if(selector==='header .brand')return node();
        if(selector==='.skip-link')return {addEventListener:(name,fn)=>skipListeners.set(name,fn)};
        return null;
      },
      getElementById:id=>id==='research-workspace'?workspace:null,
    },
  });
  for(const name of ['demo/data-adapter.js','demo/live.js','service/web/workbench.js'])vm.runInContext(read(name),context);
  const app=new Proxy(vm.runInContext('app()',context),{
    set(target,key,value){const changed=target[key]!==value;target[key]=value;if(changed)for(const fn of watchers.get(key)||[])fn();return true;},
  });
  app.$watch=(key,fn)=>watchers.set(key,[...(watchers.get(key)||[]),fn]);
  app.$nextTick=fn=>queueMicrotask(fn);
  await app.refreshJobs();
  await context.DEFILE_TRANSPORT.onReady(app);
  await Promise.resolve();
  assert.equal(app.reportLoadError,'');
  return {app,location,session,replacements,history,workspace,skipListeners};
}

test('clean initial loading selects a usable sample without writing URL state',async()=>{
  const page=await load();
  assert.equal(page.location.href,'https://defile-demo.austinbc.dev/');
  assert.equal(page.app.selectedId,'sample-original');assert.equal(page.app.tab,'dashboard');
  assert.equal(page.app.findingsPage.items.length,5);
  assert.equal(page.replacements.length,0);
});

test('ordinary sample, tab, tool, and evidence navigation stays clean and refreshes restore the view',async()=>{
  const page=await load(),{app}=page;
  await app.select('sample-hardened');app.openReportTab('reports');
  let refreshed=await load({session:page.session});
  assert.equal(refreshed.app.selectedId,'sample-hardened');assert.equal(refreshed.app.tab,'reports');
  for(const [toggle,key] of [['toggleVulnDB','showVulnDB'],['toggleSensitiveDict','showSensitiveDict'],['toggleCompare','compareMode']]){
    app[toggle]();await Promise.resolve();
    refreshed=await load({session:page.session});
    assert.equal(refreshed.app[key],true);assert.equal(refreshed.app.selectedId,'sample-hardened');
    assert.equal(refreshed.location.hash,'');
    app.returnToScan();
  }
  app.compareA='sample-corpus';app.compareB='sample-original';app.toggleCompare();await Promise.resolve();
  refreshed=await load({session:page.session});
  assert.equal(refreshed.app.compareA,'sample-corpus');assert.equal(refreshed.app.compareB,'sample-original');
  app.returnToScan();await app.select('sample-original');app.openReportTab('findings');
  const finding=app.findingsPage.items.find(f=>f.evidence?.some(e=>app.supportsEvidence(e)));
  assert.ok(finding,'Recorded supporting evidence is available');
  await app.inspectEvidence(finding.evidence.find(e=>app.supportsEvidence(e)),finding.id);
  assert.ok(['binaries','files'].includes(app.tab));app.returnToFinding();
  assert.equal(app.tab,'findings');
  app.openReportTab('ai');await app.loadAIAnalysis();assert.equal(app.aiAnalysis.status,'done');
  refreshed=await load({session:page.session});assert.equal(refreshed.app.tab,'ai');assert.equal(refreshed.app.aiAnalysis.status,'done');
  assert.equal(page.location.href,'https://defile-demo.austinbc.dev/');assert.equal(page.replacements.length,0);
  assert.equal((await load()).app.selectedId,'sample-original','A new session does not inherit navigation');
});

test('legacy deep links override session navigation and are normalized once without losing their destination',async()=>{
  for(const view of ['', 'cve','compare','dictionary']){
    const session=new Map([[navigationKey,JSON.stringify({scan:'sample-original',tab:'dashboard',view:'dictionary'})]]);
    const page=await load({session,url:'https://defile-demo.austinbc.dev/#scan=sample-corpus&tab=files'+(view?'&view='+view:'')});
    assert.equal(page.app.selectedId,'sample-corpus');assert.equal(page.app.tab,'files');
    assert.equal(page.app.showVulnDB,view==='cve');assert.equal(page.app.compareMode,view==='compare');assert.equal(page.app.showSensitiveDict,view==='dictionary');
    assert.equal(page.location.href,'https://defile-demo.austinbc.dev/');assert.deepEqual(page.replacements,['/']);
    assert.equal(page.history.state.existing,'preserved');
    const refreshed=await load({session});assert.equal(refreshed.app.selectedId,'sample-corpus');assert.equal(refreshed.app.tab,'files');
    assert.equal(refreshed.app.compareMode,view==='compare');
  }
  const ai=await load({url:'https://defile-demo.austinbc.dev/#scan=sample-original&tab=ai'});
  assert.equal(ai.app.aiAnalysis.status,'done');assert.equal(ai.location.hash,'');
  for(const scan of ['sample-extraction','sample-timeline']){
    const page=await load({url:'https://defile-demo.austinbc.dev/#scan='+scan});
    assert.equal(page.app.selectedId,scan);assert.equal(page.location.hash,'');
  }
});

test('invalid, stale, malformed, or unavailable session state cannot break a clean startup',async()=>{
  for(const saved of ['{invalid','null','42',JSON.stringify({scan:'removed',tab:'missing',view:'missing',compareA:'removed'})]){
    const page=await load({session:new Map([[navigationKey,saved]])});
    assert.equal(page.app.selectedId,'sample-original');assert.equal(page.app.tab,'dashboard');assert.equal(page.location.hash,'');
  }
  const page=await load({blocked:true,url:'https://defile-demo.austinbc.dev/#scan=unknown&tab=unknown&view=unknown'});
  assert.equal(page.app.selectedId,'sample-original');assert.equal(page.app.tab,'dashboard');assert.equal(page.location.hash,'');
  page.app.openReportTab('reports');assert.equal(page.app.tab,'reports');assert.equal(page.location.hash,'');
});

test('the Live skip link keeps keyboard focus navigation without adding a fragment',async()=>{
  const page=await load();let prevented=false;
  page.skipListeners.get('click')({preventDefault(){prevented=true;}});await Promise.resolve();
  assert.equal(prevented,true);assert.equal(page.workspace.focused,true);assert.equal(page.location.hash,'');
});
