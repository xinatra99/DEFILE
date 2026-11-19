import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../service/web/index.html', import.meta.url), 'utf8');
const script = fs.readFileSync(new URL('../service/web/workbench.js', import.meta.url), 'utf8');
function application() {
  const context = vm.createContext({localStorage:{getItem:()=>null}});
  vm.runInContext(script, context);
  return vm.runInContext('app()', context);
}

test('expired sessions preserve the job list and allow CVE coverage to retry after login', async () => {
  const app = application();
  app.jobs = [{id:'completed-scan'}];
  app.apiFetch = async () => ({ok:false,status:401,json:async()=>({error:'unauthorized'})});
  await app.refreshJobs();
  await app.loadVulnDB();
  assert.equal(app.jobs[0].id, 'completed-scan');
  assert.equal(app.vulnDB, null);
  assert.equal(app.vulnDBLoading, false);
  app.apiFetch = async url => ({ok:true,json:async()=>url.endsWith('/jobs') ? [{id:'restored'}] : {curated:[{id:'CVE-fixture'}]}});
  await app.refreshJobs();
  await app.loadVulnDB();
  assert.equal(app.jobs[0].id, 'restored');
  assert.equal(app.vulnDB.curated[0].id, 'CVE-fixture');
});

test('a temporary coverage failure is visible and can be retried', async () => {
  const app = application();
  app.apiFetch = async () => { throw new Error('offline'); };
  await app.loadVulnDB();
  assert.match(app.vulnDBError, /retry/);
  assert.equal(app.vulnDB, null);
  app.apiFetch = async () => ({ok:true,json:async()=>({curated:[]})});
  await app.loadVulnDB();
  assert.equal(app.vulnDBError, '');
  assert.ok(app.vulnDB);
});

test('distinct affected ranges for the same CVE remain distinct table rows', () => {
  const app = application();
  app.vulnDB = {curated:{kernel:[
    {cve:'CVE-example',version_ge:'5.8',version_lt:'5.10.102'},
    {cve:'CVE-example',version_ge:'5.11',version_lt:'5.15.25'},
  ]}};
  assert.equal(app.vulnDBRows.length, 2);
  assert.equal(app.vulnDBRows[0].versionText, '>= 5.8, < 5.10.102');
  assert.equal(new Set(app.vulnDBRows.map(row=>JSON.stringify([row.component,row.cve,row.versionText]))).size, 2);
});

test('selecting an extracted scan closes mobile navigation and preserves its regions workflow', () => {
  const app = application();
  app.jobs = [{id:'extracted-scan',status:'completed',kind:'extract'}];
  app.mobileScans = true;
  app.select('extracted-scan');
  assert.equal(app.mobileScans, false);
  assert.equal(app.selectedId, 'extracted-scan');
  assert.equal(app.showVulnDB, false);
  assert.equal(app.summary, null);
});

test('saving triage immediately refreshes its actual audit history', async () => {
  const app = application();
  app.selectedId = 'completed-scan';
  app.triageHistoryCache.f = [{state:'new'}];
  const requests = [];
  app.apiFetch = async (url,opts) => {
    requests.push([url,opts?.method||'GET']);
    return {ok:true,json:async()=>[{state:'confirmed'}]};
  };
  const finding = {id:'f',triage:'new'};
  await app.setTriage(finding,'confirmed');
  assert.equal(finding.triage,'confirmed');
  assert.equal(app.triageHistoryCache.f[0].state,'confirmed');
  assert.deepEqual(requests.map(r=>r[1]),['POST','GET']);
});

test('AI view bindings remain safe when a scan switch clears the prior analysis', () => {
  const app=application();app.aiAnalysis={status:'done',content:'Existing analysis'};
  assert.equal(app.viewAIAnalysis.content,'Existing analysis');
  app.aiAnalysis=null;
  assert.equal(app.viewAIAnalysis.status,'none');assert.equal(app.viewAIAnalysis.content,'');
});

test('workspace tools preserve scan filters, selected evidence and the live event stream', () => {
  const app=application();let closes=0;
  app.selectedId='scan';app.tab='findings';app.f.q='strcpy';app.findingsPage.offset=50;
  app.sse={close(){closes++;}};app.loadVulnDB=()=>{};
  app.toggleVulnDB();app.returnToScan();app.toggleSensitiveDict();app.returnToScan();app.toggleCompare();app.returnToScan();
  assert.equal(app.selectedId,'scan');assert.equal(app.tab,'findings');assert.equal(app.f.q,'strcpy');assert.equal(app.findingsPage.offset,50);assert.equal(closes,0);
});

test('comparison defaults use two real analysis reports and exclude extraction and timeline records', () => {
  const app=application();app.jobs=[{id:'extract',kind:'extract',status:'completed'},{id:'timeline',recorded_timeline:true,status:'completed'},{id:'a',status:'completed'},{id:'b',status:'completed'}];app.selectedId='a';
  app.toggleCompare();assert.equal(app.completedJobs.length,2);assert.equal(app.compareA,'a');assert.equal(app.compareB,'b');
});

test('supporting evidence navigation selects recorded function metadata and preserves the finding return', async () => {
  const app=application();app.selectedId='a';app.tab='findings';app.f.q='strcpy';
  app.binariesStringsAll=[{path:'samples/bin/probe',functions:[{name:'sample_copy',address:4096,callees_imported:['strcpy']}],imports:['strcpy']}];
  const evidence={binary:'samples/bin/probe',function:'sample_copy'};assert.ok(app.supportsEvidence(evidence));
  await app.inspectEvidence(evidence,'finding');assert.equal(app.tab,'binaries');assert.equal(app.focusedFunctions.length,1);assert.equal(app.focusedFunctions[0].name,'sample_copy');
  app.returnToFinding();assert.equal(app.tab,'findings');assert.equal(app.f.q,'strcpy');assert.equal(app.evidenceReturn,null);
  app.focusedBinaryPath='';assert.equal(app.viewBinary.path,'');assert.equal(app.viewBinary.functions.length,0);
});

test('scan selection clears the previous evidence return and binary detail context', () => {
  const app=application();app.jobs=[{id:'b',kind:'extract',status:'completed'}];app.evidenceReturn={scan:'a',findingId:'f'};app.focusedBinaryPath='old';
  app.select('b');assert.equal(app.evidenceReturn,null);assert.equal(app.focusedBinaryPath,'');
});

test('scan search finds descriptive sample names as well as full paths and IDs', () => {
  const app=application();app.jobs=[{id:'sample-a',target:'samples/original',label:'Original appliance',status:'completed'},{id:'sample-b',target:'samples/hardened',label:'Hardened appliance',status:'completed'}];
  app.scanSearch='hardened';assert.equal(app.visibleJobs.length,1);assert.equal(app.visibleJobs[0].id,'sample-b');app.scanSearch='samples/';assert.equal(app.visibleJobs.length,2);
});
