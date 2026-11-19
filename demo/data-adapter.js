/* Read-only transport over recorded data. No request is forwarded to an API. */
((global) => {
  'use strict';
  const EXECUTION='Live analysis is available in the self hosted edition. This public demo uses precomputed research samples.';
  const AI='AI investigation demonstration. Responses are prerecorded examples based on sample evidence. No live model inference occurs in this environment.';
  function freeze(x){if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.freeze(x);Object.values(x).forEach(freeze);}return x;}
  const rank={critical:0,high:1,medium:2,low:3,info:4};
  const json=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json'}});
  const relative=(value,target)=>String(value||'').replace(target,'').replace(/^\//,'');
  const encode=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  function chart(slices){
    const entries=slices.filter(x=>Number(x.value)>0),total=entries.reduce((a,b)=>a+Number(b.value),0)||1;
    let offset=0;const colors=['#a1a1aa','#f5aa70','#7dd5a9','#90bce9'];
    const circles=entries.map((x,i)=>{const size=Number(x.value)/total*264,part=`<circle cx="70" cy="70" r="42" fill="none" stroke="${colors[i%4]}" stroke-width="20" stroke-dasharray="${size} ${264-size}" stroke-dashoffset="${-offset}"/>`;offset+=size;return part;}).join('');
    return new Response(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140"><title>${encode(entries.map(x=>x.name+': '+x.value).join(', '))}</title><g transform="rotate(-90 70 70)">${circles}</g></svg>`,{headers:{'Content-Type':'image/svg+xml'}});
  }
  function createAdapter(input){
    const data=freeze(structuredClone(input));
    const reportFor=id=>data.reports[id==='sample-timeline'?'sample-original':id];
    function paged(items,p){const offset=Math.max(0,Number(p.get('offset'))||0),limit=Math.max(1,Math.min(2000,Number(p.get('limit'))||100));return {items:p.get('all')==='1'?items:items.slice(offset,offset+limit),total:items.length,offset,limit};}
    function compare(a,b,keywords){
      const A=reportFor(a)?.report,B=reportFor(b)?.report;if(!A||!B)return null;
      const findingKey=(f,r)=>JSON.stringify([f.rule,relative(f.component,r.target),f.title,f.evidence.map(e=>[relative(e.binary,r.target),e.function,e.address,e.snippet])]);
      const am=new Map(A.findings.map(f=>[findingKey(f,A),f])),bm=new Map(B.findings.map(f=>[findingKey(f,B),f]));
      const added=[...bm].filter(([k])=>!am.has(k)).map(([,v])=>v),removed=[...am].filter(([k])=>!bm.has(k)).map(([,v])=>v),common=[...bm].filter(([k])=>am.has(k)).map(([,v])=>v);
      const af=new Map(A.files.map(f=>[relative(f.path,A.target),f])),bf=new Map(B.files.map(f=>[relative(f.path,B.target),f]));
      const fileDiff={added:[],removed:[],modified:[],unchangedCount:0};
      for(const [p,f] of bf){if(!af.has(p))fileDiff.added.push({...f,path:p});else if(af.get(p).md5!==f.md5)fileDiff.modified.push({path:p,md5A:af.get(p).md5,md5B:f.md5});else fileDiff.unchangedCount++;}
      for(const [p,f] of af)if(!bf.has(p))fileDiff.removed.push({...f,path:p});
      const funcs=r=>new Map(r.binaries.flatMap(binary=>binary.functions.map(f=>[relative(binary.path,r.target)+'\0'+f.name,{...f,binary:relative(binary.path,r.target)}])));
      const fa=funcs(A),fb=funcs(B),functionDiff={counts:{added:0,removed:0,modified:0,unchanged:0},rows:[]};
      for(const key of new Set([...fa.keys(),...fb.keys()])){
        const x=fa.get(key),y=fb.get(key);const status=!x?'added':!y?'removed':JSON.stringify([x.size,x.calls])===JSON.stringify([y.size,y.calls])?'unchanged':'modified';
        functionDiff.counts[status]++;functionDiff.rows.push({path:(y||x).binary,name:(y||x).name,status,sizeA:x?.size,sizeB:y?.size,callsA:x?.calls?.length,callsB:y?.calls?.length});
      }
      const strings=r=>new Set([...r.binaries.flatMap(x=>x.strings||[]),...r.files.flatMap(x=>x.strings||[])]);
      const sa=strings(A),sb=strings(B),stringsAdded=[...sb].filter(x=>!sa.has(x)),stringsRemoved=[...sa].filter(x=>!sb.has(x));
      const sensitive=x=>keywords.some(k=>x.toLowerCase().includes(String(k).toLowerCase()));
      return {added,removed,common,addedTotal:added.length,removedTotal:removed.length,commonCount:common.length,commonTotal:common.length,binariesA:A.binaries.length,binariesB:B.binaries.length,scriptsA:A.scripts.length,scriptsB:B.scripts.length,filesA:A.files.length,filesB:B.files.length,fileDiff,functionDiff,stringsAdded,stringsRemoved,stringsAddedTotal:stringsAdded.length,stringsRemovedTotal:stringsRemoved.length,sensitiveAdded:stringsAdded.filter(sensitive),sensitiveRemoved:stringsRemoved.filter(sensitive)};
    }
    async function request(input,options={}){
      const url=new URL(String(input),'https://demo.invalid'),path=url.pathname,p=url.searchParams,method=(options.method||'GET').toUpperCase();
      if(url.origin!=='https://demo.invalid')return json({error:'External requests are unavailable in DEFILE Live.'},403);
      const body=typeof options.body==='string'?JSON.parse(options.body||'{}'):{};
      if(method==='POST'&&path==='/api/compare'){const result=compare(body.a,body.b,body.sensitive_keywords||[]);return result?json(result):json({error:'Select two bundled analysis samples.'},400);}
      if(method==='POST'&&path==='/api/chart/pie')return chart(body.slices||[]);
      if(method!=='GET')return json({error:path.includes('/ai/')||path.endsWith('/ai-analysis')?AI:EXECUTION+' Changes and administrative operations are unavailable.'},403);
      if(path==='/healthz')return json({login_required:false,ghidra_available:false,moria_version:'Recorded extraction samples',demo:true});
      if(path==='/api/jobs')return json(data.jobs);
      if(path==='/api/vulndb')return json(data.vulndb);
      if(path==='/api/triage/history')return json([]);
      if(path==='/api/ai/providers')return json([{id:'recorded-example',name:'Illustrative investigation',kind:'openai',host:'Bundled examples — no external endpoint',model:'No live model',max_tokens:8192,key_last4:''}]);
      const match=path.match(/^\/api\/jobs\/([^/]+)(?:\/(.+))?$/);
      if(!match)return json({error:'This operation is unavailable in the static demonstration.'},404);
      const [,id,kind]=match,entry=reportFor(id),job=data.jobs.find(j=>j.id===id);
      if(!job)return json({error:'Sample scan not found.'},404);
      if(!kind)return json(job);
      if(kind==='ai-analysis'&&entry){const r=entry.report;return json({job_id:id,status:'done',provider_name:'Illustrative response authored for DEFILE Live',model:'No model inference',content:`ILLUSTRATIVE INVESTIGATION RESPONSE\nWritten specifically for this demonstration; not generated by an AI provider.\n\nSample: ${entry.label}\nEvidence: ${r.binaries.length} binaries, ${r.findings.length} heuristic findings.\n\nInvestigation notes\n1. Inspect unsafe-call evidence and its function/address references. A flagged call alone does not prove exploitable data flow.\n2. Compare original and hardened samples. They were compiled and analyzed independently.\n3. Component/CVE correlations in this educational sample come from deliberately embedded version banners. The executable does not bundle those libraries.\n4. Review configuration, startup scripts and mitigations alongside each finding.\n\nThese are authored evidence-reading examples. Arbitrary questions and live inference are unavailable.`,prompt_meta:null});}
      if(!entry)return json({error:'This sample has extraction results, not an analysis report.'},404);
      const r=entry.report;
      if(kind==='summary')return json(entry.summary);
      if(kind==='findings'){
        let f=r.findings.filter(x=>(!p.has('sev')||p.getAll('sev').includes(x.severity))&&(!p.get('vclass')||x.vuln_class===p.get('vclass'))&&(!p.get('triage')||x.triage===p.get('triage'))&&x.confidence>=Number(p.get('min_conf')||0));
        const q=(p.get('q')||'').toLowerCase();if(q)f=f.filter(x=>JSON.stringify(x).toLowerCase().includes(q));
        f=[...f].sort((a,b)=>p.get('sort')==='confidence'?b.confidence-a.confidence:rank[a.severity]-rank[b.severity]||b.confidence-a.confidence);
        f=f.map(x=>x.vuln_class==='buffer_overflow'&&x.title.includes('strcpy')?{...x,demo_pseudocode:true,pseudocode:'/* DEMO PREVIEW: illustrative pseudocode authored for this demo.\n   Not generated by Ghidra. See the actual public C fixture for source. */\nvoid sample_copy(const char *text) {\n    char out[128];\n    strcpy(out, text);\n    puts(out);\n}'}:x);
        return json(paged(f,p));
      }
      if(['binaries','scripts','components','files'].includes(kind)){let list=r[kind];if(kind==='files'&&p.get('kind'))list=list.filter(x=>x.kind===p.get('kind'));return json(paged(list,p));}
      if(kind==='binary'){const binary=r.binaries.find(x=>x.path===p.get('path'));return binary?json(binary):json({error:'Sample binary not found.'},404);}
      if(kind==='busybox')return json(r.busybox_audit);
      if(kind==='services')return json(r.services);
      if(kind==='file-content'){const entry=data.previews[p.get('path')];return entry?json(entry):json({error:'Only bundled sample text is available.'},404);}
      return json({error:'This operation is unavailable in the static demonstration.'},404);
    }
    return {request,compare,data,exportURL:(id,format)=>`/demo/data/${id==='sample-timeline'?'sample-original':id}.${format==='sbom'?'sbom.json':format}`,dirChartURL:id=>`/demo/data/${id==='sample-timeline'?'sample-original':id}.png`};
  }
  global.DefileDemo={createAdapter,EXECUTION,AI};
})(globalThis);
