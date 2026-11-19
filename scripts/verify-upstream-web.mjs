// Compare actual Full app methods and request contracts; no browser/network calls.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const upstream=path.resolve(process.argv[2]||'');
const baseline='90c11c2179c8a1c907529a9e866c06b636375077';
assert.equal(execFileSync('git',['-C',upstream,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),baseline);
const html=fs.readFileSync(path.join(upstream,'service/web/index.html'),'utf8');
const original=html.slice(html.indexOf('const SEVS ='),html.lastIndexOf('</script>'));
const current=fs.readFileSync(path.join(root,'service/web/workbench.js'),'utf8');
function application(script){
  const context=vm.createContext({localStorage:{getItem:()=>null,setItem(){},removeItem(){}},
    URLSearchParams,URL,FormData,Blob,confirm:()=>true,setTimeout:()=>0,clearTimeout(){},
    setInterval:()=>0,clearInterval(){},document:{documentElement:{setAttribute(){}}}});
  vm.runInContext(script,context);
  const app=vm.runInContext('app()',context);
  app.refreshJobs=async()=>{};app.select=()=>{};app.loadAIProviders=async()=>{};
  app.triageHistoryFor=async()=>[];app.$nextTick=fn=>fn();
  app.closeAIForm=()=>{app.aiFormOpen=false;};app.closeModal=()=>{};
  const requests=[];
  app.apiFetch=async(url,opts={})=>{
    requests.push({url,method:opts.method||'GET',body:opts.body?JSON.parse(opts.body):null});
    return {ok:true,status:200,json:async()=>({id:'scan',models:['fixture-model']})};
  };
  return {app,requests};
}
const oldMembers=Object.getOwnPropertyDescriptors(application(original).app);
const newMembers=Object.getOwnPropertyDescriptors(application(current).app);
const approvedRemoved=['lang','applyLang','t','tSev','tTriage','tStatus','tFileKind','tServicePortSource'];
assert.deepEqual(Object.keys(oldMembers).filter(k=>!(k in newMembers)).sort(),approvedRemoved.sort());

const cases=[
  ['analyze',a=>{a.target='/fixture/rootfs';a.decompile=true;a.ghidraAvailable=true;return a.submit();}],
  ['rescan',a=>a.rescan({target:'/fixture/rootfs',kind:'analyze',decompile:true})],
  ['extract',a=>{a.target='/fixture/image.tar';return a.submitExtract();}],
  ['region analyze',a=>a.submitFromRegion('/fixture/extracted','analyze')],
  ['nested extraction',a=>a.submitFromRegion('/fixture/nested.tar','extract')],
  ['triage',a=>{a.selectedId='scan';a.actor='analyst';return a.setTriage({id:'finding'},'confirmed');}],
  ...['pause','resume','stop'].map(action=>[action,a=>a.jobControl('scan',action)]),
  ['provider models',a=>{a.aiForm.host='https://provider.invalid/v1';a.aiForm.api_key='fixture-only';a.aiForm.kind='anthropic';return a.fetchAIModelsForForm();}],
  ['provider create',a=>{Object.assign(a.aiForm,{name:'fixture',host:'https://provider.invalid/v1',api_key:'fixture-only',model:'fixture-model',kind:'openai'});return a.saveAIProvider();}],
  ['provider update',a=>{Object.assign(a.aiForm,{id:'provider',name:'fixture',host:'https://provider.invalid/v1',model:'fixture-model',kind:'anthropic'});return a.saveAIProvider();}],
  ['provider test',a=>a.testAIProvider({id:'provider'})],
];
const verified=[];
for(const [name,invoke] of cases){
  const old=application(original),now=application(current);
  await invoke(old.app);await invoke(now.app);
  // Triage now refreshes history immediately; compare the state-changing request.
  const writes=items=>items.filter(item=>item.method!=='GET');
  assert.deepEqual(writes(now.requests),writes(old.requests),name);
  assert.ok(writes(now.requests).length,name+' did not exercise a request');
  verified.push(name);
}
for(const script of [original,current]){
  const {app}=application(script);
  app.selectedId='scan';app.authToken='fixture-session';
  for(const format of ['json','md','sbom'])assert.equal(app.exportURL(format),`/api/jobs/scan/report?format=${format}&download=1&token=fixture-session`);
}
const filtered=[original,current].map(script=>{
  const {app}=application(script);app.f.q='fixture';app.f.vclass='known_cve';
  app.f.minConf=.7;app.f.triage='confirmed';app.f.sev.info=false;app.findingsPage.offset=50;
  return app.findingsQueryParams().toString();
});
assert.equal(filtered[0],filtered[1]);
console.log(JSON.stringify({baseline,upstreamMembers:Object.keys(oldMembers).length,
  currentMembers:Object.keys(newMembers).length,approvedRemoved,requestContracts:verified,
  exports:'JSON/Markdown/SBOM token URLs equal',filters:'query contract equal',
  scope:'VM/request-contract verification; not a complete visual or browser interaction test'},null,2));
